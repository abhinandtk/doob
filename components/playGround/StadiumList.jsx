import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import Axios from "axios";
import { Image } from "antd";
import { useTranslation } from "next-i18next";
function StadiumList({ stadiumData }) {
  const router = useRouter();
  const { locale } = router;
  const data = router.query;
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="tour-detail-ar">
        <h5 style={{ fontWeight: "700" }} className="my-2">
          {t("Select Field")}
        </h5>
        <div className="row">
          {stadiumData !== undefined ? (
            stadiumData.length > 0 ? (
              stadiumData.map((item, index) => (
                <div key={index} className="col-md-6">
                  <div className="card  plays">
                    <div className="card-body">
                      <div className="play-mix">
                        {item.images.length > 0 && (
                          <img
                            src={`${constants.port}${item.images[0].images}`}
                            className="plays-img"
                          ></img>
                        )}

                        <div
                          className={
                            locale === "ar" ? "play-details_ar" : "play-details"
                          }
                        >
                          <h5 className="play_text">{item.stadium_name}</h5>
                          <div className="locations">
                            <i
                              class="bi bi-geo-alt"
                              style={{ color: "green" }}
                            ></i>
                            <p className="place">
                              &nbsp;{item.location},{item.city.region_name}{" "}
                            </p>
                          </div>
                          <p>
                            {item.images.length > 0 &&
                              item.amnities.map((img, index) => (
                                <span key={index} className="mx-1">
                                  <Image
                                    src={`${constants.port}${img.logo}`}
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                    alt="image"
                                  />
                                </span>
                              ))}
                          </p>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="clearfix">
                        <div
                          className="book-profile float-start"
                          style={{ direction: "ltr" }}
                        >
                          <span style={{ fontWeight: "600", direction: "ltr" }}>
                            {item.amount} KD
                            <span style={{ fontWeight: "400" }}>/slot</span>
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            router.push({
                              pathname: `/play-ground/${item.slug_field}`,
                              query: {
                                stadium_id: item.id,
                                date: data.date,
                                sports_id: data.sports_id,
                              },
                            })
                          }
                          type="button"
                          className="view-btn float-end"
                        >
                          {t("View")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div>No Stadium found..............</div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default StadiumList;
