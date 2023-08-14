import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { useTranslation } from "next-i18next";
function ProductManagement() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(apis.productsList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setProductList(res.data.data);
      setLoading(false);

      console.log("dhfbvdhbfvhdbfvhdbfvhdbfvhj", res.data.data);
    });
  }, []);
  return (
    <div className="content-topics  ">
      <div className="bottom">
        <h6
          className="dark-theme-color-grw mx-4"
          style={{ color: "#17a803", fontWeight: "700" }}
        >
          {t("Products")}
        </h6>
        <Button
          onClick={() => router.push("/shop/add-products")}
          type="button"
          className="order1-btn "
        >
          {t("Add Products")}
        </Button>
        {!loading ? (
          productList && productList.length > 0 ? (
            productList.map((item, index) => (
              <div key={index} className="dark-theme-color my-5">
                <div
                  className="   mx-auto d-flex justify-content-between align-items-center"
                  style={{ width: "90%" }}
                >
                  <p style={{ fontWeight: "500" ,width:'80%' }}>
                    {locale==='en' ? item.name : item.name_ar}
                  </p>
                  <button
                    onClick={() =>
                      router.push({
                        pathname: `/shop/edit-product/${item.variants[0].slug_id}`,
                        query: { id: item.id },
                      })
                    }
                    className="edit-btn mb-2"
                  >
                    {t("Edit")}
                  </button>
                </div>
                <hr
                  className="mx-auto "
                  style={{ width: "90%", marginTop: "-2px" }}
                ></hr>
                <div className=" imx  d-flex justify-content-between align-items-center">
                  <img
                    src={`${constants.port}${item.thumbnail_image}`}
                    style={{ width: "82px", height: "82px" }}
                  ></img>

                  {/* {item.variants[0].images ? 
          <img
            src={`${constants.port}${item.variants[0].images[0].image}`}
            style={{ width: "82px", height: "82px" }}
          ></img>
          : 
          <img
              src="../images/store/b.png"
              style={{ width: "82px", height: "82px" }}
            ></img>
          } */}
                </div>

                <div
                  className="p-2   mx-auto d-flex justify-content-between align-items-center"
                  style={{ width: "90%" }}
                >
                  <span>{t("Brand")}</span>
                  <span>{item.brand_name}</span>
                </div>
                <div
                  className="p-2 input-theme-prod mx-auto d-flex justify-content-between align-items-center"
                  style={{
                    borderRadius: "10px",
                    width: "90%",
                  }}
                >
                  <span>{t("Category item")}</span>
                  <span>{item.category}</span>
                </div>
                <div
                  className="p-2   mx-auto d-flex justify-content-between align-items-center"
                  style={{ width: "90%" }}
                >
                  <span>{t("Sub Category")}</span>
                  <span>{item.subcategory_name}</span>
                </div>
                <div
                  className="p-2 input-theme-prod mx-auto d-flex justify-content-between align-items-center"
                  style={{
                    borderRadius: "10px",
                    width: "90%",
                  }}
                >
                  <span style={{ color: "#959595" }}> Status</span>
                  <span style={{ color: "#17A803" }}>
                    {item.product_status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <center>
              <div className="my-5 dark-theme-color">
                No products found ......
              </div>
            </center>
          )
        ) : null}

        <br></br>
      </div>
    </div>
  );
}

export default ProductManagement;
