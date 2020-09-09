import React, { Component } from 'react'

export default class Product extends Component {
  constructor(props) {
    super()

  }


  render() {
    // console.log(this.props.data)
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
          <button onClick={() => this.props.deleteProduct(this.props.data.id)}>Delete</button>
          <button onClick={() => this.props.setCurrentProduct(this.props.data.id)}>Edit</button>
        </div>
      </div>
    )
  }
}

    //   <div>
    //     {this.props.data.imgurl}
    //     {this.props.data.name}
    //     {this.props.data.price}
    //     <button className='edit-button' onClick={this.props.setCurrentProduct}>Edit</button>
    //     <button className='delete=button' onClick={this.props.deleteProduct}>Delete</button>
    //   </div>
    // )