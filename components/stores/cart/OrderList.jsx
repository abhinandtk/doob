import constants from '@/public/data/my-constants/Constants'
import React, { useState } from 'react'
import { Fragment } from 'react'

function OrderList({product}) {
  console.log('rrrrrrrrrrrrrrrrrrr',product)
  const [quantity,setQuantity]=useState(1)

  const handleIncreaseQty=(e)=>{
    e.preventDefault()
    setQuantity(quantity + 1)
  }
  const handleDecreaseQty=(e)=>{
    e.preventDefault()
    if (quantity > 1){
      setQuantity(quantity - 1)
    }
  }
  return (
    <Fragment>
        <h5 style={{fontSize:'17px'}}>Order List<span className='view' >Total 3 items</span></h5>
                
        {product.map((item,index)=>(
          <div key={index} className="card mb-2 " >
          <div className="card-body">
            <div className="d-flex justify-content-between ">
              <div className="d-flex flex-row align-items-center ">
                <div >
                <img src={`${constants.port}${item.Thumbnail_image}`} className='pixels-png' ></img>
                </div>
                <div className=" add-left">
                  <h6 >{item.Name}  </h6>
                  <p className='address-card-price'>{item.cut_prize}</p>
                </div>
              </div>
              <div className="trash " > 
                <div >
                <span><img src='../images/store/trash.png'></img></span>
                </div>
                
              </div>
              
            </div>
                <div className="qty1">
                  <div  onClick={(e)=>handleIncreaseQty(e)} className="plus ">+</div>
                  <input type="number" className="count" name="qty1" value={quantity} disabled/>
                  <div onClick={(e)=>handleDecreaseQty(e)} className="minus " >-</div>
            </div> 
        
          </div>
          
        </div>
              ))}
          
    </Fragment>
  )
}

export default OrderList