require('dotenv').config();
const computeService = require('../../src/services/zeroGComputeService');

async function run() {
    console.log('Testing 0G Router API integration...');
    
    const params = {
        balances: { ETH: 1, USDC: 100 },
        lockedBalance: {},
        availableBalance: { ETH: 1, USDC: 100 },
        amount: 50,
        token: 'USDC',
        history: []
    };

    console.log('Sending params:', JSON.stringify(params, null, 2));

    try {
        const decision = await computeService.getDecision(params);
        console.log('\n--- SUCCESS ---');
        console.log(JSON.stringify(decision, null, 2));
    } catch (err) {
        console.error('\n--- FAILURE ---');
        console.error(err);
    }
}

run();
