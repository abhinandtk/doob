
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Container,Nav,Navbar,Dropdown,Carousel,Card,Button} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import MainHeader from '@/components/shared/headers/MainHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import ProductDetailInfo from '@/components/stores/product-details/ProductDetailInfo';
import ProductDetailImages from '@/components/stores/product-details/ProductDetailImages';
import MobileHeader from '@/components/MobileHeader';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';  
import constants from '@/public/data/my-constants/Constants';
import { useRouter } from 'next/router';

function ProductDetailPage ()  {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter()
  const {pid} = router.query

  // Axios.post(apis.productdetail,{
  //   slug_Id:pid
  // },
  // {
  //   headers:{
  //     'Authorization':`${constants.token_id}`,
  //   }
  // }).then((res)=>{
  //   console.log('productttttttttttttttttttttttt',res)
  // })

  
  return (
    <div>
        <MainHeader title='Doob'/>
        <MobileHeader />
        <MainSidebarFixed />


    <div className="store-container">
    <form className="nosubmit ">
    <input className="nosubmit2" type="search" placeholder="Search"   />
    </form>

  <section className=" my-3 h-75">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col">
        <div className="card" >
            <div className="card-body p-4">
                <div className="row " >
                    <ProductDetailImages />
                    <ProductDetailInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    </div> 
</div>
  
     
      
  


  )
}


export default ProductDetailPage