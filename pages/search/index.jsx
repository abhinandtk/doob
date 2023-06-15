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

function SearchPage() {
  const [activeTab, setActiveTab] = useState("1");
  const [error, setError] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [feedResult, setFeedResult] = useState([]);

  const handleTabChange = (tabNo) => {
    setActiveTab(tabNo);
  };

  console.log("uiiiiiiiiiiiiiiiiii", activeTab);
  const userSearchResult = (e) => {
    setSearchInput(e.target.value);
    if (activeTab === "1") {
      console.log("uiiiiiiiiiiiiiiiiii", activeTab);

      Axios.post(apis.postsearch, {
        user_input: searchInput,
      }).then((res) => {
        if (res.data.status === 1) {
          setFeedResult(res.data.data.results);
          setError(false);
        } else {
          setError(true);
        }
      });
    } else {
      console.log("2222222222222222222222222", activeTab);
      setSearchInput(e.target.value);
      Axios.post(apis.usersearch, {
        user_input: searchInput,
      }).then((res) => {
        if (res.data.status === 1) {
          console.log(res);
          setSearchResult(res.data.data.results);
          setError(false);
        } else {
          setError(true);
        }
      });
    }
  };
  console.log('searchInput',searchInput)

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="container2">
        <form className="nosubmit ">
          <input
            className="nosubmit"
            type="search"
            placeholder="Search"
            onChange={(e) => userSearchResult(e)}
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
            <Tab eventKey={1} title="Feeds">
              <hr className="col-md-12 line"></hr>

              <div className="row images">
                {error ? (
                  <p style={{ color: "#A2A2A2" }}>No results found...</p>
                ) : (
                  feedResult.map((item, index) => (
                    <div key={index} className="col-md-4" tabindex="0">
                      <img
                        src={`${constants.port}${item.image}`}
                        className="image"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  ))
                )}
              </div>
            </Tab>
            <Tab eventKey={2} title="Profiles">
              <hr className="col-md-12 line"></hr>

              {error ? (
                <p style={{ color: "#A2A2A2" }}>No results found...</p>
              ) : (
                searchResult.map((item, index) => (
                  <Link
                    key={index}
                    href={`/userprofile/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="d-flex flex-start mt-4 mx-2">
                      <a className="me-2" href="">
                        <CardImg
                          className="rounded-circle shadow-1-strong "
                          src={`${constants.port}/media/${item.image}`}
                          style={{
                            width: "44px",
                            height: "44px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      </a>
                      <div
                        className="flex-grow-1 flex-shrink-1 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p
                              className="mb-0"
                              style={{
                                fontWeight: "600",
                                color: "#000",
                                fontSize: "15px",
                              }}
                            >
                              {item.name}
                            </p>
                          </div>

                          <p
                            className="small "
                            style={{
                              color: "#000",
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
            </Tab>
          </Tabs>
        </section>
      </div>

      <MobileFooter />
    </Fragment>
  );
}

export default SearchPage;
