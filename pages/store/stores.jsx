
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Container,Nav,Navbar,Dropdown,Carousel,Card} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import MainHeader from '@/components/shared/headers/MainHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import StoreMainBanner from '@/components/stores/StoreMainBanner';
import Stores from '@/components/stores/Stores';
import Axios  from 'axios';
import apis from '@/public/data/my-constants/Apis';
import StoreProductsCard from '@/components/stores/StoreProductsCard';

function StorePage ()  {
  const [storeData, setStoreData] = useState([]);

  Axios.get(apis.stores)
  .then((res)=>{
    setStoreData(res.data.data.stores)
    console.log('rtrtrtrtrtrtrtrtrtrtrtrt',res)
  })
  return (
    <div>
      <MainHeader title='Doob'/>
      <MainSidebarFixed />
     
      <div className="store-container">
        <form className="nosubmit ">
          <input className="nosubmit" type="search" placeholder="Search"   />
        </form>
        <br></br>
        <StoreMainBanner />
    

      <Stores storeData={storeData}/>
  
      <br></br>
  
  <section>
  <div className='row '>
       <div className='col-lg-5 col-md-5  '>
      <img src='../images/store/card2.png' ></img>
      </div>
      <div className='col-lg-5 col-md-5 '>
      <img src='../images/store/card1.png' ></img>
      </div>
 
    </div>
    </section>
    <br></br>
    
    <h5>Favourite Store<span className='view' >View All</span></h5>
  <div className='row  store '>
       <div className='col-lg-3 col-md-4  '>
      <img src='../images/store/s1.png' className='img' ></img>
      </div>
      <div className='col-lg-3 col-md-4 '>
      <img src='../images/store/s1.png' className='img' ></img>
      </div>
      <div className='col-lg-3 col-md-4  '>
      <img src='../images/store/s1.png' className='img' ></img>
      </div>
      <div className='col-lg-3 col-md-4'>
      <img src='../images/store/s1.png' className='img' ></img>
      </div>
      
    </div>
    <br></br>
    
    
    <StoreProductsCard />
    
    <h5>Favourite Products<span className='view' >View All</span></h5>
  <div className='row store '>
       <div className='col-md-3  '>
       <Card   style={{backgroundColor:'#343C42',borderRadius:'0%',border:'0px'}} >
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/store/shoes.jpg"  />
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
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/store/shoes.jpg"  />
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
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/store/shoes.jpg"  />
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
      <Card.Img  style={{borderRadius:'0px 0px 0px 0px'}} src="../images/store/shoes.jpg"  />
      <Card.Body>
        
        <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
        <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-suit-heart  " style={{color:'white'}}></i></span><br></br><p style={{fontSize:'12px',color:'white',fontWeight:'400;'}}>Edge Identity Running Shoes For Men</p>
          <p style={{color:'#fff',fontSize:'15px'}}><s>13.000 KD</s><span><p style={{fontSize:'16px',color:'#17A803',fontWeight:'700'}}>14.450 KD</p></span></p>
        </Card.Text>
       
      </Card.Body>
    </Card>
      </div>
      
    </div>
     
    </div>
     </div>
  
     
      
  


  )
}


export default StorePage