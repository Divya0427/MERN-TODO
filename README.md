# MERN-TODO
# MERN-todo-app
It's a simple Todo App which has a navigation.
User can add the Todos and mark them as favorites as well.
User can Edit and also delete the todos.

body-parser: allows express to parse the request payload into the req.body object

- `mkdir MERN-todo-app`
- `npx create-react-app client`
- `mkdir server && cd server`
- `npm init -y`
- `npm install express body-parser mongoose morgan multer bcrypt jsonwebtoken --save`
- `npm install nodemon --save-dev`
- `touch app.js server.js nodemon.json`
- Update server.js, app.js and update nodemon.json with env variables
- server/api:  mkdir routes controllers models middlewares
- Generally, in order to run our React app with our Node Express API back-end on our localhost server, we would usually need to run commands like npm start for both the front-end and the back-end. But with "concurrently" node package, we can run only 1 command line to start both our React front-end and API backend server.
- update the scripts porperty of server/package.json to accommodate concurrently.
- Run the application from server folder with `npm start`

# Client setup
- Install react-router-dom, 
- useEffect    
    - If we omit the 2nd arg [], this fn will be executed whenever component does; Basically there's no difference    
    - empty array: Means there's no dependency; executed when the react component is rendered for the 1st time; subsequent updates to the component would not run this fn
    - [ isLoading ]: Whenever this state variable changes, then this fn will be executed
    

=============================================================================================
=============================================================================================
#### General notes
morgan: Logging package to our setup to log coming requests for Nodejs
nodemon.json is 


Create an account MongoDB Atlas(Cloud platform which gives us 512MB of storage for free)
create a cluster
https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
Install Postman for API testing


#app.js
File which contains
    - Mongoose connection
    - middlewares 
        - morgan
        - express.static
        - bodyparser
    - CORS headers
    - Routes
    - Error handling

#api folder
    - routes
    - controllers
    - models
    - middlewares

#routes
    import controllers here; get post, patch, delete
    router.get('/', ProdsController.myMethod);

#controllers
    import models here ex: Product
    Product.find().select.exec()
    Product.findById()
    Product.updateOne()
    Product.remove()

#models
    Define mongoose schema

#middlewares
    check-auth.js(For adding the authentication and protected routes)


==========================================================================================================


express.static is to serve all the static files like css, images
app.use(middleware) is called every time a request is sent to the server.
app.use(path, callback)

#https://www.npmjs.com/package/morgan#predefined-formats
morgan presets
    - combined
    - common
    - short
    - tiny
    - dev