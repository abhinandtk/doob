import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Axios from "axios";
import { Image } from "antd";
import MobileFooter from "@/components/shared/MobileFooter";
function StadiumListPage() {
  const router = useRouter();
  const data = router.query;
  console.log("daaaaaaaaaaaata", data);
  const [stadiumData, setStadiumData] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.listStadium,
      {
        sports_id: data.sports_id,
        area: data.area,
        date: data.date,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    )
      .then((res) => {
        // if(res.data.status === '0'){

        // }
        setStadiumData(res.data.data);

        console.log("Successssssss stadium list", res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />

      <div className="tour-container">
        <form className="nosubmit ">
          <span>
            <input className="tour" type="search" placeholder="Search" />
            <img
              src="../images/tournament/location-icon.png"
              className="location-icon"
            ></img>
            <img
              src="../images/tournament/Fil-icon.png"
              className="tour-icon"
            ></img>
          </span>
        </form>
        <h5 style={{ fontWeight: "700" }} className="my-2">
          Select Playground
        </h5>
        <div className="row">
          {stadiumData != null && stadiumData.length > 0 ? (
            stadiumData.map((item, index) => (
              <div key={index} className="col-md-6">
                <div className="card  plays">
                  <div className="card-body">
                    <div className="play-mix">
                      {item.images.length > 0 && (
                        <img
                          src={`${constants.port}${item.images[0].images}`}
                          className="plays-img"
                        ></img>
                      )}
                      <div className="play-details">
                        <h5 className="play_text">{item.stadium_name}</h5>
                        <div className="locations">
                          <i
                            class="bi bi-geo-alt"
                            style={{ color: "green" }}
                          ></i>
                          <p className="place">
                            &nbsp;{item.location},{item.city.region_name}{" "}
                          </p>
                        </div>
                        <p>
                          {item.images.length > 0 &&
                            item.amnities.map((img, index) => (
                              <span key={index} className="mx-1">
                                <Image
                                  src={`${constants.port}${img.logo}`}
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  alt="image"
                                />
                              </span>
                            ))}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="clearfix">
                      <div className="book-profile float-start">
                        <span style={{ fontWeight: "600" }}>
                          {item.amount} KD
                          <span style={{ fontWeight: "400" }}>/slot</span>
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          router.push({
                            pathname: `/play-ground/${item.slug_field}`,
                            query: {
                              stadium_id: item.id,
                              date: data.date,
                              sports_id: data.sports_id,

                            },
                          })
                        }
                        type="button"
                        className="view-btn float-end"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div>No Stadium found..............</div>
            </div>
          )}
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default StadiumListPage;
