import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Tabs, Form } from "antd";
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
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AddAddressPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = router;

  const [addressType, setAddressType] = useState("home");

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
    console.log("dfvfvvdv");
    let body = {};
    if (addressType === "home") {
      body = {
        address_type: "Home",
        name: data.name,
        region: data.area,
        block: data.block,
        street: data.street,
        avenue: data.avenue,
        housename: data.houseName,
        phone: data.phone,
        remark: data.remark,
        default: defaultAddress ? "True" : "False",
      };
    } else if (addressType === "office") {
      body = {
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
        default: defaultAddress ? "True" : "False",
      };
    } else if (addressType === "apartment") {
      body = {
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
        default: defaultAddress ? "True" : "False",
      };
    } else {
      body = {
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
        default: defaultAddress ? "True" : "False",
      };
    }
    console.log("body", body);
    console.log("body");
    Axios.post(apis.addAddress, body, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      router.push("/store/cart");
    });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div
        className="store-container my-5"
        style={{ direction: locale === "en" ? "ltr" : "rtl" }}
      >
        <h5 className="add-address">{t("Add a New Address")}</h5>

        <div className="card address-card ">
          <div className="card-body p-5  ">
            <h6>{t("Address Type")}</h6>
            <div className="rrr">
              <button
                className="button button23 input-theme-prod"
                onClick={() => setAddressType("home")}
                style={{
                  color: `${addressType === "home" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-house"></i>
                <span className="mx-1">{t("Home")}</span>
              </button>
              <button
                className="button button23 input-theme-prod"
                onClick={() => setAddressType("office")}
                style={{
                  color: `${addressType === "office" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-briefcase"></i>
                <span className="mx-1">{t("Office")}</span>
              </button>
              <button
                className="button button23 input-theme-prod "
                onClick={() => setAddressType("apartment")}
                style={{
                  color: `${addressType === "apartment" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-building"></i>
                <span className="mx-1">{t("Apartment")}</span>
              </button>
              <button
                className="button button23 input-theme-prod"
                onClick={() => setAddressType("thirdParty")}
                style={{
                  color: `${addressType === "thirdParty" ? "#17A803" : ""}`,
                }}
              >
                <i className="bi bi-grid "></i>
                <span className="mx-1">{t("Third Party")}</span>
              </button>
            </div>
            {addressType === "home" && (
              <HomeAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
              />
            )}
            {addressType === "office" && (
              <OfficeAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
              />
            )}
            {addressType === "apartment" && (
              <ApartmentAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
              />
            )}
            {addressType === "thirdParty" && (
              <ThirdPartyAddress
                handleAddAddress={handleAddAddress}
                areaData={areaData}
              />
            )}
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default AddAddressPage;
