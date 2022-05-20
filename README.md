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
# MERN-TODO
# MERN-todo-app
It's a simple Todo App which has a navigation.
User can add the Todos and mark them as favorites as well.
User can Edit and also delete the todos.

# middleware
- Middleware is a function that has access to the request and response lifecycle methods, and the next() method to continue logic in your Express server.
- A request is something that's coming from a browser that invokes a particular function to perform certain tasks and return a response. “A particular function” in       this case is a middleware.
- Middleware is executed during the window between when a server receives a request and when it sends a response.
- Middleware is software which lies between an operating system and the applications running on it. Essentially functioning as hidden translation layer, middleware       enables communication and data management for distributed applications.
- M Execute any code.
- M Make changes to the request and the response objects.
- M End the request-response cycle.
- M Call the next middleware function in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the         request will be left hanging
# Types of middlewares:
- Application-level middleware(app.use or app.<METHOD>)
    - Ex: Authentication middleware
    - Every route should be authenticated
    - Invoke on all the requests. The function is executed every time the app receives a request
      ```
      app.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next()
      });
      ```
      
     
    - Invoke on specific uri path
        - Using use():
        ```
        app.use('/user/:id', function (req, res, next) {
            console.log('Request Type:', req.method)
            next()
        });
        ```
          
    
        - Using METHOD():
        ```
        app.get('/user/:id', function (req, res, next) {
            res.send('USER')
        });
        ```
          
          
    - Invoke series of middleware functions on specific uri path
        ```
        app.use('/user/:id', function (req, res, next) {
          console.log('Request URL:', req.originalUrl)
          next()
        }, function (req, res, next) {
          console.log('Request Type:', req.method)
          next()
        });
        ```
        
    - Using next() with Route handlers. Route handlers enable you to define multiple routes for a path
        ```
        //Route 1
        app.get('/user/:id', function (req, res, next) {
          console.log('ID:', req.params.id)
          next()
        }, function (req, res, next) {
          res.send('User Info')
        })

        // Route 2
        app.get('/user/:id', function (req, res, next) {
          res.end(req.params.id)
        });//The second route will not cause any problems, but it will never get called because the first route ends the request-response cycle
        ```
    - Using next(‘route’) to skip middlewares and goto another Route. To skip the rest of the middleware functions from a router middleware stack, call next('route')       to pass control to the next route. next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD()functions
        ```
        //Route 1
        app.get('/user/:id', function (req, res, next) {
          if (req.params.id === '0') 
                  next('route')
          else 
                  next()
        }, function (req, res, next) {
          res.send('regular')
        })

        // Route 2
        app.get('/user/:id', function (req, res, next) {
          res.send('special')
        })
        ```
    - Using array in declaring middlewares
        ```
        function logOriginalUrl (req, res, next) {
          console.log('Request URL:', req.originalUrl)
          next()
        } 

        function logMethod(req, res, next) {
          console.log('Request Type:', req.method)
          next()
        }

        var logStuff = [logOriginalUrl, logMethod]
        app.get('/user/:id', logStuff, function (req, res, next) {
          res.send('User Info')
        })

        ```
  
- Application-level middleware(app.use or app.<METHOD>)  
- Router-level middleware(router.use or router.METHOD()): similar to the application level middleware and works in the same manner, except it can be generated and limited to an instance of express.Router () `const router = express.Router();`
- Error-handling middleware(app.use (err, req, res, next))
- Built-in middleware: express.static, express.json, express.urlencoded
- Third-party middleware(bodyparser, cookieparser etc.,)
![image](https://user-images.githubusercontent.com/9032135/169496626-e148baf0-6c79-4a83-94f9-6f50fb38cfb8.png)




# morgan:
- A Node. js and Express middleware to log HTTP requests and errors, and simplifies the process.

# body-parser: 
- Allows express to parse the request payload into the req.body object
- body-parser(for parsing JSON and URL-encoded data)
- As of Express version 4.16+, their own body-parser implementation is now included in the default Express package so there is no need for you to download another      dependency body-parser
- app.use(bodyparser.json()); can be replaced with app.use(express.json());
- app.use(bodyParser.urlencoded({extended: true})); can be replaced with app.use(express.urlencoded()); //Parse URL-encoded bodies
- It's the Node. js body parsing middleware.
- It is responsible for parsing the incoming request bodies in a middleware before you handle it.
- body-parser extracts the entire body portion of an incoming request stream and exposes it on req. body
- This module parses the text, JSON, buffer, string and URL encoded data submitted using HTTP POST request.

# multer:
- For parsing multipart/form-data middleware
- Multipart/form-data is a type of encoding
- It works only with POST method
- Without multer, you can’t upload files using form. The uploaded files will not be encoded
- A node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
- You cannot use Multer without Express because it's Express middleware.

# next()/ return next()/ next('route'):
- next() will run or execute the code after all the middleware function is finished.
- return next() will jump out the callback immediately and the code below return next() will be unreachable.
- 


2 ways of passing parameters to Express application/backend
GET request:
- Named placeholders: app.get('/user/:id', function(req, res) {
                         res.send('user ' + req.params.id);
                      });
- URL's querystring/ GET parameters: http://localhost/books?category=biographies&type=paperback
                      console.log('Category: ' + req.query['category']);
                      console.log('Type: ' + req.query['type']);
POST request: also have 2 aspects
- Text data
    - Using the body-parser middleware
    - console.log('Username: ' + req.body.username);//Here username is the name attribute of HTML form element
- File uploads
# bcrypt
- Pwd hashing is a one-way ticket to data encryption. Hashing performs a one-way transformation on a pwd, turning the pwd into another String, called the hashed pwd. Hashing is called one way because it's practically impossible to get the original text from a hash.
- To hash a pwd:
    Technique 1 (generate a salt and hash on separate function calls):
    ```
    bcrypt.genSalt(saltRounds, function(err, salt) {
       bcrypt.hash(myPlaintextpwd, salt, function(err, hash) {
           // Store hash in your pwd DB.
       });
    });
    ```
   Technique 2 (auto-gen a salt and hash):
    ```
    bcrypt.hash(myPlaintextpwd, saltRounds, function(err, hash) {
        // Store hash in your pwd DB.
    });
    ```
    To check a Pwd:
    // Load hash from your Pwd DB.
    bcrypt.compare(myPlaintextPwd, hash, function(err, result) {
        // result == true
    });
    bcrypt.compare(someOtherPlaintextPwd, hash, function(err, result) {
        // result == false
    });
# JWT JSON Web Token
- JSON Web Token is a standard used to create access tokens for an application. It works this way: the server generates a token that certifies the user identity and sends it to the client.
- In simpler words JWT Tokens is more like a key. If user is authenticated, the server will give a key(the token) using which the client can now(access) open/use routes or services.
- Generate tokens for client-side authorisation.
- To secure endpoints and even authenticate users
- Instead of sending success after login, we will sign the user._id(the unique field -> users id) with the TOKEN_SECRET.
- JWT to sign the credentials and bycrypt to encrypt the pwd before storing them in our database.
- JSON Web Token is an open standard for securely transferring data within parties using a JSON object.
- JWT is used for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server.
- While signup, salt and hash the password before saving it in the DB using bcrypt(`bcrypt.genSalt` `bcrypt.hash`)
    ```
    bcrypt.hash(req.body.pwd, 10, (err, hash) => {if(hash) {
        email: req.body.email,
        password: hash
    }}
    ``` and then save it in DB `user.save()`
- While login, 
    ```
    bcrypt.compare(req.body.pwd, pwdFromDb, (err, result) => { 
    //result is true if matches otherwise false})
    if(result) {
        //now generate token and sent it in the response to client
        const token = jwt.sign(
              {
                email: dbEmail,
                userId: db._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
        );
    }
    ```
    While accessing the protected routes, verify the token using JWT 
    ```
    const token = req.headers.authorization.split(" ")[1];
    //const decoded = jwt.verify(token, process.env.JWT_KEY);
    const decoded = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) {
            console.log(`err=>${err}`);
        }
        if(decoded) {
            console.log(`decoded=>${decoded}`);
            next();
        }
    });
    req.userData = decoded;
    ```
    
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

mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_USERNAME + ':' + encodeURIComponent(process.env.MONGO_ATLAS_PW) + '@cluster0.irrxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

the above statement would connect us with the MongoDB
- username, pwd would be in nodemon.json
- Login MongoDB Atlas Cloud; Use the same data in nodemonjson as username, pwd
- Create cluster; Connect to cluster; Connect your application; Make sure we have driver as Nodejs with the latest version; Copy the connection string and add into our application code
- Security > Network Access > Add IP Address > Add
- Make sure the password is encodeURIComponent
- Connected to DB successfully

Why to opt redux-toolkit


Reduxjs/toolkit
- npm i @reduxjs/toolkit
- create store.js and configure it using configureStore. Export this to use it in other components
- Provide this store to the root component in index.js using Provider and store
- createSlice add it in the store while configuring the store
- Use redux state and actions in react components
- With Redux-Toolkit, we get Thunk already integrated as a dependency.
- 











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
