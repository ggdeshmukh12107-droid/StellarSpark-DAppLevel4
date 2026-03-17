import { useState, useEffect } from 'react';
import { truncateAddress } from '../utils/stellar';
import { LoadingSpinner } from './LoadingSpinner';
import type { WalletState } from '../types';

interface WalletConnectProps {
    walletState: WalletState;
    onConnect: () => void;
    onDisconnect: () => void;
}

export function WalletConnect({ walletState, onConnect, onDisconnect }: WalletConnectProps) {
    const { isConnected, publicKey, network, isLoading, error } = walletState;
    const [tokenBalance, setTokenBalance] = useState(0);

    useEffect(() => {
        const handleRewardTokens = (e: Event) => {
            const customEvent = e as CustomEvent<{ amount: number }>;
            setTokenBalance(prev => prev + customEvent.detail.amount);
        };
        window.addEventListener('reward-tokens-minted', handleRewardTokens);
        return () => window.removeEventListener('reward-tokens-minted', handleRewardTokens);
    }, []);

    if (isLoading) {
        return (
            <div className="wallet-btn wallet-loading">
                <LoadingSpinner size="sm" />
                <span>Connecting…</span>
            </div>
        );
    }

    if (isConnected && publicKey) {
        return (
            <div className="wallet-connected-wrap">
                <div className="wallet-info">
                    {tokenBalance > 0 && (
                        <div className="token-balance" title="Tokens earned from donations via Inter-contract call">
                            <span className="token-icon">🪙</span>
                            <strong>{tokenBalance} RWD</strong>
                        </div>
                    )}
                    <span className={`network-badge ${network}`}>{network}</span>
                    <span className="wallet-address">{truncateAddress(publicKey, 5)}</span>
                </div>
                <button
                    id="disconnect-wallet-btn"
                    className="btn btn-outline btn-sm"
                    onClick={onDisconnect}
                    title="Disconnect wallet"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <div className="wallet-disconnect-wrap">
            {error && (
                <span className="wallet-error-tooltip" title={error}>
                    ⚠ {error.length > 48 ? error.slice(0, 48) + '…' : error}
                </span>
            )}
            <button
                id="connect-wallet-btn"
                className="btn btn-primary"
                onClick={onConnect}
            >
                Connect Wallet
            </button>
        </div>
    );
}

export default WalletConnect;
