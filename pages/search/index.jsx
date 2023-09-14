import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Tab,
  Tabs,
  CardImg,
  Card,
} from "react-bootstrap";

import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function SearchPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");
  const [error, setError] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [feedResult, setFeedResult] = useState([]);

  const handleTabChange = (tabNo) => {
    setActiveTab(tabNo);
  };

  // const userSearchResult = (e) => {
  //   setSearchInput(e.target.value);
  useEffect(() => {
    if (activeTab === "1") {
      Axios.post(apis.postsearch, {
        user_input: searchInput,
      }).then((res) => {
        console.log("uiiiiiiiiiiiiiiiiii", res);

        if (res.data.status === 1) {
          setFeedResult(res.data.data.results);
          setError(false);
        } else {
          setError(true);
        }
      });
    } else {
      console.log("2222222222222222222222222", activeTab);
      // setSearchInput(e.target.value);
      Axios.post(
        apis.usersearch,
        {
          user_input: searchInput,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        if (res.data.status === 1) {
          setSearchResult(res.data.data.results);
          setError(false);
        } else {
          setError(true);
        }
      });
    }
  }, [searchInput, activeTab]);
  console.log("searchInput", searchInput);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="container2">
        <form
          className="nosubmit "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="nosubmit"
            type="search"
            placeholder={t("Search")}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>

        <section id="tabs">
          {/* <div className="col-md-9  "> */}
          <Tabs
            id="uncontrolled-tab-example"
            style={{ display: "flex", justifyContent: "space-evenly" }}
            activeKey={activeTab}
            onSelect={handleTabChange}
          >
            <Tab eventKey={1} title={t("Feeds")}>
              <hr className="col-md-12 line"></hr>

              <div className="row images" style={{ minHeight: "700px" }}>
                {error ? (
                  <p style={{ color: "#A2A2A2" }}>No results found...</p>
                ) : (
                  feedResult &&
                  feedResult.map((item, index) => (
                    <div key={index} className="col-md-4" tabindex="0">
                      <Link href={`/page/post/${item.slug}`}>
                        <img
                          src={`${constants.port}${item.image}`}
                          className="image"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </Tab>
            <Tab eventKey={2} title={t("Profiles")}>
              <hr className="col-md-12 line"></hr>
              <div style={{ minHeight: "700px" }}>
                {error ? (
                  <p style={{ color: "#A2A2A2" }}>No results found...</p>
                ) : (
                  searchResult &&
                  searchResult.map((item, index) => (
                    <Link
                      key={index}
                      href={`/userprofile/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex flex-start mt-4 mx-2">
                        <a className="mx-2" href="">
                          {item.image && item.image !== "" ? (
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
                                className="dark-theme-color mb-0"
                                style={{
                                  fontWeight: "600",
                                  // color: "#000",
                                  fontSize: "15px",
                                }}
                              >
                                {item.name}
                              </p>
                            </div>

                            <p
                              className="dark-theme-color small "
                              style={{
                                // color: "#000",
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
                    </Link>
                  ))
                )}
              </div>
            </Tab>
          </Tabs>
        </section>
      </div>

      <MobileFooter />
    </Fragment>
  );
}

export default SearchPage;
