import constants from '@/public/data/my-constants/Constants'
import React from 'react'

function StoreBannerCard({banners}) {
  return (
    <section>
        
        <div className=' '>
            {banners.map((item,index)=>(

                <div key={index} className='  '>
                <img src={`${constants.port}${item.image}`} style={{width:'100%'}}></img>
                </div>
            ))}

        </div>
        {/* <div className='row row-cols-2 '>
            {banners.map((item,index)=>(

                <div key={index} className='col-lg-5 col-md-5 col-sm-6 col-xs-6   '>
                <img src={`${constants.port}${item.image}`} style={{}}></img>
                </div>
            ))}

        </div> */}
    </section>
  )
}

export default StoreBannerCard