import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import React, { useState } from "react";
import { Fragment } from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
} from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useEffect } from "react";
function FavoriteProducts() {
  const [favLists, setFavLists] = useState([]);
    useEffect(()=>{})
  Axios.get(apis.viewwishlist, {
    headers: {
      Authorization: `Token ${constants.token_id}`,
    },
  }).then((res) => {
    setFavLists(
      res.data.data.map((item) => ({
        ...item,
        isWish: item.is_favorite,
      }))
    );
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvview", favLists);
  });
  const favoriteHandler = (id, favorite) => {
    const api = favorite ? apis.removewishlist : apis.addwishlist;
    Axios.post(
      api,
      {
        product_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
      }

      console.log("wishlisttttttttttttttttttttttttttttttttttttt", res);
    });
  };

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <div className="side-container">
        <PagesSideBar currentPage="fav-prod" />

        <div className="content-pages">
          <br></br>
          <div className="head">Favourite Product</div>
          <div className=" ones">
            <div className="row row-cols-2 my-3 g-3 p-3 store">
              {favLists &&
                favLists.map((item, index) => (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6  ">
                    <Card className="favouite-cards"> 
                      <Card.Img
                        style={{ borderRadius: "12px 12px 0px 0px" }}
                        src={`${constants.port}${item.image}`}
                      />
                      <Card.Body>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>
                          <i className="bi bi-star-fill"></i> 4.5
                          <span
                            onClick={() =>
                              favoriteHandler(item.slug_Id, item.isWish)
                            }
                            style={{ float: "right" }}
                          >
                            <i
                              className={`${
                                item.isWish
                                  ? "bi bi-suit-heart-fill"
                                  : "bi bi-suit-heart"
                              }`}
                              style={{ color: "#17A803" }}
                            ></i>
                          </span>
                          <br></br>
                          <div
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.Name}
                          </div>
                          <div style={{ color: "#000", fontSize: "16px" }}>
                            <s>{item.display_price} KD</s>
                            <span>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#17A803",
                                  fontWeight: "700",
                                }}
                              >
                                {item.selling_price} KD
                              </p>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              {favLists &&
                favLists.map((item, index) => (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                    <Card className="favouite-cards">
                      <Card.Img
                        style={{ borderRadius: "12px 12px 0px 0px" }}
                        src={`${constants.port}${item.image}`}
                      />
                      <Card.Body>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>
                          <i className="bi bi-star-fill "></i> 4.5
                          <span
                            onClick={() =>
                              favoriteHandler(item.slug_Id, item.isWish)
                            }
                            style={{ float: "right" }}
                          >
                            <i
                              className={`${
                                item.isWish
                                  ? "bi bi-suit-heart-fill"
                                  : "bi bi-suit-heart"
                              }`}
                              style={{ color: "#17A803" }}
                            ></i>
                          </span>
                          <br></br>
                          <div
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.Name}
                          </div>
                          <div style={{ color: "#000", fontSize: "16px" }}>
                            <s>{item.display_price} KD</s>
                            <span>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#17A803",
                                  fontWeight: "700",
                                }}
                              >
                                {item.selling_price} KD
                              </p>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FavoriteProducts;
