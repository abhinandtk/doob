import React from 'react'
import {Container,Nav,Navbar,Dropdown,Carousel,Card} from 'react-bootstrap';

function StoreProductsCard() {
  return (
    <section className='rot-container'>
    <h5>Popular<span className='view' >View All</span></h5>
  <div className='row product '>
       <div className='col-md-3  '>
       <Card   style={{backgroundColor:'#343C42',borderRadius:'0%',border:'0px'}} >
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/shoes.jpg"  />
      <Card.Body>
        
        <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
        <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-suit-heart  " style={{color:'white'}}></i></span><br></br><p style={{fontSize:'12px',color:'white',fontWeight:'400;'}}>Edge Identity Running Shoes For Men</p>
          <p style={{color:'#fff',fontSize:'15px'}}><s>13.000 KD</s><span><p style={{fontSize:'16px',color:'#17A803',fontWeight:'700'}}>14.450 KD</p></span></p>
        </Card.Text>
       
      </Card.Body>
    </Card>
      </div>
      <div className='col-md-3 '>
      <Card   style={{backgroundColor:'#343C42',borderRadius:'0%',border:'0px'}} >
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/shoes.jpg"  />
      <Card.Body>
        
        <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
        <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-suit-heart  " style={{color:'white'}}></i></span><br></br><p style={{fontSize:'12px',color:'white',fontWeight:'400;'}}>Edge Identity Running Shoes For Men</p>
          <p style={{color:'#fff',fontSize:'15px'}}><s>13.000 KD</s><span><p style={{fontSize:'16px',color:'#17A803',fontWeight:'700'}}>14.450 KD</p></span></p>
        </Card.Text>
       
      </Card.Body>
    </Card>
      </div>
      <div className='col-md-3  '>
      <Card   style={{backgroundColor:'#343C42',borderRadius:'0%',border:'0px'}} >
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/shoes.jpg"  />
      <Card.Body>
        
        <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
        <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-suit-heart  " style={{color:'white'}}></i></span><br></br><p style={{fontSize:'12px',color:'white',fontWeight:'400;'}}>Edge Identity Running Shoes For Men</p>
          <p style={{color:'#fff',fontSize:'15px'}}><s>13.000 KD</s><span><p style={{fontSize:'16px',color:'#17A803',fontWeight:'700'}}>14.450 KD</p></span></p>
        </Card.Text>
       
      </Card.Body>
    </Card>
      </div>
      <div className='col-md-3 '>
      <Card   style={{backgroundColor:'#343C42',borderRadius:'0%',border:'0px'}} >
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/shoes.jpg"  />
      <Card.Body>
        
        <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
        <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-suit-heart  " style={{color:'white'}}></i></span><br></br><p style={{fontSize:'12px',color:'white',fontWeight:'400;'}}>Edge Identity Running Shoes For Men</p>
          <p style={{color:'#fff',fontSize:'15px'}}><s>13.000 KD</s><span><p style={{fontSize:'16px',color:'#17A803',fontWeight:'700'}}>14.450 KD</p></span></p>
        </Card.Text>
       
      </Card.Body>
    </Card>
      </div>
      
    </div>
    </section>
  )
}

export default StoreProductsCard