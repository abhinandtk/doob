import React from 'react'
import {Button} from 'react-bootstrap';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';
import { useState } from 'react';
function ProductDetailInfo({product}) {
    // console.log('iuiiuiuuuuuuuuuuu65788343',product.Product_Items[0].multivarient[0].slug_id)
    console.log('iuiiuiuuuuuuuuuuu65788343',product)

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

    const addToCartHandler=(slug)=>{
        console.log("erer",slug)
        Axios.post(apis.addtocart,{
            product_var_slug:slug,
            quantity:quantity
        },
        {
            headers:{
                'Authorization':`Token ${constants.token_id}`,
            }
        }).then((res)=>{
            console.log('res',res)
        })

    }
  return (
        <div className="col-md-5 ">
            <div className=" justify-content-between align-items-center " >
                <span className='float' >
                    <svg width="18" height="17" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 18C9.5 18 0 12.3609 0 5.59388C0 -1.17312 7.38889 -1.73704 9.5 3.55748C11.6111 -1.73704 19 -1.17312 19 5.59388C19 12.3609 9.5 18 9.5 18Z" fill="black"/>
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.58936 11.41L12.6278 7.37158" stroke="black" stroke-width="0.814796" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.69367 8.55832C2.02124 8.2221 2.10272 7.23757 2.82127 7.01648L15.9955 2.96286C16.6349 2.76612 17.2338 3.36502 17.0371 4.00441L12.9835 17.1787C12.7624 17.8972 11.7778 17.9787 11.4416 17.3063L8.64987 11.7228C8.56923 11.5615 8.43846 11.4307 8.27719 11.3501L2.69367 8.55832Z" stroke="black" stroke-width="0.814796" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3735 14.9998C10.3735 14.5396 10.7629 14.1665 11.2431 14.1665C11.7233 14.1665 12.1127 14.5396 12.1127 14.9998C12.1127 15.4601 11.7233 15.8332 11.2431 15.8332C10.7629 15.8332 10.3735 15.4601 10.3735 14.9998Z" stroke="black" stroke-width="0.814796" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.3735 10.0003C10.3735 9.54009 10.7629 9.16699 11.2431 9.16699C11.7233 9.16699 12.1127 9.54009 12.1127 10.0003C12.1127 10.4606 11.7233 10.8337 11.2431 10.8337C10.7629 10.8337 10.3735 10.4606 10.3735 10.0003Z" stroke="black" stroke-width="0.814796" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.3735 4.99984C10.3735 4.5396 10.7629 4.1665 11.2431 4.1665C11.7233 4.1665 12.1127 4.5396 12.1127 4.99984C12.1127 5.46007 11.7233 5.83317 11.2431 5.83317C10.7629 5.83317 10.3735 5.46007 10.3735 4.99984Z" stroke="black" stroke-width="0.814796" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <h5 className='col-md-9'  >{product.Name}</h5> 
                <p className='mx-1'><i className="bi bi-star-fill"style={{color:'yellow'}}></i>4.5 <span style={{color:'grey'}}>(203 reviews)</span></p>
                <p style={{fontSize:'14px',fontWeight:'400'}} >{product.Description} </p>
            
                <h6 >Color<br>
                </br><i className="bi bi-circle-fill" style={{color:'#ED4B4B'}}></i><span><i className="bi bi-circle-fill mx-2" style={{color:'purple'}}></i><i className="bi bi-circle-fill " style={{color:'violet'}}></i></span></h6>
            
                <h6>Choose size</h6>
                <div className="btn-group  " role="group" aria-label="Second group">
                    <button type="button" className="btn btn-secondary" >34</button>
                </div>
                <div className="btn-group " role="group" aria-label="Second group">
                    <button type="button" className="btn btn-outline-secondary">35</button>
                </div>
                <div className="btn-group " role="group" aria-label="Second group">
                    <button type="button" className="btn btn-secondary" >34</button>
                </div>
                <div className="btn-group " role="group" aria-label="Second group">
                    <button type="button" className="btn btn-outline-secondary">35</button>
                </div> 
                <br></br>
                <p style={{color:'gray',fontWeight:'400'}}><s>15.000 KD</s><span className='mx-2' style={{fontSize:'20px',fontWeight:'500',color:'#17a803'}}>13.000 KD</span><span></span></p>
                <div className="qty">
                    <div onClick={(e)=>handleDecreaseQty(e)} className="minus " style={{backgroundColor:'#aba4a4'}}>-</div>
                    <input type="number" className="count" name="qty" value={quantity} disabled/>
                    <div onClick={(e)=>handleIncreaseQty(e)} className="plus" style={{backgroundColor:'#aba4a4'}}>+</div>
                </div>
        
                <Button 
                type="submit" 
                onClick={()=>addToCartHandler(product.Product_Items[0].multivarient[0].slug_id)}
                className='add-cart-btn '> Add to Cart  </Button>

            </div>  
        </div>
  )
}

export default ProductDetailInfo