document.addEventListener('DOMContentLoaded', function () {
    var currencyTypeSelect = document.getElementById("currencyType");
    var amountInput = document.getElementById("amount");
  
    currencyTypeSelect.addEventListener('change', convertCurrency);
    amountInput.addEventListener('input', convertCurrency);
  });
  
  function convertCurrency() {
    // Get selected currency type
    var currencyType = document.getElementById("currencyType").value;
  
    // Get amount input value
    var amount = parseFloat(document.getElementById("amount").value);
    
    if (isNaN(amount) || amount === "") {
        document.getElementById("convertedAmount").value = ""; // Clear the converted amount field
        return; // Exit the function
    }
    // Construct the URL for the API request based on the selected currency
    var apiUrl = `https://api.currencyapi.com/v3/latest?apikey={put_your_api_key_here}&currencies=ILS&base_currency=${currencyType}`;
  
    // Send API request
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the conversion rate from the API response
        var conversionRate = data.data.ILS.value;
  
        // Convert amount to ILS based on the retrieved conversion rate
        var convertedAmount = amount * conversionRate;
  
        // Display converted amount
        document.getElementById("convertedAmount").value = convertedAmount.toFixed(2);
      })
      .catch(error => {
        console.error(error);
      });
  }
  