Application

The back end API of the E-Commerce project, built using Node's Express web application framework. This API comprises the MVC layer performing CRUD operations on MongoDB's Mongoose database model. Client Repo - https://github.com/SuperMegaAwesome/client

Technologies Used:

1) JavaScript
2) Node.js Express framework
3) MongoDB Mongoose database model

Planning/Process/Problem-Solving:

1) Set up Express API template and Heroku cloud application based on documentation guidelines.
2) Created routes to carts controller CRUD actions in config/routes.js.
3) Developed carts controller CRUD actions. Preset authentication for all actions to ensure that interaction with the carts database can only be performed by signed in users.
4) Preset setUser method for index and show actions so that user.id attribute can be used to filter ownership of carts resources to the signed in user. This ensures that a user can only view(Read) his/her past order history.
5) Create method in carts controller returns JSON of the newly created cart object to the client. The id of the newly created cart object is then used for AJAX updates to the cart, including when a quantity is changed or when a purchase is completed. The cart id is also used to delete the created item from the carts document when an order is cancelled.
6) Update method in carts controller deletes the _owner attribute from the cart body being updated. This ensures that ownership is not reassigned to any other user (from the one logged in).
7) The delete method from the carts controller removes the cart object from the carts document (happens after checkout and before purchase of cart items).
8) Debugged and tested Auth curl scripts for sign-up, sign-in, change-password and sign-out.
9) Developed, debugged and tested curl scripts for the carts resource.
10) Created a virtual attribute for the cart model schema which returns the order total as a dollar value. Virtuals are set to true for carts controller create, update and read actions so that the orderTotalUSD field is displayed as JSON for use in the front end.
10) Integrated Stripe checkout logic to carts controller:
  i) Added a post route to the charge method of the carts controller to create a new purchase on the Stripe API when the action is called.
  ii) amount in charge method of carts controller is declared as a global variable. This value represents the order total, in cents, of the cart items and is set in create/update methods of carts controller before being passed to the Stripe API, which accepts payment only in cents.

Server Deployed Path: https://powerful-cove-92841.herokuapp.com/

Client Deployed Path: https://SuperMegaAwesome.github.io/client

ERD: https://www.lucidchart.com/documents/edit/fd75a490-97c0-49bd-be18-b16005c26383/0?shared=true&

Route Catalog:

.root('root#root')
.resources('examples')
.resources('carts', {only: ['index', 'show', 'create', 'update', 'destroy']})
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })
.post('/charge', 'carts#charge')
