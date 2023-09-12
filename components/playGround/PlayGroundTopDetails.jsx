import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { Labels } from "@/public/data/my-constants/Labels";
import { Collapse, Modal, Form, Input, Button, notification } from "antd";
import ReviewPlayground from "@/components/playGround/review/ReviewPlayground";
import { useTranslation } from "next-i18next";
import { Dropdown } from "react-bootstrap";
import ShareToUserChat from "../homepage/social/share/ShareToUserChat";
function PlayGroundTopDetails({ details }) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const { pgid } = router.query;
  const labels = Labels();
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleShare = async () => {
    try {
      await navigator.share({ url: window.location.href });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleShareFieldPost = () => {
    Axios.post(
      apis.shareFieldToPost,
      { stadium_slug: pgid },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["PlayGround shared"]}`,
        });
      }
      console.log("res@@", res);
    });
  };
  const fieldReportHandler = (e) => {
    e.preventDefault();
    Axios.post(
      apis.reportField,
      {
        stadium: details.id,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setShow(false);
      setReason("");
      notification.success({
        message: t("Success"),
        description: `${labels["Reported successfully"]}`,
      });
    });
  };
  console.log("qqqqqqqqqqqqqqq", details, pgid);
  //   console.log("qqqqqqqqqqqqqqq45", details.city.region_name);
  return (
    <Fragment>
      <Modal
        title="Why are you reporting this Field ??"
        open={show}
        centered
        closable
        maskClosable
        footer={null}
        onCancel={() => setShow(false)}
      >
        <Form onSubmitCapture={(e) => fieldReportHandler(e)}>
          <Form.Item>
            <Input.TextArea
              placeholder="Please enter your reason for reporting"
              autoSize={{ minRows: 5 }}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{ backgroundColor: "#17A803" }}
              type="primary"
              htmlType="submit"
            >
              {t("Confirm")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {visible && <ReviewPlayground setVisible={setVisible} />}
      {details && (
        <>
          <div className="banner my-3">
            {details.images && details.images.length > 0 && (
              <img
                src={`${constants.port}${details.images[0].images}`}
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              ></img>
            )}
            <span className={locale === "en" ? " span-icon" : "span_icon_ar"}>
              {/* className={locale==="en"?" span-icon":"span_icon_ar"} */}
              <ShareToUserChat slug={pgid} type="field" />
              {/* <span
                onClick={() => handleShareFieldPost()}
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="30"
                  height="28"
                  viewBox="0 0 30 28"
                  className="ms-3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8848 15.9742L18.9425 10.3203"
                    stroke="white"
                    stroke-width="1.50701"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z"
                    stroke="white"
                    stroke-width="1.50701"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span> */}
              <span>
                <Dropdown
                  className=""
                  style={{
                    display: "inline-block",
                    marginLeft: locale === "en" ? "-10px" : "",
                    cursor: "pointer",
                    marginRight: locale === "ar" ? "-20px" : "",
                  }}
                >
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-basic"
                    style={{
                      color: "black",
                      borderColor: "transparent",
                      background: "transparent",
                    }}
                  >

                    <svg width="28" height="27" viewBox="0 0 205 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M93.958 147.344C93.958 142.823 97.7822 139.158 102.5 139.158C107.217 139.158 111.041 142.823 111.041 147.344C111.041 151.865 107.217 155.529 102.5 155.529C97.7822 155.529 93.958 151.865 93.958 147.344Z" stroke="white" stroke-width="8.54167" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M93.958 98.2291C93.958 93.7082 97.7822 90.0433 102.5 90.0433C107.217 90.0433 111.041 93.7082 111.041 98.2291C111.041 102.75 107.217 106.415 102.5 106.415C97.7822 106.415 93.958 102.75 93.958 98.2291Z" stroke="white" stroke-width="8.54167" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M93.958 49.1145C93.958 44.5936 97.7822 40.9287 102.5 40.9287C107.217 40.9287 111.041 44.5936 111.041 49.1145C111.041 53.6354 107.217 57.3003 102.5 57.3003C97.7822 57.3003 93.958 53.6354 93.958 49.1145Z" stroke="white" stroke-width="8.54167" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="center" className="Menu">
                    <Dropdown.Item onClick={() => handleShare()}>
                      {t("Send")}
                    </Dropdown.Item>
                    {constants.user_id != details.owner_id && (
                      <Dropdown.Item onClick={() => setShow(true)}>
                        {t("Report")}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </span>
          </div>

          <h5 style={{ fontWeight: "700", fontSize: "18px" }}>
            {locale === "en" ? details.stadium_name : details.stadium_name_ar}
          </h5>
          <p style={{ fontSize: "14px", color: "gray", fontWeight: "500" }}>
            {details.location},{details.city && details.city.region_name}
          </p>
          <div className="clearfix rating">
            <span
              className={`${locale === "en" ? "float-start" : "float-end"
                } ml-5`}
              onClick={toggleModal}
            >
              <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
              <span className="mx-2">{details.rating}</span>
            </span>

            <p
              className={locale === "en" ? "float-end" : "float-start"}
              style={{ fontWeight: "700", color: "#17A803" }}
            >
              {details.amount} KD
              <span style={{ fontWeight: "400" }}>/slot</span>
            </p>
          </div>

          <span className="sports-type">
            {details.game &&
              details.game.map((game, index) => (
                <span key={index} className="mx-1">
                  <img
                    src={`${constants.port}${game.logo}`}
                    style={{
                      width: "18px",
                      height: "18px",
                      objectFit: "cover",
                    }}
                  ></img>
                </span>
              ))}
          </span>
          <br></br>

          <hr></hr>
          <h5 style={{ fontWeight: "700", fontSize: "15px" }}>
            {t("Description")}
          </h5>
          <p className="col-md-12">{details.description}</p>
        </>
      )}
    </Fragment>
  );
}

export default PlayGroundTopDetails;
