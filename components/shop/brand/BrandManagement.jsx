import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "next-i18next";
function BrandManagement() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [brandData, setBrandData] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  useEffect(() => {
    Axios.get(apis.brandView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setBrandData(res.data.data);
      console.log("brand vvvvvvvvvvvviewwwwwe", res);
    });
  }, [onSuccess]);

  const statusHandlerChange = (e, id) => {
    Axios.post(
      apis.activeBrand,
      {
        brand_id: id,
        status: e.target.checked == true ? "Active" : "Pending",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      notification.success({
        message: "Success",
        description: "Status changed successfully",
      });
      console.log("result for active", res);
    });
  };

  return (
    <div className="content-topics ">
      <div className="bottom">
        <h6 className="dark-theme-color-grw ms-4" style={{ fontWeight: "700" }}>
          {t("Brand Management")}
        </h6>

        <div className="my-4 mx-4 ">
          <div className="clearfix rnt">
            <p className="order-codes">{t("Brands")}</p>
            <button
              onClick={() => router.push("/shop/add-brands")}
              type="button"
              className="Add2-btn"
            >
              {t("Add")}
            </button>
            <br></br>
            {brandData.map((item, index) => {
              return (
                <>
                  <p key={index} className="foot-ball-small">
                    {locale === "en" ? item.brand : item.arabic_translator}
                  </p>
                  <div className="toggle">
                    <input
                      onChange={(e) => statusHandlerChange(e, item.id, index)}
                      checked={item.status === "Active"}
                      type="checkbox"
                    />
                    <label></label>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push({
                          pathname: `/shop/edit-brands/${item.slug_brand}`,
                          query: item,
                        })
                      }
                    >
                      <img
                        href="#"
                        src="/images/store/Edit copy.png"
                        className="edit"
                      ></img>
                    </span>
                  </div>
                </>
              );
            })}
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandManagement;
