function convertCurrency() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const cs18_amount = parseFloat(document.getElementById("cs18_amt").value);
    const conversionRates = {
        USD: 1,
        EUR: 0.94,
        JPY: 149.22,
        INR: 83.12,
        CNY: 7.19,
        SGD: 1.36,
        KRW: 1344.36
    };

    if (!isNaN(cs18_amount)) {
        const convertedAmount = cs18_amount * (conversionRates[toCurrency] / conversionRates[fromCurrency]);
        document.getElementById("cs18_result").innerHTML = `${cs18_amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
        document.getElementById("cs18_result").innerHTML = "Please enter a valid amount.";
    }
}
