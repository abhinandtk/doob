import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import StoreProductsCard from "@/components/stores/StoreProductsCard";
import SearchCategory from "@/components/stores/SearchCategory";
import { useRouter } from "next/router";
import { useEffect } from "react";

function StoreSearchPage() {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState(router.query.search);
  console.log("searchInput", searchInput);
  const [resultProduct, setResultProduct] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.storesearch,
      {
        user_input: searchInput,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setResultProduct(res.data.data);
      console.log("IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", res);
    });
  },[]);

  const searchResultHandler = (e) => {
    Axios.post(
      apis.storesearch,
      {
        user_input: searchInput,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setResultProduct(res.data.data);
      console.log("IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", res);
    });
  };

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <div className="store-container">
        <form className="nosubmit ">
          <span>
            {" "}
            <input
              className="nosubmit1"
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              placeholder="Search"
            />
            <span onClick={(e) => searchResultHandler(e)}>
              <img
                src="../images/store/Fil-icon.png"
                className="filters-icon"
              ></img>
            </span>
          </span>
        </form>

        <div className="my-2 ">{/* <SearchCategory /> */}</div>
        {resultProduct && <StoreProductsCard products={resultProduct} />}
      </div>
    </Fragment>
  );
}

export default StoreSearchPage;
