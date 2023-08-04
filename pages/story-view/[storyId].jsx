
import {Container,Nav,Navbar,Dropdown,Modal,Button,CardImg} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
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
import SharedConfirmation from '@/components/homepage/social/SharedConfirmation';
import MainHeader from '@/components/shared/headers/MainHeader';
import MobileHeader from '@/components/MobileHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import SingleContainerHomePosts from '@/components/homepage/SingleContainerHomePosts';
import StoriesMainPage from '@/components/homepage/StoriesMainPage';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoriesView ()  {

  const [countryData,setCountryData] = useState([])
  

  
  

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
            {/* <StoriesMainPage /> */}
          
            <SingleContainerHomePosts story={true}/>
          
          </div>
        </section>
      </main>
           
    </Fragment>
      
  )
}


export default StoriesView
