import React, { Fragment } from 'react'
import {Button} from 'react-bootstrap';
import { Tabs, Form } from 'antd';
import MainHeader from '@/components/shared/headers/MainHeader';
import MobileHeader from '@/components/MobileHeader';
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed';
import HomeAddress from '@/components/stores/address/HomeAddress';
import OfficeAddress from '@/components/stores/address/OfficeAddress';
import ApartmentAddress from '@/components/stores/address/ApartmentAddress';
import ThirdPartyAddress from '@/components/stores/address/ThirdPartyAddress';
import { useState } from 'react';
import Axios from 'axios';
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';

function AddAddressPage() {

    const [addressType,setAddressType]=useState('home')

    const handleAddAddress=(data,defaultAddress)=>{
        console.log('daaaaaaaaaaaaaaaata',data)
        console.log(',,,,,,,,,,,,,',addressType)
        let body ={}
        if (addressType === 'home'){

            body ={
                name:data.name,
                region:data.area,
                block:data.block,
                street:data.street,
                avenue:data.avenue,
                housename:data.houseName,
                phone:data.phone,
                remark:data.remark,
                default:defaultAddress ? 'True' : 'False'
            }
        }else if(addressType === 'office'){
            body ={
                name:data.name,
                region:data.area,
                block:data.block,
                street:data.street,
                avenue:data.avenue,
                officename:data.officeName,
                phone:data.phone,
                officenumber:data.officePhone,
                remark:data.remark,
                default:defaultAddress ? 'True' : 'False'
            }
        }else if(addressType === 'apartment'){
            body ={
                name:data.name,
                region:data.area,
                block:data.block,
                street:data.street,
                avenue:data.avenue,
                building:data.building,
                floor:data.floor,
                flat_no:data.flatNo,
                phone:data.phone,
                remark:data.remark,
                default:defaultAddress ? 'True' : 'False'
            }

        }else{
            body ={
                name:data.name,
                region:data.area,
                block:data.block,
                street:data.street,
                avenue:data.avenue,
                phone:data.phone,
                remark:data.remark,
                building_flat_house_all:data.address,
                providor_name:data.providerName,
                providor_area:data.providerArea,
                providor_block:data.providerBlock,
                providor_street:data.providerStreet,
                flaprovidor_avenuet_no:data.providerAvenue,
                default:defaultAddress ? 'True' : 'False'
            }

        }
        Axios.post(apis.addAddress,body,
        {
            headers:{
                'Authorization':`Token ${constants.token_id}`,
            }
        }).then((res)=>{
            console.log('adddresssssssssssssssss',res)
        })
        

    }
  return (
    <Fragment>
        <MainHeader title="Doob"/>
        <MobileHeader />
        <MainSidebarFixed />
        <div className="store-container  my-5">
            <h5 fw-bold>Add a New Address</h5>
            <div className="card  " style={{width:'85%'}}> 
                <div className="card-body p-5  ">
                    <h6>Address Type</h6>
                    <span >
                        <button 
                        className="button button23" 
                        onClick={()=>setAddressType('home')}
                        style={{color:`${addressType === 'home' ? '#17A803':''}`}}
                        >
                            <i className="bi bi-house"></i>
                            <span className='mx-1'>Home</span>
                        </button> 
                        <button 
                        className="button button23" 
                        onClick={()=>setAddressType('office')}
                        style={{color:`${addressType === 'office' ? '#17A803':''}`}}
                        >
                            <i className="bi bi-briefcase"></i>
                            <span className='mx-1'>Office</span>
                        </button>  
                        <button 
                        className="button button23 " 
                        onClick={()=>setAddressType('apartment')}
                        style={{color:`${addressType === 'apartment' ? '#17A803':''}`}}
                        >
                            <i className="bi bi-building"></i>
                            <span className='mx-1'>Apartment</span>
                        </button>  
                        <button 
                        className="button button23" 
                        onClick={()=>setAddressType('thirdParty')}
                        style={{color:`${addressType === 'thirdParty' ? '#17A803':''}`}}
                        >
                            <i className="bi bi-grid "></i>
                            <span className='mx-1'>Thirty Party</span>
                        </button> 
                    </span>
                    {addressType === 'home' && <HomeAddress handleAddAddress={handleAddAddress}/>}
                    {addressType === 'office' && <OfficeAddress handleAddAddress={handleAddAddress}/>}
                    {addressType === 'apartment' && <ApartmentAddress handleAddAddress={handleAddAddress}/>}
                    {addressType === 'thirdParty' && <ThirdPartyAddress handleAddAddress={handleAddAddress}/>}
                </div>
            </div>
        </div>
        
    </Fragment>
  )
}

export default AddAddressPage