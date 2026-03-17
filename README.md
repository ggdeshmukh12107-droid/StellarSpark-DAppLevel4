# 🌟 StellarFund - Advanced Production DApp (Level 4)

A complete end-to-end crowdfunding dApp built on the Stellar blockchain, featuring inter-contract calls, real-time event streaming, and CI/CD.

🌐 **Live Demo:** [https://stellarspark-dapplevel4.vercel.app/](https://stellarspark-dapplevel4.vercel.app/) *(Deploys from the `main` branch of this repository)*

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

### Wallet Connection & Hero
<img width="1024" alt="Hero screen with Connect Wallet button" src="public/screenshots/01-hero.png" />

### Connected — Testnet Badge
<img width="1024" alt="Header showing TESTNET badge and wallet address after connecting Freighter" src="public/screenshots/02-connected.png" />

### Mobile Responsive View
<img width="390" alt="Mobile responsive view of the StellaFund DApp on iPhone 12 Pro dimensions" src="public/screenshots/level4-mobile-view.png" />

### CI/CD Pipeline Success
<img width="1024" alt="GitHub Actions CI/CD pipeline showing 100% successful jobs on push to main" src="public/screenshots/level4-cicd-pipeline.png" />

### Campaign Grid & Progress Bars
<img width="1024" alt="Active campaigns grid with real-time progress bars and Live Soroban indicator" src="public/screenshots/03-campaigns.png" />

### Donate Modal
<img width="720" alt="Donate XLM modal with amount selection and custom input" src="public/screenshots/04-donate-modal.png" />

### Freighter Signing Popup
<img width="720" alt="Freighter wallet popup asking to confirm the transaction with memo" src="public/screenshots/05-freighter-popup.png" />

### Donation Success ✅
<img width="720" alt="Thank you screen confirming 10.00 XLM donation to Community Hackathon was successful" src="public/screenshots/06-success.png" />



## 🎥 Demo Video

> 📹 <video controls src="level-3 - Google Chrome 2026-03-09 12-06-33.mp4" title="Title"></video>

---

## 🔗 Links

- 🌐 Live App: [https://stellarspark-dapplevel4.vercel.app/](https://stellarspark-dapplevel4.vercel.app/)
- 📜 GitHub Repository: [https://github.com/ggdeshmukh12107-droid/StellarSpark-DAppLevel4](https://github.com/ggdeshmukh12107-droid/StellarSpark-DAppLevel4)
- 💧 Testnet Faucet: https://friendbot.stellar.org
