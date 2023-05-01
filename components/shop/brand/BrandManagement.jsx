import { useRouter } from "next/router";
import React from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import { useState } from "react";

function BrandManagement() {
  const router = useRouter();
  const [brandData, setBrandData] = useState([]);

  Axios.get(apis.brandView, {
    headers: {
      Authorization: `Token ${constants.token_id}`,
    },
  }).then((res) => {
    setBrandData(res.data.data);
    console.log("brand vvvvvvvvvvvviewwwwwe", res);
  });

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Brand Management
        </h6>

        <div className="my-4 mx-4 ">
          <div className="clearfix">
            <p className="order-codes">Brands</p>{" "}
            <button
              onClick={() => router.push("/shop/add-brands")}
              type="button"
              className="Add2-btn"
            >
              {" "}
              Add{" "}
            </button>
            <br></br>
            {brandData.map((item, index) => {
              return (
                <>
                  <p key={index} className="foot-ball-small">
                    {item.brand}
                  </p>
                  <div class="toggle">
                    <input placeholder="Active" type="checkbox" />
                    <label></label>
                    <span onClick={()=>router.push(`/shop/edit-brands/${item.slug_brand}`)}>
                      <img
                        href="#"
                        src="../images/store/Edit copy.png"
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
