import React, { Fragment } from 'react'
import { useState } from 'react'
import { Card,Tab,Tabs,CardImg ,Dropdown} from 'react-bootstrap'

function ProfileDetails() {

    const [key,SetKey] = useState('feeds')
  return (
    <Fragment>
        
       <div className="container2">
    
        <Card className='cord'>
            <Card.Body>
             <div className='row'>
                <div className='col-md-6'>
                <button class="btn profile-edit-btn">Rank</button>
                <div class="profile-image">
                    <img src="../images/accounts/group.png" alt=""></img>
                </div>
                <div class="profile-cam1">
                    <img src="../images/accounts/camera.png" href='#'  alt=""></img>
                </div>
                </div>
                <div className='col-md-6'>
                <div class="profile-stats">
                    <ul>
                    <h1 class="profile-user-name">Muhammed Alsalah<span><img src='../images/accounts/stars.png' className='mx-1 mb-1'></img></span><span><img src='../images/accounts/iconoir_help-circles.png' className=' mb-1'></img></span></h1><br></br>
                    <h1 class="profile-user-names">@muhammed_alsalah</h1>
                    <br></br>
                    <li><span class="profile-stat-count">465</span> <span style={{color:'#959595'}}>posts</span></li>
                    <li><span class="profile-stat-count">123k</span>  <span style={{color:'#959595'}}>followers</span></li>
                    <li><span class="profile-stat-count">1.2K</span>  <span style={{color:'#959595'}}>following</span></li>
                    <br></br>
                    <li><span class="profile-stat-count " style={{color:'#959595'}}>Age:</span>  <span >28</span></li>
                    <li><span class="profile-stat-count" style={{color:'#959595'}}>Gender:</span>  <span > Male</span></li>
                    <br></br>
                    <li><span > <img src="../images/accounts/kuwait.png" alt="" ></img></span><span class="profile-stat-count mx-1">Kuwait,Hawally </span> <span style={{color:'#959595'}} className='mx-3'>+More</span></li>
                    </ul>

                </div>
                <button class="btn profile-edit-btn1">Edit</button>
                </div>
             </div>
              
                    
               
                
            
            </Card.Body>
        </Card>
        
        <Card className='ceed'>
            <Card.Body>
             <div className='row'>
                <div className='col-md-6'>
                <button class="btn profile-edits-btn">Rank</button>
                <button class="btn profile-edit-btn2">Edit</button>
                <div class="profile-img">
                    <img src="../images/accounts/group.png" alt=""></img>
                </div>
                <div class="profile-camera1">
                    <img src="../images/accounts/camera.png" href='#'  alt=""></img>
                </div>
                </div>
                <div className='col-md-6'>
                <h1 class="profile-users-name">Muhammed Alsalah</h1><br></br>
                    <h1 class="profile-users-names">@muhammed_alsalah</h1>
                                     
                <div class="profile-stat">
             <ul>
             <li><span class="profile-stat-counts">465</span> <span style={{color:'#959595'}}>posts</span></li>
             <li><span class="profile-stat-counts">123k</span>  <span style={{color:'#959595'}}>followers</span></li>
             <li><span class="profile-stat-counts">1.2K</span>  <span style={{color:'#959595'}}>following</span></li>
             </ul>

         </div>
                    <p className='profiles-stat-count'>Age:<span style={{color:'#959595'}} className='mx-1'>28yrs</span><span className='mx-2'>Gender:<span className='mx-1'>Male</span></span></p>
    
                    <p className='profile-status-count'><span > <img src="../images/accounts/kuwait.png" alt="" ></img></span><span class=" mx-1">Kuwait,Hawally </span> <span style={{color:'#959595'}} className='mx-1'>+More</span></p>
                </div>
             </div>
              
          
                    
            
            </Card.Body>
        </Card>
        <Dropdown className='create-btns  '   >
                            <Dropdown.Toggle  style={{background:'transparent',border:'0'}}    >
                            <img src='../images/Group 453.png' id="dropdown-basic"  ></img>
                            </Dropdown.Toggle>
                               
                            <Dropdown.Menu align="end" style={{backgroundColor:'#17A803', borderRadius:'0px'}} >
                                <Dropdown.Item href="#" className='text-white ' style={{backgroundColor:'#17A803'}}><svg width="24" height="20" viewBox="0 0 24 25" fill="none" className='mx-2' xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.210938 0.851562V23.8943H23.2537V0.851562H0.210938ZM22.1015 7.76438H16.3409V2.0037H22.1015V7.76438ZM15.1887 2.0037V7.76438H8.27589V2.0037H15.1887ZM1.36307 8.91652H7.12376V15.8293H1.36307V8.91652ZM8.27589 8.91652H15.1887V15.8293H8.27589V8.91652ZM7.12376 2.0037V7.76438H1.36307V2.0037H7.12376ZM1.36307 22.7422V16.9815H7.12376V22.7422H1.36307ZM8.27589 16.9815H15.1887V22.7422H8.27589V16.9815ZM22.1015 22.7422H16.3409V16.9815H22.1015V22.7422ZM16.3409 15.8293V8.91652H22.1015V15.8293H16.3409Z" fill="white" stroke="white" stroke-width="0.303194"/> </svg>
                                Post
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className='text-white' style={{backgroundColor:'#17A803'}}><svg width="25" height="18" viewBox="0 0 25 19" fill="none" className='mx-2' xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.97736 0.274057C5.34277 0.639466 5.34277 1.23191 4.97736 1.59732C0.836052 5.73863 0.836052 12.453 4.97736 16.5943C5.34277 16.9597 5.34277 17.5522 4.97736 17.9176C4.61195 18.283 4.0195 18.283 3.65409 17.9176C-1.21803 13.0455 -1.21803 5.14618 3.65409 0.274057C4.0195 -0.0913523 4.61195 -0.0913523 4.97736 0.274057ZM21.2976 0.274057C26.1697 5.14618 26.1697 13.0455 21.2976 17.9176C20.9322 18.283 20.3398 18.283 19.9743 17.9176C19.6089 17.5522 19.6089 16.9597 19.9743 16.5943C24.1157 12.453 24.1157 5.73863 19.9743 1.59732C19.6089 1.23191 19.6089 0.639466 19.9743 0.274057C20.3398 -0.0913523 20.9322 -0.0913523 21.2976 0.274057ZM8.50606 3.80276C8.87147 4.16817 8.87147 4.76062 8.50606 5.12602C6.3136 7.31848 6.3136 10.8732 8.50606 13.0656C8.87147 13.431 8.87147 14.0235 8.50606 14.3889C8.14065 14.7543 7.5482 14.7543 7.1828 14.3889C4.25952 11.4656 4.25952 6.72603 7.1828 3.80276C7.5482 3.43735 8.14065 3.43735 8.50606 3.80276ZM17.7689 3.80276C20.6922 6.72603 20.6922 11.4656 17.7689 14.3889C17.4035 14.7543 16.8111 14.7543 16.4456 14.3889C16.0802 14.0235 16.0802 13.431 16.4456 13.0656C18.6381 10.8732 18.6381 7.31848 16.4456 5.12602C16.0802 4.76062 16.0802 4.16817 16.4456 3.80276C16.8111 3.43735 17.4035 3.43735 17.7689 3.80276ZM12.4759 7.22444C13.5094 7.22444 14.3472 8.06228 14.3472 9.09582C14.3472 10.1293 13.5094 10.9672 12.4759 10.9672C11.4423 10.9672 10.6045 10.1293 10.6045 9.09582C10.6045 8.06228 11.4423 7.22444 12.4759 7.22444Z" fill="white"/>
                                    </svg>
                                    Live 
                                </Dropdown.Item>
                                <Dropdown.Item onClick={()=>console.log('87548754874587554458745545')} className='text-white' style={{backgroundColor:'#17A803'}}><svg width="24" height="20" viewBox="0 0 24 24" fill="none" className='mx-2' xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1298 22.8954C18.158 22.8954 23.0448 18.0086 23.0448 11.9804C23.0448 5.95223 18.158 1.06543 12.1298 1.06543C6.10165 1.06543 1.21484 5.95223 1.21484 11.9804C1.21484 18.0086 6.10165 22.8954 12.1298 22.8954Z" stroke="white" stroke-width="1.69789" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.41406 4.26343C6.46031 6.31029 7.60982 9.08606 7.60982 11.9803C7.60982 14.8746 6.46031 17.6503 4.41406 19.6972" stroke="white" stroke-width="1.69789" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M19.8461 19.6972C17.7999 17.6503 16.6504 14.8746 16.6504 11.9803C16.6504 9.08606 17.7999 6.31029 19.8461 4.26343" stroke="white" stroke-width="1.69789" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Create Game
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> 
        <section id="tabs">
         
             
                    <Tabs  
                     
                    defaultActiveKey='feeds'
                    activeKey={key}
                    onSelect={(k)=>SetKey(k)}
                    > 
                       <Tab eventKey={1} title="Feeds">
  <hr  className='col-md-12 line' ></hr>

<div className="row images">

  <div className="col-lg-4 col-md-6 col-sm-4 col-xs-3" tabindex="0">
    <img src="../images/post1.jpg" className="image" alt=""/>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-4 col-xs-3" tabindex="0">
    <img src=" ../images/post2.jpg " className="image" alt=""/>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-4 col-xs-3" tabindex="0">
    <img src="../images/post3.jpg"  className="image" alt=""/>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-4 col-xs-3" tabindex="0">
    <img src="../images/post1.jpg" className="image" alt=""/>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-4 col-xs-2" tabindex="0">
    <img src=" ../images/post2.jpg " className="image" alt=""/>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-4 col-xs-2" tabindex="0">
    <img src="../images/post3.jpg"  className="image" alt=""/>
  </div>
  
</div>
   
  </Tab>
                        <Tab eventKey='activities' title="Activities" >
                            <hr  className=' line' ></hr>
                            <Card className='card-tab'>
                                <h6 style={{color:'#000',fontWeight:'600',fontSize:'18px',marginLeft:'43px',marginTop:'44px',textAlign:'left'}}>Tue.Feb 12</h6>
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
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px',textAlign:'left'}}>
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
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px',textAlign:'left'}}>
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
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px',textAlign:'left'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr  className=' line1 mx-5'  ></hr>


                                <h6 style={{color:'#000',fontWeight:'600',fontSize:'18px',marginLeft:'43px',marginTop:'44px',textAlign:'left'}}>Mon.Feb 11</h6>
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
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px',textAlign:'left'}}>
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
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px',textAlign:'left'}}>
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
                                                <p className="mb-0" style={{fontWeight:'500',color:'#000',fontSize:'15px'}}>
                                                    Booked<span className='mx-1' style={{fontWeight:'600',fontSize:'15px'}}>
                                                    Mohammed Al-Hamad Stadium </span>
                                                </p>                                         
                                            </div>
                                            <p className='small ' style={{color:'#000',fontWeight:'500',fontSize:'14px',marginTop:'-5px',textAlign:'left'}}>
                                                10:30 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                      
                            </Card>
                        </Tab>
                    </Tabs>
           
          
        </section>

       </div>

       
    </Fragment>
  )
}

export default ProfileDetails