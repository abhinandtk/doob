import React, { Fragment } from 'react'
import { useState } from 'react'
import { Card,Tab,Tabs,CardImg ,Dropdown} from 'react-bootstrap'
import ProfileHeaderDetails from './ProfileHeaderDetails'
import Axios from 'axios'
import { useEffect } from 'react'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
function ProfileDetails() {

    const [key,SetKey] = useState(1)
    const [userDetials,setUserDetails]=useState([])
    const [postDetails,setPostDetails]=useState([])
    const [activityData,setActivityData]=useState([])
    useEffect(()=>{
        Axios.get(apis.profilepage,{
            headers:{
            'Authorization':`Token ${constants.token_id}`
            }
        }).then((res)=>{
            setUserDetails(res.data.data.user_details)
            setPostDetails(res.data.data.post_details)
            console.log('POsts result=-----------------------',res.data.data.post_details)
        })
    })

    Axios.get(apis.activity,{
        headers:{
            'Authorization':`Token ${constants.token_id}`
        }
    }).then((res)=>{
        setActivityData(res.data.data)
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',res)
    })

  return (
    <Fragment>
          
        <ProfileHeaderDetails data={userDetials}/>
        <div className="container2">
        <section id="tabs">
       
             
                    <Tabs  
                    // id="uncontrolled-tab-example" 
                    style={{display:'flex',justifyContent:'space-evenly'}} 
                    // defaultActiveKey='feeds'
                    activeKey={key}
                    onSelect={(e)=>SetKey(e)}
                    > 
                       <Tab eventKey={1} title="Feeds">
                            <hr  className=' line' ></hr>

                            <div className="row images">

                            {postDetails.map((item,index)=>{
                                return(
                                    <div key={index} className="col-lg-4 col-md-6 col-sm-4 col-xs-2" tabindex="0">
                                        <img src={`${constants.port}${item.image}`} className="image" alt="" style={{objectFit:'cover'}}/>
                                    </div>
                            )})}

                            </div>
                            
                        </Tab>
                        <Tab eventKey={2} title="Activities" >
                            <hr  className=' line ' ></hr>
                            <Card className='card-tab'>
                            <h6 style={{color:'#000',fontWeight:'600',fontSize:'18px',marginLeft:'43px',marginTop:'44px',textAlign:'left'}}>Tue.Feb 12</h6>
                            <div className='d-flex flex-start mt-3 mx-5' >
                                <a   className='me-2' href=''>
                                    <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                </a>
                                <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                   <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                        <p className=" book" >
                                                
                                              Booked  Mohammed Al-Hamad Stadium 
                                            </p>                                          
                                        </div>
                                        <p className='small-time ' >
                                            10:30 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr  className=' line1 mx-5'  ></hr>
                            <div className='d-flex flex-start mt-3 mx-5' >
                                <a   className='me-2' href=''>
                                    <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                </a>
                                <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                        <p className=" book" >
                                                
                                              Booked  Mohammed Al-Hamad Stadium 
                                            </p>                                         
                                        </div>
                                        <p className='small-time ' >
                                            10:30 
                                        </p>
                                    </div>
                                </div>
                            </div>   
                            <hr  className=' line1 mx-5'  ></hr>
                            <div className='d-flex flex-start mt-3 mx-5' >
                                <a   className='me-2' href=''>
                                    <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                </a>
                                <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                        <p className=" book" >
                                                
                                                Booked  Mohammed Al-Hamad Stadium 
                                              </p>                                         
                                        </div>
                                        <p className='small-time ' >
                                            10:30 
                                        </p>
                                    </div>
                                </div>
                            </div>  
                                <br></br>
                      
                            </Card>
                            
                        </Tab>
                        
                    </Tabs>
           
                    
        </section>
        </div>

       
    </Fragment>
  )
}

export default ProfileDetails