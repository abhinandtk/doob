
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
import constants from '@/public/data/my-constants/Constants';

function StorePage ()  {
  const [storeData, setStoreData] = useState([]);
  const [banners, setBanners] = useState([]);

  Axios.get(apis.stores,{
    headers:{
      'Authorization':`Token ${constants.token_id}`,
    }
  })
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
            <br></br>
            <Stores storeData={content.stores} title='Store'/>
            <br></br>
            <StoreBannerCard banners={content.mid_banners}/>
            <br></br>
            <Stores storeData={content.favorite_store} title='Favorite Store'/>
                                                                                        
            <br></br>
            <StoreProductsCard products={content.popular_products} title='Popular Products'/>
            <StoreProductsCard products={content.favorite_products} title='Favorite Products'/>
            </div>
          )
        })}
      </div>
    </div>


  )
}


export default StorePage