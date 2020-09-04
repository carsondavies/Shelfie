import React, { Component } from 'react'

export default class Product extends Component {
  constructor(props) {
    super()

  }


  render(props) {
    return (
      <div className='product-box'>
        <div className='product-image'>
          {this.props.data.imgurl}
        </div>
        <div className='product-info' >
          {this.props.data.name}
          {this.props.data.price}
        </div>
        <div className='product-buttons'>
          <button onClick={this.props.deleteProduct}>Delete</button>
          <button onClick={this.props.setCurrentProduct}>Edit</button>
        </div>
      </div>
    )
  }
}