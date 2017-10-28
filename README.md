#**Bamazon**

##Overview:

In this activity, we created an Amazon-like storefront with the MySQL and Node. The app takes in orders from customers and depletes stock from the store's inventory.

##Dependencies and Prerequisits:

First all dependencies are aquired, node packages installed and database created in MySQL workbench. We are using here Inquirer and mysql packages as well as attaching schema and seed file as bamazonSeeds.sql file. Package JSON and .gitignore and screenshots for readme.md are included as well.  


##Application:

customerView.js is what runs the app. We start with requiring all packages and initializing database with credentials. The check for database connection is performed and first functionality of showing the user a table of all available products is presented by calling function showAll. See screenshot below. 


showAll function executes purchaseProduct function, which in turn allows user to chose product ID and enter quantity of desired product. If the desired quantity is not bigger than available stock, order is successful and user is charged the price shown. See screenshot below.


Upon successful purchase, the stock amount is recalculated and user is given an option to purchase another product of exit the app. If user chooses to purchase another product, updated table of all products is first shown to allow the user to see updated stock numbers.
See screenshots below.


And finally, if user's input with product ID was invalid or quantity of desired  porduct exceeds stock amount errors are caught and user is prompted to  re-enter information. See screenshots below. 
