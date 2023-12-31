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
import { useTranslation } from "next-i18next";
function ShippingAddress({ data, setOnSuccess }) {
  const { t } = useTranslation();
  console.log("reultadd", data);
  const router = useRouter();
  const { locale } = router;

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

  const headerContent = (
    <div>
      <h3>{t("Address")} </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Button
          key="add"
          onClick={() => router.push("/store/add-address")}
          type="primary"
          style={{ backgroundColor: "#17A803" }}
        >
          {t("Add Address")}
        </Button>
      </div>
    </div>
  );

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

      <h6 className="mt-3 dark-theme-color">{t("Shipping Address")}</h6>
      {data.length !== 0 ? (
        data.map((item, index) => (
          <div key={index} className="card mb-2 ">
            <div className="card-body">
              <div className="d-flex justify-content-between ">
                <div className="d-flex flex-row align-items-center ">
                  <div>
                    <img
                      src="/images/LocationIcon.png"
                      className={`${
                        locale === "en" ? "me-4 mb-3" : "mx-2 mb-3"
                      }`}
                    ></img>
                  </div>
                  <div className="ms-1 mt-3">
                    <h6>{item.address_type}</h6>
                    {item.address_type === "Home" ? (
                      <p className="address-card">{`${item.housename}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region}`}</p>
                    ) : item.address_type === "Office" ? (
                      <p className="address-card">{`${item.officename}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region}`}</p>
                    ) : item.address_type === "Apartment" ? (
                      <p className="address-card">{`Flat No-${item.flat_no},Floor-${item.floor},Building-${item.building}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region}`}</p>
                    ) : (
                      <>
                        <p>Customer address</p>
                        <p className="address-card">{`Building-${item.building_flat_house_all}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region}`}</p>
                        <p>Provider address</p>
                        <p className="address-card">{`Avenue-${item.providor_avenue}, ${item.providor_street}, Block-${item.providor_block}, ${item.providor_area}`}</p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => setVisible(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <img src="/images/Edit.png" className="mt-4 mx-4"></img>
                      
                      {/* <EnvironmentOutlined /> */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            key="add"
            onClick={() => router.push("/store/add-address")}
            type="primary"
            style={{ backgroundColor: "#17A803" }}
          >
            {t("Add Address")}
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default ShippingAddress;
