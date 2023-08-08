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
import { Skeleton } from 'antd';
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
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);

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

  const playgroundFilterHandler = (filterData, amenity, searchKey) => {
    console.log("inputfilter", filterData, amenity, searchKey);
    const formData = new FormData();
    formData.append("area", filterData.area);
    formData.append("date", filterData.date);
    formData.append("sports_id", filterData.sport);
    formData.append("keyword", searchKey);

    amenity.map((value) => {
      formData.append("amnities", value);
    });

    Axios.post(apis.playgroundSearchFilter, formData, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      if (res.data.status === 1) {
        setStadiumData(res.data.data);
      } else {
        setStadiumData([]);
      }
      console.log("inputfilterres", res, {
        area: filterData.area,
        date: filterData.date,
        sports_id: filterData.sport,
        amenities: amenity,
        keyword: searchKey,
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
        {!isLoading ? <StadiumList stadiumData={stadiumData} /> :  <Skeleton active paragraph={{ rows: 10 }} className="skeleton-container" style={{ listStyle: 'none', padding: 0, margin: 0 }} />}
      </div>
      <MobileFooter />
    </div>
  );
}

export default StadiumListPage;
