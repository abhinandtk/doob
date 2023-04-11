import MainHeader from '@/components/shared/headers/MainHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import constants from '@/public/data/my-constants/Constants';
import { useRouter } from 'next/router'
import React, { Fragment,useState } from 'react'
import {Tab,Tabs,Card} from 'react-bootstrap';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import OtherProfileHeaderDetails from '@/components/profile/OtherProfileHeaderDetails';
import { useEffect } from 'react';
function OtherUserAccount() {

    const router = useRouter()
    const {userId} = router.query

    const [postDetails,setPostDetails]=useState([])
    const [profileDetails,setProfileDetials]=useState([])
    useEffect(()=>{
        Axios.post(apis.otheruser,
            { user_id: userId },
            {
            headers: {
                'Authorization': `Token ${constants.token_id}`
            }
            }
        )
        .then((res) => {
            console.log('Response:', res);
            setProfileDetials(res.data.data.user_details)
            setPostDetails(res.data.data.post_details)
            // Handle the response data here
        }).catch((error) => {
            console.log('Error:', error);
            // Handle any errors here
        });
})
      
  return (

    <Fragment>
        <MainHeader />
        <MainSidebarFixed />
    
        <OtherProfileHeaderDetails data={profileDetails} id={userId}/>
    <section id="tabs">
        <div className="container">
            <div className="col-md-9  ">
                <Tabs  id="uncontrolled-tab-example" style={{display:'flex',justifyContent:'space-evenly'}} > 
                    <Tab eventKey={1} title="Feeds">
                        <hr  className='col-md-12 line' ></hr>

                        <div className="row images">
                        {postDetails.map((item)=>(
                        <div className="col-md-4" tabindex="0">
                            <img src={`${constants.port}${item.image}`} className="image" alt=""/>
                        </div>
                        ))}
                        </div>

                    </Tab>
                    <Tab eventKey={2} title="Activities"> 
                    
                        <hr style={{color:'#000',width:'900px'}} className='col-md-12 ' ></hr>

                    </Tab>
                </Tabs>
            </div>
        </div>
    </section>

    </Fragment>
  )
}

export default OtherUserAccount