
import {Container,Nav,Navbar,Dropdown,Modal,Button,CardImg} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import MainHeader from '@/components/shared/headers/MainHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import StoriesMainPage from '@/components/homepage/StoriesMainPage';
import SideExplorePlayers from '@/components/homepage/SideExplorePlayers';
import ContainerHomePosts from '@/components/homepage/ContainerHomePosts';
import axios from 'axios';
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
import Login from '@/components/user/Login';
import Register from '@/components/user/Register';
import ForgetEmail from '@/components/user/ForgetMail';
import RegisterOtpVerification from '@/components/user/RegisterOtpVerification';
import ForgetOtp from '@/components/user/ForgetOtp';
import PasswordChange from '@/components/user/PasswordChange';
import SsoRegister from '@/components/user/SsoRegister';
import MobileHeader from '@/components/MobileHeader';
import SharedConfirmation from '@/components/homepage/social/SharedConfirmation';
import SingleContainerHomePosts from '@/components/homepage/SingleContainerHomePosts';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function SingleHomePage ()  {

  const [countryModalShow, setCountryModalShow] = useState(true);
  const [countryData,setCountryData] = useState([])
  const [regionData,setRegionData] = useState([])
  

  const [activemodal,setActiveModal]=useState(null)
  
  

  useEffect(() =>{
    axios.post(apis.country)
    .then((res) => {
      setCountryData(res.data.country)
    })
  },[])
  

  return (
    <Fragment>
      <MainHeader title='Doob'/>
      <MobileHeader/>
      <MainSidebarFixed />
      <main className="main-container">
        <section className="content-container">
          <div className="content">
          
            <SingleContainerHomePosts />
          
          </div>
            {/* <SideExplorePlayers /> */}
        </section>
      </main>
           
    </Fragment>
      
  )
}


export default SingleHomePage
