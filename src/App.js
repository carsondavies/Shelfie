import React, { Component } from 'react';
import './App.css'
import axios from 'axios'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import Dashboard from './components/Dashboard/Dashboard'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inventory: [],
      currentProduct: {}
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
        currentProduct: res.data
      })
    })
  }


  render() {
    return (
      <div>
        < Header />
        < Form updateInventory={this.componentDidMount} currentProduct={this.state.currentProduct} />
        < Dashboard inventory={this.state.inventory} updateInventory={this.componentDidMount} setCurrentProduct={this.setCurrentProduct} />
      </div>
    )
  }
}
