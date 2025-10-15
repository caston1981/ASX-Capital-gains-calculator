const Papa = require('papaparse');
const fs = require('fs');

// Test CSV parsing
const csvContent = fs.readFileSync('./csv/SharesAndUnitsSales20251015114015960.csv', 'utf8');

Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (results) => {
        console.log('Parsed data length:', results.data.length);
        console.log('First row:', results.data[0]);

        // Test field mapping
        const transactions = results.data.map(row => ({
            securityId: row['Security identifier'],
            securityName: row['Security name'],
            transactionDate: row['Transaction date '],
            quantity: row['Quantity'],
            unitAmount: row['Unit amount'],
            value: row['Value'],
            transactionType: row['Transaction type'],
            transactionDesc: row['Transaction description']
        }));

        console.log('Mapped transactions length:', transactions.length);
        console.log('First mapped transaction:', transactions[0]);

        // Test date parsing
        transactions.forEach((t, i) => {
            if (t.transactionDate) {
                try {
                    const date = new Date(t.transactionDate.split('/').reverse().join('-'));
                    console.log(`Transaction ${i+1} date: ${t.transactionDate} -> ${date.toISOString().split('T')[0]}`);
                } catch (e) {
                    console.error(`Error parsing date for transaction ${i+1}:`, t.transactionDate);
                }
            }
        });
    }
});