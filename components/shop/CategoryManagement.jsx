import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Axios from "axios";
function CategoryManagement() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    Axios.get(apis.categoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCategoryData(res.data.data.categories);
    });
  }, []);
  const router = useRouter();
  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Category Management
        </h6>

        <div className="my-4 mx-4 ">
          <div className="clearfix">
            <p className="order-codes">Categories</p>
            <button
              onClick={() => router.push("/shop/add-category")}
              type="button"
              className="Add2-btn"
            >
              Add
            </button>
            <br></br>
            {categoryData.map((item, index) => {
              return (
                <>
                  <p key={index} className="foot-ball">
                    {item.title}
                  </p>
                  <div class="toggle">
                    <input placeholder="Active" type="checkbox" />
                    <label></label>
                    <span>
                      <img
                        href="#"
                        src="../images/store/Edit copy.png"
                        className="edit"
                      ></img>
                    </span>
                  </div>
                  {item.subcategories.map((sub) => {
                    return (
                      <>
                        <p key={sub} className="foot-ball-small">{sub.title}</p>
                        <div class="toggle">
                          <input placeholder="Active" type="checkbox" />
                          <label></label>
                          <span>
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
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryManagement;
