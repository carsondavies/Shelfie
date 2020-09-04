import React, { Component } from 'react'
import axios from 'axios'

export default class Form extends Component {
  constructor(props) {
    super()
    this.state = {
      id: this.props.currentProduct.id,
      name: '',
      price: 0,
      imgurl: ''
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevProps != this.props.currentProduct) {
      this.setState({
        name: this.props.currentProduct.name,
        price: this.props.currentProduct.price,
        imgurl: this.props.currentProduct.img
      })
    }


    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleDelete() {
      this.setState({
        name: '',
        price: 0,
        imgurl: ''
      })
    }

    addToInventory(name, price, imgurl) {
      axios.post('/api/inventory', { name, price, img: imgurl }).then(res => {
        this.setState({
          name: res.data.name,
          price: res.data.price,
          imgurl: res.data.img
        })
        this.props.updateInventory()
        this.handleClick()
      })
    }

    render() {
      return (
        <div>
          <input name='imgurl' className='new-product-input' onChange={(e) => this.handleChange(e)}></input>
          <input name='name' className='new-product-input' onChange={(e) => this.handleChange(e)}></input>
          <input name='price' className='new-product-input' onChange={(e) => this.handleChange(e)}></input>
          <div>
            <button className='cancel-button' onClick={() => this.handleDelete}>Cancel</button>
            <button className='add-to-inventory' onClick={() => this.addToInventory}>Add to inventory</button>
          </div>
        </div>
      )
    }
  }