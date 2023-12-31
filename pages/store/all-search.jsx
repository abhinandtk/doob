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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoreSearchPage() {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState(router.query.search);
  console.log("searchInput", searchInput);
  const [resultProduct, setResultProduct] = useState([]);
  useEffect(() => {
    // Axios.post(
    //   apis.storesearch,
    //   {
    //     user_input: searchInput,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Token ${constants.token_id}`,
    //     },
    //   }
    // ).then((res) => {
    //   setResultProduct(res.data.data);
    //   console.log("IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", res);
    // });
    searchResultHandler();
  }, [searchInput]);

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
      console.log("IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", res, {
        user_input: searchInput,
      });
    });
  };
  console.log("resultProduct", resultProduct);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <div className="store-container">
        {/* <form className="nosubmit "> */}
        <span>
          {" "}
          <input
            className="nosubmit1"
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search"
          />
          <span onClick={(e) => searchResultHandler(e)}>
            {/* <img
                src="/images/store/Fil-icon.png"
                className="filters-icon"
              ></img> */}
          </span>
        </span>
        {/* </form> */}

        <div className="my-2  ">{/* <SearchCategory /> */}</div>
        {resultProduct.length > 0 && (
          <StoreProductsCard
            key={resultProduct.length}
            products={resultProduct}
          />
        )}
      </div>
    </Fragment>
  );
}

export default StoreSearchPage;
