Application

The back end API of the E-Commerce project, built using Node's Express web application framework. This API comprises of the MVC layer performing CRUD operations on MongoDB's Mongoose database model. Client Repo - //to be filled//

Technologies Used:

JavaScript
Node.js Express framework
Mongoose

Unsolved Problems:
1) Convert total amount value from cents to USD for display on the front-end purchase history (potentially at server side).

Planning:
1) Set up Express API template and Heroku cloud application based on documentation guidelines.
2) Created routes to carts controller CRUD actions in config/routes.js.
3)

Changed code in index method of Sightings controller to ensure that JSON data obtained from the sightings table is parsed in descending order of id. This ensures that new records created move to the top of the table when displayed in the client application.
Changed controller sighting code to use current_user read attr for create, update and delete actions.
Changed model sighting code to ensure user ownership.
create_sightings migration contains user_id field as a foreign key constraint that references user table.
Ran database migrations on rails, before deploying to heroku, and running heroku database migrations. Restarted heroku application to ensure deployed code is refreshed.
Problem solving:

I worked primarily on the MVP. Therefore, I did not encounter too many issues after scaffolding the MVC layers. However, I would reference documentation on the MVC structure when I ran into issues and also use online forums, such as stack overflow to resolve commonplace issues. I posted an issue on the Full Stack project issues queue when I ran into internal server issues during heroku deployment.

Server Deployed Path: https://glacial-woodland-13268.herokuapp.com

Client Deployed Path: https://axb6452.github.io/BirdWatcherClient

ERD: https://www.lucidchart.com/documents/edit/fd75a490-97c0-49bd-be18-b16005c26383/0?shared=true&
