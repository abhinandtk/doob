
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
import StoreBannerCard from '@/components/stores/StoreBannerCard';

function StorePage ()  {
  const [storeData, setStoreData] = useState([]);
  const [banners, setBanners] = useState([]);

  Axios.get(apis.stores)
  .then((res)=>{
    setStoreData([res.data.data])
    setBanners(res.data.data.top_banner)
    console.log('rtrtrtrtrtrtrtrtrtrtrtrt',res)
  })
  return (
    <div>
      <MainHeader title='Doob'/>
      <MainSidebarFixed />
     
      <div className="store-container">
        <form className="nosubmit ">
          <input className="nosubmit1" type="search" placeholder="Search"   />
        </form>
        <br></br>
       
        {storeData.map((content,index)=>{
          
          return(
            <div key={index}>
            <StoreMainBanner banners={content.top_banners}/>
            <Stores storeData={content.stores}/>
            <br></br>
            <StoreBannerCard banners={content.mid_banners}/>
            <br></br>
            <h5>Favourite Store<span className='view' >View All</span></h5>
            <div className='row  store '>
              <div className='col-lg-3 col-md-4  '>
                <img src='../images/store/s1.png' className='img' ></img>
              </div>
              <div className='col-lg-3 col-md-4  '>
                <img src='../images/store/s1.png' className='img' ></img>
              </div>
              <div className='col-lg-3 col-md-4  '>
                <img src='../images/store/s1.png' className='img' ></img>
              </div>
              <div className='col-lg-3 col-md-4  '>
                <img src='../images/store/s1.png' className='img' ></img>
              </div>
              
            </div>
            <br></br>
            <StoreProductsCard />
            </div>
          )
        })}
          
          <h5>Favourite Products<span className='view' >View All</span></h5>
          <div className='row store '>
            {/* <div className='col-lg-3 col-md-4 '>
            <Card className='favouite-card'  >
            <Card.Img  style={{borderRadius:'0px 0px 0px 0px',width:'100%'}} src="../images/store/shoes.jpg"  />
            <Card.Body>
              
           
              <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
              <p className='wrap'>Edge Identity Running Shoes For Men</p>

                <p className='top-p' ><s>14.450 KD</s></p>
            <p className='down-p'>13.000 KD</p>
            </Card.Body>
            </Card>
            </div>
            <div className='col-lg-3 col-md-4  '>
            <Card className='favouite-card'  >
            <Card.Img  style={{borderRadius:'0px 0px 0px 0px',width:'100%'}} src="../images/store/shoes.jpg"  />
            <Card.Body>
              
           
              <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
              <p className='wrap'>Edge Identity Running Shoes For Men</p>

                <p className='top-p' ><s>14.450 KD</s></p>
            <p className='down-p'>13.000 KD</p>
            </Card.Body>
            </Card>
            </div>
            <div className='col-lg-3 col-md-4  '>
            <Card className='favouite-card'  >
            <Card.Img  style={{borderRadius:'0px 0px 0px 0px',width:'100%'}} src="../images/store/shoes.jpg"  />
            <Card.Body>
              
           
              <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
              <p className='wrap'>Edge Identity Running Shoes For Men</p>

                <p className='top-p' ><s>14.450 KD</s></p>
            <p className='down-p'>13.000 KD</p>
            </Card.Body>
            </Card>
            </div>
            <div className='col-lg-3 col-md-4  '>
            <Card className='favouite-card'  >
            <Card.Img  style={{borderRadius:'0px 0px 0px 0px',width:'100%'}} src="../images/store/shoes.jpg"  />
            <Card.Body>
              
           
              <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
              <p className='wrap'>Edge Identity Running Shoes For Men </p>

                <p className='top-p' ><s>14.450 KD</s></p>
            <p className='down-p'>13.000 KD</p>
            </Card.Body>
            </Card>
            </div>
            <div className='col-lg-3 col-md-4  '>
            <Card className='favouite-card'  >
            <Card.Img  style={{borderRadius:'0px 0px 0px 0px',width:'100%'}} src="../images/store/shoes.jpg"  />
            <Card.Body>
              
           
              <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
              <p className='wrap'>Edge Identity Running Shoes For Men</p>

                <p className='top-p' ><s>14.450 KD</s></p>
            <p className='down-p'>13.000 KD</p>
            </Card.Body>
            </Card>
            </div> */}


{/* card start */}


          <div className="col-md-6 col-lg-3">
                <div className="card">
                  <img className="card-img" src="../images/store/shoes.jpg" alt="Vans"/>
                  
                  <div className="card-body" style={{background:'#343C42'}}>
                  <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
                    <p className="card-title" style={{color:'#fff'}}>Edge Identity Running Shoes For Men</p>
                    <div className="buy">
                      <p style={{color:'#959595',fontSize:'14px'}}><s>14.450 KD</s></p>
                      <div className="price text-success"><h6 style={{color:'#17A803',marginTop:'-12px'}}>13.000 KD</h6></div>
                    
                    </div>
                  </div>
                </div>
              </div>
                
              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <img className="card-img" src="../images/store/shoes.jpg" alt="Vans"/>
                  
                  <div className="card-body" style={{background:'#343C42'}}>
                  <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
                    <p className="card-title" style={{color:'#fff'}}>Edge Identity Running Shoes For Men</p>            
                    <div className="buy">
                      <p style={{color:'#959595',fontSize:'14px'}}><s>14.450 KD</s></p>
                      <div className="price text-success"><h6 style={{color:'#17A803',marginTop:'-12px'}}>13.000 KD</h6></div>
                    
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <img className="card-img" src="../images/store/shoes.jpg" alt="Vans"/>
                  
                  <div className="card-body" style={{background:'#343C42'}}>
                  <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
                    <p className="card-title" style={{color:'#fff'}}>Edge Identity Running Shoes For Men</p>
                    <div className="buy">
                      <p style={{color:'#959595',fontSize:'14px'}}><s>14.450 KD</s></p>
                      <div className="price text-success"><h6 style={{color:'#17A803',marginTop:'-12px'}}>13.000 KD</h6></div>
                    
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <img className="card-img" src="../images/store/shoes.jpg" alt="Vans"/>
                  
                  <div className="card-body" style={{background:'#343C42'}}>
                  <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
                    <p className="card-title" style={{color:'#fff'}}>Edge Identity Running Shoes For Men</p>
                    <div className="buy">
                      <p style={{color:'#959595',fontSize:'14px'}}><s>14.450 KD</s></p>
                      <div className="price text-success"><h6 style={{color:'#17A803',marginTop:'-12px'}}>13.000 KD</h6></div>
                    
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <img className="card-img" src="../images/store/shoes.jpg" alt="Vans"/>
                  
                  <div className="card-body" style={{background:'#343C42'}}>
                  <i class="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i class="bi bi-heart-fill    " style={{color:'white'}}></i></span>
                    <p className="card-title" style={{color:'#fff'}}>Edge Identity Running Shoes For Men</p>
                    <div className="buy">
                      <p style={{color:'#959595',fontSize:'14px'}}><s>14.450 KD</s></p>
                      <div className="price text-success"><h6 style={{color:'#17A803',marginTop:'-12px'}}>13.000 KD</h6></div>
                    
                    </div>
                  </div>
                </div>
              </div>

                      {/* card end */}
          </div>
      </div>
    </div>


  )
}


export default StorePage