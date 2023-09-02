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
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function FavoriteProducts() {
  const [favLists, setFavLists] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
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
      console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvview", res);
    });
  }, [apiSuccess]);
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
      setApiSuccess((prev) => !prev);
      if (res.data.status === 1) {
      }

      console.log("wishlisttttttttttttttttttttttttttttttttttttt", res);
    });
  };

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="side-container">
        <PagesSideBar currentPage="fav-prod" />

        <div className="content-pages">
          <br></br>
          <div className="head">{t("Favourite Products")}</div>
          <div className=" ones" style={{ minHeight: "500px" }}>
            <div className="row row-cols-2 my-2 g-3 p-3 store">
              {favLists &&
                favLists.map((item, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-4 col-sm-6 col-xs-6  "
                  >
                    <Card className="favouite-cards">
                      <Link
                        href={`/store/product/${item.slug_Id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card.Img
                          style={{
                            borderRadius: "12px 12px 0px 0px",
                            objectFit: "cover",
                            aspectRatio: "1",
                          }}
                          src={`${constants.port}${item.image}`}
                        />
                      </Link>
                      <Card.Body>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>
                          <i className="bi bi-star-fill"></i> {item.review}
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
                          <Link
                            href={`/store/product/${item.slug_Id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <div
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {locale === "en"
                                ? item.Name
                                : item.arabic_translator}
                            </div>
                            {item.product_stock <= 0 ? (
                              <p className="my-1" style={{ color: "red" }}>
                                {t("Out of Stock")}
                              </p>
                            ) : item.product_brand_status === "Active" &&
                              item.product_category_status == true &&
                              item.product_status === "Active" &&
                              item.product_varient_status === "Active" ? (
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
                            ) : (
                              <p className="my-1" style={{ color: "red" }}>
                                {t("Currently Unavailable")}
                              </p>
                            )}
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                    <br></br>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default FavoriteProducts;
