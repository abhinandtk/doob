


import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import Link from "next/link";
import React, { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
function GamesHistoryCard({ data }) {
  const { t } = useTranslation();
  const router=useRouter()
  const {locale}=router;

  return (
    <Fragment>
      <div className="">
        {data.length >= 1 &&
          data.map((item, index) => (
            <Link
              key={index}
              href={`/games/${item.stadium_details.game_slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div key={index} className="card  book">
                <div className="card-body">
                  <div className="clearfix dot-web" style={{ float: locale === "ar" && "left" }}>
                    <div className="float-end dots">
                      <span>
                        {item.game_image[0] && (
                          <img
                            src={`${constants.port}${item.game_image[0]}`}
                            className={locale === "en" ? "book-img" : "book-img_ar"}
                          ></img>
                        )}
                      </span>
                      <span>&nbsp;</span>
                      {/* <svg
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4629 19.5441C12.4629 18.9445 12.9701 18.4583 13.5959 18.4583C14.2216 18.4583 14.7289 18.9445 14.7289 19.5441C14.7289 20.1438 14.2216 20.6299 13.5959 20.6299C12.9701 20.6299 12.4629 20.1438 12.4629 19.5441Z"
                          fill="black"
                        />
                        <path
                          d="M12.4629 13.0294C12.4629 12.4297 12.9701 11.9436 13.5959 11.9436C14.2216 11.9436 14.7289 12.4297 14.7289 13.0294C14.7289 13.6291 14.2216 14.1152 13.5959 14.1152C12.9701 14.1152 12.4629 13.6291 12.4629 13.0294Z"
                          fill="black"
                        />
                        <path
                          d="M12.4629 6.5147C12.4629 5.91504 12.9701 5.42892 13.5959 5.42892C14.2216 5.42892 14.7289 5.91504 14.7289 6.5147C14.7289 7.11436 14.2216 7.60049 13.5959 7.60049C12.9701 7.60049 12.4629 7.11436 12.4629 6.5147Z"
                          fill="black"
                        />
                      </svg> */}
                    </div>
                  </div>
                  <div className={locale === "en" ? "book-content" : "book-content_ar"}>
                    <div className="book-date"   >
                      <h5 style={{ color: "#17A803", fontWeight: "700" }}>
                        {moment(item.stadium_details.date).format("D")}
                      </h5>
                      <p>{moment(item.stadium_details.date).format("MMM")}</p>
                    </div>
                    <div className="book-details">
                      <h5 className="card-texts">
                        {item.stadium_details.game_title}
                      </h5>
                      <p style={{color: "#959595", textAlign:locale==='ar'?'right':"",direction:locale==='ar'?'ltr':""}}>                 
                        {moment(
                          item.stadium_details.timeslots[0]["start_time"],
                          "hh:mm:ss"
                        ).format("hh:mm A")}{" "}
                        to{" "}
                        {moment(
                          item.stadium_details.timeslots[
                            item.stadium_details.timeslots.length - 1
                          ]["end_time"],
                          "hh:mm:ss"
                        ).format("hh:mm A")}
                      </p>
                      <p className="card-texts1">
                        {item.stadium_details.stadium_name}
                      </p>
                      <p className="gameones">
                        {item.stadium_details.location},{" "}
                        {item.stadium_details.city}
                      </p>
                    </div>
                  </div>
                  {item.participants.length >= 1 ? (
                    <div className="route d-flex my-3">
                      {item.participants.slice(0, 4).map((part, index_) => (
                        <img
                          key={index_}
                          className="rounded-circle default-avatar member-overlap-item"
                          style={{ objectFit: "cover" }}
                          src={
                            part.user__userdetail__image
                              ? `${constants.port}/media/${part.user__userdetail__image}`
                              : "/images/accounts/user_default.png"
                          }
                        ></img>
                      ))}
                      <span className="mx-4" style={{ color: "#959595" }}>
                        {item.participants.length - 4 >= 1
                          ? `+${item.participants.length - 4} ${t("more")} ${t(
                              "Participants"
                            )}`
                          : ""}
                        {/* +7 more participants */}
                      </span>{" "}
                    </div>
                  ) : (
                    <span className="mx-4" style={{ color: "#959595" }}>
                      0 {t("Participants")}
                    </span>
                  )}
                  <hr></hr>
                  <div className="clearfix joins">
                    <div className="book-profile float-start">
                      <span>
                        <img
                          src={
                            item.hosted_by.profile_pic
                              ? `${constants.port}${item.hosted_by.profile_pic}`
                              : "/images/accounts/user_default.png"
                          }
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        ></img>{" "}
                        <span className="mx-2">
                          <span style={{ color: "#17A803" }}>
                            {t("Hosted by")}
                          </span>{" "}
                          {item.hosted_by.hosted_by}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </Fragment>
  );
}

export default GamesHistoryCard;
