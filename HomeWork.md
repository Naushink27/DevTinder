- Created a Repo
- Initailize the repo by npm init.
- node_modules:is a directory that stores external dependencies for a Node.js project.
- External dependencies: The node_modules folder contains all the external libraries and packages that a project needs to function. 
- Nested dependencies: It also stores any nested dependencies of the packages that are installed.  
- Difference b/w the Package.json and package-lock.json:
  -package.json:defines what packages you need and their version ranges.
  -package-lock.json:ensures which exact versions of those packages get installed.
- what is ^ and ~:
  -caret(^):Do not modify the leftmost digit i.e, it will update to newer minor and patch changes.c
  -Tilde(~): it will update to newer patch versions but not minor or major versions.
- Created a server.
- Created Different Routes.
- Used nodemon.
- Order of routes matter alot. 
- Introduction to POSTMAN:
- Practiced API methode: GET,POST,PATCH,DELETE,PUT.
- Practiced +,(),*,and ? in API.
- Practiced regex in API.
- req.query and req.params
- Multiple Route handlers.
- next()
- Next and error along with res.send().
- What is middleware: Middleware is a request handler that allows you to intercept and manipulate requests and    
  responses before they reach route handlers. They are the functions that are invoked by the Express.js routing layer.
- Diff b/w app.use and app.all
- write a dummy auth middleware for admin, user except login.
- Error Handling
- Created free cluster on MongoDB.
- Installed Mongoose and then connected to the cluster.
- Connected to the DB before starting the server.
- Created User Schema & user Model.
- Created new instamce of the User model.
- Push Some documents using API calls from postman.
- Error Handling using try and catch.

- Difference b/w Json Object and JS object.
  - JSON: Text-based format for data exchange
  - JavaScript Object: In-memory data structure in JavaScript.
-  Intro to Express.json(): It reads the incoming request body and converts it from a JSON string into a         JavaScript object.
- Get A user data by email.
- Feed API: get all the users. 
- Delete a user by ID.
- Updated user by ID.
- Updated user  by EmailID.
- Difference b/w PATCH and PUT: Put:Use PUT for full updates  Patch:Use PATCH for partial updates


- Explore schema type options from Documentation.
- add require , unique,lowercase,min,minlength,trim.
- Add default.
- Created custom validate function for gender.
- Added timestamps.
- Add API level validation on patch request and signup post api.
- Data Sanitization:Add API validation for each field in the schema.
- Used npm validator
- used isEmail, isStrongPassword,isAlpha for validations.
- Never trust the req.body.

- Created a helper function to validate data before creating the new instance of the USER model in signup API.
- Installed bcrypt package to encrypt the passwords.
- Encrypted the password before signup in post request and also before updating user data in patch request.
- Created a login API and check for the email if it exists or not .
- Then compare the entered email with user.email by using bcrypt.compare().

- Understood the JWT token concept refer diagram.
- once the user is successfully logged in , created a token and store that inside the cookie by using 
- req.cookie(token,"TOKEN").
- created a profile API , which checks for the Token by extracting all cookies. 
- for that we installed npm package , cookie-parser.
- Installed jsonwebtoken for generating real token when the user hits the login api.
- used jwt.sign({hiddenINFO(the ID of user),"Hidden Password"}).
- this token is stored in the cookie by res.cookie()
- in the profile API, we got this token from cookie and verify this token by jwt.verify({hiddenINFO(the ID of user),"Hidden Password"})
- Now from this decodedmsg we got the users ID , so from this id we can access that particular users data.

- We have created a userAuth and write inside profile and sendConnectionRequest API.
- ExpiresIn for the expiry of jwt .
- Mongoose method for JWT and password.

- Listed all the API we require for our application.
- Grouped api as authRouter, profileRouter, connectionRequestRouter.
- Created different modules for each group.
- used express.Router to create each router.
- and just pasted the API.
- Created logout API .
- Created profile edit API.
- created Update password API.


- Created connectionReques API.
- /request/send/:status/:toUserId.
- Added validations .
- model.pre() function runs everytime a instance of a model is created.
- created indexes using model.index.


- Created Request Review API.(request/review/status/requestId )
- Created review received requests that are pending.(user/connections/received)
- used ref and populate to connect to DB's.




