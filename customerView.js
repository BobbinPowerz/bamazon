//require needed node modules
var inquirer = require("inquirer");
var mysql = require("mysql");
//establishing database credentials
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon_db"
});

var chargeAmount;
//checking for valid connection with the database
connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id: " + connection.threadId);
});
//showing the user a table of all available products
function showAll(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		console.log("\n     Available products     ");
		console.log("\n--------------------------------------------------------------------------");
		for(i=0;i<res.length;i++){
			console.log("Item ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " + "$" + res[i].price + " || Stock: " + res[i].stock_quantity + " ||" +
			"\n----------------------------------------------------------------------------");
		}
		purchaseProduct();
	});
};
//after the table is shown, option to chose the product and purchase it are given here
function purchaseProduct(){
	inquirer.prompt([{
		name: "productId",
		message: "Enter Item ID to purchase a product",
		//validating user's input
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("\nPlease enter a valid Item ID");
          return false;
        }
	},{
		name:"quantity",
		message: " Enter quantity of the desired product",
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("\nPlease enter a valid quantity");
          return false;
        }
	}]).then(function(answer){
	//retrieving selected product from the database
	connection.query("SELECT * FROM products WHERE item_id = ?", [answer.productId], function(err, res){
		//checking if chosen product is in stock
		if(answer.quantity > res[0].stock_quantity){
			console.log("Stock quantity is insufficient");
			console.log("\nOrder cannot be fulfilled");
			console.log("Please chose a different quantity");
			console.log("\n");
			purchaseProduct();
		}
		else {
			//placing successful order and showing the amount charged to the user's card
			chargeAmount = res[0].price * answer.quantity;
			console.log("Order placed ");
			console.log("Your card will be charged for $" + chargeAmount);
			console.log("\n");
			//updating stock quantity to reflect purchased product changes
			connection.query("UPDATE products SET ? Where ?", [{
				stock_quantity: res[0].stock_quantity - answer.quantity
			},{
				item_id: answer.productId
			}], function(err, res){});
			//giving user a choice to purchase another product and showing updated stock
			inquirer.prompt([{
				type: "confirm",
				name: "select",
				message: "Would you like to purchase another product?"
			}]).then(function(answer){
				if(answer.select){
					showAll();
				}
				else{
					//ending database connection if user is done shopping
					console.log("Thank you for your business!");
					connection.end();
				}
			})
		}
	})
}, function(err, res){})
};
showAll();