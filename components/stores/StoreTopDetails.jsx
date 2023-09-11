import React, { useState } from "react";
import { Fragment } from "react";
import { Collapse, Modal, Form, Input, Button, notification } from "antd";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import moment from "moment";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
import ReviewStore from "./review/ReviewStore";
const { Panel } = Collapse;
import { useTranslation } from "next-i18next";
import { Dropdown } from "react-bootstrap";
import ShareToUserChat from "../homepage/social/share/ShareToUserChat";
import { activeModalShow } from "@/Redux/loginShow";
import { useDispatch } from "react-redux";

function StoreTopDetails({ data, setSuccess }) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [descShow, setDescShow] = useState(false);
  const router = useRouter();
  const { locale } = router;
  console.log("dat", data);
  const { sid } = router.query;

  const labels = Labels();

  const handleShare = async () => {
    try {
      await navigator.share({ url: window.location.href });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const storeWishlistHandler = (id, favorite) => {
    const api = favorite ? apis.removestorewishlist : apis.addstorewishlist;
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      Axios.post(
        api,
        {
          slug_id: id,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        setSuccess((prev) => !prev);
        console.log("wishlistresult5", res);
      });
    } else {
      dispatch(activeModalShow("login"));
    }
  };
  const reportModalShowHandler = () => {
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      setShow(true);
    } else {
      dispatch(activeModalShow("login"));
    }
  };

  const handleShareStorePost = (slug) => {
    Axios.post(
      apis.shareStoreToPost,
      { store_slug: sid },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Store shared"]}`,
        });
      }
      console.log("res@@", res);
    });
  };
  const storeReportHandler = (e) => {
    e.preventDefault();
    Axios.post(
      apis.reportStore,
      {
        store: data.id,
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

  return (
    <Fragment>
      <Modal
        title={t("Why are you reporting this store?")}
        open={show}
        centered
        closable
        maskClosable
        footer={null}
        onCancel={() => setShow(false)}
      >
        <Form onSubmitCapture={(e) => storeReportHandler(e)}>
          <Form.Item>
            <Input.TextArea
              placeholder={t("Please enter your reason for reporting")}
              autoSize={{ minRows: 5 }}
              value={reason}
              className="cont-theme-bg"
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
      <div className="banner my-3">
        <img
          src={`${constants.port}${data.cover_photo}`}
          className="img-fluid"
          style={{ width: "100%", aspectRatio: "2.2", objectFit: "cover" }}
        ></img>

        <span className={locale === "en" ? "span-icon" : "span-icon_arab"}>
          <span style={{ cursor: "pointer" }}>
            <svg
              onClick={() =>
                storeWishlistHandler(data.slug_store, data.is_favorite)
              }
              width="25"
              height="22"
              viewBox="0 0 25 22"
              fill={`${data.is_favorite ? "#17A803" : "none"}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2133 20.8391C12.2133 20.8391 1 14.5938 1 7.09945C1 -0.394922 9.72146 -1.01945 12.2133 4.84416C14.7052 -1.01945 23.4266 -0.394922 23.4266 7.09945C23.4266 14.5938 12.2133 20.8391 12.2133 20.8391Z"
                stroke="white"
                stroke-width="1.35919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span style={{ cursor: "pointer" }}>
            <ShareToUserChat slug={sid} type="store" />
          </span>
          {/* <span
            onClick={() => handleShareStorePost(sid)}
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
              style={{ display: "inline-block", marginLeft: "-10px" }}
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
                <svg
                  width="30"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3735 14.9998C10.3735 14.5396 10.7629 14.1665 11.2431 14.1665C11.7233 14.1665 12.1127 14.5396 12.1127 14.9998C12.1127 15.4601 11.7233 15.8332 11.2431 15.8332C10.7629 15.8332 10.3735 15.4601 10.3735 14.9998Z"
                    stroke="white"
                    stroke-width="0.814796"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.3735 10.0003C10.3735 9.54009 10.7629 9.16699 11.2431 9.16699C11.7233 9.16699 12.1127 9.54009 12.1127 10.0003C12.1127 10.4606 11.7233 10.8337 11.2431 10.8337C10.7629 10.8337 10.3735 10.4606 10.3735 10.0003Z"
                    stroke="white"
                    stroke-width="0.814796"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.3735 4.99984C10.3735 4.5396 10.7629 4.1665 11.2431 4.1665C11.7233 4.1665 12.1127 4.5396 12.1127 4.99984C12.1127 5.46007 11.7233 5.83317 11.2431 5.83317C10.7629 5.83317 10.3735 5.46007 10.3735 4.99984Z"
                    stroke="white"
                    stroke-width="0.814796"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu align="center" className="Menu">
                <Dropdown.Item onClick={() => handleShare()}>
                  {t("Send")}
                </Dropdown.Item>
                {constants.user_id != data.user && (
                  <Dropdown.Item onClick={() => reportModalShowHandler()}>
                    {t("Report")}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </span>
        <img
          src={`${constants.port}${data.logo}`}
          className={locale === "en" ? "foot-png" : "foot-png_ar"}
        ></img>
      </div>

      <div className="my-3 store-header-details">
        <div className="row">
          <div className="col-md-6">
            <h5 className="dark-theme-color">{data.title}</h5>
            <p style={{ fontSize: "13px", color: "gray" }}>{data.address}</p>

            <ReviewStore data={data} />
            <p
              className="dark-theme-color"
              style={{
                direction: locale === "ar" ? "ltr" : "",
                float: locale === "ar" ? "right" : "",
              }}
            >
              <i className="bi bi-clock"></i>
              <span className="mx-2">
                {moment(data.start_time, "HH:mm:ss").format("hh:mm A")} -
                {moment(data.end_time, "HH:mm:ss").format("hh:mm A")}
              </span>
            </p>
          </div>

          <div className="col-md-6">
            <div
              style={{ cursor: "pointer" }}
              className={locale === "en" ? "more" : "more_ar"}
              onClick={() => setDescShow(!descShow)}
            >
              {t("More")}
              {descShow ? (
                <i className="bi bi-chevron-down "></i>
              ) : (
                <i className="bi bi-chevron-right "></i>
              )}
            </div>
          </div>
          <hr className="line "></hr>
          {descShow && (
            <div className="text">
              <div className="description">
                <h5 className="dark-theme-color">{t("Description")}</h5>
                <p className="col-md-12 dark-theme-gd">{data.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default StoreTopDetails;
