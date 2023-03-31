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
        
            <div
              className="post__avatar"
            >
               <img src="../images/Rec.png" alt="User Picture" />
              
            </div>
           
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
    </Fragment>
  )
}

export default ContainerHomePosts