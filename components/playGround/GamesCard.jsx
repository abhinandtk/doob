import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import React, { Fragment } from "react";
import moment from "moment";
import { useTranslation } from "next-i18next";

function GamesCard({ data }) {
  const { t } = useTranslation();

  console.log("daaaaaaaaaaaaaaa", data);
  return (
    <Fragment>
      {data &&
        data.map((item, index) => (
          <Link
            key={index}
            href={`/games/${item.game_slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div key={index} className="card  book">
              <div className="card-body">
                <div className="clearfix fxt">
                  <div className="float-end dots">
                    <span>
                      {item.my_game_images && (
                        <img
                          src={`${constants.port}${
                            item.my_game_images
                              ? item.my_game_images
                              : item.game_images
                          }`}
                          alt="image"
                          className="book-img"
                        ></img>
                      )}
                      {item.game_images && (
                        <img
                          src={`${constants.port}${
                            item.my_game_images
                              ? item.my_game_images
                              : item.game_images
                          }`}
                          alt="image"
                          className="book-img"
                        ></img>
                      )}
                    </span>
                    <svg
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
                    </svg>
                  </div>
                </div>
                <div className="book-content">
                  <div className="book-date">
                    <h5 className="booked-date">
                      {moment(item.game_date).format("DD")}
                    </h5>
                    <p className="booked-month">
                      {moment(item.game_date).format("MMM")}
                    </p>
                  </div>
                  <div className="book-details">
                    <h5 className="book-head">{item.title}</h5>
                    <p className="book-time-date">
                      {moment(
                        item.stadium.time_slots[0]["start_time"],
                        "hh:mm:ss"
                      ).format("hh:mm A")}{" "}
                      to{" "}
                      {moment(
                        item.stadium.time_slots[
                          item.stadium.time_slots.length - 1
                        ]["end_time"],
                        "hh:mm:ss"
                      ).format("hh:mm A")}
                    </p>
                    <p className="book-grounds">{item.stadium.stadium_name}</p>
                    <p className="book-places">
                      {item.stadium.location}, {item.stadium.area}
                    </p>
                  </div>
                </div>
                <div class="route d-flex my-3">
                  {item.participants.length >= 1 &&
                    item.participants.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        className="rounded-circle default-avatar member-overlap-item"
                        style={{
                          objectFit: "cover",
                          width: "30px",
                          height: "30px",
                        }}
                        src={
                          img.user__userdetail__image
                            ? `${constants.port}/media/${img.user__userdetail__image}`
                            : "/images/accounts/user_default.png"
                        }
                      ></img>
                    ))}
                  <span className="mx-4 participate">
                    {/* {item.participants.length-4 >=1 ? `+${item.participants.length-4} more participants` :''} */}
                    {item.participants.length >= 1
                      ? `${item.participants.length} participants`
                      : ""}
                  </span>
                </div>
                <hr></hr>
                <div className="clearfix nxt">
                  <div className="book-profile float-start">
                    <span className="Hosted">
                      <img
                        src={
                          item.hosted_by.profile_pic
                            ? `${constants.port}/media/${item.hosted_by.profile_pic}`
                            : "/images/accounts/user_default.png"
                        }
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      ></img>
                      <span className="mx-2 ">
                        <span className="hosts">{t("Hosted by")}</span>
                        <span className="host-name">
                          {" "}
                          &nbsp;{item.hosted_by.hosted_by}
                        </span>
                      </span>
                    </span>
                  </div>
                  {item.created_by != constants.user_id && (
                    <button type="button" className="Join-btn float-end">
                      {t("View")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </Fragment>
  );
}

export default GamesCard;
