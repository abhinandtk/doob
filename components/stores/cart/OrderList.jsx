import React from 'react'
import { Fragment } from 'react'

function OrderList() {
  return (
    <Fragment>
        <h5 style={{fontSize:'17px'}}>Order List<span className='view' >Total 3 items</span></h5>
                
               
                <div className="card mb-2 " >
                   <div className="card-body">
                     <div className="d-flex justify-content-between ">
                       <div className="d-flex flex-row align-items-center  " >
                         <div >
                         <img src='../images/store/male-soccer-football-player-training-action-isolated-gradient-studio-neon-light copy.jpg' className='pixels-png' ></img>
                         </div>
                         <div className=" add-left">
                           <h6 >LEGEND 9 CLUB TF Football Shoes  </h6>
                           <p className='address-card-price'>26.000 KD</p>
                         </div>
                       </div>
                       <div className="trash " > 
                         <div >
                         <span><img src='../images/store/trash.png'></img></span>
                         </div>
                         
                       </div>
                       
                     </div>
                         <div className="qty1">
                     <div  className="plus ">+</div>
                         <input type="number" className="count" name="qty1" value="1"/>
                         <div className="minus " >-</div>
                     </div> 
                
                   </div>
                   
                 </div>
                   
                <div className="card mb-2 " >
                   <div className="card-body">
                     <div className="d-flex justify-content-between ">
                       <div className="d-flex flex-row align-items-center ">
                         <div >
                        <img src='../images/store/male-soccer-football-player-training-action-isolated-gradient-studio-neon-light copy.jpg' className='pixels-png' ></img>
                         </div>
                         <div className=" add-left">
                           <h6 >LEGEND 9 CLUB TF Football Shoes  </h6>
                           <p className='address-card-price'>26.000 KD</p>
                         </div>
                       </div>
                       <div className="trash " > 
                         <div >
                         <span><img src='../images/store/trash.png'></img></span>
                         </div>
                         
                       </div>
                       
                     </div>
                         <div className="qty1">
                     <div  className="plus ">+</div>
                         <input type="number" className="count" name="qty1" value="1"/>
                         <div className="minus " >-</div>
                     </div> 
                
                   </div>
                   
                 </div>
                  
                <div className="card mb-2 " >
                   <div className="card-body">
                     <div className="d-flex justify-content-between ">
                       <div className="d-flex flex-row align-items-center ">
                         <div >
                         <img src='../images/store/male-soccer-football-player-training-action-isolated-gradient-studio-neon-light copy.jpg' className='pixels-png' ></img>
                         </div>
                         <div className=" add-left">
                           <h6 >LEGEND 9 CLUB TF Football Shoes iiiiiiiiiiiiiiiiiiiiii ooooooooo </h6>
                           <p className='address-card-price'>26.000 KD</p>
                         </div>
                       </div>
                       <div className="trash " > 
                         <div >
                         <span><img src='../images/store/trash.png'></img></span>
                         </div>
                         
                       </div>
                       
                     </div>
                         <div className="qty1">
                     <div  className="plus ">+</div>
                         <input type="number" className="count" name="qty1" value="1"/>
                         <div className="minus " >-</div>
                     </div> 
                
                   </div>
                   
                 </div>
    </Fragment>
  )
}

export default OrderList