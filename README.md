# 🌟 StellarFund - Advanced Production DApp (Level 4)

A complete end-to-end crowdfunding dApp built on the Stellar blockchain, featuring inter-contract calls, real-time event streaming, and CI/CD.

🌐 **Live Demo:** https://stellarfund-level4-dapp.netlify.app/*(Deploys from the `main` branch of this repository)*

---

## 🏆 Level 4 Required Deliverables

| Requirement | Proof |
|---|---|
| **Live Demo Link** | [Active Vercel Deployment](https://stellarspark-dapplevel4.vercel.app/) |
| **Mobile Responsive View** | See *Screenshots* section below |
| **CI/CD Pipeline Running** | ![CI Status](https://github.com/ggdeshmukh12107-droid/StellarSpark-DAppLevel4/actions/workflows/ci.yml/badge.svg) (See *Screenshots* for full pipeline view) |
| **Main Contract Address** | `CDEPLOY_YOUR_CONTRACT_ADDRESS_ON_STELLAR_TESTNET` (Placeholder for simulation) |
| **Reward Token Address** | `CTOKEN_YOUR_ADDRESS_ON_STELLAR_TESTNET` (Placeholder for simulation) |
| **Minimum 8+ Commits** | [View Commit History](https://github.com/ggdeshmukh12107-droid/StellarSpark-DAppLevel4/commits/main/) (9 meaningful logical commits) |

---

## ✨ Features

- Multi-wallet support via Freighter browser extension
- Create crowdfunding campaigns with title, description, goal (XLM), and deadline
- Donate XLM with 3-step confirmation flow (Input → Confirm → Success)
- Real-time progress bars with milestone markers at 25 / 50 / 75 / 100%
- Live activity feed — scrollable donation history with time-ago and TX hash
- Smart caching — results load instantly from localStorage (30s TTL)
- Per-card loading overlays and modal spinners during async operations
- Toast notifications — auto-dismissing success/error feedback
- Prevents duplicate submissions — enforced by smart contract

---

## 🚀 Level 4 - Production Readiness & Advanced Patterns

### 💎 Advanced Contract Patterns
- **Inter-contract Calls**: The main Crowdfunding contract now interacts with a custom **Reward Token** contract.
- **Reward Token**: Donors automatically receive reward tokens (minted via inter-contract call) upon successful donations.
- **Event-Driven Architecture**: Contracts publish events for campaign creation and donations to ensure real-time synchronization.

### 📡 Real-time Event Streaming
- **Stellar Event Listener**: The frontend utilizes Stellar SDK's event streaming to monitor blockchain events and update the UI instantly without page refreshes.

### 🛠️ Production Ready UI & Performance
- **Local Verification**: Optimized build process and manual quality audits.
- **Mobile First Design**: Enhanced glassmorphism UI with complete mobile responsiveness and optimized performance.
- **Error Tracking Ready**: Integrated structures for transaction debugging and error logging.

---

## 📦 Technical Info

- **Smart Contract Address**: `[Your-Contract-ID]`
- **Reward Token Address**: `[Your-Token-ID]`
- **Production Performance**: Highly optimized assets and efficient caching.

## 🛠️ Development

- React + Vite + TypeScript
- Stellar SDK (@stellar/stellar-sdk)
- Freighter API (@stellar/freighter-api)
- Soroban Smart Contract (Rust)
- Vitest + Testing Library for testing
- Netlify for deployment

---

## 📋 Setup Instructions

1. Install dependencies:
```
npm install
```

3. Run locally:
```
npm run dev
```

4. Run tests:
```
npm test
```

5. Install Freighter from https://freighter.app and switch to Testnet

6. Fund your wallet at https://friendbot.stellar.org

7. Open http://localhost:5173 and start a campaign!

---

## 🧪 Tests

42 tests passing across 4 test suites:

- **TTL Cache** (10 tests) — verifies localStorage cache logic and TTL expiry
- **Stellar Utilities** (15 tests) — transaction helpers, formatting, mock ledger
- **ProgressBar Component** (7 tests) — milestone markers and animated fill
- **CampaignCard Component** (10 tests) — donation flow and UI states

### Test Output Screenshot
> 📸 *Screenshot of test output goes here*

---

## 📦 Smart Contract

**Contract Address:**
```
CDEPLOY_YOUR_CONTRACT_ADDRESS_ON_STELLAR_TESTNET
```

**View on Stellar Expert:**
https://stellar.expert/explorer/testnet/contract/CDEPLOY_YOUR_CONTRACT_ADDRESS_ON_STELLAR_TESTNET

**Contract Functions:**
- `create_campaign(id, creator, title, goal, deadline)` — Create a new crowdfunding campaign
- `donate(campaign_id, donor, amount)` — Donate XLM (in stroops) to a campaign
- `get_campaign(campaign_id)` — Returns full campaign details
- `get_all_campaigns()` — Returns all campaign IDs
- `get_raised(campaign_id)` — Returns total amount raised for a campaign

---

## 🚨 Error Handling

| Error | Trigger | Message |
|---|---|---|
| Already Donated | Same wallet donates to closed campaign | "Campaign is no longer active." |
| Invalid Amount | Amount is zero or negative | "Amount must be positive." |
| Network Rejection | Insufficient balance or tx failure | "Network rejected the transaction." |

---

## 💳 Supported Wallets

| Wallet | Status |
|---|---|
| Freighter | ✅ Supported |

---

## 📸 Screenshots

### Mobile Responsive View
<img width="919" height="943" alt="Screenshot 2026-03-18 010207" src="https://github.com/user-attachments/assets/4994b144-034b-412d-bd2b-aa691228673e" />

### CI/CD Pipeline Success
<img width="1864" height="686" alt="Screenshot 2026-03-18 010257" src="https://github.com/user-attachments/assets/42b5a3c9-cdb1-444e-911f-0bb576eaf59c" />


## 🎥 Demo Video
file:///C:/Users/hp/OneDrive/Videos/Captures/level-3%20-%20Personal%20-%20Microsoft%E2%80%8B%20Edge%202026-03-24%2013-51-13.mp4

---

## 🔗 Links

- 🌐 Live App: [https://stellarspark-dapplevel4.vercel.app/](https://stellarspark-dapplevel4.vercel.app/)
- 📜 GitHub Repository: [https://github.com/ggdeshmukh12107-droid/StellarSpark-DAppLevel4](https://github.com/ggdeshmukh12107-droid/StellarSpark-DAppLevel4)
- 💧 Testnet Faucet: https://friendbot.stellar.org
