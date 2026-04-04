//connect to postgres
require('dotenv').config()
const POOL = require('pg').Pool

const pool = new POOL({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getLinks = (request, response) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
    if (error) throw error
    response.status(200).json(results.rows) 
  })
}

const createLink = (request, response) => {
  const { name, URL } = request.body
  pool.query(
    'INSERT INTO links(name, url) VALUES ($1, $2) RETURNING id',
    [name, URL],
    (error, results) => {
      if (error) throw error
      response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    }
  )
}

const updateLink = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, URL } = request.body
  pool.query(
    'UPDATE links SET name = $1, url = $2 WHERE id = $3',
    [name, URL, id],
    (error) => {
      if (error) throw error
      response.status(200).send(`Link updated with ID: ${id}`)
    }
  )
}

const deleteLink = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM links WHERE id = $1', [id], (error) => {
    if (error) throw error
    response.status(200).send(`Link deleted with ID: ${id}`)
  })
}

module.exports = { getLinks, createLink, updateLink, deleteLink }