import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Card } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
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

function FavoriteStores() {
  const [storeFavList, setStoreFavList] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    Axios.get(apis.viewstorewishlist, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setStoreFavList(res.data.data);
      console.log("wwwwstoreeeeeeeeeeeeeeeeefavvvv", res);
    });
  }, [apiSuccess]);

  const removeHandler = (id, favorite) => {
    console.log("ssss", id, favorite);
    const api = favorite ? apis.removestorewishlist : apis.addstorewishlist;
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
      setApiSuccess((prev) => !prev);
      console.log("ssssrestttttttttttttttttttttttttttttttttttttt", res);
    });
  };

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="side-container">
        <PagesSideBar currentPage="fav-store" />
        <div className="content-pages">
          <br></br>
          <div className={locale==='ar'?"head_ar":"head"}>{t("Favourite Stores")}</div>        
          <div className=" ones" style={{ minHeight: "500px" }}>
            <div className="row row-cols-2 g-3   store p-3 ">
              {storeFavList.map((item, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-6 "
                >
                  <Card className="store-card ">
                    <Link
                      href={`/store/${item.store.slug_store}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        style={{
                          borderRadius: "12px 12px 0px 0px",
                          objectFit: "cover",
                          aspectRatio: "1",
                        }}
                        src={`${item.store.cover_photo}`}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Text
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        {" "}
                        <Link
                          href={`/store/${item.store.slug_store}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {locale === "en"
                            ? item.store.title
                            : item.store.title_arabic}
                        </Link>
                        <span
                          onClick={() =>
                            removeHandler(
                              item.store.slug_store,
                              item.is_favorite
                            )
                          }
                          style={{ float: locale === "en" ? "right" : "left" ,cursor:'pointer',top:locale === "ar" ? "0px" : "" }}
                        >
                          <i
                            className="bi bi-suit-heart-fill"
                            style={{ color: "#17A803" }}
                          ></i>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
              {/* <div className='col-lg-4 col-md-4'>
                        <Card   className='store-card'   >
                            <Card.Img  style={{borderRadius:'12px 12px 0px 0px'}} src="../images/1027 4.jpg"  />
                            <Card.Body>
                                <Card.Text style={{fontSize:'14px',fontWeight:'500'}}  >
                                    Sports Check<span style={{float:'right'}}><i className="bi bi-suit-heart-fill"></i></span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>             */}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default FavoriteStores;
