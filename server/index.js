const express = require('express')
const app = express()
const controller = require('./controller')
const massive = require('massive')
require('dotenv').config()

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

app.get('/api/inventory', controller.getInventoryList)
app.post('/api/inventory', controller.createNewProduct)
app.delete('/api/inventory/:id', controller.deleteProduct)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB READY')
  app.listen(SERVER_PORT, () => console.log(`I AM LISTENING ON ${SERVER_PORT}`))
})
  .catch(err => console.log(err))
