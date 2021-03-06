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
- Update client/package.json with "proxy": "http://localhost:5000/"(server running on 5000 whereas react on 3000; In the browser we see localhost:3000 but as we added proxy it redirects the request to server 5000)
- Run the application from server folder with `npm start`

# Client setup
- Install react-router-dom, 
- useEffect    
    - If we omit the 2nd arg [], this fn will be executed whenever component does; Basically there's no difference    
    - empty array: Means there's no dependency; executed when the react component is rendered for the 1st time; subsequent updates to the component would not run this fn
    - [ isLoading ]: Whenever this state variable changes, then this fn will be executed
# What are React hooks(RH)?
- componentDidUpdate can be replicated with useEffect(fn), where fn is the function to run upon rerendering.
- componentDidMount methods can be replicated with useEffect(fn, []), where fn is the function to run upon rerendering, and [] is an array of objects for which the component will rerender, if and only if at least one has changed value since the previous render. As there are none, useEffect() runs once, on first mount.
- state can be replicated with useState()
- It allows you to use state and other React features without writing a class.
- Hooks are the functions which "hook into" React state and lifecycle features from function components.
- It does not work inside classes.
# When we use hooks?
- If we want to add some state to a function component, we can use a hook inside the existing function component. Previously we do this by converting it to a class component.
# Rules of hooks
1. Only call Hooks at the top level of the react functions
    Do not call hooks inside,
    - loops
    - nested functions
    - conditions
2. Only call Hooks from React functions and custom hooks; not from regular JS functions
# Benefits of hooks
- Re-usability of stateful logic: With the help of custom hooks.
- In react class component, we split our work in different life-cycle methods like componentDidMount, componentDidUpdate and componentWillUnmount, but in hooks, we can do everything in a single hook called useEffect.
- In class component, we have to use this keyword and also we have to bind event listeners, which increases complexity. This is prevented in react functional components.
- Improving Readability of Component Tree
- Encapsulating Side Effects
- Composable and Reusable Logic
    - Custom hooks are considerably a great mechanism for sharing logic across various components. A custom hook is simply a function that uses one or more React hooks and it can be called within a functional component, just like a standard hook.
# Types of Hooks
# useState
```
const [blogName, setBlogName] = useState("React");
<button onClick={() => setBlogName("React Hooks")}>Change</button>
```
# useEffect
- Allows us to perform side effects in the functional components.
- It's equivalent to componentDidMount(), componentDidUpdate(), and componentWillUnmount() lifecycle methods.
- when the document title has to be based on counter state value, and when the document title has to updated whenever the counter value changes, we used to have below line of code in these lifecycle methods `componentDidMount()`, `componentDidUpdate()`. But with useEffect it's all simplified.
```
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [count]);
```
useEffect Quick Tips:
    ```
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });//It runs on initial render and every update(componentDidMount, componentDidUpdate) whichmeans after every render
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, []);//Runs only on initial render; mimicking only componentDidMount
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        return () => {
            console.log("component will unmount");
        }
    }, []);//return fn from the useEffect will be run on before unmounting the component
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);
    ```
## Side Effects: 
- Updating the DOM,
- Fetching and consuming data from a server API,
- Setting up a subscription, etc.
### 2 Types of side effects
- Effects Without Cleanup: manual DOM mutations, Network requests, Logging, etc.
- Effects With Cleanup: Some effects require cleanup after DOM updation. For example, if we want to set up a subscription to some external data source, it is important to clean up memory so that we don't introduce a memory leak. React performs the cleanup of memory when the component unmounts. However, as we know that, effects run for every render method and not just once. Therefore, React also cleans up effects from the previous render before running the effects next time.
# useContext
- Used to create common data that can be accessed throughout the component hierarchy without passing the props down manually to each level.
- Context defined will be available to all the child components without involving “props”.
- In order to solve the below-specified problem of passing data to even those components which do not require it only because the data is required in the further hierarchy.
- We need to explicitly keep passing the “props” to even those components which do not even use it only to make the data available to the hierarchy below. We are maintaining the overhead of constantly passing the “props” data throughout the entire Hierarchy.
    `var userDetailContext = React.createContext(null);`//Creating a context object
    Use this context object on the top-level component and will add the data which is required throughout the hierarchy. “ userDetailContext.Provider” is used for providing value to the context object created. The object that needs to be added is provided to the “value” attribute. Now, any component in the hierarchy will have access to the context data.
    ```
    export default function UserDetailsComponent() {
    var [userDetails] = useState({
        name: "Mayank",
        age: 30
    });

    return (
        <userDetailContext.Provider value={userDetails}>
        <h1>This is the Parent Component</h1>
        <hr />
        <ChildComponent />
        </userDetailContext.Provider>
    );
    }
    ```
    The context data added on the top can be accessed by the `useContext` keyword
    ```
    function ChildComponent(props) {
        return (
            <div>
            <h2>This is Child Component</h2>
            <hr />
            <SubChildComponent />
            </div>
        );
    }
    function SubChildComponent(props) {
        var contextData = React.useContext(userDetailContext);
        return (
            <div>
            <h3>This is Sub Child Component</h3>
            <h4>User Name: {contextData.name}</h4>
            <h4>User Age: {contextData.age}</h4>
            </div>
        );
    }
    ```
# useReducer
- to manage complex state in your application.
![image](https://user-images.githubusercontent.com/9032135/170092937-1680a933-e50f-4774-ac62-a931661a3d5f.png)
- In the component, `const [state, dispatch] = useReducer(reducer, initialState);`
- Reducers are pure functions. Given a set of inputs, it should always return the same output. No surprises, side effects, API calls, mutations.
```
const reducer = (state, action) => {
...
// update the state with rules dictated by action
...
return updatedState;
}
```
- Action looks like `{type: "INCREASE STATE BY PAYLOAD", payload: 5}`
```
const reducer = (state, action) => {
    switch(action.type){
        case "DEPOSIT MONEY IN BANK":
            return {...state,
                    moneyInBank: state.moneyInBank + action.payload
                   };
        case "PAY SOME BILLS":
            return {...state,
                    billsToPay: state.billsToPay - action.payload
                   };
        case "CLEAN THE SOFA":
            return {...state,
                    moneyInBank: state.moneyInBank
                                 + state.moneyInSofa,
                    moneyInSofa: 0
                   };
    };
}
``` 
# useCallback
- It memoizes functions to improve the performance.
- Used to optimize the rendering behavior of React functional components.
- It help us prevent some unnecessary renders and therefore gain a performance boost.
- Improving performance in React applications includes,
    - Preventing unnecessary renders
    - Reducing the time a render takes to propagate
- Referential equality and function equality:
    - Functions are treated like any other variable and thus are First-class functions.
    - A function can be passed as an argument to other functions, returned by another function, assigned as a value to a variable, compared, and so on. In short, it can do anything that an object can do.
    - 
    ```
      // factory function
        function sumFunctionFactory() {
          return (a, b) => a + b;
        }

        const function1 = sumFunctionFactory();
        const function2 = sumFunctionFactory();

        function1(2, 3);
        // expected output: 5
        function2(2, 3);
        // expected output: 5

        console.log(function1 === function2);// these fns share the same code source, but they are distinct separate function objects,
        //meaning they refer to different instances
        // expected output: false
      ```
- In React, when a component re-renders, every function inside of the component is recreated and therefore these functions’ references change between renders.
- Below will return a memoized instance of the callback that only changes if one of the dependencies has changed. This means that instead of recreating the function object on every re-render, we can use the same function object between renders.
- 

    ```
    const memoized = useCallback(() => {
       // the callback function to be memoized
     },
      // dependencies array
    []);
    //useCallback(callback, dependencies)
    ```
    ```
    export default function ParentComponent() {
      const [state, setState] = useState(false);
      const [dep] = useState(false);
      console.log("Parent Component redered");

      const handler = useCallback(
        (event) => {
          console.log("You clicked ", event.currentTarget);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dep],
      );
      /* handler callback is memoized by useCallback(). As long as dep is the same, useCallback() returns the same function object. When <ParentComponent> re-renders, the handler function object remains the same and doesn’t break the memorization of <MyList> */
    
      const statehanddler = () => {
        setState(!state);
      };
      return (
        <>
          <button onClick={statehanddler}>Change State Of Parent Component</button>
          <MyList handler={handler} />
        </>
      );
    ```
- useCallback() has it's downsides, primarily code complexity. There are a lot of situations where adding useCallback() doesn’t make sense and you just have to accept function recreation.
- It has it's performance drawbacks, as it still has to run on every component re-render.
    ```
    export default function MyComponent() {
          // poor usage of useCallback(). here, it's not helping optimization, since we’re creating the clickHandler function on every render anyways; actually, the optimization costs more than not having the optimization.
          const clickHandler = useCallback(() => {
            // handle the click event
          }, []);

          return <ButtonWrapper onClick={clickHandler} />;
        }

        const ButtonWrapper = ({ clickHandler }) => {
          return <button onClick={clickHandler}>Child Component</button>;
    };
    ```    
# useMemo
- It can potentially make your app more performant, by managing unnecessary re-rendering.
- The re-rendering process in react is fired, in every life cycle of a component every time an update occurs, and operations like “for loops” can be time, memory, processing power consuming.
- Expensive operations, can harm the performance and thus lead to poor user experience.
- It's based on the Memoization concept(optimization technique) to speed up computer programs by storing the results of expensive function calls and returning the cached result when again with the same parameters. It is remembering or cashing a value when the same parameters are passed in subsequently so we don't have to rerender every single time.
- `const memoizedvalue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
- useMemo watch the elements inside the array, and detect the changes in values, if there are no changes it doesn’t matter if the entire component re-renders, the function result will stay the same and it will not re-run but instead will return the memoized result. This can eventually help to avoid expensive calculations on every render.
- ![image](https://user-images.githubusercontent.com/9032135/170242333-232526c4-07da-4148-b304-2fa1649b6f56.png)

  ```
  const slowAdding = useMemo((num) => {
    for(i=0; i<=200000; i++) {
        return num * 2;
    }
  } , [count]);
  ```
# useRef
- 2 main uses of useRef:
    - Accessing the DOM nodes or React elements
    - Keeping a mutable variable
- `const refContainer = useRef(initialValue);`
# useImperativeHandle
# useLayoutEffect
# useDebugValue
- Like watchers in chrome browser for debugging.
# Custom Hooks
- A related logic can be tightly coupled in a custom hook
# HOCs
- Let's assume we've Like, Add Comment buttons(we've to show no.of likes and comments in the UI on a particular user interaction). They have the same logic like counter.
- HOC is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.
```
import React, { Component } from "react";
const HOC = (Component, data) => {
//You can do modification in data then pass it to the component
  return class extends React.Component {
    render() {
      return (
        <Component />
      );
    }
  };
};
export default HOC;
```
Hoc.js
```
import React, { Component } from "react";
const HOC = (Component, data) => {
  //console.log("data", data);
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: data,
      };
    }
    handleClick = () => {
      this.setState({
        count: this.state.count + 1,
      });
    };
    render() {
      return (
        <Component        
          CountNumber={this.state.count}
          handleCLick={this.handleClick}
        />
      );
    }
  };
};
export default HOC;
```
LikeComponent
```
import React, { Component } from "react";
import HOC from "./HOC";
class LikesCount extends Component {
  render() {
    return (
      <div>
        {this.props.CountNumber} <br />
        <button onClick={this.props.handleCLick}>Like👍🏻</button>
      </div>
    );
  }
}
const EnhancedLikes = HOC(LikesCount, 5);
export default EnhancedLikes;
```
CommentComponent
```
import React, { Component } from "react";
import HOC from "./HOC";
class CommentsCount extends Component {
  render() {
    return (
      <div>
        Total Comments : {this.props.CountNumber} <br />
        <button onClick={this.props.handleCLick}>Add Comment!</button>
      </div>
    );
  }
}
const EnhancedComments = HOC(CommentsCount, 10);
export default EnhancedComments;
```
MainComponent
```
import React from "react";
import EnhancedLikes from "./components/HOC/LikesCount";
import EnhancedComments from "./components/HOC/CommentsCount";\
function App() {
  return (
    <div className="App">
      <EnhancedLikes />
      <EnhancedComments />
    </div>
  );
}
export default App;
```
# Virtual DOM
# Testing in ReactJs
https://smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/
## Enzyme
- You will need to install enzyme along with an Adapter corresponding to the version of react (or other UI Component library) you are using.
- Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output.
- You can also manipulate, traverse, and in some ways simulate runtime given the output.
- Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.
`npm i --save-dev enzyme enzyme-adapter-react-16`
- Enzyme has adapters that provide compatibility with React 16.x, React 15.x, React 0.14.x and React 0.13.x.
![image](https://user-images.githubusercontent.com/9032135/170309124-d658ef46-6909-4611-b9a1-32cc8e1bc42d.png)
npmjs.com/package/enzyme
github.com/enzymejs/enzyme/blob/HEAD/docs/api/shallow.md
### Sinon

### Shallow rendering
### Full DOM rendering
### Static rendered markup

## Adapter
- The enzyme API is the same regardless of the version of React you are using, but how React renders and interacts with what is rendered changes depending on the React version.
- The adapter abstracts away anything that changes based on the React version so the core enzyme code can stay the same.
- https://stackoverflow.com/questions/55344422/what-is-adapter-in-enzyme
## Jest
- mount: This method renders the full DOM, including the child components of the parent component, in which we are running the tests.
- shallow: This renders only the individual components that we are testing. It does not render child components. This enables us to test components in isolation.


## test runner
- Jest is a JavaScript test runner that lets you access the DOM via jsdom. While jsdom is only an approximation of how the browser works, it is often good enough for testing React components.
- A JavaScript library for creating, running, and structuring tests.
- react-test0renderer is a react package for snapshot testing.

                       
## Unit test
## Component test
## Snapshot test

# 
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
