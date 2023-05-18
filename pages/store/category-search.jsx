import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import React, { useEffect } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import SearchCategory from "@/components/stores/SearchCategory";
import { useRouter } from "next/router";
import StoreProductsCard from "@/components/stores/StoreProductsCard";
import MobileHeader from "@/components/MobileHeader";

function CategorySearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subCategoyProduct, setSubCategoyProduct] = useState([]);

  const [subCatInput, setSubcatInput] = useState("");

  const router = useRouter();
  const id = router.query.category_id;
  console.log("category_id", id);
  useEffect(() => {
    Axios.post(
      apis.searchbyCategory,
      {
        category_id: id,
        keyword: "",
        subcategory_id: subCatInput
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      // setResultProduct(res);
      setSubCategoriesData(res.data.data.subcategories);
      setSubCategoyProduct(res.data.data.category_products);
      console.log(
        "IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
        res.data.data.category_products
      );
      console.log(
        "IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
        res.data.data.category_products[0].Name
      );
    });
  },[]);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <form className="nosubmit ">
          <input
            // onChange={searchResult}
            className="nosubmit1"
            type="search"
            placeholder="Search"
          />
        </form>

        {/* <div className="my-2 "> */}
        {/* <SearchCategory /> */}
        {/* </div> */}
        <section className="my-2 ">
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ padding: "5px 35px" }}
            >
              All
            </button>
          </div>
          {subCategoriesData &&
            subCategoriesData.map((item, index) => (
              <div
                key={index}
                className="btn-group me-2"
                role="group"
                aria-label="Second group"
                onClick={()=>setSubcatInput(item.id)}
              >
                <button type="button" className="btn btn-secondary">
                  {item.title}
                </button>
              </div>
            ))}
          {/* <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button type="button" className="btn btn-outline-secondary">
              Gloves
            </button>
          </div> */}
        </section>
        {subCategoyProduct ? (<>
          <StoreProductsCard products={subCategoyProduct} /></>
        ) : (
          <div>No products Found...</div>
        )}
      </div>
    </Fragment>
  );
}

export default CategorySearchPage;
