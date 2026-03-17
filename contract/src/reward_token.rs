#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, symbol_short, Symbol};

#[contract]
pub struct RewardToken;

#[contractimpl]
impl RewardToken {
    pub fn initialize(env: Env, admin: Address, decimal: u32, name: String, symbol: String) {
        admin.require_auth();
        env.storage().instance().set(&Symbol::new(&env, "admin"), &admin);
        env.storage().instance().set(&Symbol::new(&env, "decimal"), &decimal);
        env.storage().instance().set(&Symbol::new(&env, "name"), &name);
        env.storage().instance().set(&Symbol::new(&env, "symbol"), &symbol);
    }

    pub fn mint(env: Env, to: Address, amount: i128) {
        // In a real scenario, you'd check auth of the minter (the crowdfunding contract)
        // For this demo, we'll allow anyone to call it or specific contract addresses
        let admin: Address = env.storage().instance().get(&Symbol::new(&env, "admin")).unwrap();
        // admin.require_auth(); // We'll bypass this for the crowdfunding contract to call it

        let key = symbol_short!("balance");
        let mut balance: i128 = env.storage().persistent().get(&to).unwrap_or(0);
        balance += amount;
        env.storage().persistent().set(&to, &balance);
    }

    pub fn balance_of(env: Env, user: Address) -> i128 {
        env.storage().persistent().get(&user).unwrap_or(0)
    }
}
