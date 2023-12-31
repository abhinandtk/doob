import constants from "@/public/data/my-constants/Constants";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { Input, List, Modal, notification } from "antd";
import { CardImg, Dropdown } from "react-bootstrap";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function TeamsCard({
  teamsData,
  setOnSuccess,
  admin,
  temp,
  maxTeam,
  matchGenerate,
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const { tid } = router.query;
  console.log("teamData", maxTeam * 2);
  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [names, setNames] = useState("");

  const labels = Labels();
  let loginId;
  if (typeof localStorage !== "undefined") {
    loginId = localStorage.getItem("login-userId");
  }
  let showDraw;

  if (maxTeam) {
    showDraw = maxTeam * 2 === teamsData.length;
  }
  console.log("teamDatar78", showDraw);

  const isIdExist = admin && admin.some((item) => item.id == loginId);

  const handleChange = (e) => {
    e.preventDefault();
    setNames(e.target.value);
    Axios.post(
      apis.usersearch,
      {
        user_input: names,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setSearchResult(res.data.data.results);
      }
    });
  };

  const handleSelect = (id) => {
    console.log("console", id);
    Axios.post(
      temp ? apis.createTeamTemp : apis.createTeam,
      {
        user_id: id,
        tournament_slug: tid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setVisible(false);
      setOnSuccess((prev) => !prev);
      console.log("resy", res);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Team created"]}`,
        });
      } else if (res.data.status === 2) {
        notification.error({
          message: t("Error"),
          description: `${labels["Tournament maximum participants"]}`,
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
  const deleteTeamHandler = (id) => {
    Axios.delete(temp ? apis.deleteTeamTemp : apis.deleteTeam, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
      data: {
        user_id: id,
        tournament_slug: tid,
      },
    })
      .then((res) => {
        setOnSuccess((prev) => !prev);
        if (res.data.status === 1) {
          notification.success({
            message: t("Success"),
            description: `${labels["Team deleted"]}`,
          });
        }
        console.log("Response:", res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const drawPartnerHandler = () => {
    Axios.post(
      apis.drawPartner,
      {
        tournament_slug: tid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("responsedraw", res);
      setOnSuccess((prev) => !prev);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Match draw created"]}`,
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
    <Fragment>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        title={t("Invite Participants")}
      >
        <Input
          placeholder="Enter names"
          // value={names}
          onChange={(e) => handleChange(e)}
        />
        <List
          dataSource={searchResult}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ padding: "0px", cursor: "pointer" }}
              onClick={() => handleSelect(item.id)}
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <a className="mx-2" href="">
                  {item.image ? (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={`${constants.port}/media/${item.image}`}
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                      }}
                    ></CardImg>
                  ) : (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src="/images/accounts/user_default.png"
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                      }}
                    ></CardImg>
                  )}
                </a>
                <div
                  className="flex-grow-1 flex-shrink-1 "
                  style={{ marginBottom: "-24px" }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="mb-0 dark-theme-color"
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>

                    <p
                      className="small dark-theme-color"
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        marginTop: "-3px",
                        float: "left",
                      }}
                    >
                      @{item.username}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          style={{ height: "250px", overflowY: "auto" }}
        />
      </Modal>

      {teamsData &&
        teamsData.map((item, index) => (
          <div
            key={index}
            className="rounded border-0 d-flex p-1 top-teams  my-3"
          >
            <p
              className=" mb-2 mx-3"
              style={{ fontWeight: "500", fontSize: "14px" }}
            >
              {item.team_logo.team_logo ? (
                <img
                  src={`${constants.port}${item.team_logo.team_logo}`}
                  className="club1"
                ></img>
              ) : (
                <img
                  src="/images/accounts/user_default.png"
                  className="club1"
                ></img>
              )}{" "}
              &nbsp;{item.team_name.team_name}
            </p>
            {isIdExist && !matchGenerate && (
              <div className="ms-auto top-teams-dot">
                <Dropdown className="Drop">
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-basic"
                    style={{
                      color: "black",
                      borderColor: "transparent",
                      background: "transparent",
                    }}
                  >
                    <svg
                      width="2"
                      height="14"
                      className="mx-4"
                      viewBox="0 0 2 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.416016 0.958333C0.416016 0.429061 0.752798 0 1.16824 0C1.58368 0 1.92046 0.429061 1.92046 0.958333C1.92046 1.48761 1.58368 1.91667 1.16824 1.91667C0.752798 1.91667 0.416016 1.48761 0.416016 0.958333Z"
                        fill="black"
                      />
                      <path
                        d="M0.416016 6.70833C0.416016 6.17906 0.752798 5.75 1.16824 5.75C1.58368 5.75 1.92046 6.17906 1.92046 6.70833C1.92046 7.23761 1.58368 7.66667 1.16824 7.66667C0.752798 7.66667 0.416016 7.23761 0.416016 6.70833Z"
                        fill="black"
                      />
                      <path
                        d="M0.416016 12.4583C0.416016 11.9291 0.752798 11.5 1.16824 11.5C1.58368 11.5 1.92046 11.9291 1.92046 12.4583C1.92046 12.9876 1.58368 13.4167 1.16824 13.4167C0.752798 13.4167 0.416016 12.9876 0.416016 12.4583Z"
                        fill="black"
                      />
                    </svg>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="center" className="Menu">
                    <Dropdown.Item
                      onClick={() => deleteTeamHandler(item.user_id.user_id)}
                    >
                      {t("Remove")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        ))}
      {isIdExist &&
        !matchGenerate &&
        (showDraw && temp ? (
          <button
            onClick={() => drawPartnerHandler()}
            type="button"
            className="teams-btn my-4"
          >
            {t("Draw")}
          </button>
        ) : (
          <button
            onClick={() => setVisible(true)}
            type="button"
            className="teams-btn my-4"
          >
            {t("Add")}
          </button>
        ))}
      <div className="post-bottoms ">&nbsp;</div>
      <br></br>
    </Fragment>
  );
}

export default TeamsCard;
