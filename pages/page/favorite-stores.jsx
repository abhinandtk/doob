import MainHeader from '@/components/shared/headers/MainHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import PagesSideBar from '@/components/stores/pages/PagesSideBar';
import React, { useState } from 'react'
import { Fragment } from 'react'
import {Container,Nav,Navbar,Dropdown,CardImg,Card} from 'react-bootstrap';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';

function FavoriteStores() {
    const [storeFavList,setStoreFavList]=useState([])

    Axios.get(apis.viewstorewishlist,{
        headers:{
            'Authorization':`Token ${constants.token_id}`
        }
    }).then((res)=>{
        setStoreFavList(res.data.data)
        console.log('wwwwstoreeeeeeeeeeeeeeeeefavvvv',res)
    })
  return (
    <Fragment>
        <MainHeader title='Doob'/>
        <MainSidebarFixed />
        <div className='side-container'>
        <PagesSideBar currentPage='fav-store'/>
        <div className="content-pages">
        <br></br>
        <div className='head'>Favourite Store</div>
            <div className='container'>
                <div className='row store  my-2 '>
                    {storeFavList.map((item,index)=>(
                    <div key={index} className='col-lg-4 col-md-4'>
                        <Card  className='store-card'   >
                            <Card.Img  style={{borderRadius:'12px 12px 0px 0px'}} src={`${item.store.cover_photo}`}  />
                            <Card.Body>
                                <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
                                    {item.store.title}<span style={{float:'right'}}><i className="bi bi-suit-heart-fill"></i></span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div> 
                    ))}           
                    <div className='col-lg-4 col-md-4'>
                        <Card   className='store-card'   >
                            <Card.Img  style={{borderRadius:'12px 12px 0px 0px'}} src="../images/1027 4.jpg"  />
                            <Card.Body>
                                <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
                                    Sports Check<span style={{float:'right'}}><i className="bi bi-suit-heart-fill"></i></span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>            
                    
                </div>
            </div>
        </div>
    </div>
</Fragment>
  )
}

export default FavoriteStores