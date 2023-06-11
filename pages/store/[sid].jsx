import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Carousel,
  Card,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import StoreTopDetails from "@/components/stores/StoreTopDetails";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import { useRouter } from "next/router";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useEffect } from "react";
import SearchCategory from "@/components/stores/SearchCategory";
import StoreBannerCard from "@/components/stores/StoreBannerCard";
import moment from "moment";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";

function StoreDetailPage() {
  const router = useRouter();
  const { sid } = router.query;

  const [searchInput, setSearchInput] = useState("");
  const [success,setSuccess]=useState(false)
  const [storeDetails, setStoreDetails] = useState([]);
  const [storeCategory, setStoreCategory] = useState([]);
  const [offersData, setOffersData] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.storeview,
      {
        store_id: sid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setStoreDetails(res.data.data.store[0]);
      setStoreCategory(res.data.data.store[0].categories);
      setOffersData(res.data.data.offers);
    });
  },[success]);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <form className="nosubmit ">
          <span>
            {" "}
            <input
              className="nosubmit1"
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              placeholder="Search"
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.push({
                  pathname: "/store/search",
                  query: {
                    search: searchInput,
                  },
                })
              }
            >
              <img
                src="../images/store/Fil-icon.png"
                className="filters-icon"
              ></img>
            </span>
          </span>
        </form>
        <StoreTopDetails data={storeDetails} setSuccess={setSuccess}/>

        {/* <StoreBannerCard /> */}

        {/* <section>
  <div className='row store'>
       <div className='col-lg-4 col-md-5  '>
      <img src='../images/store/17.png'  ></img>
      </div>
      <div className='col-lg-4 col-md-5 '>
      <img src='../images/store/ww.png'  ></img>
      </div>
 
    </div>
</section> */}

        {storeCategory.length >= 1 && (
          <SearchCategory category={storeCategory}/>
        )}

        {/* {offersData.length > 0 &&
          offersData.map((item, index) => (
            <div key={index} className="my-2">
              <h5>
                {item.offer_name}<span className="view">View All</span>
              </h5>
              <div className="row row row-cols-2 store  ">
                <div className="col-md-3  ">
                  <Card
                    style={{
                      backgroundColor: "#343C42",
                      borderRadius: "0%",
                      border: "0px",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0px 0px 0px 0px" }}
                      src="../images/store/shoes.jpg"
                    />
                    <Card.Body>
                      <Card.Text
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "yellow" }}
                        ></i>{" "}
                        <span style={{ color: "white" }}>4.5</span>
                        <span style={{ float: "right" }}>
                          <i
                            className="bi bi-suit-heart  "
                            style={{ color: "white" }}
                          ></i>
                        </span>
                        <br></br>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "white",
                            fontWeight: "400;",
                          }}
                        >
                          Edge Identity Running Shoes For Men
                        </p>
                        <p style={{ color: "#fff", fontSize: "15px" }}>
                          <s>13.000 KD</s>
                          <span>
                            <p
                              style={{
                                fontSize: "16px",
                                color: "#17A803",
                                fontWeight: "700",
                              }}
                            >
                              14.450 KD
                            </p>
                          </span>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3 ">
                  <Card
                    style={{
                      backgroundColor: "#343C42",
                      borderRadius: "0%",
                      border: "0px",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0px 0px 0px 0px" }}
                      src="../images/store/shoes.jpg"
                    />
                    <Card.Body>
                      <Card.Text
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "yellow" }}
                        ></i>{" "}
                        <span style={{ color: "white" }}>4.5</span>
                        <span style={{ float: "right" }}>
                          <i
                            className="bi bi-suit-heart  "
                            style={{ color: "white" }}
                          ></i>
                        </span>
                        <br></br>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "white",
                            fontWeight: "400;",
                          }}
                        >
                          Edge Identity Running Shoes For Men
                        </p>
                        <p style={{ color: "#fff", fontSize: "15px" }}>
                          <s>13.000 KD</s>
                          <span>
                            <p
                              style={{
                                fontSize: "16px",
                                color: "#17A803",
                                fontWeight: "700",
                              }}
                            >
                              14.450 KD
                            </p>
                          </span>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3  ">
                  <Card
                    style={{
                      backgroundColor: "#343C42",
                      borderRadius: "0%",
                      border: "0px",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0px 0px 0px 0px" }}
                      src="../images/store/shoes.jpg"
                    />
                    <Card.Body>
                      <Card.Text
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "yellow" }}
                        ></i>{" "}
                        <span style={{ color: "white" }}>4.5</span>
                        <span style={{ float: "right" }}>
                          <i
                            className="bi bi-suit-heart  "
                            style={{ color: "white" }}
                          ></i>
                        </span>
                        <br></br>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "white",
                            fontWeight: "400;",
                          }}
                        >
                          Edge Identity Running Shoes For Men
                        </p>
                        <p style={{ color: "#fff", fontSize: "15px" }}>
                          <s>13.000 KD</s>
                          <span>
                            <p
                              style={{
                                fontSize: "16px",
                                color: "#17A803",
                                fontWeight: "700",
                              }}
                            >
                              14.450 KD
                            </p>
                          </span>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3 ">
                  <Card
                    style={{
                      backgroundColor: "#343C42",
                      borderRadius: "0%",
                      border: "0px",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0px 0px 0px 0px" }}
                      src="../images/store/shoes.jpg"
                    />
                    <Card.Body>
                      <Card.Text
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "yellow" }}
                        ></i>{" "}
                        <span style={{ color: "white" }}>4.5</span>
                        <span style={{ float: "right" }}>
                          <i
                            className="bi bi-suit-heart  "
                            style={{ color: "white" }}
                          ></i>
                        </span>
                        <br></br>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "white",
                            fontWeight: "400;",
                          }}
                        >
                          Edge Identity Running Shoes For Men
                        </p>
                        <p style={{ color: "#fff", fontSize: "15px" }}>
                          <s>13.000 KD</s>
                          <span>
                            <p
                              style={{
                                fontSize: "16px",
                                color: "#17A803",
                                fontWeight: "700",
                              }}
                            >
                              14.450 KD
                            </p>
                          </span>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          ))} */}
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreDetailPage;
