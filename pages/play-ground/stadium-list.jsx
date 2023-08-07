import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Axios from "axios";
import { Image } from "antd";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StadiumList from "@/components/playGround/StadiumList";
import PlaygroundFilter from "@/components/playGround/PlaygroundFilter";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StadiumListPage() {
  const router = useRouter();
  const data = router.query;
  console.log("daaaaaaaaaaaata", data);
  const [stadiumData, setStadiumData] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.listStadium,
      {
        sports_id: data.sports_id,
        area: data.area,
        date: data.date,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    )
      .then((res) => {
        // if(res.data.status === '0'){

        // }
        setStadiumData(res.data.data);

        console.log("Successssssss stadium list", res, {
          sports_id: data.sports_id,
          area: data.area,
          date: data.date,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  const playgroundFilterHandler = (formData, amenity) => {
    Axios.post(
      apis.playgroundSearchFilter,
      {
        area: formData.area,
        date: formData.date,
        sports_id: formData.sport,
        amenities: amenity,
        keyword: "",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setStadiumData(res.data.data);
      console.log("res", res, {
        area: formData.area,
        date: formData.date,
        sports_id: formData.sport,
        amenities: amenity,
        keyword: "",
      });
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />

      <div className="tour-container">
        <PlaygroundFilter playgroundFilterHandler={playgroundFilterHandler} />
        <StadiumList stadiumData={stadiumData} />
      </div>
      <MobileFooter />
    </div>
  );
}

export default StadiumListPage;
