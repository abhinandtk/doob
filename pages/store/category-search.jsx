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
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function CategorySearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subCategoryProduct, setSubCategoryProduct] = useState([]);

  const [subCatInput, setSubcatInput] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [keyCounter, setKeyCounter] = useState(0);
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;
  const id = router.query.category_id;
  console.log("category_id", id);
  useEffect(() => {
    Axios.post(
      apis.searchbyCategory,
      {
        category_id: id,
        keyword: searchInput,
        subcategory_id: subCatInput,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      // setResultProduct(res);
      setSubCategoriesData(res.data.data.subcategories);
      setSubCategoryProduct(res.data.data.category_products);
      setLoading(false);
      console.log("888888", subCatInput, res);
    });
  }, [id, subCatInput, searchInput]);
  let counter = 0;
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="cat-search">
          <form className="nosubmit ">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              className="nosubmit-shop"
              type="search"
              placeholder={t("Search")}
            />
          </form>

          {/* <div className="my-2 "> */}
          {/* <SearchCategory /> */}
          {/* </div> */}
          <section className="my-2 game-scroll">
            <div
              className="btn-group me-2 "
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{
                  padding: "5px 35px",
                  background: subCatInput === "" ? "#17A308" : "",
                }}
                onClick={() => setSubcatInput("")}
              >
                {t("All")}
              </button>
            </div>
            {!loading
              ? subCategoriesData &&
                subCategoriesData.length > 0 &&
                subCategoriesData.map((item, index) => (
                  <div
                    key={index}
                    className="btn-group me-2"
                    role="group"
                    aria-label="Second group"
                    onClick={() => setSubcatInput(item.id)}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{
                        background: subCatInput === item.id ? "#17A308" : "",
                      }}
                    >
                      {locale === "en" ? item.title : item.title_arabic}
                    </button>
                  </div>
                ))
              : null}
          </section>
          {!loading ? (
            subCategoryProduct && subCategoryProduct.length > 0 ? (
              <>
                <StoreProductsCard
                  key={subCategoryProduct.length}
                  products={subCategoryProduct}
                />
              </>
            ) : (
              <div className="dark-theme-color">No products Found...</div>
            )
          ) : null}
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default CategorySearchPage;
