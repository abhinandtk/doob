import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Tabs, Form, notification } from "antd";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import HomeAddress from "@/components/stores/address/HomeAddress";
import OfficeAddress from "@/components/stores/address/OfficeAddress";
import ApartmentAddress from "@/components/stores/address/ApartmentAddress";
import ThirdPartyAddress from "@/components/stores/address/ThirdPartyAddress";
import { useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import MobileFooter from "@/components/shared/MobileFooter";
import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function EditAddressPage() {
  const router = useRouter();
  const { locale } = router;
  const { adId } = router.query;
  console.log("page-settings", router);

  const [addressType, setAddressType] = useState(router.query.tab);

  const [country, setCountry] = useState([]);
  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    Axios.get(apis.commonList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCountry(res.data.data.country);
      //   console.log()
    });
    const countryId = localStorage.getItem("country-select");
    const cityData = country.find(
      (country) => country.country_name === countryId
    );
    if (cityData && cityData.regions) {
      setAreaData(cityData.regions);
    }
  }, [country]);

  const handleAddAddress = (data, defaultAddress) => {
    let body = {};
    if (addressType === "home") {
      body = {
        id: adId,
        address_type: "Home",
        name: data.name,
        region: data.area,
        block: data.block,
        street: data.street,
        avenue: data.avenue,
        housename: data.houseName,
        phone: data.phone,
        remark: data.remark,
        is_default: defaultAddress ? "True" : "False",
      };
    } else if (addressType === "office") {
      body = {
        id: adId,
        address_type: "Office",
        name: data.name,
        region: data.area,
        block: data.block,
        street: data.street,
        avenue: data.avenue,
        officename: data.officeName,
        phone: data.phone,
        officenumber: data.officePhone,
        remark: data.remark,
        is_default: defaultAddress ? "True" : "False",
      };
    } else if (addressType === "apartment") {
      body = {
        id: adId,
        address_type: "Apartment",
        name: data.name,
        region: data.area,
        block: data.block,
        street: data.street,
        avenue: data.avenue,
        building: data.building,
        floor: data.floor,
        flat_no: data.flatNo,
        phone: data.phone,
        remark: data.remark,
        is_default: defaultAddress ? "True" : "False",
      };
    } else {
      body = {
        id: adId,
        address_type: "Third Party",
        name: data.name,
        region: data.area,
        block: data.block,
        street: data.street,
        avenue: data.avenue,
        phone: data.phone,
        remark: data.remark,
        building_flat_house_all: data.address,
        providor_name: data.providerName,
        providor_area: data.providerArea,
        providor_block: data.providerBlock,
        providor_street: data.providerStreet,
        providor_avenue: data.providerAvenue,
        is_default: defaultAddress ? "True" : "False",
      };
    }
    // console.log("body", body);
    // console.log("body");
    Axios.post(apis.editAddress, body, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
        console.log("body", body,res);
      if (res.data.status === 1) {
        router.back();
        notification.success({
          message: constants.Success,
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      } else {
        notification.error({
          message: constants.Error,
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container  my-5">
        <h5 className="add-address">Edit Address</h5>

        <div className="card address-card ">
          <div className="card-body p-5  ">
            <h6>Address Type</h6>
            <div className="rrr">
              <button
                className="button button23"
                onClick={() => setAddressType("home")}
                style={{ color: `${addressType === "home" ? "#17A803" : ""}` }}
              >
                <i className="bi bi-house"></i>
                <span className="mx-1">Home</span>
              </button>
              <button
                className="button button23"
                onClick={() => setAddressType("office")}
                style={{
                  color: `${addressType === "office" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-briefcase"></i>
                <span className="mx-1">Office</span>
              </button>
              <button
                className="button button23 "
                onClick={() => setAddressType("apartment")}
                style={{
                  color: `${addressType === "apartment" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-building"></i>
                <span className="mx-1">Apartment</span>
              </button>
              <button
                className="button button23"
                onClick={() => setAddressType("thirdParty")}
                style={{
                  color: `${addressType === "thirdParty" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-grid "></i>
                <span className="mx-1">Third Party</span>
              </button>
            </div>
            {addressType === "home" && (
              <HomeAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
                edit={true}
              />
            )}
            {addressType === "office" && (
              <OfficeAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
                edit={true}
              />
            )}
            {addressType === "apartment" && (
              <ApartmentAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
                edit={true}
              />
            )}
            {addressType === "thirdParty" && (
              <ThirdPartyAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
                edit={true}
              />
            )}
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default EditAddressPage;
