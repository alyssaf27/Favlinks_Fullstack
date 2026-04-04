const express = require('express')
const path = require('path')
const cors = require('cors')
const db = require('./queries')

const app = express()
const PORT = process.env.PORT || 9001

app.use(cors())  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('/links', db.getLinks)
app.post('/links', db.createLink)
app.put('/links/:id', db.updateLink)     
app.delete('/links/:id', db.deleteLink)   

app.get('/{*path}', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})