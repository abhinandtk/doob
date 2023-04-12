import constants from '@/public/data/my-constants/Constants'
import React from 'react'

function Stores({storeData}) {
  return (
    // <section className='rot-container'>
    //     <div className='row store'>
    //         <h5>Store</h5>
    //         {storeData.map((item,index)=>(

    //         <div className='col-md-2'>
    //             <img src={`${constants.port}${item.logo}`}  style={{width:'100%'}}></img>
    //         </div>
    //         ))}
            
    //     </div>
    // </section>
   
    <div className='row store'>
      <h5 className='mx-2'>Store</h5>
      <div className='col-lg-3 col-md-4'>
  <img src='../images/s1.png'  style={{width:'100%'}} ></img>
      </div>
      <div className='col-lg-3 col-md-4'>
      <img src='../images/s1.png' style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
        <img src='../images/s1.png'  style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
        <img src='../images/s1.png' style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
        <img src='../images/s1.png' style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
  <img src='../images/s1.png'  style={{width:'100%'}} ></img>
      </div>
      <div className='col-lg-3 col-md-4'>
      <img src='../images/s1.png' style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
      <img src='../images/s1.png' style={{width:'100%'}} ></img>
        </div>
   
        </div>
  )
}

export default Stores