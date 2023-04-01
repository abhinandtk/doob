import 'bootstrap-icons/font/bootstrap-icons.css';
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
function HomePage ()  {

  const [countryModalShow, setCountryModalShow] = useState(true);
  const [countryData,setCountryData] = useState([])
  const [regionData,setRegionData] = useState([])
  

  const [activemodal,setActiveModal]=useState(null)
  
  const handleCountry = (e) => {
    setRegionData([])
    const countryId = e.target.value;
    localStorage.setItem('country-select',countryId)
    const cData = countryData.find((country => country.country_name === countryId))
    
    if (cData && cData.regions){
      setRegionData(cData.regions)
    }
  };

  const countrySubmitHandler = (e) =>{
    e.preventDefault()

    setCountryModalShow(false)

  }

  useEffect(() =>{
    axios.post(apis.country)
    .then((res) => {
      setCountryData(res.data.country)
    })
  },[])
  

  return (
    <Fragment>

      <MainHeader />
      <MobileHeader/>
      <MainSidebarFixed />
      {/* {constants.token_id === null ? (
      <Modal 
      show={countryModalShow} 
      // onHide={() => setCountryModalShow(false)} 
      className='country_select'
      >
        <Modal.Header closeButton>
     
        </Modal.Header>
        <Modal.Body>
          <Modal.Title className='title1' >Please Choose Your location</Modal.Title>
          <Form 
          style={{marginTop:'34px'}}
          onSubmit={countrySubmitHandler}>
         
            <Form.Group className="mb-1 country "  >
              <Form.Label>Select Country</Form.Label>
              <Form.Select 
              aria-label="Default select example"
              onChange={handleCountry}
              required
              >
                <option value=''>Country</option>
                {countryData.map((item) => (
                  <option key={item.id} value={item.country_name}>{item.country_name}</option>
                ))}
                
              </Form.Select>
            </Form.Group>
         

            <Form.Group className="mb-3 location" >
              <Form.Label>Select Location</Form.Label>
              <Form.Select 
              aria-label="Default select example"
              required
              >
              <option value=''>Locations</option>
              {regionData.map(item=>(
                <option key={item.id} value={item.region_name}>{item.region_name}</option>
              ))}
              </Form.Select>
            </Form.Group>
            <Modal.Footer >
              <Button 
              type='submit'
              className='mx-auto text-white ' 
              style={{backgroundColor:'#17A803',fontWeight:'600',width:'360px'}} 
              >
                Continue
              </Button>                                                    
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      ):<></>} */}

      
      <Login setActiveModal={setActiveModal}/>
      {activemodal === 'register' && <Register countries={countryData} setActiveModal={setActiveModal}/>}
      {activemodal === 'registerotp' && <RegisterOtpVerification setActiveModal={setActiveModal}/>} 
    
      {activemodal === 'forgetemail' && <ForgetEmail setActiveModal={setActiveModal}/>}
      {activemodal === 'forgetotp' && <ForgetOtp setActiveModal={setActiveModal}/>}
      {activemodal === 'passwordchange' && <PasswordChange setActiveModal={setActiveModal}/>}
      {activemodal === 'ssoregister' && <SsoRegister countries={countryData} setActiveModal={setActiveModal}/>}

      <main className="main-container">
        <section className="content-container">
          <div className="content">
            <StoriesMainPage />
          
            <ContainerHomePosts />
          
          </div>
            <SideExplorePlayers />
        </section>
      </main>
           
    </Fragment>
      
  )
}


export default HomePage
