# SAKA-MOTORS
My Final Year Project based on MERN Stack

**How To Use!!**

**ES Modules in Node**

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like
**
Env Variables**
Create a .env file in then root and add the following

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
Install Dependencies (frontend & backend)
npm install
cd frontend
npm install
Run
# Run frontend (:3000) & backend (:5000)

npm run dev

# Run backend only

npm run server

**Build & Deploy**
# Create frontend prod build

cd frontend
npm run build
