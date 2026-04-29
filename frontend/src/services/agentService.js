import { ethers } from 'ethers';

/**
 * AgentService handles the integration with EthCredit ecosystem powered by 0G Network.
 */
export const AgentService = {
  async bootstrapAgent() {
    return this.createAgent();
  },

  async createAgent() {
    const ethereum = globalThis.window?.ethereum;

    if (!ethereum) {
      throw new Error('MetaMask is required to create an agent');
    }

    const provider = new ethers.BrowserProvider(ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    const message = 'Create EthCredit Agent';
    const signature = await signer.signMessage(message);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/agent/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, message, signature }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Failed to create agent');
    }

    return data;
  },

  /**
   * Search for other agents in the 0G global registry.
   */
  async findAgents(query) {
    // Mocking discovery call for now as per REST API docs
    // const response = await fetch(`${OPACUS_API}/discovery/search?q=${query}`);
    return [
      { did: 'did:opacus:v1:0x123', name: 'PriceOracle', score: 98 },
      { did: 'did:opacus:v1:0x456', name: 'LiquidityBot', score: 95 },
    ];
  }
};
