import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Switch, notification } from "antd";
function CategoryManagement() {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [onSuccess, setOnSuccess] = useState();
  const handleToggle = (checked) => {
    setChecked(checked);
  };

  useEffect(() => {
    Axios.get(apis.categoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCategoryData(res.data.data.categories);
      console.log("tytytytyytytyty.", res.data.data.categories);
    });
  }, [onSuccess]);

  const statusHandlerChange = (e, id) => {
    Axios.post(
      apis.categoryActive,
      {
        category_id: id,
        status: e.target.checked == true ? "True" : "False",
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
    });
  };
  const statusSubHandler = (e, id) => {
    
    Axios.post(
      apis.subCategoryActive,
      {
        subcategory_id: id,
        status: e.target.checked == true ? "True" : "False",
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
      
    });
  };
  return (
    <div className="content-topics ">
      <div className="bottom">
        <h6 className="dark-theme-color-grw ms-4" style={{ fontWeight: "700" }}>
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
                  <div className="toggle">
                    <input
                      placeholder="Active"
                      onChange={(e) => statusHandlerChange(e, item.id, index)}
                      checked={item.status === true}
                      type="checkbox"
                    />

                    <label></label>
                    <span
                      onClick={() =>
                        router.push({
                          pathname: `/shop/edit-category/${item.title}`,
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
                  {item.subcategories.map((sub) => {
                    return (
                      <>
                        <p key={sub} className="foot-ball-small">
                          {sub.title}
                        </p>
                        <div className="toggle">
                          <input
                            placeholder="Active"
                            onChange={(e) =>
                              statusSubHandler(e, sub.id, index)
                            }
                            checked={sub.status === true}
                            type="checkbox"
                          />
                          <label></label>
                          <span
                            onClick={() =>
                              router.push({
                                pathname: `/shop/edit-category/${sub.title}`,
                                query: sub,
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
