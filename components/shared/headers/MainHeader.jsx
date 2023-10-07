import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Button, Modal, notification } from "antd";
import UploadFiles from "./modules/UploadFiles";
import Notifications from "./modules/Notifications";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { updateStoreCartCount } from "@/Redux/cartsCount";
import { useRouter } from "next/router";
import { updateGroundCartCount } from "@/Redux/playgroundCartCount";
import { updateNotificationCount } from "@/Redux/notificationCount";
import { updateMessageCount } from "@/Redux/messagesCount";
import { useTheme } from "next-themes";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";
import Login from "@/components/user/Login";
import { Labels } from "@/public/data/my-constants/Labels";
import { activeModalShow } from "@/Redux/loginShow";
import UploadStory from "./modules/UploadStory";
function MainHeader({ title }) {
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
      console.log("count", res);
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
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="/images/favicon_doob.png"
          // sizes="32x16"
          type="image/png"
        />
      </Head>

      <Navbar
        collapseOnSelect
        expand="lg"
        bg={bgHead}
        variant="dark"
        sticky="top"
        className="web-nav"
        style={{ zIndex: 1003, direction: locale === "ar" ? "rtl" : "ltr" }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/images/Contract Doob before sign 13-40-2 (1).png"
              style={{ width: "120px", height: "43px" }}
            ></img>
          </Navbar.Brand>
          <Navbar id="responsive-navbar-nav">
            <Nav className=" ms-auto" aria-controls="responsive-navbar-nav">
              <Nav.Link className="create">
                <Dropdown className="create-btn">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{
                      fontFamily: "Inter, sans-serif;",
                      backgroundColor: "#17A803",
                    }}
                  >
                    {t("Create")}&nbsp;<i className="bi bi-chevron-down "></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    style={{
                      backgroundColor: "#17A803",
                      borderRadius: "0px",
                      textAlign: "inherit",
                    }}
                  >
                    <Dropdown.Item
                      onClick={() => setUploadShow(true)}
                      className="text-white "
                      style={{ backgroundColor: "#17A803" }}
                    >
                      <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        className="mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.210938 0.851562V23.8943H23.2537V0.851562H0.210938ZM22.1015 7.76438H16.3409V2.0037H22.1015V7.76438ZM15.1887 2.0037V7.76438H8.27589V2.0037H15.1887ZM1.36307 8.91652H7.12376V15.8293H1.36307V8.91652ZM8.27589 8.91652H15.1887V15.8293H8.27589V8.91652ZM7.12376 2.0037V7.76438H1.36307V2.0037H7.12376ZM1.36307 22.7422V16.9815H7.12376V22.7422H1.36307ZM8.27589 16.9815H15.1887V22.7422H8.27589V16.9815ZM22.1015 22.7422H16.3409V16.9815H22.1015V22.7422ZM16.3409 15.8293V8.91652H22.1015V15.8293H16.3409Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.303194"
                        />
                      </svg>
                      {t("Post")}
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      href="#"
                      className="text-white"
                      style={{ backgroundColor: "#17A803" }}
                    >
                      <svg
                        width="25"
                        height="18"
                        viewBox="0 0 25 19"
                        fill="none"
                        className="mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.97736 0.274057C5.34277 0.639466 5.34277 1.23191 4.97736 1.59732C0.836052 5.73863 0.836052 12.453 4.97736 16.5943C5.34277 16.9597 5.34277 17.5522 4.97736 17.9176C4.61195 18.283 4.0195 18.283 3.65409 17.9176C-1.21803 13.0455 -1.21803 5.14618 3.65409 0.274057C4.0195 -0.0913523 4.61195 -0.0913523 4.97736 0.274057ZM21.2976 0.274057C26.1697 5.14618 26.1697 13.0455 21.2976 17.9176C20.9322 18.283 20.3398 18.283 19.9743 17.9176C19.6089 17.5522 19.6089 16.9597 19.9743 16.5943C24.1157 12.453 24.1157 5.73863 19.9743 1.59732C19.6089 1.23191 19.6089 0.639466 19.9743 0.274057C20.3398 -0.0913523 20.9322 -0.0913523 21.2976 0.274057ZM8.50606 3.80276C8.87147 4.16817 8.87147 4.76062 8.50606 5.12602C6.3136 7.31848 6.3136 10.8732 8.50606 13.0656C8.87147 13.431 8.87147 14.0235 8.50606 14.3889C8.14065 14.7543 7.5482 14.7543 7.1828 14.3889C4.25952 11.4656 4.25952 6.72603 7.1828 3.80276C7.5482 3.43735 8.14065 3.43735 8.50606 3.80276ZM17.7689 3.80276C20.6922 6.72603 20.6922 11.4656 17.7689 14.3889C17.4035 14.7543 16.8111 14.7543 16.4456 14.3889C16.0802 14.0235 16.0802 13.431 16.4456 13.0656C18.6381 10.8732 18.6381 7.31848 16.4456 5.12602C16.0802 4.76062 16.0802 4.16817 16.4456 3.80276C16.8111 3.43735 17.4035 3.43735 17.7689 3.80276ZM12.4759 7.22444C13.5094 7.22444 14.3472 8.06228 14.3472 9.09582C14.3472 10.1293 13.5094 10.9672 12.4759 10.9672C11.4423 10.9672 10.6045 10.1293 10.6045 9.09582C10.6045 8.06228 11.4423 7.22444 12.4759 7.22444Z"
                          fill="white"
                        />
                      </svg>
                      Live
                    </Dropdown.Item> */}
                    <Dropdown.Item
                      onClick={() => setAddStoryShow(true)}
                      className="text-white "
                      style={{ backgroundColor: "#17A803" }}
                    >
                      <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        className="mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.210938 0.851562V23.8943H23.2537V0.851562H0.210938ZM22.1015 7.76438H16.3409V2.0037H22.1015V7.76438ZM15.1887 2.0037V7.76438H8.27589V2.0037H15.1887ZM1.36307 8.91652H7.12376V15.8293H1.36307V8.91652ZM8.27589 8.91652H15.1887V15.8293H8.27589V8.91652ZM7.12376 2.0037V7.76438H1.36307V2.0037H7.12376ZM1.36307 22.7422V16.9815H7.12376V22.7422H1.36307ZM8.27589 16.9815H15.1887V22.7422H8.27589V16.9815ZM22.1015 22.7422H16.3409V16.9815H22.1015V22.7422ZM16.3409 15.8293V8.91652H22.1015V15.8293H16.3409Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.303194"
                        />
                      </svg>
                      {t("Add Story")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        router.push({
                          pathname: "/play-ground",
                          query: { path: "headerNav" },
                        })
                      }
                      className="text-white"
                      style={{ backgroundColor: "#17A803" }}
                    >
                      <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1298 22.8954C18.158 22.8954 23.0448 18.0086 23.0448 11.9804C23.0448 5.95223 18.158 1.06543 12.1298 1.06543C6.10165 1.06543 1.21484 5.95223 1.21484 11.9804C1.21484 18.0086 6.10165 22.8954 12.1298 22.8954Z"
                          stroke="white"
                          stroke-width="1.69789"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.41406 4.26343C6.46031 6.31029 7.60982 9.08606 7.60982 11.9803C7.60982 14.8746 6.46031 17.6503 4.41406 19.6972"
                          stroke="white"
                          stroke-width="1.69789"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.8461 19.6972C17.7999 17.6503 16.6504 14.8746 16.6504 11.9803C16.6504 9.08606 17.7999 6.31029 19.8461 4.26343"
                          stroke="white"
                          stroke-width="1.69789"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {t("Create Game")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>

              <Nav.Link>
                <ThemeSwitcher />
              </Nav.Link>
              <Nav.Link>
                <LanguageSwitcher />
              </Nav.Link>
              {/* <span> */}
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
              <Nav.Link onClick={() => cartNavHandler()}>
                <div>
                  {asPath.includes("store")
                    ? storeCount > 0 && (
                        <div className="  greens">
                          <div className="numbers">{storeCount}</div>
                        </div>
                      )
                    : groundCart > 0 && (
                        <div className="  greens">
                          <div className="numbers">{groundCart}</div>
                        </div>
                      )}
                  <svg
                    width="26"
                    height="35"
                    className="shop"
                    viewBox="0 0 26 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7345 9.74039C13.7345 9.13137 13.4973 8.5473 13.0751 8.11666C12.6528 7.68602 12.0802 7.44409 11.483 7.44409C10.8859 7.44409 10.3132 7.68602 9.89101 8.11666C9.46878 8.5473 9.23157 9.13137 9.23157 9.74039M8.09683 21.2219H11.474M14.8512 21.2219H11.474M11.474 21.2219V17.7774M11.474 21.2219V24.6663M19.6559 15.1321L21.215 25.4654C21.2643 25.7925 21.2438 26.1265 21.1547 26.4447C21.0657 26.7629 20.9102 27.0577 20.6991 27.3089C20.4879 27.5602 20.2261 27.7619 19.9314 27.9003C19.6367 28.0387 19.3161 28.1105 18.9917 28.1108H3.97439C3.64977 28.1108 3.32897 28.0392 3.034 27.901C2.73903 27.7627 2.47686 27.5611 2.26547 27.3098C2.05407 27.0585 1.89845 26.7636 1.80928 26.4453C1.7201 26.1269 1.69947 25.7927 1.74882 25.4654L3.30796 15.1321C3.38974 14.5897 3.65928 14.0951 4.06775 13.7379C4.47621 13.3807 4.9966 13.1845 5.53466 13.1848H17.4314C17.9693 13.1848 18.4894 13.3811 18.8976 13.7383C19.3059 14.0955 19.5752 14.5899 19.657 15.1321H19.6559Z"
                      stroke={svgStroke}
                      stroke-width="1.60741"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    {/* <path
                      d="M18.8673 10.0888C18.4486 10.0888 18.0754 10.0169 17.7476 9.87313C17.422 9.72934 17.163 9.52952 16.9706 9.27367C16.7803 9.0157 16.6766 8.71649 16.6597 8.37606H17.459C17.4759 8.58539 17.5478 8.76618 17.6747 8.91843C17.8016 9.06856 17.9676 9.18486 18.1727 9.26732C18.3778 9.34979 18.6051 9.39102 18.8546 9.39102C19.1337 9.39102 19.3811 9.34239 19.5968 9.24512C19.8125 9.14785 19.9816 9.01252 20.1043 8.83913C20.2269 8.66574 20.2882 8.46487 20.2882 8.2365C20.2882 7.99756 20.229 7.78716 20.1106 7.60532C19.9922 7.42135 19.8188 7.27757 19.5904 7.17396C19.3621 7.07035 19.083 7.01854 18.7531 7.01854H18.2329V6.32075H18.7531C19.0111 6.32075 19.2373 6.27423 19.4319 6.18119C19.6285 6.08816 19.7818 5.95706 19.8918 5.78789C20.0038 5.61873 20.0599 5.41997 20.0599 5.1916C20.0599 4.97169 20.0112 4.78033 19.914 4.61751C19.8167 4.4547 19.6792 4.32783 19.5016 4.2369C19.3261 4.14598 19.1189 4.10052 18.88 4.10052C18.6558 4.10052 18.4444 4.14175 18.2456 4.22421C18.049 4.30457 17.8883 4.42192 17.7635 4.57628C17.6387 4.72853 17.5711 4.91249 17.5605 5.12817H16.7993C16.812 4.78773 16.9145 4.48959 17.1069 4.23373C17.2994 3.97576 17.551 3.77488 17.8618 3.63109C18.1748 3.48731 18.5184 3.41541 18.8927 3.41541C19.2944 3.41541 19.6391 3.49682 19.9266 3.65964C20.2142 3.82034 20.4352 4.03285 20.5895 4.29717C20.7439 4.56148 20.8211 4.84694 20.8211 5.15354C20.8211 5.51935 20.7249 5.83124 20.5325 6.08921C20.3421 6.34718 20.0831 6.52586 19.7554 6.62524V6.67599C20.1656 6.74365 20.4859 6.9181 20.7164 7.19933C20.9469 7.47845 21.0621 7.82417 21.0621 8.2365C21.0621 8.58962 20.9659 8.9068 20.7735 9.18803C20.5832 9.46714 20.3231 9.68705 19.9933 9.84776C19.6634 10.0085 19.2881 10.0888 18.8673 10.0888Z"
                      fill={svgStroke}
                    /> */}
                  </svg>
                </div>
              </Nav.Link>
              <Nav.Link onClick={() => navigationHandler("/chat/messages")}>
                <div style={{ paddingTop: "5px" }}>
                  {chatCount > 0 && (
                    <div className=" greens">
                      <div className="numbers">{chatCount}</div>
                    </div>
                  )}
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 23.5L23.3402 18.6314C24.7747 16.557 25.2937 14.1004 24.8005 11.7184C24.3074 9.33639 22.8358 7.19107 20.6592 5.68131C18.4827 4.17155 15.7494 3.4001 12.9675 3.51038C10.1856 3.62066 7.54441 4.60518 5.53506 6.28088C3.52571 7.95658 2.28489 10.2094 2.04333 12.6206C1.80177 15.0317 2.5759 17.437 4.22178 19.3893C5.86766 21.3416 8.27328 22.7081 10.9914 23.2345C13.7095 23.761 16.5551 23.4117 18.9991 22.2516L25 23.5Z"
                      stroke={svgStroke}
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 16.9024L10.5808 11.1463L13.0719 13.6829L17 11L15.4192 17"
                      stroke={svgStroke}
                      stroke-width="1.2"
                    />
                  </svg>
                </div>
              </Nav.Link>
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
              {/* </span> */}
            </Nav>
          </Navbar>
        </Container>
      </Navbar>

      <Modal
        title={t("Logout")}
        open={confirmLogout}
        onCancel={() => setConfirmLogout(false)}
        centered
        closable
        maskClosable
        footer={[
          <Button
            className="no-hover-effect dark-theme-color"
            onClick={() => {
              setConfirmLogout(false);
            }}
            key="cancel"
            type="secondary"
          >
            {t("Cancel")}
          </Button>,
          <Button
            className="no-hover-effect dark-theme-color"
            onClick={logoutHandle}
            key="submit"
            style={{ backgroundColor: "#17A803" }}
          >
            {t("Logout")}
          </Button>,
        ]}
      >
        <p>{t("Are you sure to logout?")}</p>
      </Modal>

      {uploadShow && <UploadFiles setUploadShow={setUploadShow} />}
      {addStoryShow && <UploadStory setAddStoryShow={setAddStoryShow} />}
      {notificationShow && (
        <Notifications setNotificationShow={setNotificationShow} />
      )}
    </>
  );
}

export default MainHeader;
