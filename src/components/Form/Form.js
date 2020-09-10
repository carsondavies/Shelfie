import React, { Component } from 'react'
import axios from 'axios'
// import express from 'express'

export default class Form extends Component {
  constructor(props) {
    super()
    this.state = {
      id: props.currentProduct.id,
      name: '',
      price: 0,
      imgurl: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.addToInventory = this.addToInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editProduct = this.editProduct.bind(this)
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps)
    // console.log(this.props.currentProduct)
    if (prevProps.currentProduct !== this.props.currentProduct && this.props.editing === true) {
      this.setState({
        name: this.props.currentProduct.name,
        price: this.props.currentProduct.price,
        imgurl: this.props.currentProduct.img
      })
      console.log(this.state)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDelete(e) {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = ""))
    this.setState({
      name: '',
      price: 0,
      imgurl: ''
    })
  }

  addToInventory(e) {
    const { name, price, imgurl } = this.state
    axios.post('/api/inventory', { name, price, img: imgurl }).then(res => {
      this.setState({
        name: name,
        price: price,
        imgurl: imgurl
      })
      this.props.updateInventory()
      this.handleDelete()
      console.log(this.props.inventory)
    })
      .catch(err => console.log(err))
  }

  editProduct() {
    const { name, price, imgurl } = this.state
    const { id } = this.props.currentProduct
    axios.put(`/api/inventory/${id}`, { name, price, img: imgurl }).then(res => {
      this.setState({
        id: this.props.currentProduct.id,
        name: name,
        price: price,
        imgurl: imgurl
      })
      this.props.updateInventory()
    })
    console.log(this.props.currentProduct)
    console.log(this.state)
  }

  render() {
    console.log(this.props)
    return (
      <div className='form'>
        <div>
          <input placeholder='image url' name='imgurl' value={this.state.imgurl} className='new-product-input' onChange={this.handleChange}></input>
          <input placeholder='name of product' name='name' value={this.state.name} className='new-product-input' onChange={this.handleChange}></input>
          <input placeholder='price' name='price' value={this.state.price} className='new-product-input' onChange={this.handleChange}></input>
        </div>
        <div>
          <button className='cancel-button' onClick={() => this.handleDelete()}>Cancel</button>
          {this.props.editing
            ? <button className='save-changes' onClick={() => this.editProduct()}>Save changes</button>
            : <button className='add-to-inventory' type='submit' value="Add to inventory" onClick={() => this.addToInventory()}>Add to inventory</button>
          }
        </div>
      </div>
    )
  }
}