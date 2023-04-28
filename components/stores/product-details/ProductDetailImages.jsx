import React from 'react'

function ProductDetailImages() {
  return (
    <div className="col-lg-7">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
            <img src='../../images/store/shoe background.jpg' style={{width:'450px',height:'auto'}}></img>
            </div>
        </div>
        <div className="col-lg-8">                
            <div className='row colors '>
                <div className='col-md-2  '>
                    <img src='../../images/store/red.png'style={{width:'50px',height:'50px'}} ></img>
                </div>
                <div className='col-md-2'>
                    <img src='../../images/store/purple.png' style={{width:'50px',height:'50px'}} ></img>
                </div>
                <div className='col-md-2 '>
                    <img src='../../images/store/violet.png' style={{width:'50px',height:'50px'}}></img>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default ProductDetailImages