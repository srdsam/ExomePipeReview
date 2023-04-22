const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const db = require('./queries')
const basicAuth = require('./helpers/basic-auth');
const errorHandler = require('./helpers/error-handler');

const app = express()
const port = 8002

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

// Defines CORS policy
app.use(cors());
// Ensures basic auth is used by the app
app.use(basicAuth);
app.use(errorHandler);

// Responsible for authenticating users
app.use('/users', require('./users/user.controller'));


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

/* API Routes
If proband is required, query params must include id : proband
*/
app.get('/proband', db.getProbands)
app.get('/proband/id', db.getProbandById)
app.get('/proband/pheno', db.getPheno)
app.get('/proband/genes', db.getGenes)

app.post('/proband/create', db.createProband)
app.delete('/proband/del', db.deleteProband)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
