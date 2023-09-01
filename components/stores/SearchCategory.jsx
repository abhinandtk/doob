import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useTranslation } from "next-i18next";
function SearchCategory({ category }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  console.log("category", category);
  return (
    <Fragment>
      <div className="my-2 store-cat-details">
        <h5 className="dark-theme-color">{t("Category")}</h5>
        <div className="game-scroll ">
          {category.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                router.push({
                  pathname: "/store/category-search",
                  query: {
                    category_id: item.id,
                  },
                })
              }
              className="btn-group me-2"
              role="group"
              aria-label="Second group"
            >
              <button type="button" className="btn btn-secondary secondary">
                {locale === "en" ? item.title : item.title_arabic}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default SearchCategory;
