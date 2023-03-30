import React, { Fragment } from 'react'
import { useState } from 'react'
import { Card,Tab,Tabs,CardImg } from 'react-bootstrap'

function ProfileDetails() {

    const [key,SetKey] = useState('feeds')
  return (
    <Fragment>
        <Card className='container-fluid' style={{width:'910px',marginLeft:'435px',marginTop:'23px',height:'290px'}}>
            <Card.Body>
                <button class="btn profile-edit-btn">Rank</button>  <button class="btn profile-edit-btn1">Edit</button>
                <div class="profile">
                <div class="profile-image">
                    <img src="../images/accounts/group.png" alt=""></img>
                </div>
                <div class="profile-image">
                    <img src="../images/accounts/camera.png" href='#' style={{width:'44px',height:'44px',marginRight:'503px',marginBottom:'-283px'}} alt=""></img><br></br>
                </div>
                <div class="profile-user-settings">
                    <h1 class="profile-user-name">Muhammed Alsalah<span><img src='../images/accounts/stars.png' className='mx-1 mb-1'></img></span><span><img src='../images/accounts/iconoir_help-circles.png' className=' mb-1'></img></span></h1><br></br>
                    <h1 class="profile-user-names">@muhammed_alsalah</h1>
                </div>

                <div class="profile-stats">
                    <ul>
                    <li><span class="profile-stat-count">465</span> <span style={{color:'#959595'}}>posts</span></li>
                    <li><span class="profile-stat-count">123k</span>  <span style={{color:'#959595'}}>followers</span></li>
                    <li><span class="profile-stat-count">1.2K</span>  <span style={{color:'#959595'}}>following</span></li>
                    <br></br>
                    <li><span class="profile-stat-count " style={{color:'#959595'}}>Age</span>  <span >28</span></li>
                    <li><span class="profile-stat-count" style={{color:'#959595'}}>Gender</span>  <span > Male</span></li>
                    <br></br>
                    <li><span > <img src="../images/accounts/kuwait.png" alt="" ></img></span><span class="profile-stat-count mx-1">Kuwait,Hawally </span> <span style={{color:'#959595'}} className='mx-3'>+More</span></li>
                    </ul>

                </div>
                </div>
            
            </Card.Body>
        </Card>

        <section id="tabs">
            <div className="container">
                <div className="col-md-9  ">
                    <Tabs  
                    // id="uncontrolled-tab-example" 
                    style={{display:'flex',justifyContent:'space-evenly'}} 
                    defaultActiveKey='feeds'
                    activeKey={key}
                    onSelect={(k)=>SetKey(k)}
                    > 
                        <Tab eventKey='feeds' title="Feeds" >
                            <hr style={{color:'#000',width:'900px'}} className='col-md-12 ' ></hr>
                            <div className='row box'>
                                <div className='col-md-2'>
                                    <img src='../images/post1.jpg'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post2.jpg'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post3.jpg'></img>
                                </div>
                            </div>
                            <div className='row box'>
                                <div className='col-md-2'>
                                    <img src='../images/post4.png'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post5.png'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post6.png'></img>
                                </div>
                            </div>
                            <div className='row box'>
                                <div className='col-md-2'>
                                    <img src='../images/post7.png'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post8.png'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post 9.png'></img>
                                </div>
                            </div>
                            <div className='row box'>
                                <div className='col-md-2'>
                                    <img src='../images/post10.png'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post11.png'></img>
                                </div>
                                <div className='col-md-2'>
                                    <img src='../images/post12.png'></img>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey='activities' title="Activities" >
                            <hr style={{color:'#000',width:'900px'}} className='col-md-12 ' ></hr>
                            <Card style={{width:'900px',height:'910px'}}>
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
                                <hr style={{color:'#000',width:'800px'}} className='col-md-11 mx-5' ></hr>
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