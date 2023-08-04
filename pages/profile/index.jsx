import ProfileDetails from "@/components/profile/ProfileDetails";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import React, { Fragment } from "react";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function Profile() {
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <ProfileDetails />
      <MobileFooter />
    </Fragment>
  );
}

export default Profile;
