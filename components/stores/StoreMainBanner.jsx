import React from 'react'
import {Container,Nav,Navbar,Dropdown,Carousel,Card} from 'react-bootstrap';

function StoreMainBanner() {
  return (
    
<Carousel className='mx-2' >
  
  <Carousel.Item interval={1000}>
    <img
      className=" w-100 "
      src="../images/banner1.jpg"   style={{width:'100%'}}
      alt="First slide"
    />
  
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className=" w-100"
      src="../images/banner1.jpg" style={{width:'100%'}}
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className=" w-100"
      src="../images/banner1.jpg"  style={{width:'100%'}}
      alt="Third slide"
    />

  </Carousel.Item>
</Carousel>
   
  )
}

export default StoreMainBanner