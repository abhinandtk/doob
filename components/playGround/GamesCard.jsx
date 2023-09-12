import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import React, { Fragment } from "react";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { Dropdown } from "react-bootstrap";
import ShareToUserChat from "../homepage/social/share/ShareToUserChat";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

function GamesCard({ data }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { theme } = useTheme()
  const { locale } = router;

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
                <div className="clearfix fxt" style={{ float: locale === "ar" && "left" }}>
                  <div className="float-end dots">
                    <span>
                      {item.my_game_images && (
                        <img
                          src={`${constants.port}${item.my_game_images
                            ? item.my_game_images
                            : item.game_images
                            }`}
                          alt="image"
                          className={locale === "en" ? "book-img" : "book-img_ar"}
                        ></img>
                      )}
                      {item.game_images && (
                        <img
                          src={`${constants.port}${item.my_game_images
                            ? item.my_game_images
                            : item.game_images
                            }`}
                          alt="image"
                          className={locale === "en" ? "book-img" : "book-img_ar"}
                        ></img>
                      )}
                    </span>
                    <span onClick={(e) => e.preventDefault()}>

                      <Dropdown className="">
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          style={{
                            color: "black",
                            borderColor: "transparent",
                            background: "transparent",
                            padding: 0,
                          }}
                        >

                          <svg width="28" height="27" viewBox="0 0 205 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.958 147.344C93.958 142.823 97.7822 139.158 102.5 139.158C107.217 139.158 111.041 142.823 111.041 147.344C111.041 151.865 107.217 155.529 102.5 155.529C97.7822 155.529 93.958 151.865 93.958 147.344Z" stroke={theme === 'dark' ? "white" : "black"} stroke-width="8.54167" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M93.958 98.2291C93.958 93.7082 97.7822 90.0433 102.5 90.0433C107.217 90.0433 111.041 93.7082 111.041 98.2291C111.041 102.75 107.217 106.415 102.5 106.415C97.7822 106.415 93.958 102.75 93.958 98.2291Z" stroke={theme === 'dark' ? "white" : "black"} stroke-width="8.54167" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M93.958 49.1145C93.958 44.5936 97.7822 40.9287 102.5 40.9287C107.217 40.9287 111.041 44.5936 111.041 49.1145C111.041 53.6354 107.217 57.3003 102.5 57.3003C97.7822 57.3003 93.958 53.6354 93.958 49.1145Z" stroke={theme === 'dark' ? "white" : "black"} stroke-width="8.54167" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                        </Dropdown.Toggle>
                        <Dropdown.Menu align="center" className="Menu">
                          <Dropdown.Item><ShareToUserChat slug={item.game_slug} type="game" /></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
                    </span>
                  </div>
                </div>
                <div className={locale === "en" ? "book-content" : "book-content_ar"}>
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
                    <p className="book-time-date" style={{ direction: locale === 'ar' ? 'ltr' : "", textAlign: locale === 'ar' ? 'right' : "" }}>
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
                    {item.participants.length - 4 >= 1
                      ? `+${item.participants.length - 4} more ${t(
                        "Participants"
                      )}`
                      : ""}{" "}
                    {/* {item.participants.length >= 1
                      ? `${item.participants.length} participants`
                      : ""} */}
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
