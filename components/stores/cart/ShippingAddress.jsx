import React, { Fragment } from 'react'

function ShippingAddress() {
  return (
    <Fragment>
    <p className='mt-3 ' >Shipping Address</p>
    <div className="card mb-2 " >
        <div className="card-body">
          <div className="d-flex justify-content-between ">
            <div className="d-flex flex-row align-items-center ">
              <div>
             <img src='../images/Location icon.png' className='me-4 mb-3' ></img>
              </div>
              <div className="ms-1 mt-3">
                <h6 >Home  </h6>
                <p className='address-card'>26,  Street 2,Naeem, Al Mutla City, 03200, Kuwait</p>
              </div>
            </div>
            <div  > 
              <div >
              <span><img src='../images/edit.png'></img></span>
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      </Fragment>
  )
}

export default ShippingAddress