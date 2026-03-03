/**
 * Stellar testnet transaction builder for donations.
 * Builds a self-payment with a memo so it appears in Freighter's history.
 */
import {
    Horizon,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    Operation,
    Asset,
    Memo,
} from '@stellar/stellar-sdk';

const TESTNET_URL = 'https://horizon-testnet.stellar.org';
const server = new Horizon.Server(TESTNET_URL);

export interface DonationTxResult {
    hash: string;
    ledger: number;
}

/**
 * Build, sign (via Freighter), and submit a real Stellar testnet donation.
 *
 * Uses a self-payment of 0.0000001 XLM with a memo recording the donation
 * so it appears in Freighter's transaction history without requiring the
 * campaign creator's account to exist on testnet.
 *
 * @param donor       Donor's Stellar public key
 * @param amount      Donation amount in XLM (recorded in memo)
 * @param campaignTitle  Campaign name (truncated to fit memo)
 * @param signTx      Freighter signTransaction callback
 */
export async function buildAndSubmitDonationTx(
    donor: string,
    amount: number,
    campaignTitle: string,
    signTx: (xdr: string) => Promise<string>
): Promise<DonationTxResult> {
    // Load donor account to get current sequence number
    const account = await server.loadAccount(donor);

    // Build transaction: minimal self-payment + memo describing donation
    const memoText = `${amount} XLM → ${campaignTitle}`.slice(0, 28); // Stellar memo max 28 bytes
    const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(
            Operation.payment({
                destination: donor, // self-payment so no recipient account needed
                asset: Asset.native(),
                amount: '0.0000001', // minimal, just to create a valid tx
            })
        )
        .addMemo(Memo.text(memoText))
        .setTimeout(30)
        .build();

    const xdr = tx.toXDR();

    // Sign with Freighter
    const signedXdr = await signTx(xdr);

    // Submit to Stellar testnet
    const signedTx = TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET);
    const result = await server.submitTransaction(signedTx);

    return {
        hash: result.hash,
        ledger: (result as unknown as { ledger: number }).ledger ?? 0,
    };
}

/**
 * Try to fund a testnet account using Friendbot (only works on testnet).
 * Silent fail — returns false if funding not needed or fails.
 */
export async function ensureFunded(publicKey: string): Promise<boolean> {
    try {
        await server.loadAccount(publicKey);
        return true; // already exists
    } catch {
        try {
            await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
            return true;
        } catch {
            return false;
        }
    }
}
