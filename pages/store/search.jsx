import MainHeader from '@/components/shared/headers/MainHeader'
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed'
import React from 'react'
import { Fragment } from 'react'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import { useState } from 'react'
import StoreProductsCard from '@/components/stores/StoreProductsCard'
import SearchCategory from '@/components/stores/SearchCategory'

function StoreSearchPage() {

    const [searchInput,setSearchInput]=useState('')
    const [resultProduct,setResultProduct]=useState([])
    const searchResult=(e)=>{
        setSearchInput(e.target.value)
        if (searchInput.length >=3 ){
            
            Axios.post(apis.storesearch,{
                user_input:searchInput
            },
            {
                headers:{
                    'Authorization':`Token ${constants.token_id}`,
                }
            }).then((res)=>{
                setResultProduct(res.data.data)
                console.log('IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',res)
            })
        }
    }

  return (
    <Fragment>
        <MainHeader title='Doob'/>
        <MainSidebarFixed />
        <div className="store-container">

            <form className="nosubmit ">
                <input onChange={searchResult} className="nosubmit1" type="search" placeholder="Search"   />
            </form>
    
            <section className='my-2 '>
    
            <SearchCategory />
        
            </section>
            <StoreProductsCard products={resultProduct}/>
            </div>

    </Fragment>
  )
}

export default StoreSearchPage