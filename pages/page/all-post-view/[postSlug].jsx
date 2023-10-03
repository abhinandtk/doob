import React, { Fragment, useEffect, useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import MobileHeader from "@/components/MobileHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SingleContainerHomePosts from "@/components/homepage/SingleContainerHomePosts";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AllPostView() {
  const [countryModalShow, setCountryModalShow] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  const [activemodal, setActiveModal] = useState(null);

  useEffect(() => {
    axios.post(apis.country).then((res) => {
      setCountryData(res.data.country);
    });
  }, []);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <main className="main-container">
        <section className="content-container">
          <div className="content">
            <SingleContainerHomePosts allPost={true} />
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default AllPostView;
