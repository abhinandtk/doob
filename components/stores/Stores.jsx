import constants from '@/public/data/my-constants/Constants'
import Link from 'next/link'
import React from 'react'

function Stores({storeData,title}) {
  return (
   
    <div className='row store'>

        <h5 className='mx-2'>{title}</h5>
        {storeData.map((item,index)=>(
            <div key={index} className='col-lg-3 col-md-4'>
            <Link href={`/store/${item.id}`}>
            <img src={`${constants.port}${item.logo}`}  style={{width:'100%'}} ></img>
            </Link>
        </div>
        ))}
        <div className='col-lg-3 col-md-4'>
            <img src='../images/store/s1.png'  style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
            <img src='../images/store/s1.png'  style={{width:'100%'}} ></img>
        </div>
        <div className='col-lg-3 col-md-4'>
            <img src='../images/store/s1.png'  style={{width:'100%'}} ></img>
        </div>
      
        </div>
  )
}

export default Stores