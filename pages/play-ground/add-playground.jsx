import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
import PlayGroundsForm from "@/components/playGround/PlayGroundsForm";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AddPlaygroundPage() {
  const labels = Labels();
  const router = useRouter();
  const {t}=useTranslation()
  const { locale } = router;

  const handlePlaygroundForm = (data, game, amenity, slot) => {
    console.log("data", data, game, amenity, slot);

    const formData = new FormData();
    formData.append("stadium_name", data.name);
    formData.append("city", data.city);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("description_ar", data.description_ar);
    formData.append("google_map_location_field", data.gmap);
    formData.append("opening_time", data.opening);
    formData.append("closing_time", data.closing);
    // formData.append("latitude", data.latitude);
    // formData.append("longitude", data.longitude);
    formData.append("amount", data.amount);
    formData.append("images", data.image);
    game.map((value) => {
      formData.append("game", value);
    });
    amenity.map((value) => {
      console.log("ami67", value);
      formData.append("amnities", value);
    });
    slot.map((time, index) => {
      formData.append(`timeslot[${index}]start_time`, time.start_time);
      formData.append(`timeslot[${index}]end_time`, time.end_time);
    });
    const formDataObject = Object.fromEntries(formData);
    console.log("formData", formDataObject);

    Axios.post(
      apis.addPlayground,
      {
        stadium_name: data.name,
        city: data.city,
        location: data.location,
        description: data.description,
        description_ar: data.description_ar,
        google_map_location_field: data.gmap,
        opening_time: data.opening,
        closing_time: data.closing,
        amount: data.amount,
        images: data.image,
        game: game,
        amnities: amenity,
        timeslot: slot,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status == 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["PlayGround added"]}`,
        });
        router.push("/play-ground/playground-view");
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }

      console.log("success4444444444444444444444", res, formData);
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <div className="Bottom">
          <PlayGroundSideBar />

          <div class="play-topic  ">
            <div className="bottoms">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                {t("Add Field")}
              </h6>

              <div className="my-4 mx-4 ">
                <h6 style={{ fontSize: "14px", fontWeight: "700" }}>
                  {t("Basic Details")}
                </h6>
                <PlayGroundsForm handlePlaygroundForm={handlePlaygroundForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default AddPlaygroundPage;
