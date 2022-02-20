
document.addEventListener("DOMContentLoaded", () => {

document.getElementById('output').style.display = 'none';

document.getElementById('loader').style.display = 'none';

})



const form = document.querySelector("#loan-form");

form.addEventListener("submit", calculateResults);

function calculateResults(e) {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    const loader = document.getElementById("loader").style.display = "block";
    setTimeout (removeLoader, 3000);

    const output = document.getElementById("output").style.display = "none";
    setTimeout (outputTime, 3000);

  } else {
    showError("Заполните все поля!");
  }

  function removeLoader() {
    loader.remove();
  }
  function outputTime() {
    output.style.display = "block";
  }

  e.preventDefault();
}

function showError(error) {
  const errorPart = document.createElement("div");
  const alerted = document.querySelector(".alerted");
 
  errorPart.className = "alert alert-danger";
  errorPart.appendChild(document.createTextNode(error));
  alerted.appendChild(errorPart); 

  setTimeout(clearError, 5000);
}

function clearError() {
  document.querySelector(".alert").remove();
}