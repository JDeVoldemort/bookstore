const express = require('express');
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
