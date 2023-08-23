import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons";
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
  const [onSuccess, setOnSuccess] = useState(false);
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

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

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
                  Add Address
                </Button>
              </div>
            </div>
            {addressList.map((item, index) => (
              <div
                key={index}
                style={{ border: item.default ? "1px solid #17A803" : "" }}
              >
                <Card key={index}>
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
                      Edit
                    </span>
                    {item.default ? (
                      <span className="mx-3">Default Address</span>
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setDefaultHandler(item.id)}
                        className="mx-3"
                      >
                        Set as Default
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
