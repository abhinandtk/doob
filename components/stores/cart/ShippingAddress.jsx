import { Button, Modal } from "antd";
import React, { Fragment } from "react";
import { useState } from "react";
import AllAddress from "../address/AllAddress";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
function ShippingAddress({ data, setOnSuccess }) {

  const Router = useRouter()

  const [visible, setVisible] = useState(false);

  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    Axios.get(apis.addressView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setAddressList(res.data.data);
      console.log("resssssssssssssssssssssssssss", res);
    });
  }, []);

  const headerContent =(

    <div>
      <h3>Address </h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Button key='add' onClick={()=>Router.push('/store/add-address')} type="primary" style={{backgroundColor:'#17A803'}}>Add Address</Button>
      </div> 
    </div>

  )

  return (
    <Fragment>
      <Modal
        title={headerContent}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AllAddress
          addressList={addressList}
          setVisible={setVisible}
          setOnSuccess={setOnSuccess}
        />
      </Modal>

      <h6 className="mt-3 ">Shipping Address</h6>
      {data.map((item, index) => (
        <div key={index} className="card mb-2 ">
          <div className="card-body">
            <div className="d-flex justify-content-between ">
              <div className="d-flex flex-row align-items-center ">
                <div>
                  <img
                    src="/images/LocationIcon.png"
                    className="me-4 mb-3"
                  ></img>
                </div>
                <div className="ms-1 mt-3">
                  <h6>{item.address_type}</h6>
                  {item.address_type === "Home" ? (
                    <p className="address-card">{`${item.housename}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region}`}</p>
                  ) : item.address_type === "Office" ? (
                    <p className="address-card">{`${item.officename}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region}`}</p>
                  ) : item.address_type === "Apartment" ? (
                    <p className="address-card">{`${item.flat_no},${item.floor},${item.building}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region}`}</p>
                  ) : (
                    <>
                      <p>Customer address</p>
                      <p className="address-card">{`${item.building_flat_house_all}, ${item.avenue}, ${item.street}, ${item.block}, ${item.region}`}</p>
                      <p>Provider address</p>
                      <p className="address-card">{`${item.providor_avenue}, ${item.providor_street}, ${item.providor_block}, ${item.providor_area}`}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <div onClick={() => setVisible(true)} style={{cursor:'pointer'}}>
                  <span>
                    <img src="/images/Edit.png" className="mt-4 mx-4"></img>
                    {/* <EnvironmentOutlined /> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default ShippingAddress;
