let fromRate, toRate;

function calculate() {
   const amount = document.querySelector(".amount.from input").value
   const fromCurrency = document.querySelector(".currency-form.currency-from .selected").textContent
   const toCurrency = document.querySelector(".currency-form.currency-to .selected").textContent
   fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(response => response.json())
      .then(data => {
         fromRate = data.rates[toCurrency].toFixed(2);
         toRate = (1 / fromRate).toFixed(2);

         const result = (fromRate * amount).toFixed(2);
         document.querySelector(".amount.to input").value = result;

         document.querySelector(".amount.from .rate").innerHTML = `1 ${fromCurrency} = ${fromRate} ${toCurrency}`;
         document.querySelector(".amount.to .rate").innerHTML = `1 ${toCurrency} = ${toRate} ${fromCurrency}`;

      })
      .catch(console.log);
};
const currencies = document.querySelectorAll(".currency")
currencies.forEach(currency => {
   currency.addEventListener("click", function () {
      currency.parentElement.querySelector('.selected').classList.remove('selected');
      currency.classList.add('selected');
      calculate();
   });
})
window.addEventListener("load", calculate)
document.querySelector(".amount.from input").addEventListener("input", event => {
   document.querySelector(".amount.to input").value = event.target.value * fromRate;
})
document.querySelector(".amount.to input").addEventListener("input", event => {
   document.querySelector(".amount.from input").value = event.target.value * toRate;
})




