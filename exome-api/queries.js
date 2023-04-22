const Pool = require('pg').Pool
/* For Local */
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'sample_db',
  password: 'password',
  port: 5432,
}) 

/* For Haggis 
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'sample_db',
  password: 'password',
  port: 5492,
})*/

// Retrieves all probands present in database
const getProbands = (request, response) => {

    pool.query('SELECT proband FROM probands;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// Retrieves all genes for specified proband
const getGenes = (request, response) => {
  const id =  JSON.stringify(request.query.id)
  const cleanId = id.substring(1, id.length-1)

    pool.query("SELECT (jsonb_array_elements(data)::jsonb)->'geneSymbol' AS text FROM probands WHERE proband = $1;", [cleanId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// Retrieves the phenotype of a specified proband
const getPheno = (request, response) => {
    const id =  JSON.stringify(request.query.id)
    const cleanId = id.substring(1, id.length-1)

    pool.query("SELECT (jsonb_array_elements(data -> 0 -> 'priorityResults' -> 'HIPHIVE_PRIORITY' -> 'queryPhenotypeTerms')::jsonb)->'label' AS text FROM probands WHERE proband = $1;"
    , [cleanId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// Retrieves all data for a specified proband
const getProbandById = (request, response) => {
    const id = JSON.stringify(request.query.id)
    const cleanId = id.substring(1, id.length-1)

    pool.query("SELECT data FROM probands WHERE proband = $1;", [cleanId], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

// Creates a new proband using valued specified in the request body
const createProband = (request, response) => {
    const { proband, data } = request.body
  
    pool.query('INSERT INTO probands VALUES ($1, $2)', [proband, data], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Proband added with ID: ${result.insertId}`)
    })
  }

// Deletes a specified proband from the database 
const deleteProband = (request, response) => {
    const id = parseInt(request.query.id)
    const cleanId = id.substring(1, id.length-1)

    pool.query("DELETE FROM probands WHERE data->'proband' = $1", [cleanId], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`Proband deleted with ID: ${id}`)
    })
}

module.exports = {
    getProbands,
    getProbandById,
    createProband,
    deleteProband,
    getPheno,
    getGenes
  }