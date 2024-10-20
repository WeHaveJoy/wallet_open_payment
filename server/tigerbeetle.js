const TigerBeetle = require('tigerbeetle');

const tbClient = new TigerBeetle.Client(10);  

async function recordTransaction(transactionId, amount) {
    try {
        await tbClient.createTransfers([
            {
                id: transactionId,
                debit_account_id: 1,  // Charity Account
                credit_account_id: 2,  // Donor Account
                amount: amount * 100,  // Use minor units
            }
        ]);
    } catch (error) {
        console.error('TigerBeetle Error:', error);
    }
}

module.exports = {
    recordTransaction
};
