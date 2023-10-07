import React, { useEffect, useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import MobileFooter from "@/components/shared/MobileFooter";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import { CardImg } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { notification } from "antd";
import { useRouter } from "next/router";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function RestrictedUsersPage() {
  const { t } = useTranslation();
  const [restrictedList, setRestrictedList] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    Axios.get(apis.restrictedUsers, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("resulrtg", res);
      setRestrictedList(res.data.data);
    });
  }, [onSuccess]);
  const removeRestrictHandler = (e, id) => {
    e.stopPropagation();
    Axios.delete(apis.restrictedUsers, {
      data: { restriction_id: id },
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("resulrtg", res);
      if (res.data.status === 1) {
        setOnSuccess((prev) => !prev);
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
      <div>
        <MainHeader title="Doob" />
        <MobileHeader />
        <MainSidebarFixed />

        <div className="store-container">
          <div className="bottom">
            <PagesSideBar currentPage="settings" />
            <div className="content-topic">
              <div className="bottom">
                <div style={{ padding: "16px" }}>
                  {restrictedList &&
                    restrictedList.map((item, index) => (
                      <div
                        key={index}
                        className="side-menu__suggestion"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            `/page/restrict-profile/${item.receipent_user.id}`
                          )
                        }
                      >
                        <div className="side-menu__suggestion-avatar">
                          <CardImg
                            className="rounded-circle shadow-1-strong "
                            src={
                              item.receipent_user.image
                                ? `${constants.port}/media/${item.receipent_user.image}`
                                : "/images/accounts/user_default.png"
                            }
                            style={{
                              width: "46px",
                              height: "46px",
                              objectFit: "cover",
                            }}
                          ></CardImg>
                        </div>
                        <div className="side-menu__suggestion-info">
                          <p style={{ margintop: "" }}>
                            <b>{item.receipent_user.name}</b>
                            <br></br>
                            {item.receipent_user.username}
                          </p>
                        </div>
                        <button
                          onClick={(e) => removeRestrictHandler(e, item.id)}
                          className="side-menu__suggestion-buttons"
                          style={{
                            backgroundColor: "#EFEFEF",
                            color: "#000000",
                          }}
                        >
                          {" "}
                          {t("Remove")}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileFooter />
      </div>
    </div>
  );
}

export default RestrictedUsersPage;
