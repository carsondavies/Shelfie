module.exports = {
  createNewProduct: (req, res) => {
    const dbInstance = req.app.get('db')
    const { name, price, img } = req.body

    dbInstance.create_product([name, price, img])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "that didn't work" })
        console.log(err)
      })

  },

  updateProduct: (req, res) => {
    const dbInstance = req.app.get('db')
    const { id } = req.params
    const { name, price, img } = req.body

    dbInstance.update_product([id, name, price, img])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "that didn't work" })
        console.log(err)
      })
  },

  getOneProduct: (req, res) => {
    const dbInstance = req.app.get('db')
    const { id } = req.params

    dbInstance.get_product(id)
      .then(product => res.status(200).send(product))
      .catch(err => {
        res.status(500).send({ errorMessage: "that didn't work" })
        console.log(err)
      })
  },

  getInventoryList: (req, res) => {
    const dbInstance = req.app.get('db')

    dbInstance.get_inventory()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({ errorMessage: "that didn't work" })
        console.log(err)
      })
  },

  deleteProduct: (req, res) => {
    const dbInstance = req.app.get('db')
    const { id } = req.params

    dbInstance.delete_product(id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "that didn't work" })
        console.log(err)
      })
  }
}