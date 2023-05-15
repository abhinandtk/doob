import constants from '@/public/data/my-constants/Constants';
import React from 'react'
import {Container,Nav,Navbar,Dropdown,Carousel,Card} from 'react-bootstrap';

function StoreMainBanner({banners}) {
  return (
    <Carousel className='mx-2' >
      {banners.map((item,index)=>(
      <Carousel.Item key={index} interval={1000}  >
        <img
          className=" w-100  "
          src={`${constants.port}${item.image}`} style={{width:'100%'}}
          alt="First slide" 
        />
      </Carousel.Item>
      ))}                                                                                                    
  {/* <Carousel.Item interval={500}> 
    <img
      className=" w-100"
      src="../images/store/banner1.jpg" style={{width:'100%'}}
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>                            
    <img
      className=" w-100"
      src="../images/store/banner1.jpg"  style={{width:'100%'}}
      alt="Third slide"
    />
                                                                           
  </Carousel.Item> */}
</Carousel>
   
  )
}

export default StoreMainBanner