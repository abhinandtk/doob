import React from 'react'
import { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'

function CheckoutSideSection({data}) {
  const checkoutHandler=()=>{
    console.log('jjjjjjjjjjjjjj')
    Axios.post(apis.checkout,{
      payment_mode:'Both'
    },
    {
      headers:{
        'Authorization':`Token ${constants.token_id}`,
      }
    }).then((res)=>{
      console.log('checkoutooooooooooooooooooooooo',res)
    })
  }

  return (
    <Fragment>
        <div className="col-lg-5">
                <div className="card bg-white   " style={{width:'397px',marginTop:'55px'}}>
                  <div className="card-body p-4 ">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Sub total({data.cart_items} items)</p>
                      <p className="mb-2" style={{fontWeight:'600'}}>{data.cart_total} KD</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Delivery Charge</p>
                      <p className="mb-2" style={{fontWeight:'600'}}>{data.shipping_fee} KD</p>
                    </div>
                    <hr className='hr'></hr>
                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-2" style={{fontWeight:'700'}}>Total Price</p>
                      <p className="mb-2" style={{fontWeight:'600'}}>{data.total_price} KD</p>
                    </div>
                    <Button onClick={checkoutHandler} type="submit" className='cart-btn ' > Check out </Button>
                  </div>
                </div>
              </div>
    </Fragment>
  )
}

export default CheckoutSideSection