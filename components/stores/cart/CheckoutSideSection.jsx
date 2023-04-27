import React from 'react'
import { Fragment } from 'react'
import { Button } from 'react-bootstrap'

function CheckoutSideSection({data}) {
  return (
    <Fragment>
        <div className="col-lg-5">
                <div className="card bg-white   " style={{width:'397px'}}>
                  <div className="card-body p-4 ">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Sub total({data.cart_items} items)</p>
                      <p className="mb-2" style={{fontWeight:'600'}}>{data.cart_total}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Delivery Charge</p>
                      <p className="mb-2" style={{fontWeight:'600'}}>{data.shipping_fee}</p>
                    </div>
                    <hr className='hr'></hr>
                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-2" style={{fontWeight:'700'}}>Total Price</p>
                      <p className="mb-2" style={{fontWeight:'600'}}>{data.total_price}</p>
                    </div>
                    <Button type="submit" className='cart-btn ' > Check out  </Button>
                  </div>
                </div>
              </div>
    </Fragment>
  )
}

export default CheckoutSideSection