// Payment Form Submission (for Donors)
document.getElementById('paymentForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const recipient = document.getElementById('recipient').value;

    const responseElement = document.getElementById('response');
    responseElement.textContent = 'Processing payment...';

    try {
        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, recipient })
        });

        const result = await response.json();
        if (result.success) {
            responseElement.textContent = `Payment of $${amount} to ${recipient} was successful! Transaction ID: ${result.transactionId}`;
        } else {
            responseElement.textContent = `Payment failed: ${result.error}`;
        }
    } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
    }
});

// Notify Donor (for Charities)
document.getElementById('notifyForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const message = document.getElementById('message').value;
    const donorId = document.getElementById('donorId').value;

    try {
        const response = await fetch('/api/notify-donor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, donorId })
        });

        const result = await response.json();
        alert(result.message || 'Notification sent');
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
