const crypto = require('node:crypto');
const { ethers } = require('ethers');
const prisma = require('../db/prisma');

const EXPECTED_MESSAGE = 'Create EthCredit Agent';

function generateDid(walletAddress) {
  return `did:ethcredit:v1:${walletAddress.toLowerCase()}`;
}

function verifySignature(message, signature, walletAddress) {
  if (!ethers.isHexString(signature, 65)) {
    return false;
  }

  const recoveredAddress = ethers.verifyMessage(message, signature);
  return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
}

function createAgentId(walletAddress) {
  return crypto.createHash('sha256').update(`${walletAddress}${Date.now()}`).digest('hex');
}

async function createAgentRecord({ walletAddress, message, signature }) {
  if (!walletAddress || !message || !signature) {
    const error = new Error('Invalid input');
    error.statusCode = 400;
    throw error;
  }

  if (!ethers.isAddress(walletAddress)) {
    const error = new Error('Invalid wallet address');
    error.statusCode = 400;
    throw error;
  }

  if (message !== EXPECTED_MESSAGE) {
    const error = new Error('Invalid message');
    error.statusCode = 400;
    throw error;
  }

  const isValid = verifySignature(message, signature, walletAddress);
  if (!isValid) {
    const error = new Error('Invalid signature');
    error.statusCode = 401;
    throw error;
  }

  const did = generateDid(walletAddress);
  const agentId = createAgentId(walletAddress);

  // Check if agent already exists for this wallet (idempotent)
  let agent = await prisma.agent.findUnique({
    where: { walletAddress },
  });

  if (agent) {
    return {
      did: agent.did,
      agentId: agent.agentId,
      walletAddress: agent.walletAddress,
      reputationScore: agent.reputationScore,
      createdAt: agent.createdAt.toISOString(),
    };
  }

  // Create new agent in PostgreSQL via Prisma
  agent = await prisma.agent.create({
    data: {
      did,
      agentId,
      walletAddress,
      name: `Agent-${agentId.substring(0, 8)}`,
      status: 'active',
      reputationScore: 0,
      metadata: {
        createdVia: 'wallet-signature',
        timestamp: new Date().toISOString(),
      },
    },
  });

  return {
    did: agent.did,
    agentId: agent.agentId,
    walletAddress: agent.walletAddress,
    reputationScore: agent.reputationScore,
    createdAt: agent.createdAt.toISOString(),
  };
}

async function listAgents() {
  const agents = await prisma.agent.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return agents.map(agent => ({
    did: agent.did,
    agentId: agent.agentId,
    walletAddress: agent.walletAddress,
    reputationScore: agent.reputationScore,
    createdAt: agent.createdAt.toISOString(),
  }));
}

async function getAgentByDid(did) {
  const agent = await prisma.agent.findUnique({
    where: { did },
  });

  if (!agent) {
    return null;
  }

  return {
    did: agent.did,
    agentId: agent.agentId,
    walletAddress: agent.walletAddress,
    reputationScore: agent.reputationScore,
    createdAt: agent.createdAt.toISOString(),
  };
}

module.exports = {
  EXPECTED_MESSAGE,
  generateDid,
  verifySignature,
  createAgentRecord,
  listAgents,
  getAgentByDid,
};
