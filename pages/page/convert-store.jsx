import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import apis from "@/public/data/my-constants/Apis";
import React, { useState } from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function ConvertStoreForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    address: "",
    location: "",
    gmap: "",
    contact: "",
    email: "",
    logo: "",
    cover: "",
    start: "",
    end: "",
    tradeName: "",
    licenseNo: "",
    foundYear: "",
    contractNo: "",
    signature: "",
    sponsorship: "",
  });

  const router = useRouter();
  const { locale } = router;
  const labels = Labels();

  const changeHandler = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };

  const changeHandlerFile = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.files[0];
    setFormData({ ...newFormData });
    // const formdata = new FormData();
    // formdata.append("file_field_name", e.target.files[0]);
    // Axios.post(apis.allImagesUpload, formdata, {
    //   headers: {
    //     Authorization: `Token ${constants.token_id}`,
    //   },
    // }).then((res) => {
    //   newFormData[e.target.id] = res.data.image_url;
    //   setFormData({ ...newFormData });
    //   console.log(",form23", newFormData);
    // });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("arabic_title", formData.title_ar);
    formdata.append("description", formData.description);
    formdata.append("arabic_description", formData.description_ar);
    formdata.append("address", formData.address);
    formdata.append("location", formData.location);
    formdata.append("doob_map_location", formData.gmap);
    formdata.append("contact_no", formData.contact);
    formdata.append("store_email", formData.email);
    formdata.append("start_time", formData.start);
    formdata.append("end_time", formData.end);
    formdata.append("trade_name", formData.tradeName);
    formdata.append("trade_license", formData.licenseNo);
    formdata.append("official_founding_year", formData.foundYear);
    formdata.append("foundation_contract", formData.contractNo);
    formdata.append("logo", formData.logo);
    formdata.append("cover_photo", formData.cover);
    formdata.append("authorized_signature_copy", formData.signature);
    formdata.append("sponosor_shipagreement", formData.sponsorship);
    console.log("resultof store", formData);

    Axios.post(apis.requestStore, formdata, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("resultfrom", res);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Requested successfully"]}`,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
      router.push("/page/settings-page");
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <div className="bottom">
          <PagesSideBar currentPage="settings" />
          <div className="content-topics ">
            <h6
              className=" my-4"
              style={{ color: "#17a803", fontWeight: "700" }}
            ></h6>

            <div className="my-4 mx-4 ">
              <h6 style={{ fontSize: "14px", fontWeight: "700" }}>
                {t("Store Details")}
              </h6>
              <br></br>
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">{t("Title")}*</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="title"
                    // value={formData.title}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">{t("Arabic Title")}*</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="title_ar"
                    // value={formData.title}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    {t("Description")}*
                  </label>
                  <textarea
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    rows={3}
                    id="description"
                    // value={formData.description}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                     {t("Arabic Description")}*
                  </label>
                  <textarea
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    rows={3}
                    id="description_ar"
                    // value={formData.description}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">{t("Address")}*</label>
                  <textarea
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    rows={3}
                    id="address"
                    // value={formData.address}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">{t("Location")}*</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="location"
                    // value={formData.location}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">
                    {t("Google Map Location")}*
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="gmap"
                    // value={formData.gmap}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    {t("Contact No")}*
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="contact"
                    // value={formData.contact}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">{t("Store E-mail")}*</label>
                  <input
                    required
                    type="email"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="email"
                    // value={formData.email}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">{t("Logo")}*</label>
                  <input
                    required
                    type="file"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="logo"
                    // value={formData.logo}
                    onChange={(e) => changeHandlerFile(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">
                    {t("Cover Photo")}*
                  </label>
                  <input
                    required
                    type="file"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="cover"
                    // value={formData.cover}
                    onChange={(e) => changeHandlerFile(e)}
                  />
                </div>

                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">
                    {t("Start Time")}*
                  </label>
                  <input
                    required
                    type="time"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="start"
                    // value={formData.start}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">{t("End Time")}*</label>
                  <input
                    required
                    type="time"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="end"
                    // value={formData.end}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>

                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">{t("Trade Name")}*</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="tradeName"
                    // value={formData.tradeName}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">{t("Trade License No")}*</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="licenseNo"
                    // value={formData.licenseNo}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">
                    {t("Official Founding Year")}*
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="foundYear"
                    // value={formData.foundYear}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    {t("Foundation Contract No")}*
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="contractNo"
                    // value={formData.contractNo}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">
                    {t("Authorized Signature Copy")}*
                  </label>
                  <input
                    required
                    type="file"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="signature"
                    // value={formData.signature}
                    onChange={(e) => changeHandlerFile(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    {t("Sponsorship Agreement")}*
                  </label>
                  <input
                    required
                    type="file"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="sponsorship"
                    // value={formData.sponsorship}
                    onChange={(e) => changeHandlerFile(e)}
                  />
                </div>
                <div className="product-submit my-3">
                  <button type="submit" className="submit-cart-btn">
                    {t("Submit")}
                  </button>
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="sub-cart-btn"
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default ConvertStoreForm;
