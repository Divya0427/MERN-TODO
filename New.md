webpack
webpack-click
Hot module replacement enable

# Code Splitting
- When using Babel, you’ll need to make sure that Babel can parse the dynamic import syntax but is not transforming it. For that you will need @babel/plugin-syntax-dynamic-import.
- To avoid winding up with a large bundle, it’s good to get ahead of the problem and start “splitting” your bundle. Code-Splitting is a feature supported by bundlers like Webpack, Rollup and Browserify (via factor-bundle) which can create multiple bundles that can be dynamically loaded at runtime.
- Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.
- The best way to introduce code-splitting into your app is through the dynamic import() syntax.

### BEFORE
```
import { add } from './math';
console.log(add(16, 26));
```

### AFTER
```
import("./math").then(math => {
    console.log(math.add(16, 26));
});
```

## React.lazy
- The React.lazy function lets you render a dynamic import as a regular component.
- React.lazy currently only supports default exports.
```
// BEFORE
import OtherComponent from './OtherComponent';
// AFTER
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
- React.lazy takes a function that must call a dynamic import(). This must return a Promise which resolves to a module with a default export containing a React component.
- The lazy component should then be rendered inside a Suspense component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```
## Avoiding fallbacks
```
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');
  
  function handleTabSelect(tab) {
    setTab(tab);
  };

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}
```
- In this example, if tab gets changed from 'photos' to 'comments', but Comments suspends, the user will see a glimmer. This makes sense because the user no longer wants to see Photos, the Comments component is not ready to render anything, and React needs to keep the user experience consistent, so it has no choice but to show the Glimmer above.
- However, sometimes this user experience is not desirable. In particular, it is sometimes better to show the “old” UI while the new UI is being prepared. You can use the new startTransition API to make React do this:
```
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```
- Here, you tell React that setting tab to 'comments' is not an urgent update, but is a transition that may take some time. React will then keep the old UI in place and interactive, and will switch to showing <Comments /> when it is ready. 
### Route-based code splitting
```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```
### Default exports vs Named exports
```
import Button from './button.js'; // default export
or
import Banana from './button.js' // default export

import { Button } from './button.js'; // Named export

// Creating an alias is allowed in both default and named
import { Module : mod } from './someModule.js'
mod.someProperty();
```
A file can have not more than one default export, but it can have as many named exports as you like

### Named Exports
- React.lazy currently only supports default exports.
- If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default.
- This ensures that tree shaking keeps working and that you don’t pull in unused components.
```
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

## Error Boundaries
- In the past, JavaScript errors inside components used to corrupt React’s internal state and cause it to emit cryptic errors on next renders.
- These errors were always caused by an earlier error in the application code, but React did not provide a way to handle them gracefully in components, and could not recover from them.
- A JavaScript error in a part of the UI shouldn’t break the whole app. To solve this problem for React users, React 16 introduces a new concept of an “error boundary”.
- Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
- Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
- Error boundaries do not catch errors for:
    - Event handlers
    - Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
    - Server side rendering
    - Errors thrown in the error boundary itself (rather than its children)
- A class component becomes an error boundary if it defines either (or both) of the lifecycle methods 
    -   `static getDerivedStateFromError()` or: to render a fallback UI after an error has been thrown
    -   `componentDidCatch()`: to log error information.
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
// Then you can use it as a regular component:

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
- Error boundaries work like a JavaScript catch {} block, but for components.
- Only class components can be error boundaries.
- In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.
### try/ catch
- try / catch is great but it only works for imperative code:
```
try {
  showButton();
} catch (error) {
  // ...
}
```
However, React components are declarative and specify what should be rendered:
```
<Button />
```
- Error boundaries preserve the declarative nature of React, and behave as you would expect.
- For example, even if an error occurs in a componentDidUpdate method caused by a setState somewhere deep in the tree, it will still correctly propagate to the closest error boundary.
- Error boundaries do not catch errors inside event handlers.
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <button onClick={this.handleClick}>Click Me</button>
  }
}
```
## Portals

## Single Responsibility principle
 Employee class => calculatePay      >  Payroll team  
                    claculateHours   >  HR Department
                    save             >Employee Server > Database administration

Better to have a separate class for each method

## Open for extension, closed for modification
Software entities (classes, modules, functions, and so on) should be open for extension, but closed for modification

## The Interface Segregation Principle
Suppose if you enter a restaurant and you are pure vegetarian. The waiter in that restaurant gave you the menu card which includes vegetarian items, non-vegetarian items, drinks, and sweets. In this case, as a customer, you should have a menu card which includes only vegetarian items, not everything which you don’t eat in your food.

Here the menu should be different for different types of customers. The common or general menu card for everyone can be divided into multiple cards instead of just one. Using this principle helps in reducing the side effects and frequency of required changes.

## The Dependency Inversion Principle
the most flexible systems are those in which source code dependencies refer only to abstractions, not to concretions. Rather, details should depend on policies.

consider the real-life example of a TV remote battery. Your remote needs a battery but it’s not dependent on the battery brand. You can use any XYZ brand that you want and it will work. So we can say that the TV remote is loosely coupled with the brand name. Dependency Inversion makes your code more reusable.



## React Design Patterns

## Node JS
- Before Nodejs Javascript is only Used for Scripting language as run inside our browser,every browser out there as we called javascript engine,It takes javascript code converse into machine code , Below listed example JS Engine used in browsers,

MicrosoftEdge — chakra JS Engine
Mozila — SpiderMonkey JsEngine
Chrome — V8 JS Engine
- these variety of JS engine used in different browsers thats why Javascript is behave differently one from another in browser
- JS engine provide runtime enviroment for Javascript Code
- Until 2009 the only way to execute javascript is an inside browsers
- In 2009 Ryan dhal came up with an idea to excecute javascript out of browser. So, he took V8 engine which is the best JS Engine Out there and better it, inside V8 Engine C++ program called Node.exe,
- Similar to a browser, Node is an Runtime Environment for Javascript code
- In essence, Node is a Program that includes V8 Js Engine ,and have some additional modules that gives the capability which is not available in browsers like we can work with FileSystem,Network
```
FS.ReadFile() -->Working with an FileSystem
http.createServer() ---> Listening for Request
```



















  

Approve collection,
Publish collection
designs under a collection
Approve designs(Bulk)
Publish designs(Bulk)
upload custom designs
creating a collection without product type
Sugar previews
pagination for collections n designs
Sonar bugs
Sunset/ Discontinue a design
Show review page after upload
feature flags
showing appropriate errors in the process of generating sugar previews
taking interviews
Upskilling

products(incompatible)(all)
products(incompatible)

- Introduced Reduxjs/toolkit to reduce the complexity in managing the state
- Always ready to assist the peers
- Taking adhoc requests proactively and working on it by putting in an extra hours



- The client is content with the features we deliver.


- Mastered Reduxjs/ toolkit and other advanced concepts in ReactJs and Javascript
- Introduced the state management library to simplify the state changes

- No escalations
- Delivering the committed stories without any spill-overs
- Improved the productivity by incorporating a few proven design patterns like DRY, singleton etc.,


- Always make sure 100% of unit test coverage for the components I developed
- Adhere to the coding standards like using latest ES6 features, reusable modules
- Using linting tools for a better productivity


- Working on the JIRA bugs as per the priority
- I fixed 25% of SonarQube bugs
- I always make sure the code to be deployed doesn't produce any security related issues 


- Reducing the code duplication and complexity in order to resolve SonarQube issues
- Adding necessary type checks.
- Identified that SonarQube version we're using is not the latest one and it lack a few things

- Reduced the page load time by refactoring the components and the way we pass the props


- Always available. It could be weekend/ odd-hours/ holiday except a couple of times in the weekend
- Resolving the issue or analyzing the root cause ASAP



- Implemented Approve, Publish for collections and designs at both individual and bulk levels
- Implemented rendering of Sugar previews on the matched product variants
- Indicating the user what happened exactly in case of any exception
- Have a good rapport with the team
- I can easily express my concerns or suggestions with the team
- I have a good team collaboration skills



- Given upskilling session
- Actively assessing the candidates for the recruitment
- Effective communication with the team



- Actively checking Sonarqube for the reported issues and solving
- Actively monitors my PR build until it is done
- Maintaining or improving the test coverage before commit
- Resolving the bugs from the backlog 


- Implemented Approve, Publish for collections and designs at both individual and bulk levels
- Implemented rendering of Sugar previews on the matched product variants
- Indicating the user what happened exactly in case of any exception
- Have a good rapport with the team
- I can easily express my concerns or suggestions with the team
- I have a good team collaboration skills


- Contributing to the organization by taking interviews and upskilling session
- Following the coding standards, a proven solutions
- Keeping track of SonarQube, JIRA issues and fixing
- I can effectively communicate with the team
- I keep up-skilling myself on a wide range of topics
