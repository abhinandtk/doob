import React from "react";
import { Card } from "antd";
import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import Axios from 'axios'
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";

const { Meta } = Card;

function AllAddress({ addressList,setVisible,setOnSuccess }) {
    const setDefaultHandler =(id)=>{

        Axios.post(apis.defaultAddress,{
            address_id:id
        },
        {
            headers:{
                'Authorization':`Token ${constants.token_id}`,
            }
        }).then((res)=>{
            setVisible(false)
            setOnSuccess((prev)=>!prev)
            console.log('adrelisssssssssssst',res)
        })
    }
  return (
    <Fragment>
      {addressList.map((item, index) => (
        <div key={index} onClick={()=>setDefaultHandler(item.id)}>
          <Card key={index}>
            <Meta
              title={`${item.address_type}`}
              description={item.address_type === "Home" ? (
                <p className="address-card">{`${item.housename}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region.name}`}</p>
              ) : item.address_type === "Office" ? (
                <p className="address-card">{`${item.officename}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region.name}`}</p>
              ) : item.address_type === "Apartment" ? (
                <p className="address-card">{`${item.flat_no},${item.floor},${item.building}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region.name}`}</p>
              ) : (
                <>
                  <p>Customer address</p>
                  <p className="address-card">{`${item.building_flat_house_all}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region.name}`}</p>
                  <p>Provider address</p>
                  <p className="address-card">{`${item.providor_avenue}, ${item.providor_street}, ${item.providor_block}, ${item.providor_area}`}</p>
                </>
              )}
              avatar={<EnvironmentOutlined />}
            />
          </Card>
        </div>
      ))}
    </Fragment>
  );
}

export default AllAddress;
