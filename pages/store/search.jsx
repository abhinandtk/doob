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
import StoreFilter from "@/components/stores/pages/StoreFilter";

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
  const [isLoading, setIsLoading] = useState(true);
  

  const searchResultHandler = (keyword, brand, category, range, count) => {
    Axios.post(
      apis.storeFiltersearch,
      {
        store_slug: router.query.slug,
        brand: brand,
        category: category,
        price_from: range[0],
        price_to: range[1],
        review: count,
        keyword: keyword,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setResultProduct(res.data.data);
      setIsLoading(false);
      console.log("IIIIIIIIIIIIIIIOOOIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", res, {
        user_input: searchInput,
      });
    });
  };

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <div className="store-container">
        <StoreFilter searchResultHandler={searchResultHandler} />

        <div className="my-2  ">{/* <SearchCategory /> */}</div>
        {!isLoading ? (
          resultProduct && resultProduct.length > 0 ? (
            <StoreProductsCard
              key={resultProduct.length}
              products={resultProduct}
            />
          ) : (
            <p>Product not found....</p>
          )
        ) : null}
      </div>
    </Fragment>
  );
}

export default StoreSearchPage;
