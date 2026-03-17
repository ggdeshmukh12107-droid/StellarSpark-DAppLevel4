#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map, String, Vec, Symbol, symbol_short, IntoVal};

#[contracttype]
#[derive(Clone)]
pub struct Campaign {
    pub id: String,
    pub creator: Address,
    pub title: String,
    pub goal: i128,
    pub raised: i128,
    pub deadline: u64,
    pub active: bool,
}

#[contracttype]
pub enum DataKey {
    Campaign(String),
    Campaigns,
    Donations(String),
    RewardToken,
}

#[contract]
pub struct StellarFundContract;

#[contractimpl]
impl StellarFundContract {
    /// Set the reward token contract address
    pub fn set_reward_token(env: Env, admin: Address, token_address: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::RewardToken, &token_address);
    }

    /// Create a new crowdfunding campaign
    pub fn create_campaign(
        env: Env,
        id: String,
        creator: Address,
        title: String,
        goal: i128,
        deadline: u64,
    ) -> Campaign {
        creator.require_auth();
        let campaign = Campaign {
            id: id.clone(),
            creator,
            title,
            goal,
            raised: 0,
            deadline,
            active: true,
        };
        env.storage().persistent().set(&DataKey::Campaign(id.clone()), &campaign);

        let mut campaigns: Vec<String> = env
            .storage()
            .persistent()
            .get(&DataKey::Campaigns)
            .unwrap_or(Vec::new(&env));
        campaigns.push_back(id);
        env.storage().persistent().set(&DataKey::Campaigns, &campaigns);

        env.events().publish((symbol_short!("created"),), campaign.clone());

        campaign
    }

    /// Donate XLM (in stroops) to a campaign
    pub fn donate(env: Env, campaign_id: String, donor: Address, amount: i128) {
        donor.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let mut campaign: Campaign = env
            .storage()
            .persistent()
            .get(&DataKey::Campaign(campaign_id.clone()))
            .expect("Campaign not found");

        assert!(campaign.active, "Campaign is no longer active");
        assert!(
            env.ledger().timestamp() < campaign.deadline,
            "Campaign has ended"
        );

        campaign.raised += amount;
        if campaign.raised >= campaign.goal {
            campaign.active = false;
        }

        env.storage()
            .persistent()
            .set(&DataKey::Campaign(campaign_id.clone()), &campaign);

        let mut donations: Map<Address, i128> = env
            .storage()
            .persistent()
            .get(&DataKey::Donations(campaign_id.clone()))
            .unwrap_or(Map::new(&env));
        let prev = donations.get(donor.clone()).unwrap_or(0);
        donations.set(donor.clone(), prev + amount);
        env.storage()
            .persistent()
            .set(&DataKey::Donations(campaign_id.clone()), &donations);

        // Inter-contract call: Mint reward tokens (1 token per XLM donated for demo)
        if let Some(token_address) = env.storage().instance().get::<DataKey, Address>(&DataKey::RewardToken) {
            env.invoke_contract::<()>(
                &token_address,
                &Symbol::new(&env, "mint"),
                soroban_sdk::vec![&env, donor.clone().into_val(&env), amount.into_val(&env)],
            );
        }

        env.events().publish((symbol_short!("donate"), donor, amount), campaign_id);
    }

    /// Get campaign details by ID
    pub fn get_campaign(env: Env, campaign_id: String) -> Campaign {
        env.storage()
            .persistent()
            .get(&DataKey::Campaign(campaign_id))
            .expect("Campaign not found")
    }

    /// Get all campaign IDs
    pub fn get_all_campaigns(env: Env) -> Vec<String> {
        env.storage()
            .persistent()
            .get(&DataKey::Campaigns)
            .unwrap_or(Vec::new(&env))
    }

    /// Get total raised for a campaign
    pub fn get_raised(env: Env, campaign_id: String) -> i128 {
        let campaign: Campaign = env
            .storage()
            .persistent()
            .get(&DataKey::Campaign(campaign_id))
            .expect("Campaign not found");
        campaign.raised
    }
}
