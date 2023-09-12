import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ProductDetailImages from "@/components/stores/product-details/ProductDetailImages";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import ProductDetailFullWidth from "@/components/stores/product-details/ProductDetailFullWidth";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import { useDispatch } from "react-redux";
import { setProVarient } from "@/Redux/productDetail";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthenticationModals from "@/components/shared/AuthenticationModals";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}

function ProductDetailPage() {
  const [productDetails, setProductDetails] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const { pid } = router.query;
  const dispatch = useDispatch();
  dispatch(setProVarient(pid));
  console.log("productttttttttttttttttttttttt444444444");

  useEffect(() => {
    let headers = {};
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      headers = {
        Authorization: `Token ${constants.token_id}`,
      };
    }
    Axios.post(
      apis.productDetail,
      {
        slug_Id: pid,
      },
      {
        headers,
      }
    )
      .then((res) => {
        setProductDetails([res.data.data[0]]);
        console.log("productttttttttttttttttttttttt", res);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("An error occurred while fetching product details.");
        } else {
          console.log("An error occurred while fetching product details.");
        }
      });
  }, [pid, apiSuccess]);

  return (
    <>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <AuthenticationModals />

      <div className="store-container">
        {/* <form className="nosubmit ">
          <span>
            <input className="nosubmit2" type="search" placeholder="Search" />
            <img
              src="../../images/store/Frame 4.png"
              className="filters-icon"
            ></img>
          </span>
        </form> */}

        <section className=" my-3 h-75">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card cart">
                <div
                  className="card-body p-4 product-det-full"
                  style={{ direction: locale === "en" ? "ltr" : "rtl" }}
                >
                  <div className="row ">
                    <ProductDetailFullWidth
                      product={productDetails}
                      setApiSuccess={setApiSuccess}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <MobileFooter />
    </>
  );
}

export default ProductDetailPage;
