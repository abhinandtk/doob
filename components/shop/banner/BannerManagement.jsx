import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";

function BannerManagement() {
  const router = useRouter();

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
          message: constants.Success,
          description: `${labels["Banner deleted successfully"]}`,
        });
      }
    });
  };

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Banners
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
              Add{" "}
            </button>
            <br></br>
            {listBanners.length > 0 &&
              listBanners.map((item, index) => (
                <div key={index}>
                  <p className="banner-names" style={{}}>
                    {item.Banner_name}
                  </p>{" "}
                  <span
                    onClick={() => deleteBannerHandler(item.slug_banner)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/images/store/trash.png"
                      className="edit-offer-list"
                    ></img>{" "}
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/shop/edit-banners/${item.slug_banner}`)
                    }
                  >
                    <img
                      src="/images/store/Edit copy.png"
                      className="edit-offer-list mx-4"
                    ></img>{" "}
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
