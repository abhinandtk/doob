import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import SelectGround from "@/components/playGround/SelectGround";
import AmenitiesList from "@/components/playGround/AmenitiesList";
import PlayGroundTopDetails from "../../components/playGround/PlayGroundTopDetails";
import { Fragment } from "react";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import { useRouter } from "next/router";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Skeleton } from "antd";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function PlayGroundDetailPage() {
  const router = useRouter();
  const inputData = router.query;
  const [groundData, setGroundData] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("ggggggggggggggg", inputData, {
    stadium_id: inputData.stadium_id,
    date: inputData.date,
  });
  const [dateSelected, setDateSelected] = useState(inputData.date);
  useEffect(() => {
    Axios.post(
      apis.stadiumDetailView,
      {
        stadium_slug: inputData.pgid,
        date: dateSelected,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setGroundData(res.data.data.stadium_details);
      setAmenitiesData(res.data.data.stadium_details.amnities);
      setIsLoading(false);

      console.log("trrtrtrtop879", res);
    });
  }, [inputData, dateSelected]);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="tour-container">
        {/* <form className="nosubmit ">
          <span>
            <input className="nosubmit1" type="search" placeholder="Search" />
            <img
              src="../images/tournament/Fil-icon.png"
              className="filters-icon"
            ></img>
          </span>
        </form> */}
        {isLoading ? (
          <Skeleton
            active
            paragraph={{ rows: 20 }}
            className="skeleton-container"
          />
        ) : (
          <div className="field-details">
            <PlayGroundTopDetails details={groundData} />
            <AmenitiesList amenitiesData={amenitiesData} />
            <SelectGround
              details={groundData}
              setDateSelected={setDateSelected}
            />
          </div>
        )}
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default PlayGroundDetailPage;
