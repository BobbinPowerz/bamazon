var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon_db"
});


connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id: " + connection.threadId);
});


function showAll(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		console.log("\n     Available products     ");
		console.log("\n--------------------------------------------------------------------------");
		for(i=0;i<res.length;i++){
			console.log("Item ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " + "$" + res[i].price + " || Stock: " + res[i].stock_quantity + " ||" +
			"\n----------------------------------------------------------------------------");
		}
		
		})
};
showAll();