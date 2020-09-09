import React, { Component } from 'react'
import Product from '../Product/Product'
import axios from 'axios'


export default class Dashboard extends Component {
  constructor() {
    super()
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  deleteProduct(id) {
    axios.delete(`/api/inventory/${id}`).then(res => {
      this.props.updateInventory()
    })
      .catch(err => console.log(err))
    console.log("DELETE HIT")
  }

  render() {
    return (
      <div>{this.props.inventory.map(element => {
        return <Product key={element.id} data={element} deleteProduct={this.deleteProduct} setCurrentProduct={this.props.setCurrentProduct} />
      })}</div>
    )
  }
}

