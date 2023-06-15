import React from 'react'
import { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import { notification } from 'antd'
import { Labels } from '@/public/data/my-constants/Labels'
import { Router, useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toggle } from '@/Redux/updateNavbar'

function CheckoutSideSection({data}) {

  const dispatch=useDispatch()


  const labels = Labels()
  const router =useRouter()
  const checkoutHandler=()=>{
    console.log('jjjjjjjjjjjjjj')
    Axios.post(apis.checkout,{
      payment_mode:'Online'
    },
    {
      headers:{
        'Authorization':`Token ${constants.token_id}`,
      }
    }).then((res)=>{
      dispatch(toggle())
      if(res.data.status==1){
        notification.success({
          message:constants.Success,
          description:`${labels['Order successfull']}`
        })
        router.push('/store/order-success')
      }else{
        notification.error({
          message:constants.Error,
          description:res.data.message_en,
        })

      }
      console.log('checkoutooooooooooooooooooooooo',res)
    })
  }

  return (
    <Fragment>
        <div className="col-lg-5">
                <div className="card shipping  ">
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