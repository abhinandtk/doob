import React, { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Modal, Button } from "antd";
import Offcanvas from "react-bootstrap/Offcanvas";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { useDispatch, useSelector } from "react-redux";
import { updateStoreCartCount } from "@/Redux/cartsCount";

// import Head from 'next/head';
// import Link from 'next/link';
import { notification } from "antd";
import UploadFiles from "./shared/headers/modules/UploadFiles";
import Notifications from "./shared/headers/modules/Notifications";
import Link from "next/link";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { updateGroundCartCount } from "@/Redux/playgroundCartCount";
import { updateNotificationCount } from "@/Redux/notificationCount";
import { updateMessageCount } from "@/Redux/messagesCount";
import { useTranslation } from "next-i18next";
import ThemeSwitcher from "./shared/headers/ThemeSwitcher";
import LanguageSwitcher from "./shared/headers/LanguageSwitcher";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTheme } from "next-themes";
import { activeModalShow } from "@/Redux/loginShow";
function MobileHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  const { theme } = useTheme();
  const [svgStroke, setSvgStroke] = useState("");
  const [bgHead, setBgHead] = useState("");
  useEffect(() => {
    setSvgStroke(theme === "dark" ? "white" : "black");
    setBgHead(theme === "dark" ? "dark" : "white");
  }, [theme]);
  const { locale } = useRouter();
  const { asPath } = router;
  const labels = Labels();
  const [show, setShow] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [addStoryShow, setAddStoryShow] = useState(false);
  const [notificationShow, setNotificationShow] = useState(false);

  const storeCount = useSelector((state) => state.storeCartCount.storeCount);
  const groundCart = useSelector((state) => state.groundCartCount.groundCount);
  const updateState = useSelector((state) => state.navbarUpdate.update);
  const notificationCount = useSelector(
    (state) => state.notificationCount.notification
  );
  const chatCount = useSelector((state) => state.chatCount.chatNotification);
  const dispatch = useDispatch();

  const isHomePage = router.pathname === "/";

  const [user, setUser] = useState("");

  const isAuthenticated = constants.token_id;

  useEffect(() => {
    Axios.get(apis.countDisplay, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      dispatch(updateStoreCartCount(res.data.data.cart_count));
      dispatch(updateGroundCartCount(res.data.data.playground));
      dispatch(updateNotificationCount(res.data.data.notification_count));
      dispatch(updateMessageCount(res.data.data.total_count));
      setUser(res.data.data.user_type);
    });
  }, [updateState]);

  const logoutHandle = (e) => {
    setConfirmLogout(false);
    e.preventDefault();
    Axios.post(
      apis.logout,
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("user-login-tokens")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.data.status === 1) {
          localStorage.removeItem("user-login-tokens");
          localStorage.removeItem("country-select");
          localStorage.removeItem("hasReloaded");

          notification.success({
            message: t("Success"),
            description: `${labels["Logout Successfully"]}`,
          });
          router.push("/");
          if (isHomePage) {
            localStorage.setItem("hasReloaded", true);
            window.location.reload();
          }
        } else {
          localStorage.removeItem("user-login-tokens");
          localStorage.removeItem("hasReloaded");
          notification.success({
            message: t("Success"),
            description: `${labels["Logout Successfully"]}`,
          });
          router.push("/");
          if (isHomePage) {
            localStorage.setItem("hasReloaded", true);
            window.location.reload();
          }
          console.log("error loading");
        }
      })
      .catch((error) => {
        localStorage.removeItem("user-login-tokens");
        notification.success({
          message: t("Success"),
          description: `${labels["Logout Successfully"]}`,
        });
        router.push("/");
        window.location.reload(false);
        console.log("error loading");
      });
  };

  const navigationHandler = (path) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      dispatch(activeModalShow("login"));
    }
  };
  const notificationHandler = () => {
    if (isAuthenticated) {
      setNotificationShow(!notificationShow);
    } else {
      dispatch(activeModalShow("login"));
    }
  };
  const hamburgerHandler = () => {
    if (isAuthenticated) {
      setShow(true);
    } else {
      dispatch(activeModalShow("login"));
    }
  };
  const cartNavHandler = () => {
    if (isAuthenticated) {
      if (asPath.includes("store") || asPath.includes("shop")) {
        router.push("/store/cart");
      } else {
        router.push("/play-ground/play-ground-cart");
      }
    } else {
      dispatch(activeModalShow("login"));
    }
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={bgHead}
        variant="dark"
        sticky="top"
        className="mobile-nav"
        style={{ zIndex: 1003, direction: locale === "ar" ? "rtl" : "ltr" }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/images/Contract Doob before sign 13-40-2 (1).png"
              className="mobile-logo"
            ></img>
          </Navbar.Brand>
          <Navbar id="responsive-navbar-nav">
            <Nav className=" ms-auto" aria-controls="responsive-navbar-nav">
              {/* <Nav.Link>
                <ThemeSwitcher />
              </Nav.Link>
              <Nav.Link>
                <LanguageSwitcher />
              </Nav.Link> */}
              <Nav.Link onClick={() => navigationHandler("/search")}>
                <svg
                  width="24"
                  height="20"
                  className={`search ${locale === "ar" ? "mx-1" : ""}`}
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.643603 10.9395C0.99762 16.1773 5.5729 20.1733 10.8112 19.8192C13.0968 19.6648 15.1372 18.7137 16.6662 17.2709L20.6823 20.7785C21.089 21.1337 21.6604 21.0951 22.0157 20.6884C22.2407 20.4818 22.3199 20.2373 22.3038 19.9991C22.2878 19.7611 22.1765 19.5293 21.9731 19.3518L17.9569 15.8442C19.1777 14.0875 19.8455 11.9377 19.691 9.65218C19.337 4.41433 14.7617 0.41837 9.52389 0.772387C4.28563 1.12627 0.289677 5.70171 0.643694 10.9396L0.643603 10.9395ZM17.7861 9.78085C18.0693 13.9714 14.8725 17.6316 10.682 17.9148C6.4919 18.1979 2.83168 15.0011 2.54846 10.8107C2.26523 6.62021 5.462 2.95999 9.65252 2.67676C13.8426 2.39356 17.5029 5.59033 17.7861 9.78085Z"
                    fill={svgStroke}
                  />
                </svg>
              </Nav.Link>

              <Link
                href={`${
                  asPath.includes("store")
                    ? "/store/cart"
                    : "/play-ground/play-ground-cart"
                }`}
                className="navbar__button1"
              >
                <div className="small-cart">
                  {asPath.includes("store")
                    ? storeCount > 0 && (
                        <div className="  greens">
                          <div className="numbers">{storeCount}</div>
                        </div>
                      )
                    : groundCart > 0 && (
                        <div className=" greens">
                          <div className="numbers">{groundCart}</div>
                        </div>
                      )}
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4619 3C11.4619 2.46957 11.2553 1.96086 10.8876 1.58579C10.5198 1.21071 10.0211 1 9.50098 1C8.9809 1 8.48213 1.21071 8.11438 1.58579C7.74662 1.96086 7.54002 2.46957 7.54002 3M6.5517 13H9.49314M12.4346 13H9.49314M9.49314 13V10M9.49314 13V16M16.6193 7.696L17.9772 16.696C18.0202 16.9808 18.0022 17.2718 17.9247 17.5489C17.8471 17.8261 17.7118 18.0828 17.5279 18.3016C17.344 18.5204 17.1159 18.6961 16.8592 18.8167C16.6025 18.9372 16.3233 18.9997 16.0408 19H2.96119C2.67845 19 2.39905 18.9377 2.14214 18.8173C1.88523 18.6969 1.65689 18.5212 1.47277 18.3024C1.28865 18.0836 1.15311 17.8267 1.07544 17.5494C0.997772 17.2721 0.979809 16.981 1.02279 16.696L2.38075 7.696C2.45198 7.22359 2.68674 6.79282 3.0425 6.4817C3.39826 6.17059 3.8515 5.9997 4.32013 6H14.6818C15.1503 5.99994 15.6033 6.17094 15.9589 6.48203C16.3144 6.79312 16.549 7.22376 16.6202 7.696H16.6193Z"
                      stroke={svgStroke}
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </Link>

              <Nav.Link>
                <div>
                  {notificationCount > 0 && (
                    <div className="  greens1">
                      <div className="numbers">{notificationCount}</div>
                    </div>
                  )}
                  <svg
                    onClick={() => notificationHandler()}
                    width="24"
                    height="31"
                    className="bell"
                    viewBox="0 0 24 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.23529 26.4706C14.6989 26.4706 17.2265 25.7187 17.4706 22.7009C17.4706 19.6851 15.7084 19.879 15.7084 16.1788C15.7084 13.2885 13.1545 10 9.23529 10C5.31604 10 2.76221 13.2885 2.76221 16.1788C2.76221 19.879 1 19.6851 1 22.7009C1.24507 25.7301 3.77265 26.4706 9.23529 26.4706Z"
                      stroke={svgStroke}
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.588 28.8235C10.5992 30.3829 9.05681 30.4013 8.05859 28.8235"
                      stroke={svgStroke}
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    {/* <circle cx="17" cy="7" r="7" fill="#17A803"></circle> */}
                    {/* <path
                      d="M17.9561 3.50422V10H17.1695V4.32888H17.1314L15.5455 5.38191V4.58262L17.1695 3.50422H17.9561Z"
                      fill="white"
                    /> */}
                  </svg>
                </div>
              </Nav.Link>
              <Nav.Link onClick={() => navigationHandler("/chat/messages")}>
                <div>
                  {chatCount > 0 && (
                    <div className="  greens">
                      <div className="numbers">{chatCount}</div>
                    </div>
                  )}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 29 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4918 19.5125V19.5244M6.8288 19.5125V19.5244M16.1549 19.5125V19.5244M1 29L2.51549 24.3748C1.20569 22.4041 0.731868 20.0704 1.18211 17.8075C1.63236 15.5446 2.97604 13.5065 4.96331 12.0722C6.95059 10.638 9.44623 9.90509 11.9862 10.0099C14.5262 10.1146 16.9377 11.0499 18.7723 12.6418C20.607 14.2338 21.7399 16.374 21.9604 18.6645C22.181 20.9551 21.4742 23.2402 19.9714 25.0949C18.4687 26.9495 16.2722 28.2477 13.7905 28.7478C11.3087 29.248 8.71057 28.9162 6.47907 27.8141L1 29Z"
                      stroke={svgStroke}
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    {/* <circle cx="22" cy="7" r="7" fill="#17A803"/> */}
                    {/* <path
                      d="M19.5202 8.66786V8.02082L22.3748 3.50422H22.8442V4.5065H22.527L20.3702 7.91932V7.97007H24.2144V8.66786H19.5202ZM22.5778 10V8.47121V8.16989V3.50422H23.3263V10H22.5778Z"
                      fill="white"
                    /> */}
                  </svg>
                </div>
              </Nav.Link>

              <Nav.Link>
                <svg
                  width="22"
                  height="18"
                  className="menu my-2"
                  onClick={() => hamburgerHandler()}
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H21M1 9H21M1 17H21"
                    stroke={svgStroke}
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <Offcanvas
                  placement={locale === "en" ? "end" : "start"}
                  show={show}
                  style={{
                    direction: locale === "en" ? "ltr" : "rtl",
                    backgroundColor: theme === "dark" ? "black" : "white",
                  }}
                  onHide={() => setShow(false)}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="mx-4">
                    <div className="">
                      <Link
                        href="/page/wallet"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="25"
                          height="22"
                          viewBox="0 0 25 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.4466 1H9.66795C5.58184 1 3.53878 1 2.26939 2.22755C1 3.45509 1 5.43078 1 9.38214V12.1763C1 16.1276 1 18.1034 2.26939 19.3309C3.53878 20.5584 5.58184 20.5584 9.66795 20.5584H15.4466C19.5327 20.5584 21.5758 20.5584 22.8452 19.3309C24.1145 18.1034 24.1145 16.1276 24.1145 12.1763V9.38214C24.1145 5.43078 24.1145 3.45509 22.8452 2.22755C21.5758 1 19.5327 1 15.4466 1Z"
                            stroke={svgStroke}
                            stroke-width="1.3039"
                          />
                          <path
                            d="M6.33398 6.33569H9.89007"
                            stroke={svgStroke}
                            stroke-width="1.3039"
                            stroke-linecap="round"
                          />
                          <path
                            d="M21.7434 17.0023H19.3727C18.2551 17.0023 17.6963 17.0023 17.3491 16.6117C17.002 16.2212 17.002 15.5925 17.002 14.3353C17.002 13.078 17.002 12.4494 17.3491 12.0588C17.6963 11.6682 18.2551 11.6682 19.3727 11.6682H21.7434C22.861 11.6682 23.4197 11.6682 23.7669 12.0588C24.1141 12.4494 24.1141 13.078 24.1141 14.3353C24.1141 15.5925 24.1141 16.2212 23.7669 16.6117C23.4197 17.0023 22.861 17.0023 21.7434 17.0023Z"
                            stroke={svgStroke}
                            stroke-width="1.3039"
                          />
                        </svg>
                        <span className="mx-2 hubs dark-theme-color">
                          {" "}
                          {t("Wallet")}
                        </span>
                      </Link>
                    </div>

                    <div className="my-4">
                      <Link
                        href="/page/favorite-stores"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="25"
                          height="22"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.4283 19.7321H16.9417C16.8028 19.8749 16.6178 19.9522 16.4283 19.9522H3.58687C3.39735 19.9522 3.21234 19.8749 3.07346 19.7321H3.58687H7.4393H7.98964V19.1818V14.4488H8.17309V19.1818V19.7321H8.72344H16.4283ZM17.1621 19.1818C17.1621 19.3718 17.0953 19.5523 16.9786 19.6912V19.1818V14.4488H17.1621V19.1818ZM2.85308 19.1818V14.4488H3.03653V19.1818V19.6912C2.91986 19.5523 2.85308 19.3718 2.85308 19.1818Z"
                            stroke={svgStroke}
                            stroke-width="1.10069"
                          />
                          <path
                            d="M19.2826 7.34042C19.2826 7.34041 19.2826 7.3404 19.2825 7.34039L16.7567 1.77377L16.7562 1.7726C16.693 1.63246 16.599 1.52206 16.4911 1.44832C16.3839 1.37507 16.2657 1.33951 16.1495 1.33941H3.86609C3.74986 1.33951 3.6317 1.37507 3.52451 1.44832C3.4166 1.52206 3.32257 1.63246 3.25937 1.7726L3.25885 1.77377L0.733029 7.34039C0.732995 7.34046 0.732962 7.34054 0.732928 7.34061C0.67985 7.45805 0.651432 7.5901 0.651914 7.72566L0.651921 7.72761L0.651918 9.82897V9.82994C0.651559 10.0317 0.714941 10.2211 0.822476 10.3665C1.04633 10.6475 1.31892 10.8687 1.61971 11.0185C1.9223 11.1692 2.24805 11.2451 2.57542 11.2435L2.57907 11.2435C3.11341 11.2444 3.63961 11.0413 4.06659 10.6555L4.43565 10.3221L4.80461 10.6556C5.2318 11.0418 5.75818 11.2456 6.29296 11.2456C6.82773 11.2456 7.35411 11.0418 7.78131 10.6556L8.15037 10.322L8.51944 10.6556C8.94663 11.0418 9.47301 11.2456 10.0078 11.2456C10.5426 11.2456 11.0689 11.0418 11.4961 10.6556L11.8652 10.322L12.2343 10.6556C12.6615 11.0418 13.1878 11.2456 13.7226 11.2456C14.2574 11.2456 14.7838 11.0418 15.211 10.6556L15.5802 10.3218L15.9493 10.6558C16.4256 11.0867 17.0239 11.2891 17.6184 11.2369C18.2113 11.1849 18.7764 10.8815 19.1894 10.3701M19.1894 10.3701C19.1881 10.3717 19.1869 10.3733 19.1857 10.375L19.623 10.7091L19.1939 10.3645C19.1924 10.3664 19.1909 10.3682 19.1894 10.3701ZM19.914 9.83579V7.72761C19.9148 7.51456 19.8702 7.30427 19.784 7.11358L19.914 9.83579Z"
                            stroke={svgStroke}
                            stroke-width="1.10069"
                          />
                        </svg>
                        <span className="mx-2 hubs dark-theme-color">
                          {" "}
                          {t("Favourite Stores")}
                        </span>
                      </Link>
                    </div>
                    {((user && user === "Store") ||
                      (user && user === "Pro")) && (
                      <div className="my-4">
                        <Link
                          href="/shop/shop-management"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <svg
                            width="25"
                            height="22"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.4283 19.7321H16.9417C16.8028 19.8749 16.6178 19.9522 16.4283 19.9522H3.58687C3.39735 19.9522 3.21234 19.8749 3.07346 19.7321H3.58687H7.4393H7.98964V19.1818V14.4488H8.17309V19.1818V19.7321H8.72344H16.4283ZM17.1621 19.1818C17.1621 19.3718 17.0953 19.5523 16.9786 19.6912V19.1818V14.4488H17.1621V19.1818ZM2.85308 19.1818V14.4488H3.03653V19.1818V19.6912C2.91986 19.5523 2.85308 19.3718 2.85308 19.1818Z"
                              stroke={svgStroke}
                              stroke-width="1.10069"
                            />
                            <path
                              d="M19.2826 7.34042C19.2826 7.34041 19.2826 7.3404 19.2825 7.34039L16.7567 1.77377L16.7562 1.7726C16.693 1.63246 16.599 1.52206 16.4911 1.44832C16.3839 1.37507 16.2657 1.33951 16.1495 1.33941H3.86609C3.74986 1.33951 3.6317 1.37507 3.52451 1.44832C3.4166 1.52206 3.32257 1.63246 3.25937 1.7726L3.25885 1.77377L0.733029 7.34039C0.732995 7.34046 0.732962 7.34054 0.732928 7.34061C0.67985 7.45805 0.651432 7.5901 0.651914 7.72566L0.651921 7.72761L0.651918 9.82897V9.82994C0.651559 10.0317 0.714941 10.2211 0.822476 10.3665C1.04633 10.6475 1.31892 10.8687 1.61971 11.0185C1.9223 11.1692 2.24805 11.2451 2.57542 11.2435L2.57907 11.2435C3.11341 11.2444 3.63961 11.0413 4.06659 10.6555L4.43565 10.3221L4.80461 10.6556C5.2318 11.0418 5.75818 11.2456 6.29296 11.2456C6.82773 11.2456 7.35411 11.0418 7.78131 10.6556L8.15037 10.322L8.51944 10.6556C8.94663 11.0418 9.47301 11.2456 10.0078 11.2456C10.5426 11.2456 11.0689 11.0418 11.4961 10.6556L11.8652 10.322L12.2343 10.6556C12.6615 11.0418 13.1878 11.2456 13.7226 11.2456C14.2574 11.2456 14.7838 11.0418 15.211 10.6556L15.5802 10.3218L15.9493 10.6558C16.4256 11.0867 17.0239 11.2891 17.6184 11.2369C18.2113 11.1849 18.7764 10.8815 19.1894 10.3701M19.1894 10.3701C19.1881 10.3717 19.1869 10.3733 19.1857 10.375L19.623 10.7091L19.1939 10.3645C19.1924 10.3664 19.1909 10.3682 19.1894 10.3701ZM19.914 9.83579V7.72761C19.9148 7.51456 19.8702 7.30427 19.784 7.11358L19.914 9.83579Z"
                              stroke={svgStroke}
                              stroke-width="1.10069"
                            />
                          </svg>
                          <span className="mx-2 hubs dark-theme-color">
                            {" "}
                            {t("Manage Store")}
                          </span>
                        </Link>
                      </div>
                    )}
                    {((user && user === "Field") ||
                      (user && user === "Pro")) && (
                      <div className="my-4">
                        <Link
                          href="/play-ground/playground-management"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <svg
                            width="25"
                            height="28"
                            viewBox="0 0 580 879"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M579.912 11.7065V866.673C579.912 873.122 574.672 878.355 568.229 878.355H11.6823C5.23369 878.355 0 873.122 0 866.673L0 11.7065C0 5.25788 5.23369 0.0241884 11.6823 0.0241884H568.223C574.672 0.0241884 579.912 5.25788 579.912 11.7065ZM556.541 854.991V23.3889H23.3647L23.3647 854.991H556.541Z"
                              fill={svgStroke}
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M393.224 439.109C393.224 496.049 346.897 542.375 289.952 542.375C233.012 542.375 186.686 496.055 186.686 439.109C186.686 382.169 233.006 335.837 289.952 335.837C346.891 335.837 393.224 382.163 393.224 439.109ZM210.05 439.109C210.05 483.169 245.892 519.016 289.952 519.016C334.012 519.016 369.853 483.175 369.853 439.109C369.853 395.043 334.012 359.208 289.952 359.208C245.892 359.208 210.05 395.049 210.05 439.109Z"
                              fill={svgStroke}
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M579.92 439.161C579.92 445.61 574.681 450.844 568.238 450.844H381.554C366.174 450.844 366.18 427.479 381.554 427.479H568.232C574.681 427.479 579.92 432.713 579.92 439.161ZM210.057 439.161C210.057 445.61 204.824 450.844 198.375 450.844H11.697C-3.68284 450.844 -3.68284 427.479 11.697 427.479H198.375C204.83 427.479 210.057 432.713 210.057 439.161Z"
                              fill={svgStroke}
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M454.975 11.678V184.986C454.975 191.434 449.736 196.668 443.293 196.668H136.614C130.165 196.668 124.932 191.428 124.932 184.986V11.6838C124.932 5.23517 130.165 0.00148017 136.614 0.00148017H443.293C449.742 -0.0102022 454.975 5.22348 454.975 11.6721V11.678ZM431.611 173.297V23.372H148.296V173.297H431.611Z"
                              fill={svgStroke}
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M403.537 11.7429V126.902C403.537 133.35 398.298 138.584 391.855 138.584H188.068C181.619 138.584 176.386 133.344 176.386 126.902V11.7488C176.386 5.30012 181.619 0.0664291 188.068 0.0664291H391.855C398.298 0.0547468 403.537 5.28843 403.537 11.7371V11.7429ZM380.167 115.213V23.437H199.739V115.213H380.167Z"
                              fill={svgStroke}
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M454.975 693.371V866.673C454.975 873.122 449.736 878.355 443.293 878.355H136.614C130.165 878.355 124.932 873.122 124.932 866.673V693.371C124.932 686.923 130.165 681.689 136.614 681.689H443.293C449.742 681.689 454.975 686.923 454.975 693.371ZM431.611 854.991V705.054H148.296V854.991H431.611Z"
                              fill={svgStroke}
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M403.537 751.52V866.673C403.537 873.122 398.298 878.355 391.855 878.355H188.068C181.619 878.355 176.386 873.122 176.386 866.673V751.514C176.386 745.066 181.619 739.832 188.068 739.832H391.855C398.298 739.844 403.537 745.066 403.537 751.526V751.52ZM380.167 854.991V763.197H199.739V854.991H380.167Z"
                              fill={svgStroke}
                            />
                          </svg>

                          <span className="mx-2 hubs dark-theme-color">
                            {" "}
                            {t("Manage Field")}
                          </span>
                        </Link>
                      </div>
                    )}
                    <div className="my-4">
                      <Link
                        href="/page/favorite-products"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="25"
                          height="21"
                          viewBox="0 0 23 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.3278 20.0134C11.2241 20.0118 11.1225 19.9837 11.0327 19.9318C10.9207 19.8808 8.39705 18.4429 5.83264 16.1382C2.32185 12.9666 0.541017 9.81545 0.541017 6.75606C0.540094 5.49027 0.944398 4.25757 1.6945 3.23915C2.4446 2.22074 3.50093 1.47033 4.70821 1.09824C5.91549 0.726152 7.21005 0.752003 8.40158 1.172C9.59311 1.59199 10.6188 2.38397 11.3278 3.43152C12.0368 2.38397 13.0625 1.59199 14.254 1.172C15.4455 0.752003 16.7401 0.726152 17.9474 1.09824C19.1547 1.47033 20.211 2.22074 20.9611 3.23915C21.7112 4.25757 22.1155 5.49027 22.1146 6.75606C22.1146 9.81545 20.3337 12.9666 16.8229 16.1382C14.2585 18.4429 11.7348 19.8808 11.6229 19.9318C11.533 19.9837 11.4315 20.0118 11.3278 20.0134ZM6.44322 2.06499C5.20172 2.06499 4.01108 2.55923 3.13321 3.43897C2.25534 4.31872 1.76216 5.51191 1.76216 6.75606C1.76216 12.5995 9.67925 17.6985 11.3278 18.6877C12.9763 17.6985 20.8934 12.5995 20.8934 6.75606C20.8958 5.66984 20.5219 4.61646 19.8357 3.77569C19.1494 2.93491 18.1933 2.35886 17.1304 2.14584C16.0676 1.93281 14.9639 2.09602 14.0077 2.6076C13.0516 3.11919 12.3022 3.94744 11.8875 4.95102C11.8437 5.06409 11.7668 5.16125 11.6669 5.22976C11.567 5.29827 11.4488 5.33493 11.3278 5.33493C11.2068 5.33493 11.0886 5.29827 10.9887 5.22976C10.8888 5.16125 10.8119 5.06409 10.7681 4.95102C10.4123 4.09565 9.81163 3.36507 9.04192 2.85144C8.27222 2.33781 7.36795 2.06415 6.44322 2.06499Z"
                            fill={svgStroke}
                          />
                        </svg>
                        <span className="mx-2 hubs dark-theme-color">
                          {" "}
                          {t("Favourite Products")}
                        </span>
                      </Link>
                    </div>

                    <div className="my-4">
                      <Link
                        href="/play-ground/all-bookings"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="22"
                          height="21"
                          viewBox="0 0 23 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.1654 2.98868V3.10854H19.2853H19.8156C21.0185 3.10988 21.9934 4.08484 21.9947 5.28779V19.4337C21.9941 20.6366 21.0185 21.6122 19.8157 21.6129H2.83997C1.63712 21.6115 0.66221 20.6366 0.660869 19.4336L0.660869 5.28772C0.662245 4.0848 1.63714 3.10988 2.83997 3.10854H3.37033H3.49019V2.98868V1.0434C3.49019 0.621496 3.83264 0.279033 4.2545 0.279033C4.67635 0.279033 5.01881 0.621496 5.01881 1.0434V2.98868V3.10854H5.13866H17.5169H17.6368V2.98868V1.0434C17.6368 0.621496 17.9792 0.279033 18.4011 0.279033C18.823 0.279033 19.1654 0.621496 19.1654 1.0434V2.98868ZM2.83984 4.63727L2.83955 4.63727C2.48074 4.63814 2.19035 4.92855 2.18949 5.28737V5.28766V7.23294V7.35279H2.30934H20.3463H20.4661V7.23294V5.28766C20.4661 4.92862 20.1748 4.63727 19.8158 4.63727L2.83984 4.63727ZM2.30934 8.88153H2.18949V9.00138V19.4338C2.18949 19.7928 2.4808 20.0842 2.83984 20.0842H19.8158C20.1748 20.0842 20.4661 19.7928 20.4661 19.4338V9.00138V8.88153H20.3463H2.30934Z"
                            fill={svgStroke}
                            stroke={svgStroke}
                            stroke-width="0.239706"
                          />
                        </svg>

                        <span className="mx-3 hubs dark-theme-color">
                          {t("Bookings")}
                        </span>
                      </Link>
                    </div>

                    <div className="my-4">
                      <Link
                        href="/page/my-orders"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.8769 5.84048H16.1802C16.1802 4.3306 15.6119 2.88256 14.6005 1.81491C13.589 0.74726 12.2172 0.147461 10.7868 0.147461C9.35636 0.147461 7.98453 0.74726 6.97308 1.81491C5.96162 2.88256 5.39339 4.3306 5.39339 5.84048H2.69669C1.98149 5.84048 1.29557 6.14038 0.789844 6.67421C0.284115 7.20803 0 7.93205 0 8.68699L0 18.1754C0.00142732 19.4331 0.475411 20.639 1.31798 21.5283C2.16055 22.4177 3.30292 22.918 4.49449 22.9196H17.0791C18.2706 22.918 19.413 22.4177 20.2556 21.5283C21.0981 20.639 21.5721 19.4331 21.5736 18.1754V8.68699C21.5736 7.93205 21.2894 7.20803 20.7837 6.67421C20.278 6.14038 19.5921 5.84048 18.8769 5.84048ZM10.7868 2.04514C11.7404 2.04514 12.6549 2.445 13.3292 3.15677C14.0036 3.86853 14.3824 4.83389 14.3824 5.84048H7.19119C7.19119 4.83389 7.57001 3.86853 8.24431 3.15677C8.91862 2.445 9.83317 2.04514 10.7868 2.04514V2.04514ZM19.7758 18.1754C19.7758 18.9303 19.4916 19.6543 18.9859 20.1882C18.4802 20.722 17.7943 21.0219 17.0791 21.0219H4.49449C3.77928 21.0219 3.09337 20.722 2.58764 20.1882C2.08191 19.6543 1.7978 18.9303 1.7978 18.1754V8.68699C1.7978 8.43535 1.8925 8.19401 2.06108 8.01607C2.22965 7.83812 2.45829 7.73816 2.69669 7.73816H5.39339V9.63583C5.39339 9.88748 5.4881 10.1288 5.65667 10.3068C5.82525 10.4847 6.05389 10.5847 6.29229 10.5847C6.53069 10.5847 6.75933 10.4847 6.92791 10.3068C7.09648 10.1288 7.19119 9.88748 7.19119 9.63583V7.73816H14.3824V9.63583C14.3824 9.88748 14.4771 10.1288 14.6457 10.3068C14.8142 10.4847 15.0429 10.5847 15.2813 10.5847C15.5197 10.5847 15.7483 10.4847 15.9169 10.3068C16.0855 10.1288 16.1802 9.88748 16.1802 9.63583V7.73816H18.8769C19.1153 7.73816 19.3439 7.83812 19.5125 8.01607C19.6811 8.19401 19.7758 8.43535 19.7758 8.68699V18.1754Z"
                            fill={svgStroke}
                          />
                        </svg>
                        <span className="mx-3 hubs dark-theme-color">
                          {t("My Orders")}
                        </span>
                      </Link>
                    </div>

                    <div className="my-4">
                      <Link
                        href="/store/feedback"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 21 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.614 21.1883C16.4962 21.8806 15.907 22.358 15.2236 22.358H4.24188V24.2678H15.2236C16.8261 24.2678 18.1929 23.0981 18.4757 21.5225L19.9839 12.9284C20.1489 11.9496 19.8897 10.9469 19.277 10.2069C18.6407 9.44298 17.7216 9.01327 16.7554 9.01327H13.0084C13.2912 8.12998 13.6683 6.84087 13.9746 5.14591L14.116 4.14327C14.3281 2.56768 13.2441 1.13532 11.7123 0.920469C10.9582 0.824978 10.2276 1.01596 9.61492 1.46954C9.0022 1.92312 8.62515 2.61542 8.50732 3.35547L8.36592 4.31037C8.34235 4.42974 8.31879 4.5491 8.31879 4.66846C8.29522 4.78783 8.27166 4.90719 8.24809 5.02655C7.51755 8.51195 4.78389 11.3289 1.249 12.2361L0 12.5464V24.2678H1.88528V14.0265C6.00932 12.9045 9.23786 9.56234 10.1098 5.43238C10.1334 5.28915 10.1569 5.14591 10.2041 5.00268C10.2276 4.85944 10.2512 4.71621 10.2748 4.57297L10.4162 3.61807C10.4397 3.35547 10.5811 3.14062 10.7932 2.99738C11.0053 2.85415 11.241 2.78253 11.5002 2.8064C12.0186 2.87802 12.3721 3.35547 12.3014 3.88067L12.1836 4.8117C11.6887 7.58092 11.0053 9.18038 10.8875 9.49072L10.8168 9.6817V10.9231H16.8261C17.2503 10.9231 17.6509 11.1141 17.9101 11.4244C18.1694 11.7586 18.2872 12.1883 18.2165 12.5942L16.614 21.1883Z"
                            fill={svgStroke}
                          />
                        </svg>
                        <span className="mx-3 hubs dark-theme-color">
                          {t("Feedback")}
                        </span>
                      </Link>
                    </div>
                    <div className="my-4">
                      <Link
                        href="/page/settings-page"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <svg
                          width="22"
                          className="svg"
                          height="22"
                          viewBox="0 0 23 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.826 10.2039H18.723C18.4137 10.2039 18.1434 9.99474 18.0484 9.68981C17.9515 9.37852 17.8339 9.07469 17.6964 8.78055C17.5648 8.49715 17.6168 8.15782 17.8317 7.93277L20.0185 5.6511C20.1028 5.56307 20.1028 5.42039 20.0187 5.33252L17.8893 3.11079C17.8053 3.023 17.6687 3.023 17.5845 3.11094L15.4054 5.3848C15.1893 5.61026 14.8616 5.66402 14.589 5.524C14.3055 5.37797 14.0124 5.25303 13.7119 5.15013C13.4207 5.05079 13.2213 4.76871 13.2213 4.44681V1.2251C13.2213 1.1654 13.1986 1.10815 13.1581 1.06594C13.1177 1.02373 13.0628 1.00001 13.0056 1H9.99448C9.93727 1.00001 9.8824 1.02373 9.84195 1.06594C9.80149 1.10815 9.77876 1.1654 9.77876 1.2251V4.51944C9.77876 4.83399 9.58833 5.11141 9.30687 5.21619C9.024 5.32208 8.75101 5.44583 8.48966 5.5868C8.21543 5.73467 7.88072 5.68328 7.66102 5.45403L5.41556 3.11094C5.39555 3.09003 5.37177 3.07343 5.34561 3.06211C5.31944 3.05079 5.29139 3.04497 5.26307 3.04497C5.23474 3.04497 5.20669 3.0508 5.18053 3.06213C5.15436 3.07345 5.1306 3.09005 5.11058 3.11097L2.98138 5.3325C2.96133 5.3534 2.94542 5.37822 2.93456 5.40554C2.92371 5.43287 2.91812 5.46215 2.91812 5.49173C2.91812 5.52131 2.92371 5.55059 2.93456 5.57791C2.94542 5.60524 2.96133 5.63006 2.98138 5.65096L5.30283 8.07335C5.51497 8.29398 5.56932 8.62757 5.44467 8.90912C5.33253 9.16293 5.235 9.4235 5.1526 9.68944C5.05778 9.99444 4.78687 10.2039 4.47735 10.2039H1.17412C1.11691 10.2039 1.06205 10.2276 1.02159 10.2698C0.981138 10.312 0.958409 10.3693 0.958403 10.429V13.5708C0.958409 13.6305 0.981138 13.6877 1.02159 13.7299C1.06205 13.7721 1.11691 13.7959 1.17412 13.7959H4.56205C4.86272 13.7959 5.12787 13.9935 5.22963 14.2862C5.31313 14.5265 5.40922 14.7617 5.51745 14.9909C5.65089 15.2753 5.59939 15.6172 5.38323 15.8428L2.98124 18.3492C2.89708 18.4369 2.89708 18.5793 2.98136 18.6672L5.11075 20.889C5.19484 20.9768 5.33124 20.9768 5.41556 20.8888L7.82562 18.374C8.04122 18.1497 8.36784 18.0953 8.63938 18.2337C8.85697 18.3442 9.08013 18.4423 9.30787 18.5277C9.58887 18.6337 9.77878 18.9104 9.77878 19.2247V22.7749C9.77879 22.8346 9.80152 22.8918 9.84197 22.9341C9.88242 22.9763 9.93729 23 9.9945 23H13.0056C13.0628 23 13.1177 22.9763 13.1581 22.9341C13.1986 22.8918 13.2213 22.8346 13.2213 22.7749V19.2975C13.2213 18.9753 13.4209 18.6932 13.7122 18.5936C13.9599 18.5089 14.2027 18.4093 14.4394 18.2955C14.7093 18.1654 15.0286 18.222 15.2402 18.4428L17.5847 20.889C17.6688 20.9768 17.8053 20.9768 17.8895 20.8888L20.0186 18.6674C20.1028 18.5794 20.1028 18.4369 20.0187 18.3491L17.7504 15.9821C17.5313 15.7527 17.4821 15.4038 17.6236 15.1181C17.7553 14.8518 17.8713 14.574 17.9715 14.2855C18.0734 13.9931 18.3382 13.7959 18.6385 13.7959H21.826C21.8832 13.7959 21.938 13.7722 21.9785 13.73C22.019 13.6877 22.0417 13.6305 22.0417 13.5708V10.429C22.0417 10.3693 22.019 10.312 21.9785 10.2698C21.938 10.2276 21.8832 10.2039 21.826 10.2039L21.826 10.2039ZM21.826 9.20387C22.4743 9.20387 23 9.75238 23 10.429V13.5708C23 14.2474 22.4743 14.7959 21.826 14.7959H18.8116C18.7345 15.0037 18.6492 15.208 18.5559 15.4085L20.6963 17.6419C21.1546 18.1202 21.1546 18.8957 20.6963 19.3744L18.5672 21.5957C18.1088 22.0745 17.3651 22.0745 16.9068 21.5959L14.6841 19.2767C14.5183 19.3519 14.35 19.4209 14.1796 19.4838V22.7749C14.1796 23.4515 13.6539 24 13.0055 24H9.9944C9.34601 24 8.82035 23.4515 8.82035 22.7749V19.4053C8.6712 19.3454 8.52387 19.2806 8.3786 19.2111L6.09313 21.5959C5.63453 22.0745 4.89112 22.0745 4.43292 21.5959L2.30367 19.3744C1.84507 18.8958 1.84507 18.1201 2.30367 17.6419L4.581 15.2656C4.51232 15.1112 4.44841 14.9545 4.38935 14.7959H1.17405C0.525656 14.7959 0 14.2474 0 13.5708V10.429C0 9.75238 0.525656 9.20387 1.17405 9.20387H4.29806C4.36025 9.01805 4.42896 8.83468 4.50407 8.65413L2.30367 6.35806C1.84509 5.87955 1.84509 5.10391 2.30369 4.62537L4.43275 2.40398C4.89112 1.92527 5.63453 1.92527 6.09313 2.40384L8.2111 4.6139C8.41029 4.51282 8.61357 4.42077 8.82038 4.33802V1.2251C8.82038 0.548511 9.34603 0 9.99443 0H13.0055C13.6539 0 14.1796 0.548511 14.1796 1.2251V4.26006C14.4082 4.34459 14.6329 4.44039 14.8528 4.54712L16.9067 2.40396C17.3651 1.92522 18.1089 1.92522 18.5671 2.40379L20.6964 4.62552C21.1546 5.10401 21.1546 5.8794 20.6963 6.35806L18.6338 8.50999C18.7337 8.73679 18.8234 8.96833 18.9026 9.20387H21.8259H21.826ZM14.8542 11.875C14.8542 13.8771 13.2989 15.5 11.3802 15.5C9.46152 15.5 7.90627 13.8771 7.90627 11.875C7.90627 9.87286 9.46152 8.24998 11.3802 8.24998C13.2989 8.24998 14.8542 9.87286 14.8542 11.875ZM13.8958 11.875C13.8958 10.4251 12.7697 9.24998 11.3802 9.24998C9.99078 9.24998 8.8646 10.4251 8.8646 11.875C8.8646 13.3248 9.99078 14.5 11.3802 14.5C12.7697 14.5 13.8958 13.3248 13.8958 11.875Z"
                            fill={svgStroke}
                          />
                        </svg>
                        <span className="mx-3 hubs dark-theme-color">
                          {t("Settings")}
                        </span>
                      </Link>
                    </div>

                    <div
                      onClick={() => {
                        setShow(false);
                        setConfirmLogout(true);
                      }}
                      className="my-4"
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="22"
                        height="24"
                        viewBox="0 0 21 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.0844 4.40723C15.0065 4.36444 14.9135 4.33891 14.8145 4.33891C14.5015 4.33891 14.2475 4.59114 14.2475 4.90192C14.2475 5.11437 14.3662 5.29978 14.5416 5.39512L14.5446 5.39662C17.3343 6.9205 19.1933 9.82037 19.1933 13.1504C19.1933 18.0215 15.216 21.9709 10.3102 21.9709C5.40453 21.9709 1.4272 18.0215 1.4272 13.1504C1.4272 9.83163 3.2726 6.94152 6.00026 5.43566L6.04562 5.41239C6.22102 5.3148 6.3382 5.13088 6.3382 4.91994C6.3382 4.60916 6.08418 4.35693 5.77119 4.35693C5.67216 4.35693 5.57841 4.38245 5.49752 4.42674L5.50054 4.42524C2.37447 6.1488 0.293945 9.40825 0.293945 13.1496C0.293945 18.6424 4.77856 23.0954 10.3102 23.0954C15.8419 23.0954 20.3265 18.6424 20.3265 13.1496C20.3265 9.39399 18.2301 6.12478 15.1366 4.432L15.0852 4.40573L15.0844 4.40723ZM10.2717 11.11C10.5847 11.11 10.8387 10.8578 10.8387 10.547V1.51711C10.8387 1.20633 10.5847 0.954102 10.2717 0.954102C9.9587 0.954102 9.70468 1.20633 9.70468 1.51711V10.547C9.70468 10.8578 9.9587 11.11 10.2717 11.11Z"
                          fill={svgStroke}
                        />
                      </svg>{" "}
                      &nbsp;
                      <span className="mx-3 hubs dark-theme-color">
                        {t("Logout")}
                      </span>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </Nav.Link>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>

      <Modal
        title="Logout"
        open={confirmLogout}
        onCancel={() => setConfirmLogout(false)}
        centered
        closable
        maskClosable
        footer={[
          <Button
            className="no-hover-effect"
            onClick={() => {
              setConfirmLogout(false);
            }}
            key="cancel"
            type="secondary"
          >
            {t("Cancel")}
          </Button>,
          <Button
            className="no-hover-effect"
            onClick={logoutHandle}
            key="submit"
            style={{ backgroundColor: "#17A803", color: "black" }}
          >
            {t("Logout")}
          </Button>,
        ]}
      >
        <p>{t("Are you sure to logout?")}</p>
      </Modal>

      {uploadShow && <UploadFiles setUploadShow={setUploadShow} />}
      {notificationShow && (
        <Notifications setNotificationShow={setNotificationShow} />
      )}
    </div>
  );
}

export default MobileHeader;
