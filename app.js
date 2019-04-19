document.getElementById('loan-form').addEventListener('submit', e => {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults(e) {


    const loanAmount = document.querySelector('#amount');
    const intrestRate = document.querySelector('#interest');
    const yearsToRepay = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(intrestRate.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsToRepay.value) * 12;


    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';


    } else {
        showError('Please check your numbers');
    }

}


function showError(error) {

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';


    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 3000);
}


function clearError() {
    document.querySelector('.alert').remove();
}