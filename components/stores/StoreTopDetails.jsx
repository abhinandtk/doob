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
