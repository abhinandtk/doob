import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import Link from "next/link";
import apis from "@/public/data/my-constants/Apis";
import Axios from "axios";
import { Modal, notification, Button } from "antd";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { useRouter } from "next/router";
function StoreSettingsPage() {
  const [accountStatus, setAccountStatus] = useState(false);
  const [userStatus, setUserStatus] = useState(true);
  const [onSuccess, setOnSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Axios.get(apis.settings, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setAccountStatus(res.data.data.is_private);
      setUserStatus(res.data.data.userStatus);
      console.log("storeset", res, res.data.data.is_private);
    });
  }, [onSuccess]);
  console.log("resstatus", accountStatus);

  const statusHandlerChange = (e) => {
    Axios.post(
      apis.update_delete_account,
      {
        status: "",
        privacy: e.target.checked == true ? "True" : "False",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res", res, {
        status: "Active",
        privacy: e.target.checked == true ? "True" : "False",
      });
      if (res.data.status === 1) {
        setOnSuccess((prev) => !prev);
        notification.success({
          message: "Success",
          description: "Status changed successfully",
        });
      }
    });
  };

  const deleteAccountHandler = () => {
    Axios.post(
      apis.update_delete_account,
      {
        status: "Deleted",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setOnSuccess((prev) => !prev);
        notification.success({
          message: "Success",
          description: "Account deleted successfully",
        });
        Axios.post(
          apis.logout,
          {},
          {
            headers: {
              Authorization: `Token ${constants.token_id}`,
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.data.status === 1) {
            localStorage.removeItem("user-login-tokens");
            notification.success({
              message: " Success",
              description: "Logout Successfully",
            });
            router.push("/");
            window.location.reload(false);
          } else {
            print("error loadin");
          }
        });
      }
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <Modal
        title="Are you sure to delete this account?"
        open={visible}
        centered
        closable
        maskClosable
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={deleteAccountHandler}
          >
            Submit
          </Button>,
        ]}
      ></Modal>

      <div className="store-container">
        <div className="bottom">
          <PagesSideBar currentPage="settings" />
          <div className="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Settings
              </h6>
              <div className="my-4 mx-4 ">
                <div className="basic">
                  <h6 className="my-4">Private Account</h6>{" "}
                  <div
                    className="toggle1"
                    style={{ marginRight: "50px", marginTop: "-33px" }}
                  >
                    {" "}
                    <input
                      placeholder="Active"
                      onChange={(e) => statusHandlerChange(e)}
                      checked={accountStatus}
                      type="checkbox"
                    />
                    <label></label>{" "}
                  </div>
                  <Link
                    href="/page/convert-store"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <h6 className="my-4">
                    Convert to store
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-right arrow-icon"
                        viewBox="0 0 16 16"
                        style={{ marginRight: "50px" }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </span>
                  </h6>
                  </Link>
                  <Link
                    href="/page/user-password-change"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6 className="my-4">
                      Change Password{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-chevron-right arrow-icon"
                          viewBox="0 0 16 16"
                          style={{ marginRight: "50px" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <div onClick={() => setVisible(true)}>
                    <h6 className="my-4" style={{ cursor: "pointer" }}>
                      Delete Account{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-chevron-right arrow-icon"
                          viewBox="0 0 16 16"
                          style={{ marginRight: "50px" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreSettingsPage;
