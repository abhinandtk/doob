import constants from '@/public/data/my-constants/Constants'
import React from 'react'

function StoreBannerCard({banners}) {
  return (
    <section>
        
        <div className='row '>
            {banners.map((item,index)=>(

                <div key={index} className='col-lg-5 col-md-5  '>
                <img src={`${constants.port}${item.image}`} ></img>
                </div>
            ))}
            {/* <div className='col-lg-5 col-md-5 '>
            <img src='../images/store/card1.png' ></img>
            </div>
            <div className='col-lg-5 col-md-5  '>
            <img src='../images/store/card2.png' ></img>
            </div>
            <div className='col-lg-5 col-md-5 '>
            <img src='../images/store/card1.png' ></img>
            </div> */}

        </div>
    </section>
  )
}

export default StoreBannerCard