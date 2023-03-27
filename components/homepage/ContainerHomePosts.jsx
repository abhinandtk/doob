import React, { Fragment } from 'react'

function ContainerHomePosts() {
  return (
    <Fragment>
    <div className="text_followers">My Followers</div>
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
               <img src="../images/Rec.png" alt="User Picture" />
              
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
              <a>4 comments</a> 
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