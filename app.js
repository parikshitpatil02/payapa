const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/", function (req, res) {
    var weight = req.body.weight;
    var rate = req.body.rate;
    const selectedLanguage = req.body.language;

    // Perform the calculations
    var totalAmount = rate * weight;
    var amount = ((rate * 0.95) - 0.425) * weight;
    var katti = rate * 0.05 * weight;
    var labour = 0.425 * weight;

    // Round the results
    totalAmount = Math.floor(totalAmount);
    amount = Math.floor(amount);
    katti = Math.floor(katti);
    labour = Math.floor(labour);
    var expense = katti + labour;

    // Read the HTML file and inject the calculated values
    fs.readFile(path.join(__dirname, "/payment.html"), "utf8", function (err, data) {
        if (err) {
            res.status(500).send("Error reading the payment page.");
            return;
        }

        // Replace placeholders in the HTML with calculated values using JavaScript variables
        data = data.replace("{{totalAmount}}", totalAmount)
                   .replace("{{expense}}", expense)
                   .replace("{{labour}}", labour)
                   .replace("{{katti}}", katti)
                   .replace("{{finalAmount}}", amount)
                   .replace("{{languageSelect}}", selectedLanguage);

        // Send the modified HTML to the client
        res.send(data);
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});
