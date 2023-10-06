import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import apis from "@/public/data/my-constants/Apis";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Axios from "axios";
import { notification } from "antd";
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoreSettingsPage() {
  const { t } = useTranslation();
  const labels = Labels();
  const router = useRouter();
  const { resId } = router.query;
  const [onSuccess, setOnSuccess] = useState(false);
  const [restrictStatus, setRestrictStatus] = useState({
    post: false,
    story: false,
    notification: false,
    message: false,
  });
  const { locale } = router;
  useEffect(() => {
    Axios.post(
      apis.restriction,
      {
        restricted_user_id: resId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("resp[onse restrict", res);
      setRestrictStatus({
        post: res.data.data.post,
        story: res.data.data.story,
        notification: res.data.data.notification,
        message: res.data.data.message,
      });
    });
  }, [resId,onSuccess]);

  const restrictHandlerChange = (e) => {
    const newData = { ...restrictStatus };
    newData[e.target.id] = e.target.checked;
    setRestrictStatus({ ...newData });
    Axios.put(
      apis.restriction,
      {
        restricted_user_id: resId,
        post: newData.post ? "True" : "False",
        story: newData.story ? "True" : "False",
        notification: newData.notification ? "True" : "False",
        message: newData.message ? "True" : "False",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("put res", res);
      setOnSuccess((prev) => !prev);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
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
          <div className="content-topic">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                {t("Restrict User")}
              </h6>
              <div className="my-4 dark-theme-color mx-4 ">
                <div className="basic">
                  <div>
                    <h6 className="my-4 dark-theme-color">{t("Hide Post")}</h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        id="post"
                        placeholder="Active"
                        onChange={(e) => restrictHandlerChange(e)}
                        checked={restrictStatus.post}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                  <div>
                    <h6 className="my-4 dark-theme-color">{t("Hide Story")}</h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        id="story"
                        placeholder="Active"
                        onChange={(e) => restrictHandlerChange(e)}
                        checked={restrictStatus.story}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                  <div>
                    <h6 className="my-4 dark-theme-color">
                      {t("Hide Message")}
                    </h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        id="message"
                        placeholder="Active"
                        onChange={(e) => restrictHandlerChange(e)}
                        checked={restrictStatus.message}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                  <div>
                    <h6 className="my-4 dark-theme-color">
                      {t("Hide Notification")}
                    </h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        id="notification"
                        placeholder="Active"
                        onChange={(e) => restrictHandlerChange(e)}
                        checked={restrictStatus.notification}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreSettingsPage;
