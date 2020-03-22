# Abon
## A website for a startup ready-meal producer

### Overview
This project was initially to build a website for the Bristol environmentally conscious food startup, Abon. It was shelved in May 2019 due to University exams and then the startup's founder putting his startup aside for a full-time job. I am now starting the project again using different frameworks as a learning exercise.

### Requirements
The high-level requirements for the website are as follows:
* Users must be able to order Abon's products
* Administrators must be able to view and manage orders
* The website must be mobile-friendly

### Progress
* The customer side home page and the products page have been completed
* All pages are aesthetic and fully functional on mobile browsers
* Customers have the option to order an array of products by cash or PayPal
* Stock levels are automatically managed when customers make orders
* Frontend and server validation is carried out
* HERE Maps is used to verify the customer is within the delivery radius
* Customers and administrators are emailed upon orders

### To Come
* Customers will be able to leave testimonials
* Customers will be able to see an 'About' page
* Admins will be able to login to access the management area
* Admins will be able to add products, change their prices, stock levels, statuses etc
* Admins will be able to see a map of customers to be delivered to
* Admins will be able to see graphs of how long each stage of orders takes
* Admins will be able to see which products sell most and when
* Admins will be able to choose which testimonials are displayed

### Technologies
* Database: Mongoose
* Server: Express/Nodejs
* Frontend: Angular

### Run it yourself
* Install mongodb locally on your computer and run it using `mongod`
* Install angular-cli using `npm install -g @angular/cli`
* Download or pull this git repository
* Build using `npm run build`
* Run the server using `npm run start:local`
* Open localhost:4200 in a browser
