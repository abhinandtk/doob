import React, { Fragment } from 'react'
import { useState } from 'react'
import { Card,Tab,Tabs,CardImg } from 'react-bootstrap'
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
    },[])

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
        <section id="tabs">
            <div className="container">
                <div className="col-md-9  ">
                    <Tabs  
                    // id="uncontrolled-tab-example" 
                    style={{display:'flex',justifyContent:'space-evenly'}} 
                    // defaultActiveKey='feeds'
                    activeKey={key}
                    onSelect={(e)=>SetKey(e)}
                    > 
                       <Tab eventKey={1} title="Feeds">
                            <hr  className='col-md-12 line' ></hr>

                            <div className="row images">

                            {postDetails.map((item)=>{
                                return(
                                    <div className="col-md-4" tabindex="0">
                                        <img src={`${constants.port}${item.image}`} className="image" alt=""/>
                                    </div>
                            )})}
                            </div>
                            
                        </Tab>
                        <Tab eventKey={2} title="Activities" >
                            <hr style={{color:'#000',width:'900px'}} className='col-md-12 ' ></hr>
                            <Card style={{width:'900px',height:'850px'}}>
                                <h6 style={{color:'#000',fontWeight:'600',fontSize:'18px',marginLeft:'43px',marginTop:'44px'}}>Tue.Feb 12</h6>
                                <div className='d-flex flex-start mt-3 mx-5' >
                                    <a   className='me-2' href=''>
                                        <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                    </a>
                                    <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{color:'#000',width:'800px'}} className='col-md-11 mx-5' ></hr>
                                {/* <div className='d-flex flex-start mt-3 mx-5' >
                                    <a   className='me-2' href=''>
                                        <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                    </a>
                                    <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <hr style={{color:'#000',width:'800px'}} className='col-md-11 mx-5' ></hr>
                                <div className='d-flex flex-start mt-3 mx-5' >
                                    <a   className='me-2' href=''>
                                        <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                    </a>
                                    <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{color:'#000',width:'800px'}} className='col-md-11 mx-5' ></hr>


                                <h6 style={{color:'#000',fontWeight:'600',fontSize:'18px',marginLeft:'43px',marginTop:'44px'}}>Mon.Feb 11</h6>
                                <div className='d-flex flex-start mt-3 mx-5' >
                                    <a   className='me-2' href=''>
                                        <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                    </a>
                                    <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{color:'#000',width:'800px'}} className='col-md-11 mx-5' ></hr>

                                <div className='d-flex flex-start mt-3 mx-5' >
                                    <a   className='me-2' href=''>
                                        <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                    </a>
                                    <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{color:'#000',width:'800px'}} className='col-md-11 mx-5' ></hr> */}
                                
                                {/* <div className='d-flex flex-start mt-3 mx-5' >
                                    <a   className='me-2' href=''>
                                        <CardImg   src="../images/accounts/stadium.png" style={{width:'64px',height:'64px',borderRadius:'0px'}} ></CardImg>
                                    </a>
                                    <div className="flex-grow-1 flex-shrink-1 mx-2 mt-2 " style={{marginBottom:'-24px'}}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                      
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </section>
    </Fragment>
  )
}

export default ProfileDetails