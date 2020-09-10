import React, { Component } from 'react';
import './App.css'
import './reset.css'
import axios from 'axios'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import Dashboard from './components/Dashboard/Dashboard'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inventory: [],
      currentProduct: {},
      editing: false
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.setCurrentProduct = this.setCurrentProduct.bind(this)
  }

  componentDidMount() {
    axios.get('/api/inventory').then(res => {
      this.setState({
        inventory: res.data
      })
    })
  }

  setCurrentProduct(id) {
    axios.get(`/api/inventory/${id}`).then(res => {
      this.setState({
        currentProduct: res.data[0],
        editing: true
      })
      console.log(this.state.currentProduct)
    })
  }


  render() {
    return (
      <div className='app'>
        < Header />
        < Form
          updateInventory={this.componentDidMount}
          currentProduct={this.state.currentProduct}
          editing={this.state.editing}
          inventory={this.state.inventory} />
        < Dashboard
          inventory={this.state.inventory}
          updateInventory={this.componentDidMount}
          setCurrentProduct={this.setCurrentProduct} />
      </div>
    )
  }
}
