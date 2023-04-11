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




