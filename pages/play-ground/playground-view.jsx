import MobileHeader from "@/components/MobileHeader";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MobileFooter from "@/components/shared/MobileFooter";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  }
}
function PlaygroundPageAdmin() {
  const { t } = useTranslation();
  const router = useRouter();

  const [groundView, setGroundView] = useState([]);

  useEffect(() => {
    Axios.get(apis.ground_admin_view_get_put, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setGroundView(res.data.data);
    });
  }, []);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="tour-container">
        <div className="Bottoms">
          <PlayGroundSideBar currentPage="playground" />

          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className=" mx-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Playground 
              </h6>
              <Button
                onClick={() => router.push("/play-ground/add-playground")}
                type="button"
                className="order1-btn "
              > 
                Add Playground
              </Button> 
              {groundView &&
                groundView.map((item, index) => (
                  <div key={index} className="my-5">
                    <div
                      className="   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <p className="book-stadiums">{item.stadium_name}</p>
                      <button
                        className="playedit-btn mb-2"
                        onClick={() =>
                          router.push(`/play-ground/edit/${item.stadium_slug}`)
                        }
                      >
                        Edit
                      </button>
                    </div> 
                    <hr
                      className="mx-auto "
                      style={{ width: "90%", marginTop: "-2px" }}
                    ></hr>
                    <div className=" imx  d-flex justify-content-between align-items-center">
                      {item.images[0] && (
                        <img
                          src={`${constants.port}${item.images[0]}`}
                          style={{ width: "82px", height: "82px" }}
                        ></img>
                      )}
                    </div>
                    <br></br>
                    <div
                      className="p-2  mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span>{t("Location")}</span>
                      <span className="book-location">{item.location}</span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span>City</span>
                      <span className="book-names1">{item.city}</span>
                    </div>
                    <div
                      className="p-2  mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span> {t("Status")}</span>
                      <span style={{ color: "#17A803" }}>{`${
                        item.status === true ? "Active" : "InActive"
                      }`}</span>
                    </div>
                    <br></br>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default PlaygroundPageAdmin;
