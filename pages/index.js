
import { Container, Nav, Navbar, Dropdown, Modal, Button, CardImg } from 'react-bootstrap';
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
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import AuthenticationModals from '@/components/shared/AuthenticationModals';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  }
}
function HomePage() {
  // const router = useRouter()
  // const { locale } = useRouter()
  // const { t } = useTranslation()

  // const [countryModalShow, setCountryModalShow] = useState(true);
  // const [countryData, setCountryData] = useState([])
  // const [regionData, setRegionData] = useState([])



  // const [activemodal, setActiveModal] = useState(null)

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const hasReloaded = localStorage.getItem('hasReloaded');
  //   if (!token && !hasReloaded) {

  //     localStorage.setItem('hasReloaded', true);

  //     window.location.reload();
  //   }

  // }, [])

  // const handleCountry = (e) => {
  //   setRegionData([])
  //   const countryId = e.target.value;
  //   localStorage.setItem('country-select', countryId)
  //   const cData = countryData.find((country => country.country_name === countryId))

  //   if (cData && cData.regions) {
  //     setRegionData(cData.regions)
  //   }
  // };

  // const regionChange = (e) => {
  //   const regId = e.target.value;
  //   console.log('idddd', regId)
  //   localStorage.setItem('region-select', regId)
  // }

  // const countrySubmitHandler = (e) => {
  //   e.preventDefault()

  //   setCountryModalShow(false)
  //   setActiveModal('login')

  // }

  // useEffect(() => {
  //   axios.post(apis.country)
  //     .then((res) => {
  //       setCountryData(res.data.country)
  //     })
  // }, [])

  
  return (
    <Fragment>
      <MainHeader title='Doob' />
      <MobileHeader />
      <MainSidebarFixed />
      <AuthenticationModals />
      {/* {constants.token_id === null ? (
        <Modal
          show={countryModalShow}
          // onHide={() => setCountryModalShow(false)} 
          className='country_select'
        >
          <Modal.Header >

          </Modal.Header>
          <Modal.Body>
            <Modal.Title className='title1' >{t("Please Choose Your location")}</Modal.Title>
            <Form
              style={{ marginTop: '34px' }}
              onSubmit={countrySubmitHandler}>

              <Form.Group className="mb-1 country "  >
                <Form.Label>{t("Select Country")}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleCountry}
                  className="input-theme-prod dark-theme-color"
                  required
                >
                  <option value=''>{t("Country")}</option>
                  {countryData.map((item) => (
                    <option key={item.id} value={item.country_name}>{item.country_name}</option>
                  ))}

                </Form.Select>
              </Form.Group>


              <Form.Group className="mb-3 location" >
                <Form.Label>{t("Select Location")}</Form.Label>
                <Form.Select
                  className="input-theme-prod dark-theme-color"
                  aria-label="Default select example"
                  required
                  onChange={(e) => regionChange(e)}
                >
                  <option value=''>{t("Locations")}</option>
                  {regionData.map(item => (
                    <option key={item.id} value={item.id}>{item.region_name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Modal.Footer >
                <Button
                  type='submit'
                  className='mx-auto text-white submit1'

                >
                  {t("Continue")}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      ) : <></>}



      {activemodal === 'login' && <Login setActiveModal={setActiveModal} />}
      {activemodal === 'register' && <Register countries={countryData} setActiveModal={setActiveModal} />}
      {activemodal === 'registerotp' && <RegisterOtpVerification setActiveModal={setActiveModal} />}

      {activemodal === 'forgetemail' && <ForgetEmail setActiveModal={setActiveModal} />}
      {activemodal === 'forgetotp' && <ForgetOtp setActiveModal={setActiveModal} />}
      {activemodal === 'passwordchange' && <PasswordChange setActiveModal={setActiveModal} />}
      {activemodal === 'ssoregister' && <SsoRegister countries={countryData} setActiveModal={setActiveModal} />} */}

      <main className="main-container">
        <section className="content-container">
          <div className="content" style={{ margin: "0px" }}>
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



