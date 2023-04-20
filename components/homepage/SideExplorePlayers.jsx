import {React,useState} from 'react'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import Link from 'next/link'
function SideExplorePlayers() {

    const [exploreData,setExploreData]=useState([])

    Axios.get(apis.explorepage,{
        headers:{
            'Authorization':`Token ${constants.token_id}`,
        }
    }).then((res)=>{
        setExploreData(res.data.data)
        console.log(res)
    })
    
    const exploreFollowHandler=(id)=>{
        Axios.post(apis.follow,{
            user_id:id
        },{
            headers:{
                'Authorization':`Token ${constants.token_id}`
            }
        }).then((res)=>{
            // if(re)
        })
    }
  return (
    
    <section className="side-menu-section ">
        <div className="side-menu__suggestions-section">
        <div className="side-menu__suggestions-header">
            <h2>Explore New Player&apos;s</h2>
            
        </div>    
        <div className="side-menu__suggestions-content">
            {exploreData.slice(0,5).map((item,index)=>(

                <div key={index} className="side-menu__suggestion">
                    <div href="#" className="side-menu__suggestion-avatar">
                        <img src={`${constants.port}${item.image}`} style={{objectFit:'cover',width:'44px'}} alt="User Picture" />
                    </div>
                <Link href={`/userprofile/${item.id}`} style={{textDecoration:'none',color:'black'}}>
                    <div className="side-menu__suggestion-info">
                        <a> {item.name}</a>
                        <span>Followed by Muhammhad Alsalah and 12 more</span>
                    </div>
                </Link>
                <button onClick={()=>exploreFollowHandler(item.id)} className="side-menu__suggestion-button">Follow</button>
                </div>
            ))}
            
        </div>
        <img src="../images/Group 1000003423.png"></img>
        </div>
    </section>
  )
}

export default SideExplorePlayers