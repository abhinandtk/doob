import React from 'react'
import {Container,Nav,Navbar,Dropdown,Carousel,Card} from 'react-bootstrap';

function StoreMainBanner() {
  return (
    
<Carousel className='mx-2' >
  
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100 "
          src="https://i.pinimg.com/originals/e7/f7/1c/e7f71ce97c56ea47bc78e294a5ab3f3c.jpg" 
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/e7/f7/1c/e7f71ce97c56ea47bc78e294a5ab3f3c.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/e7/f7/1c/e7f71ce97c56ea47bc78e294a5ab3f3c.jpg"
          alt="Third slide"
        />
   
      </Carousel.Item>
    </Carousel>
   
  )
}

export default StoreMainBanner