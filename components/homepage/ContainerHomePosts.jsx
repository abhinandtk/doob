import React, { Fragment } from 'react'
import { useState ,useEffect} from 'react'
import Axios from'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import Comments from './social/Comments'
function ContainerHomePosts() {

  const [visibleComment,setVisibleComment]=useState(false)
  const [liked,setLiked] = useState(false)
  const [totalLike,setTotalLike] = useState()

  const [postsData,setPostsData] = useState([])
  const [postId,setPostId] = useState(null)
  const [slug,setSlug] = useState(null)
  useEffect(()=>{
  Axios.get(apis.posts,{
    headers:{
      'Authorization':`Token ${constants.token_id}`
    }
  }).then((res)=>{
    setPostsData(res.data.data.posts)
    setPostId(res.data.data.posts.post_id)
    console.log('POsts result=-----------------------',res.data.data.posts.post_id)
  })
  },[])

  const likeHandler =(postId)=>{
    console.log('iiiiiiiiiiiiii',postId)
    // e.preventDefault()
    Axios.post(apis.likepost,{
      post_id:postId,
    },{
      headers:{
        'Authorization':`Token ${constants.token_id}`
      }
    }).then((res)=>{
      
      if (res.data.data.status===1){
        console.log('success',liked)
        setLiked(true)
      }else{
        setLiked(false)
      }
      setTotalLike(res.data.data.total_like)
      console.log('this is result',res)
    })
    console.log('like')
  }

  const commentClick = (post_id,slug) =>{
    setVisibleComment(true)
    setPostId(post_id)
    setSlug(slug)

  }
  return (
    <Fragment>
    <div className="text_followers">My Followers</div>
    {postsData.map((item)=>(

    <div className="posts">
      <article className="post">
        <div className="post__header">
          <div className="post__profile">
            <div
              className="post__avatar"
            >
               <img src="../images/profile img.png" alt="User Picture" />
              
            </div>
            <div className="users">
              <div className="post__likes">
                <a  className="post__user">{item.user_detail.name}<span><img src='../images/star.png' className='mx-1 mb-1'></img></span></a>
              </div>
              <div className="time">{Math.floor(Math.abs((new Date(item.posted)- new Date())) / (1000 * 60 * 60))}</div>
            </div>    
          </div>
          <button className="post__more-options">
            <img src="../images/More_Vertical.png" ></img>
          </button>
          
        </div>

        <div className="post__content">
          <div className="post__medias">
           <img
              className="post__media"
              src={`${item.image}`}
              alt="Post Content"
            /> 
            <img
              className="post__media"
              src="../images/soccer-into-goal-success-concept 2.png"
              alt="Post Content"
            />
          </div>
        </div>

        <div className="post__footer">
          <div className="post__buttons">
            <button onClick={()=>likeHandler(item.post_id)} className="post__button ">
            <svg width="30"
                height="30" viewBox="0 0 34 32" stroke='black' fill={`${liked ?'red':'white'}`} xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
           
            <button className="post__button"  style={{marginLeft:'-11px'}}>
            <svg width="30"
                height="30" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8848 15.9742L18.9425 10.3203" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </button>

            <button onClick={()=>{commentClick(item.post_id,item.slug)}} className="post__button post__button--align-right">
              {item.comment_count} comments
            </button>
          </div>

        
          <div className="post__infos">
            <div className="post__likes">
          

              <h6 style={{fontWeight:'600'}}>{totalLike} likes</h6>
            </div>
            <div className="comments">{item.caption}</div>
            
          </div>
        </div>
      </article>   
  
    </div>
      ))}
      {visibleComment && <Comments postId={postId} slug={slug} setVisibleComment={setVisibleComment}/>}


    {/* <div className="posts">
      <article className="post">
        <div className="post__header">
          <div className="post__profile">
            <div
              className="post__avatar"
            >
               <img src="../images/sulthan.png" alt="User Picture" />
              
            </div>
            <div className="users">
              <div className="post__likes">
                <a href="" className="post__user">Sulthan<span className='mx-1' style={{color:'#616661'}}>Shared</span>  SHAKU Ath05 Football</a>
              </div>
              <div className="time">2 hours ago</div>
            </div>    
          </div>
          <button className="post__more-options">
            <img src="../images/More_Vertical.png" ></img>
          </button>
          
        </div>

        <div className="post__content">
          <div className="post__medias">
           <img
              className="post__media"
              src="../images/post-football.png"
              alt="Post Content"
            /> 
          
          </div>
        </div>

        <div className="post__footer">
          <div className="post__buttons">
          

            <button className="post__button post__button--align-right">
              <a><span className='me-2' style={{color:'#959595',fontWeight:'550',fontSize:'14px'}}><s>10.315 KD</s></span><span style={{color:'#17A803',fontWeight:'600'}}>8.300 KD</span></a>
               
            </button>
          </div>
          <div className="post__info">
            <div className="post__likes">
          

              <h6 style={{fontWeight:'600'}}>SHAKU Ath05 Football</h6>
            </div>
            <div className="comments col-md-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's....</div>
            
          </div>
        </div>
      </article>
    </div>
    <div className="post__content">
          <div className="post__medias" style={{marginTop:'9px'}}>
           <img
              className="post__media"
              src="../images/Group 12.png"
              alt="Post Content"
            /> 
          
          </div>
        </div>
    <div className="posts">
      <article className="post">
        <div className="post__header">
          <div className="post__profile">

            <div
              
              className="post__avatar"
            >
               <img src="../images/Mask group.png" alt="User Picture" />
              
            </div>
            <div className="users">
              <div className="post__likes">
                <a href="" className="post__user">Musaid</a>
              </div>
              <div className="time">2 hours ago</div>
            </div>    
          </div>
          <div className="post__more-options">
         <span><button className='bx'>Follow</button></span>   <img src="../images/More_Vertical.png" ></img>
          </div>
          
        </div>

        <div className="post__content">
          <div className="post__medias">
           <img
              className="post__media"
              src="../images/Rectangle 17744.png"
              alt="Post Content"
            /> 
          
          </div>
        </div>

        <div className="post__footer">
          <div className="post__buttons">
          <button className="post__button ">
            <svg width="30"
                height="30" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            <button className="post__button"  style={{marginLeft:'-11px'}}>
            <svg width="30"
                height="30" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8848 15.9742L18.9425 10.3203" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

       </button>
            <button className="post__button post__button--align-right">
              4 comments
            </button>
          </div>
          <div className="post__infos">
            <div className="post__likes">
              <h6 style={{fontWeight:'600'}}>450 likes</h6>
            </div>
            <div className="comments">There are many variations of passages of Lorem Ipsum available</div>
            
          </div>
        </div>
      </article>
    </div> */}
     <div className="posts">
            <article className="post">
              <div className="post__header">
                <div className="post__profile">
                  <a
                    href="#"
                    className="post__avatar"
                  >
                     <img src="../images/profile img.png" alt="User Picture" />
                    
                  </a>
                  <div className="users">
                    <div className="post__likes">
                      <a href="" className="post__user">Ahmad Albedaiwi<span><img src='../images/star.png' className='mx-1 mb-1'></img></span></a>
                    </div>
                    <div className="time">2 hours ago</div>
                  </div>    
                </div>
                <button className="post__more-options">
                  <img src="../images/More_Vertical.png" ></img>
                </button>
                
              </div>

              <div className="post__content">
                <div className="post__medias">
                 <img
                    className="post__media"
                    src="../images/soccer-players-action-professional-stadium 2.png"
                    alt="Post Content"
                  /> 
                  <img
                    className="post__media"
                    src="../images/soccer-into-goal-success-concept 2.png"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div className="post__footer">
                <div className="post__buttons">
                  <button className="post__button ">
                  <svg width="30"
                      height="30" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </button>
                 
                  <button className="post__button"  style={{marginLeft:'-11px'}}>
                  <svg width="30"
                      height="30" viewBox="0 0 30 28"  fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8848 15.9742L18.9425 10.3203" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </button>
        
                  

                </div>

              
                <div className="post__infos">
                  <div className="post__likes">
                

                    <h6 style={{fontWeight:'600'}}>450 likes</h6>
                  </div>
                  <div className="comments">There are many variations of passages of Lorem Ipsum available</div>
                  
                </div>
              </div>
            </article>   
        
          </div>
          <div className="posts">
            <article className="post">
              <div className="post__header">
                <div className="post__profile">
                  <a
                    href="#"
                    className="post__avatar"
                  >
                     <img src="../images/sulthan.png" alt="User Picture" />
                    
                  </a>
                  <div className="users">
                    <div className="post__likes">
                      <a href="" className="post__user">Sulthan<span className='mx-1' style={{color:'#616661'}}>Shared</span>  SHAKU Ath05 Football</a>
                    </div>
                    <div className="time">2 hours ago</div>
                  </div>    
                </div>
                <button className="post__more-options">
                  <img src="../images/More_Vertical.png" ></img>
                </button>
                
              </div>

              <div className="post__content">
                <div className="post__medias">
                 <img
                    className="post__media"
                    src="../images/post-football.png"
                    alt="Post Content"
                  /> 
                
                </div>
              </div>

              <div className="post__footer">
                <div className="post__buttons">
                

                  <button className="post__button post__button--align-right">
                    <a><span className='me-2' style={{color:'#959595',fontWeight:'550',fontSize:'14px'}}><s>10.315 KD</s></span><span style={{color:'#17A803',fontWeight:'600'}}>8.300 KD</span></a>
                     
                  </button>
                </div>
                <div className="post__info">
                  <div className="post__likes">
                

                    <h6 style={{fontWeight:'600'}}>SHAKU Ath05 Football</h6>
                  </div>
                  <div className="comments col-md-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's....</div>
                  
                </div>
              </div>
            </article>
          </div>
          <div className="post__content">
                <div className="post__medias" style={{marginTop:'9px'}}>
                 <img
                    className="post__media"
                    src="../images/Group 12.png"
                    alt="Post Content"
                  /> 
                
                </div>
              </div>
          <div className="posts">
            <article className="post">
              <div className="post__header">
                <div className="post__profile">

                  <a
                    href="#"
                    className="post__avatar"
                  >
                     <img src="../images/Mask group.png" alt="User Picture" />
                    
                  </a>
                  <div className="users">
                    <div className="post__likes">
                      <a href="" className="post__user">Musaid</a>
                    </div>
                    <div className="time">2 hours ago</div>
                  </div>    
                </div>
                <button className="post__more-options">
               <span><button className='bx'>Follow</button></span>   <img src="../images/More_Vertical.png" ></img>
                </button>
                
              </div>

              <div className="post__content">
                <div className="post__medias">
                 <img
                    className="post__media"
                    src="../images/Rectangle 17744.png"
                    alt="Post Content"
                  /> 
                
                </div>
              </div>

              <div className="post__footer">
                <div className="post__buttons">
                <button className="post__button ">
                  <svg width="30"
                      height="30" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </button>
                  <button className="post__button"  style={{marginLeft:'-11px'}}>
                  <svg width="30"
                      height="30" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8848 15.9742L18.9425 10.3203" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

             </button>
                  <button className="post__button post__button--align-right">
                    <a>4 comments</a> 
                  </button>
                </div>
                <div className="post__infos">
                  <div className="post__likes">
                    <h6 style={{fontWeight:'600'}}>450 likes</h6>
                  </div>
                  <div className="comments">There are many variations of passages of Lorem Ipsum available</div>
                  
                </div>
              </div>
            </article>
          </div>
    <div className="posts">
      <article className="post">
        <div className="post__header">
          <div className="post__profile">
        
         
            <a
              href="#"
              className="post__avatar"
            >
              
               <img src="../images/profile 5.png" alt="User Picture" />
            </a>
            <a
              href="#"
              className="post__avatar1"
            >
              
               <img src="../images/Rec.png"  alt="User Picture" />
            </a>
          
           
            <div className="users">
              <div className="post__likes">
              <a href="" className="post__user">Ayman<span className='mx-1' style={{color:'#616661'}}>Shared</span>Musaid's Post</a>
              </div>
              <div className="time">1 days</div>
            </div>    
          </div>
          <button className="post__more-options">
          <img src="../images/More_Vertical.png" ></img>
          </button>
          
        </div>

        <div className="post__content">
          <div className="post__medias">
           <img
              className="post__media"
              src="../images/soccer-into-goal-success-concept 2.png"
              alt="Post Content"
            /> 
          
          </div>
        </div>

        <div className="post__footer">
          <div className="post__buttons">
          <button className="post__button ">
            <svg width="30"
                height="30" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            <button className="post__button"  style={{marginLeft:'-11px'}}>
            <svg width="30"
                height="30" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8848 15.9742L18.9425 10.3203" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z" stroke="black" stroke-width="1.50701" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </button>
            <button className="post__button post__button--align-right">
              4 comments
            </button>
          </div>
          <div className="post__infos">
            <div className="post__likes">
              <h6 style={{fontWeight:'600'}}>256 likes</h6>
            </div>
            <div className="comments">There are many variations of passages of Lorem Ipsum available</div>
            
          </div>
        </div>
      </article>
      
    </div>
    <div className="post__content">
          <div className="post__medias" style={{marginTop:'9px'}}>
           <img
              className="post__media"
              src="../images/Group 13.png"
              alt="Post Content"
            /> 
          
          </div>
    </div>
    <nav class="navbar" style={{backgroundColor:'#EEEEEE',position:'sticky',bottom:'0'}} >
      <a href="#" class="navbar__button">
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6585 7.37338L9.6585 1.24746C9.28148 0.917513 8.71852 0.917513 8.3415 1.24746L1.3415 7.37338C1.12448 7.5633 1 7.83767 1 8.12607V16.9998C1 17.5522 1.44772 18 2 18H6C6.55228 18 7 17.5522 7 16.9998V12.9992C7 12.4469 7.44772 11.9991 8 11.9991H10C10.5523 11.9991 11 12.4469 11 12.9992V16.9998C11 17.5522 11.4477 18 12 18H16C16.5523 18 17 17.5522 17 16.9998V8.12607C17 7.83767 16.8755 7.5633 16.6585 7.37338Z" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
      </a>
      <a href="#" class="navbar__button">
      <svg width="19" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4082 2.49197V2.59197H16.5082H16.9753C18.0377 2.59315 18.8988 3.45429 18.9 4.5168V16.9752C18.8994 18.0377 18.0377 18.8994 16.9754 18.9H2.0247C0.962275 18.8988 0.101184 18.0377 0.0999999 16.9752L0.1 4.51675C0.101213 3.45426 0.962293 2.59315 2.0247 2.59197H2.4918H2.5918V2.49197V0.77874C2.5918 0.404098 2.89589 0.1 3.27049 0.1C3.64509 0.1 3.94918 0.404098 3.94918 0.77874V2.49197V2.59197H4.04918H14.9508H15.0508V2.49197V0.77874C15.0508 0.404098 15.3549 0.1 15.7295 0.1C16.1041 0.1 16.4082 0.404098 16.4082 0.77874V2.49197ZM2.02459 3.94945L2.02435 3.94945C1.7114 3.9502 1.45813 4.2035 1.45738 4.51645V4.51669V6.22992V6.32992H1.55738H17.4426H17.5426V6.22992V4.51669C17.5426 4.20355 17.2885 3.94945 16.9754 3.94945L2.02459 3.94945ZM1.55738 7.6874H1.45738V7.7874V16.9753C1.45738 17.2884 1.71145 17.5425 2.02459 17.5425H16.9754C17.2885 17.5425 17.5426 17.2884 17.5426 16.9753V7.7874V7.6874H17.4426H1.55738Z" fill="black" stroke="black" stroke-width="0.2"/>
              </svg>  
      </a>
      <a href="#" class="navbar__button">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.36828 4.0671C9.43527 3.97763 9.56473 3.97763 9.63172 4.0671L10.1007 4.69363C10.12 4.71936 10.1457 4.73893 10.1751 4.75013L10.8899 5.02286C10.9921 5.06181 11.0321 5.19057 10.9714 5.28481L10.5464 5.94477C10.5289 5.97186 10.519 6.00353 10.518 6.03618L10.4908 6.83128C10.4869 6.94481 10.3821 7.02439 10.2777 6.99317L9.546 6.7745C9.51589 6.76552 9.48411 6.76552 9.454 6.7745L8.72232 6.99317C8.61786 7.02439 8.51307 6.94481 8.50923 6.83128L8.48204 6.03618C8.48096 6.00353 8.47109 5.97186 8.45361 5.94477L8.0286 5.28481C7.96788 5.19057 8.00794 5.06181 8.11006 5.02286L8.82493 4.75013C8.85429 4.73893 8.88004 4.71936 8.89928 4.69363L9.36828 4.0671Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.95949 1.14185C2.95949 0.511224 3.47071 0 4.10134 0H14.8986C15.5257 0 16.0404 0.505444 16.0404 1.13959V1.14859V1.15762V1.16664V1.17568V1.18474V1.19379V1.20287V1.21195V1.22104V1.23014V1.23925V1.24837V1.2575V1.26664V1.2758V1.28495V1.29412V1.3033V1.31249V1.32169V1.33091V1.34012V1.34935V1.35859V1.36784V1.3771V1.38636V1.39564V1.40493V1.41422V1.42354V1.43285V1.44217V1.45151V1.46085V1.4702V1.47957V1.48894V1.49832V1.50771V1.51711V1.52653V1.53594V1.54537V1.5548V1.56425V1.57371V1.58317V1.59264V1.60213V1.61162V1.62112V1.63063V1.64014V1.64967V1.65921V1.66876V1.67831V1.68787V1.69745V1.70703V1.71661V1.72621V1.73582V1.74543V1.75506V1.76469V1.77433V1.78398V1.79364V1.80331V1.81299V1.82267V1.83236V1.84207V1.85177V1.86149V1.87122V1.88096V1.8907V1.90044V1.91021V1.91998V1.92975V1.93954V1.94933V1.95912V1.96893V1.97301H16.4054C17.8383 1.97301 19 3.1346 19 4.5675V5.85684C19 6.85688 18.4252 7.76789 17.5226 8.1985L15.6865 9.07445C15.6288 9.10207 15.5687 9.11991 15.5084 9.1287C14.5838 11.2727 12.545 12.8234 10.1215 13.0518V14.7975H11.8019C12.3632 14.7975 12.9095 14.9796 13.3585 15.3164L14.4108 16.1056C15.647 17.0328 14.9913 19 13.446 19H5.554C4.00871 19 3.35295 17.0328 4.5892 16.1056L5.64146 15.3164C6.09056 14.9796 6.63679 14.7975 7.19816 14.7975H8.87853V13.0518C6.45502 12.8234 4.41634 11.2727 3.49156 9.1287C3.43127 9.11991 3.37126 9.10207 3.31338 9.07445L1.47734 8.1985C0.574749 7.76789 0 6.85688 0 5.85684V4.5675C0 3.1346 1.16159 1.97301 2.59449 1.97301H2.95949V1.14185ZM14.7975 6.5407C14.7975 9.46573 12.4268 11.8369 9.50198 11.838H9.49993C6.57425 11.838 4.20248 9.46626 4.20248 6.5405V1.24299H14.7975V1.24837V1.2575V1.26664V1.2758V1.28495V1.29412V1.3033V1.31249V1.32169V1.33091V1.34012V1.34935V1.35859V1.36784V1.3771V1.38636V1.39564V1.40493V1.41422V1.42354V1.43285V1.44217V1.45151V1.46085V1.4702V1.47957V1.48894V1.49832V1.50771V1.51711V1.52653V1.53594V1.54537V1.5548V1.56425V1.57371V1.58317V1.59264V1.60213V1.61162V1.62112V1.63063V1.64014V1.64967V1.65921V1.66876V1.67831V1.68787V1.69745V1.70703V1.71661V1.72621V1.73582V1.74543V1.75506V1.76469V1.77433V1.78398V1.79364V1.80331V1.81299V1.82267V1.83236V1.84207V1.85177V1.86149V1.87122V1.88096V1.8907V1.90044V1.91021V1.91998V1.92975V1.93954V1.94933V1.95912V1.96893V1.97875V1.98857V1.99841V2.00825V2.0181V2.02796V2.03782V2.04769V2.05758V2.06746V2.07736V2.08727V2.09717V2.10709V2.11702V2.12695V2.1369V2.14685V2.15681V2.16677V2.17674V2.18672V2.19671V2.20671V2.21671V2.22673V2.23674V2.24677V2.2568V2.26684V2.27689V2.28694V2.29701V2.30708V2.31716V2.32724V2.33733V2.34743V2.35754V2.36765V2.37777V2.38789V2.39803V2.40817V2.41832V2.42848V2.43863V2.44881V2.45898V2.46917V2.47935V2.48955V2.49975V2.50996V2.52018V2.5304V2.54063V2.55087V2.56111V2.57137V2.58162V2.59188V2.60215V2.61243V2.62271V2.633V2.6433V2.6536V2.66391V2.67422V2.68454V2.69487V2.7052V2.71554V2.72589V2.73624V2.7466V2.75697V2.76734V2.77771V2.7881V2.79849V2.80888V2.81929V2.82969V2.84011V2.85052V2.86096V2.87138V2.88182V2.89226V2.90271V2.91317V2.92363V2.9341V2.94456V2.95504V2.96553V2.97601V2.98651V2.99701V3.00751V3.01803V3.02855V3.03907V3.0496V3.06013V3.07067V3.08121V3.09176V3.10232V3.11287V3.12344V3.13401V3.14459V3.15517V3.16576V3.17635V3.18695V3.19755V3.20815V3.21877V3.22938V3.24001V3.25063V3.26126V3.2719V3.28254V3.29319V3.30384V3.3145V3.32516V3.33582V3.34649V3.35718V3.36786V3.37854V3.38923V3.39993V3.41062V3.42133V3.43204V3.44275V3.45346V3.46419V3.47491V3.48565V3.49638V3.50712V3.51787V3.52862V3.53937V3.55012V3.56088V3.57165V3.58242V3.5932V3.60398V3.61476V3.62555V3.63633V3.64713V3.65793V3.66873V3.67954V3.69035V3.70116V3.71199V3.72281V3.73363V3.74446V3.7553V3.76614V3.77698V3.78783V3.79868V3.80953V3.82039V3.83124V3.84211V3.85298V3.86385V3.87472V3.88561V3.89648V3.90737V3.91826V3.92916V3.94005V3.95095V3.96186V3.97276V3.98367V3.99458V4.00549V4.01641V4.02733V4.03826V4.04919V4.06012V4.07105V4.08199V4.09294V4.10388V4.11482V4.12578V4.13673V4.14768V4.15865V4.1696V4.18057V4.19154V4.20251V4.21348V4.22445V4.23544V4.24642V4.2574V4.26839V4.27938V4.29037V4.30136V4.31236V4.32336V4.33436V4.34537V4.35637V4.36738V4.3784V4.38941V4.40043V4.41144V4.42247V4.43349V4.44452V4.45554V4.46658V4.47761V4.48864V4.49968V4.51072V4.52176V4.53281V4.54385V4.55489V4.56595V4.57699V4.58805V4.59911V4.61016V4.62122V4.63228V4.64334V4.6544V4.66548V4.67654V4.68761V4.69868V4.70975V4.72083V4.73191V4.74299V4.75407V4.76515V4.77623V4.78732V4.7984V4.80949V4.82057V4.83166V4.84275V4.85384V4.86494V4.87603V4.88713V4.89823V4.90932V4.92042V4.93153V4.94263V4.95373V4.96484V4.97594V4.98705V4.99815V5.00927V5.02038V5.03148V5.0426V5.05371V5.06482V5.07594V5.08705V5.09817V5.10929V5.1204V5.13152V5.14264V5.15376V5.16487V5.176V5.18712V5.19824V5.20936V5.22049V5.23161V5.24273V5.25386V5.26498V5.2761V5.28724V5.29836V5.30949V5.32061V5.33174V5.34286V5.354V5.36512V5.37625V5.38738V5.3985V5.40963V5.42076V5.43189V5.44302V5.45414V5.46527V5.4764V5.48753V5.49865V5.50979V5.52091V5.53204V5.54317V5.55429V5.56542V5.57654V5.58768V5.5988V5.60993V5.62105V5.63218V5.6433V5.65443V5.66555V5.67667V5.68779V5.69892V5.71003V5.72116V5.73227V5.7434V5.75451V5.76563V5.77675V5.78787V5.79899V5.8101V5.82121V5.83232V5.84344V5.85455V5.86566V5.87677V5.88788V5.89898V5.91009V5.9212V5.93231V5.94341V5.95451V5.96562V5.97672V5.98781V5.99891V6.01001V6.0211V6.0322V6.04329V6.05438V6.06547V6.07655V6.08764V6.09873V6.10981V6.1209V6.13198V6.14306V6.15413V6.16522V6.17629V6.18737V6.19843V6.2095V6.22057V6.23164V6.24271V6.25377V6.26483V6.27589V6.28695V6.298V6.30906V6.32011V6.33115V6.34221V6.35325V6.36429V6.37533V6.38637V6.39742V6.40845V6.41948V6.43051V6.44154V6.45257V6.46359V6.47461V6.48563V6.49665V6.50767V6.51868V6.52969V6.5407ZM15.9605 7.56656L16.9874 7.07664C17.4575 6.85233 17.757 6.37778 17.757 5.85684V4.5675C17.757 3.82109 17.1519 3.216 16.4054 3.216H16.0404V3.21877V3.22938V3.24001V3.25063V3.26126V3.2719V3.28254V3.29319V3.30384V3.3145V3.32516V3.33582V3.34649V3.35718V3.36786V3.37854V3.38923V3.39993V3.41062V3.42133V3.43204V3.44275V3.45346V3.46419V3.47491V3.48565V3.49638V3.50712V3.51787V3.52862V3.53937V3.55012V3.56088V3.57165V3.58242V3.5932V3.60398V3.61476V3.62555V3.63633V3.64713V3.65793V3.66873V3.67954V3.69035V3.70116V3.71199V3.72281V3.73363V3.74446V3.7553V3.76614V3.77698V3.78783V3.79868V3.80953V3.82039V3.83124V3.84211V3.85298V3.86385V3.87472V3.88561V3.89648V3.90737V3.91826V3.92916V3.94005V3.95095V3.96186V3.97276V3.98367V3.99458V4.00549V4.01641V4.02733V4.03826V4.04919V4.06012V4.07105V4.08199V4.09294V4.10388V4.11482V4.12578V4.13673V4.14768V4.15865V4.1696V4.18057V4.19154V4.20251V4.21348V4.22445V4.23544V4.24642V4.2574V4.26839V4.27938V4.29037V4.30136V4.31236V4.32336V4.33436V4.34537V4.35637V4.36738V4.3784V4.38941V4.40043V4.41144V4.42247V4.43349V4.44452V4.45554V4.46658V4.47761V4.48864V4.49968V4.51072V4.52176V4.53281V4.54385V4.55489V4.56595V4.57699V4.58805V4.59911V4.61016V4.62122V4.63228V4.64334V4.6544V4.66548V4.67654V4.68761V4.69868V4.70975V4.72083V4.73191V4.74299V4.75407V4.76515V4.77623V4.78732V4.7984V4.80949V4.82057V4.83166V4.84275V4.85384V4.86494V4.87603V4.88713V4.89823V4.90932V4.92042V4.93153V4.94263V4.95373V4.96484V4.97594V4.98705V4.99815V5.00927V5.02038V5.03148V5.0426V5.05371V5.06482V5.07594V5.08705V5.09817V5.10929V5.1204V5.13152V5.14264V5.15376V5.16487V5.176V5.18712V5.19824V5.20936V5.22049V5.23161V5.24273V5.25386V5.26498V5.2761V5.28724V5.29836V5.30949V5.32061V5.33174V5.34286V5.354V5.36512V5.37625V5.38738V5.3985V5.40963V5.42076V5.43189V5.44302V5.45414V5.46527V5.4764V5.48753V5.49865V5.50979V5.52091V5.53204V5.54317V5.55429V5.56542V5.57654V5.58768V5.5988V5.60993V5.62105V5.63218V5.6433V5.65443V5.66555V5.67667V5.68779V5.69892V5.71003V5.72116V5.73227V5.7434V5.75451V5.76563V5.77675V5.78787V5.79899V5.8101V5.82121V5.83232V5.84344V5.85455V5.86566V5.87677V5.88788V5.89898V5.91009V5.9212V5.93231V5.94341V5.95451V5.96562V5.97672V5.98781V5.99891V6.01001V6.0211V6.0322V6.04329V6.05438V6.06547V6.07655V6.08764V6.09873V6.10981V6.1209V6.13198V6.14306V6.15413V6.16522V6.17629V6.18737V6.19843V6.2095V6.22057V6.23164V6.24271V6.25377V6.26483V6.27589V6.28695V6.298V6.30906V6.32011V6.33115V6.34221V6.35325V6.36429V6.37533V6.38637V6.39742V6.40845V6.41948V6.43051V6.44154V6.45257V6.46359V6.47461V6.48563V6.49665V6.50767V6.51868V6.52969V6.5407C16.0404 6.88972 16.0131 7.23235 15.9605 7.56656ZM2.95949 6.5405C2.95949 6.88959 2.98685 7.2323 3.03951 7.56658L2.01255 7.07664C1.54239 6.85233 1.24299 6.37778 1.24299 5.85684V4.5675C1.24299 3.82109 1.84807 3.216 2.59449 3.216H2.95949V6.5405ZM6.38725 16.3108C6.6212 16.1354 6.90573 16.0405 7.19816 16.0405H9.50002H11.8019C12.0942 16.0405 12.3788 16.1354 12.6127 16.3108L13.665 17.1C13.9456 17.3105 13.7968 17.757 13.446 17.757H5.554C5.20322 17.757 5.05438 17.3105 5.33499 17.1L6.38725 16.3108Z" fill="black"/>
          </svg>
      </a>
      <a href="#" class="navbar__button">
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.4619 3C11.4619 2.46957 11.2553 1.96086 10.8876 1.58579C10.5198 1.21071 10.0211 1 9.50098 1C8.9809 1 8.48213 1.21071 8.11438 1.58579C7.74662 1.96086 7.54002 2.46957 7.54002 3M6.5517 13H9.49314M12.4346 13H9.49314M9.49314 13V10M9.49314 13V16M16.6193 7.696L17.9772 16.696C18.0202 16.9808 18.0022 17.2718 17.9247 17.5489C17.8471 17.8261 17.7118 18.0828 17.5279 18.3016C17.344 18.5204 17.1159 18.6961 16.8592 18.8167C16.6025 18.9372 16.3233 18.9997 16.0408 19H2.96119C2.67845 19 2.39905 18.9377 2.14214 18.8173C1.88523 18.6969 1.65689 18.5212 1.47277 18.3024C1.28865 18.0836 1.15311 17.8267 1.07544 17.5494C0.997772 17.2721 0.979809 16.981 1.02279 16.696L2.38075 7.696C2.45198 7.22359 2.68674 6.79282 3.0425 6.4817C3.39826 6.17059 3.8515 5.9997 4.32013 6H14.6818C15.1503 5.99994 15.6033 6.17094 15.9589 6.48203C16.3144 6.79312 16.549 7.22376 16.6202 7.696H16.6193Z" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>          
      </a>
      <a href="#" class="navbar__button">
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9.31323" cy="5.55051" r="4" stroke="black" stroke-width="1.4"/>
          <path d="M1.31323 15.964C1.31323 15.2316 1.65946 14.5412 2.30781 14.2005C3.57611 13.534 6.00758 12.5505 9.31323 12.5505C12.6189 12.5505 15.0504 13.534 16.3187 14.2005C16.967 14.5412 17.3132 15.2316 17.3132 15.964V15.964C17.3132 16.7916 16.8697 17.5552 16.0983 17.855C14.7796 18.3676 12.4366 19.0505 9.31323 19.0505C6.18983 19.0505 3.84688 18.3676 2.52815 17.855C1.75676 17.5552 1.31323 16.7916 1.31323 15.964V15.964Z" stroke="black" stroke-width="1.4"/>
          </svg>                 
      </a>
    
    </nav>
    </Fragment>
  )
}

export default ContainerHomePosts