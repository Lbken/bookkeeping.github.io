function recordTransaction() {
    var description = document.getElementById("transaction-description").value;
    var amount = parseFloat(document.getElementById("transaction-amount").value);

    if (description && !isNaN(amount)) {
        var transactionList = document.getElementById("transaction-list");
        var listItem = document.createElement("li");
        listItem.textContent = `${description}: $${amount.toFixed(2)}`;
        transactionList.appendChild(listItem);

        document.getElementById("transaction-description").value = "";
        document.getElementById("transaction-amount").value = "";
    } else {
        alert("Please enter valid transaction details.");
    }
}

function exportToCSV() {
    var transactionList = document.getElementById("transaction-list").getElementsByTagName("li");
    var csvContent = "Transaction Description,Transaction Amount\n";

    for (var i = 0; i < transactionList.length; i++) {
        var transactionDetails = transactionList[i].textContent.split(": ");
        var description = transactionDetails[0];
        var amount = transactionDetails[1].replace("$", "");
        csvContent += `${description},${amount}\n`;
    }

    var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");

    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "weedhurry_transactions.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Your browser does not support the download functionality. Please copy the records manually.");
    }
}
