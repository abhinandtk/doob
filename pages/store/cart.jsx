import MobileHeader from '@/components/MobileHeader'
import MainHeader from '@/components/shared/headers/MainHeader'
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed'
import CheckoutSideSection from '@/components/stores/cart/CheckoutSideSection'
import OrderList from '@/components/stores/cart/OrderList'
import ShippingAddress from '@/components/stores/cart/ShippingAddress'
import React from 'react'
import { Fragment } from 'react'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import { useState } from 'react'
import { useEffect } from 'react'

function CartPage() {

  const [cartDetails,setCartDetails]=useState([])
  const [cartProducts,setCartProducts]=useState([])

  useEffect(()=>{
    Axios.post(apis.viewcart,null,{
      headers:{
        'Authorization':`Token ${constants.token_id}`,
      }
    }).then((res)=>{
      setCartDetails(res.data.data)
      setCartProducts(res.data.data.products)
      console.log('rtttrtrtt',res,res.data.products)
    })
  })

  return (
    <Fragment>
        <MainHeader title='Doob'/>
        <MobileHeader />
        <MainSidebarFixed />
        <div className="store-container h-100">
        <section className="h-100 my-3 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <h5 fw-bold>My Cart</h5>
              <div className="row">
                <div className="col-lg-7">
                  <ShippingAddress />
                  <OrderList product={cartProducts}/>
                </div>
                <CheckoutSideSection data={cartDetails}/>
              </div>
            </div>
          </div>
        </section>  
      </div>
    </Fragment>
  )
}

export default CartPage