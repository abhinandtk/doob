import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";

function BannerManagement() {
  const router = useRouter();
  const { t } = useTranslation()
  const labels = Labels();

  const [listBanners, setListBanners] = useState([]);
  const [onSuccess, setOnSuccess] = useState(true);

  useEffect(() => {
    Axios.get(apis.bannerView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setListBanners(res.data.data);
      console.log("resall", res);
    });
  }, [onSuccess]);
  const deleteBannerHandler = (slug) => {
    Axios.post(
      apis.deleteBanner,
      {
        slug_banner: slug,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("resdelee", res);
      if (res.data.status === 1) {
        setOnSuccess((prev) => !prev);
        notification.success({
          message: t("Success"),
          description: `${labels["Banner deleted successfully"]}`,
        });
      }
    });
  };

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          {t("Banners")}
        </h6>

        <div className="my-4 mx-4 ">
          <div className="clearfix">
            <p className="order-codes">&nbsp;</p>{" "}
            <button
              onClick={() => router.push("/shop/add-banners")}
              type="button"
              className="Add2-btn"
            >
              {" "}
              {t("Add")}{" "}
            </button>
            <br></br>
            {listBanners.length > 0 &&
              listBanners.map((item, index) => (
                <div key={index}>
                  <div className="banner-names" style={{}}>
                    <span>
                      <img
                        src={`${constants.port}${item.Banner_image}`}
                        alt="User Picture"
                        style={{
                          objectFit: "cover",
                          width: "50px",
                          height: "50px",
                          // borderRadius: "50%",
                        }}
                      />
                      &nbsp;&nbsp;{item.Banner_name}
                    </span>


                  </div>{" "}
                  <span
                    onClick={() => deleteBannerHandler(item.slug_banner)}
                    style={{ cursor: "pointer" }}
                  >
                    <svg className="edit-trash-list" viewBox="0 0 123 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.5227 22.3636H75.4773C75.4773 18.6566 74.0047 15.1015 71.3834 12.4802C68.7622 9.85896 65.207 8.38636 61.5 8.38636C57.793 8.38636 54.2378 9.85896 51.6166 12.4802C48.9953 15.1015 47.5227 18.6566 47.5227 22.3636ZM39.1364 22.3636C39.1364 16.4324 41.4925 10.7442 45.6865 6.55016C49.8805 2.35616 55.5688 0 61.5 0C67.4312 0 73.1195 2.35616 77.3135 6.55016C81.5075 10.7442 83.8636 16.4324 83.8636 22.3636H118.807C119.919 22.3636 120.985 22.8054 121.772 23.5918C122.558 24.3782 123 25.4447 123 26.5568C123 27.6689 122.558 28.7355 121.772 29.5218C120.985 30.3082 119.919 30.75 118.807 30.75H111.483L104.679 112.394C104.184 118.333 101.475 123.87 97.0889 127.906C92.7032 131.941 86.961 134.181 81.0011 134.182H41.9989C36.039 134.181 30.2968 131.941 25.9111 127.906C21.5254 123.87 18.8164 118.333 18.3214 112.394L11.5173 30.75H4.19318C3.08108 30.75 2.01453 30.3082 1.22815 29.5218C0.44178 28.7355 0 27.6689 0 26.5568C0 25.4447 0.44178 24.3782 1.22815 23.5918C2.01453 22.8054 3.08108 22.3636 4.19318 22.3636H39.1364ZM26.6798 111.695C26.9996 115.538 28.7519 119.121 31.5895 121.733C34.427 124.345 38.1424 125.795 41.9989 125.795H81.0011C84.8576 125.795 88.573 124.345 91.4105 121.733C94.2481 119.121 96.0004 115.538 96.3202 111.695L103.074 30.75H19.9316L26.6798 111.695ZM48.9205 50.3182C50.0326 50.3182 51.0991 50.76 51.8855 51.5463C52.6719 52.3327 53.1136 53.3993 53.1136 54.5114V102.034C53.1136 103.146 52.6719 104.213 51.8855 104.999C51.0991 105.785 50.0326 106.227 48.9205 106.227C47.8084 106.227 46.7418 105.785 45.9554 104.999C45.1691 104.213 44.7273 103.146 44.7273 102.034V54.5114C44.7273 53.3993 45.1691 52.3327 45.9554 51.5463C46.7418 50.76 47.8084 50.3182 48.9205 50.3182ZM78.2727 54.5114C78.2727 53.3993 77.8309 52.3327 77.0446 51.5463C76.2582 50.76 75.1916 50.3182 74.0795 50.3182C72.9674 50.3182 71.9009 50.76 71.1145 51.5463C70.3281 52.3327 69.8864 53.3993 69.8864 54.5114V102.034C69.8864 103.146 70.3281 104.213 71.1145 104.999C71.9009 105.785 72.9674 106.227 74.0795 106.227C75.1916 106.227 76.2582 105.785 77.0446 104.999C77.8309 104.213 78.2727 103.146 78.2727 102.034V54.5114Z" fill="#959595" />
                    </svg>
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/shop/edit-banners/${item.slug_banner}`)
                    }
                  >

                    <svg className="edit-offer-list mx-4" viewBox="0 0 1732 1732" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M286.405 1004.29L985.741 318.766C1075.72 230.567 1221.66 230.567 1311.63 318.766L1405.04 410.33C1495.02 498.529 1495.02 641.584 1405.04 729.783L702.947 1418.01C662.801 1457.36 608.37 1479.44 551.556 1479.44H264.025C237.314 1479.44 215.849 1457.87 216.515 1431.7L223.748 1147.3C225.186 1093.55 247.623 1042.3 286.405 1004.29ZM1337.84 476.168L1244.43 384.604C1191.57 332.791 1105.81 332.791 1052.96 384.604L998.624 437.862L1283.54 717.085L1337.84 663.857C1390.69 612.044 1390.69 527.981 1337.84 476.168ZM353.62 1070.12L931.415 503.744L1216.33 782.967L635.743 1352.08L628.02 1359.01C606.689 1376.53 579.664 1386.23 551.562 1386.23L312.736 1386.19L318.771 1149.64C319.569 1119.79 332.063 1091.26 353.62 1070.12ZM1515.49 1432.84C1515.49 1407.11 1494.22 1386.26 1467.97 1386.26H972.151L965.703 1386.68C942.506 1389.77 924.627 1409.26 924.627 1432.84C924.627 1458.57 945.905 1479.43 972.151 1479.43H1467.97L1474.42 1479C1497.62 1475.92 1515.49 1456.43 1515.49 1432.84Z" fill="#959595" />
                    </svg>
                  </span>
                  <br></br>
                  {/* {item.product_varient.map((pro, index_) => (
                    <p key={index_} className="foot-ball-small">
                      {pro.Name}&nbsp;{pro.Varient_Values}&nbsp;
                      {pro.multivarient_values}
                    </p>
                  ))}{" "} */}
                  <br></br>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerManagement;
