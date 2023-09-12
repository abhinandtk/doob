import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { useTranslation } from "next-i18next";
import Login from "../user/Login";
import { activeModalShow } from "@/Redux/loginShow";
import { useDispatch } from "react-redux";

function PlayGroundCard({ content }) {
  const router = useRouter();
  const { locale } = router;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = constants.token_id;
  const handleNavigation = (slug, id) => {
    if (isAuthenticated) {
      router.push({
        pathname: `/play-ground/${slug}`,
        query: {
          stadium_id: id,
          date: moment().format("YYYY-MM-DD"),
        },
      });
    } else {
      dispatch(activeModalShow("login"));
    }
  };

  return (
    <Fragment>
      <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
        <div className="clearfix jst mt-3 ">
          <h5
            className={locale === "ar" ? "float-end" : "float-start"}
            style={{ fontWeight: "700", fontSize: "19px", marginLeft: "0px" }}
          >
            {t("Playgrounds near me")}
          </h5>
          <p className="float-end" style={{ color: "#959595" }}>
            {/* View all */}
          </p>
        </div>
        <div className="playgrounds " style={{ cursor: "pointer" }}>
          {content.map((item, index) => (
            <div
              onClick={() => handleNavigation(item.slug_field, item.id)}
              key={index}
              className="card playground-card"
            >
              {item.images[0] && (
                <img
                  src={`${constants.port}${item.images[0].images}`}
                  style={{
                    height: "190px",
                    borderRadius: "20px 20px 0px 0px",
                    objectFit: "cover",
                  }}
                  alt="..."
                />
              )}
              <div className="card-body play-body">
                <p className="stadium-name">{item.stadium_name}</p>
                <div style={{ marginTop: "-5px" }}>
                  <div className="stadiums">
                    <i className="bi bi-geo-alt" style={{ color: "green" }}></i>
                    <div className="mx-2 places">{item.location}, Kuwait</div>
                  </div>
                </div>
                <div style={{ marginTop: "8px" }}>
                  {/* <span>
                  <i
                    className="bi bi-star-fill"
                    style={{ color: "yellow" }}
                  ></i>
                  <span className="mx-2">{item.rating}</span>
                </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PlayGroundCard;
