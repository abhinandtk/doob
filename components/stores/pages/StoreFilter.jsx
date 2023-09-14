import React from "react";
import { useState } from "react";
import { Fragment } from "react";
// import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Button, Collapse, Modal, Rate, Slider } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
const { Panel } = Collapse;
function StoreFilter({ searchResultHandler }) {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;
  const [searchInput, setSearchInput] = useState(router.query.search);

  const data = router.query;

  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [brandChecked, setBrandChecked] = useState([]);
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [range, setRange] = useState(["", ""]);
  const [count, setCount] = useState("");
  const handleStarChange = (value) => {
    setCount(value);
  };
  const handleSliderChange = (values) => {
    console.log("values", values);
    setRange(values);
  };
  useEffect(() => {
    searchResultHandler(
      searchInput,
      brandChecked,
      categoryChecked,
      range,
      count
    );
  }, [router.query.slug]);
  console.log("44444", count);

  useEffect(() => {
    if (router.query.slug) {
      Axios.post(
        apis.brandCategoryList,
        {
          store_slug: router.query.slug,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        setListData([res.data.data]);
        console.log("44444ggggggggg", res, {
          store_slug: router.query.slug,
        });
      });
    }
  }, [router.query.slug]);

  const handleBrandChecked = (e) => {
    const id = parseInt(e.target.id);
    setBrandChecked((prevState) => {
      if (e.target.checked) {
        return [...prevState, parseInt(id)];
      } else {
        return prevState.filter((brandId) => brandId !== id);
      }
    });
  };
  const handleCategoryChecked = (e) => {
    const id = parseInt(e.target.id);
    setCategoryChecked((prevState) => {
      if (e.target.checked) {
        return [...prevState, parseInt(id)];
      } else {
        return prevState.filter((catId) => catId !== id);
      }
    });
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (e.target.id === "search") {
      setSearchInput(e.target.value);
    }
    searchResultHandler(
      searchInput,
      brandChecked,
      categoryChecked,
      range,
      count
    );
    setVisible(false);
  };
  const clearFilterHandler = (e) => {
    setBrandChecked([]);
    setCategoryChecked([]);
    setRange(["", ""]);
    setCount(0);
  };

  return (
    <Fragment>
      <form className="nosubmit " onSubmit={(e) => submitSearchHandler(e)}>
        <span>
          {" "}
          <input
            id="search"
            className="nosubmit1"
            onChange={(e) => submitSearchHandler(e)}
            type="search"
            value={searchInput}
            placeholder={t("Search")}
          />
          <span onClick={() => setVisible(true)} style={{ cursor: "pointer" }}>
            <img
              src="/images/store/Fil-icon.png"
              className="filters-icon"
            ></img>
          </span>
        </span>
      </form>

      <Modal
        title={t("Filter")}
        open={visible}
        onCancel={() => setVisible(false)}
        maskClosable
        centered
        footer={[
          <Button
            type="secondary"
            className="dark-theme-color"
            key="back"
            onClick={() => clearFilterHandler()}
          >
            {t("Clear")}
          </Button>,
          ,
          <Button
            onClick={(e) => submitSearchHandler(e)}
            key="submit"
            type="submit"
            className="modals-btn "
          >
            {t("Submit")}
          </Button>,
        ]}
      >
        <form>
          {listData &&
            listData.map((item, index) => (
              <div key={index}>
                <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                  {t("Brands")}
                </h6>
                {item.brand?.map((brand, index_) => (
                  <div
                    key={index_}
                    className="slot clearfix  mt-2"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div>
                      <span className="float-start">
                        <span className="mx-1 ">{brand.brand}</span>
                      </span>
                    </div>
                    <div
                      style={{
                        flexGrow: 1,
                        textAlign: locale === "en" ? "right" : "left",
                      }}
                    >
                      <input
                        className="mx-3"
                        id={brand.id}
                        onChange={(e) => handleBrandChecked(e)}
                        checked={brandChecked.includes(brand.id)}
                        style={{ width: "15px", height: "15px" }}
                        type="checkbox"
                      />
                    </div>
                  </div>
                ))}
                <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                  {t("Category")}
                </h6>
                <Collapse accordion ghost>
                  {item.categories?.map((cat) => (
                    <Panel
                      className="dark-theme-color"
                      header={cat.title}
                      key={cat.id}
                    >
                      {cat.subcategories?.map((subCat) => (
                        <div
                          key={subCat.id}
                          className="slot clearfix  mt-2"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div>
                            <span className="float-start">
                              <span className="mx-1 dark-theme-color">
                                {subCat.title}
                              </span>
                            </span>
                          </div>
                          <div
                            style={{
                              flexGrow: 1,
                              textAlign: locale === "en" ? "right" : "left",
                            }}
                          >
                            <input
                              className="mx-3"
                              id={subCat.id}
                              onChange={(e) => handleCategoryChecked(e)}
                              checked={categoryChecked.includes(subCat.id)}
                              style={{ width: "15px", height: "15px" }}
                              type="checkbox"
                            />
                          </div>
                        </div>
                      ))}
                    </Panel>
                  ))}
                </Collapse>
                <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                  {t("Price")}
                </h6>
                <Slider
                  range
                  min={0}
                  max={10000}
                  value={range}
                  onChange={handleSliderChange}
                />
                <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                  {t("Rating")}
                </h6>
                <Rate value={count} onChange={handleStarChange} />
              </div>
            ))}
        </form>
      </Modal>
      <br></br>
    </Fragment>
  );
}

export default StoreFilter;
