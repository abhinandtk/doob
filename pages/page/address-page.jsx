import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import React, { useEffect, useState } from "react";
import { Card, Modal } from "antd";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import apis from "@/public/data/my-constants/Apis";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import { notification, Button } from "antd";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const { Meta } = Card;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AddressPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [onSuccess, setOnSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [addressId, setAddressId] = useState(null);
  useEffect(() => {
    Axios.get(apis.addressView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setAddressList(res.data.data);
      console.log("resssssssssssssssssssssssssss", res);
    });
  }, [onSuccess]);
  const setDefaultHandler = (id) => {
    Axios.post(
      apis.defaultAddress,
      {
        address_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
    });
  };

  const deleteConfirmation=(id)=>{
    setVisible(true)
    setAddressId(id)
  }
  const deleteAddressHandler = () => {
    Axios.post(
      apis.deleteAddress,
      {
        address_id: addressId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      setVisible(false)
      console.log("resssssss",res)
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <Modal
        title="Are you sure to delete this address??"
        open={visible}
        centered
        closable
        maskClosable
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            {t("Cancel")}
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={()=>deleteAddressHandler()}
          >
            {t("Submit")}
          </Button>,
        ]}
      ></Modal>
      <div className="store-container">
        <div className="bottom">
          <PagesSideBar currentPage="address" />
          <div className="content-topics my-2">
            <div className="my-3">
              <h4>{t("Address")} </h4>
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
            {addressList.map((item, index) => (
              <div
                key={index}
                style={{ border: item.default ? "1px solid #17A803" : "" ,margin:"10px"}}
              >
                <Card key={index} className="input-theme-prod">
                  <div
                    onClick={() => deleteConfirmation(item.id)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    <DeleteOutlined className="dark-theme-color"/>
                  </div>
                  <Meta
                    title={`${item.address_type}`}
                    description={
                      item.address_type === "Home" ? (
                        <p className="address-card">{`${item.housename}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region.name}`}</p>
                      ) : item.address_type === "Office" ? (
                        <p className="address-card">{`${item.officename}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region.name}`}</p>
                      ) : item.address_type === "Apartment" ? (
                        <p className="address-card">{`Flat No-${item.flat_no},Floor-${item.floor},Building-${item.building}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region.name}`}</p>
                      ) : (
                        <>
                          <p>Customer address</p>
                          <p className="address-card">{`Building-${item.building_flat_house_all}, Avenue-${item.avenue}, ${item.street}, Block-${item.block}, ${item.region.name}`}</p>
                          <p>Provider address</p>
                          <p className="address-card">{`Avenue-${item.providor_avenue}, ${item.providor_street}, Block-${item.providor_block}, ${item.providor_area}`}</p>
                        </>
                      )
                    }
                    avatar={<EnvironmentOutlined />}
                  />
                  <div style={{ display: "flex" }}>
                    <span
                    className="dark-theme-color"
                      onClick={() =>
                        router.push({
                          pathname: `/store/edit-address/${item.id}`,
                          query: {
                            tab:
                              item.address_type === "Home"
                                ? "home"
                                : item.address_type === "Office"
                                ? "office"
                                : item.address_type === "Apartment"
                                ? "apartment"
                                : "thirdParty",
                          },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {t("Edit")}
                    </span>
                    {item.default ? (
                      <span className="mx-3 dark-theme-color">{t("Default Address")}</span>
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setDefaultHandler(item.id)}
                        className="mx-3 dark-theme-color"
                      >
                        {t("Set as Default")}
                      </span>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <MobileFooter />
      </div>
    </div>
  );
}

export default AddressPage;
