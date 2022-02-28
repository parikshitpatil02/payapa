const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    var weight = req.body.weight;
    var rate = req.body.rate;

    var totalamount = rate*weight;
    var amount = ((rate*0.95)-0.425)*weight;
    var katti = rate*0.05*weight;
    var labour = 0.425*weight;
    
    var totalamount=Math.floor(totalamount);
    var amount = Math.floor(amount);
    var katti = Math.floor(katti);
    var labour = Math.floor(labour);
    var expense= katti+labour;

    res.write("<h1>Your Total Papaya Amount is "+totalamount+"<h1>");
    res.write("<h2>Your Total Expense is "+ expense +" (Labour = "+labour+" Katti = "+katti + " )." );
    // res.write("<h2>Labour Amount paid "+labour+"<h2>");
    // res.write("<h2>Katti Amount paid "+katti+"<h2>");
    res.write("<h1>Your Final Papaya Amount is "+amount+"<h1>");
    res.send();
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});