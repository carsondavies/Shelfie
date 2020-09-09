require('dotenv').config()
const express = require('express')
const massive = require('massive')
const controller = require('./controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env
const app = express()

app.use(express.json())

app.get('/api/inventory/:id', controller.getOneProduct)
app.get('/api/inventory', controller.getInventoryList)
app.post('/api/inventory', controller.createNewProduct)
app.delete('/api/inventory/:id', controller.deleteProduct)
app.put('/api/inventory/:id', controller.updateProduct)

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
