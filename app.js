const express = require('express');
const { auth } = require('express-openid-connect');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

const mongodb = require('./db/connect');

// const professionalRoutes = require('./routes/professional');
// const port : string | 8080 = process.env.PORT || 8080;
const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//const graphqlHTTP = require('express-graphql');
//const schema = require('./schema/schema');

//const app = express();

//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     //directing express-graphql to use this schema to map out the graph
//     schema,
//     //directing express-graphql to use graphiql when goto '/graphql' address in the browser
//     //which provides an interface to make GraphQl queries
//     graphiql: true
//   })
// );


// app
// .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json())
// .use(cors())
// .use(express.json())
// .use(express.urlencoded({ extended: true }))
// .use('/', require('./routes'));
// https://cse341-contacts-frontend.netlify.app/
app.use((req, res, next) => {
 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  // res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

.use('/', require( './routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });
