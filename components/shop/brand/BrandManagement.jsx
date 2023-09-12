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
                      <svg className="edit" viewBox="0 0 1732 1732" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M286.405 1004.29L985.741 318.766C1075.72 230.567 1221.66 230.567 1311.63 318.766L1405.04 410.33C1495.02 498.529 1495.02 641.584 1405.04 729.783L702.947 1418.01C662.801 1457.36 608.37 1479.44 551.556 1479.44H264.025C237.314 1479.44 215.849 1457.87 216.515 1431.7L223.748 1147.3C225.186 1093.55 247.623 1042.3 286.405 1004.29ZM1337.84 476.168L1244.43 384.604C1191.57 332.791 1105.81 332.791 1052.96 384.604L998.624 437.862L1283.54 717.085L1337.84 663.857C1390.69 612.044 1390.69 527.981 1337.84 476.168ZM353.62 1070.12L931.415 503.744L1216.33 782.967L635.743 1352.08L628.02 1359.01C606.689 1376.53 579.664 1386.23 551.562 1386.23L312.736 1386.19L318.771 1149.64C319.569 1119.79 332.063 1091.26 353.62 1070.12ZM1515.49 1432.84C1515.49 1407.11 1494.22 1386.26 1467.97 1386.26H972.151L965.703 1386.68C942.506 1389.77 924.627 1409.26 924.627 1432.84C924.627 1458.57 945.905 1479.43 972.151 1479.43H1467.97L1474.42 1479C1497.62 1475.92 1515.49 1456.43 1515.49 1432.84Z" fill="#959595" />
                      </svg>
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
