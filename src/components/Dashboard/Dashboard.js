import React, { Component } from 'react'
import Product from '../Product/Product'
import axios from 'axios'


export default class Dashboard extends Component {
  constructor() {
    super()

  }

  deleteProduct(id) {
    axios.delete(`/api/inventory/${id}`).then(res => {
      this.props.updateInventory()
    })
  }

  render() {
    return (
      <div>{this.props.inventory.map(element => {
        return <Product key={element.id} data={element} deleteProduct={this.deleteProduct} setCurrentProduct={this.props.setCurrentProduct} />
      })}</div>
    )
  }
}

