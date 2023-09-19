import { setProVarient } from "@/Redux/productDetail";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

function ModuleSecondVariants({ product }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const router = useRouter();

  const primaryIndex = useSelector(
    (state) => state.product.proPrimaryVarientId
  );
  console.log("ttt-items moduleseconddata/////////", product);
  const multiItems = [];
  const prVarientId = useSelector((state) => state.product.proVarient);

  product.Product_Items.map((item, index) => {
    item.multivarient.map((item_, index_) => {
      if (item.varent_id === primaryIndex) {
        multiItems.push({
          value: item_.values,
          slug: item_.slug_id,
          varient_color_image: item_.varient_color_image,
        });
      }
    });
  });

  const handleButtonActions = (slug) => {
    dispatch(setProVarient(slug));
    // router.push(`/store/product/${slug}`, `/store/product/${slug}`, {
    //   shallow: true,
    // });
  };

  console.log("oooooo", product);
  console.log("ttt-items modulesecondmultiitems", multiItems);

  return (
    <div>
      {product.secondary_varient === "Size"
        ? multiItems.length !== 0 && (
            <>
              <h6>{t("Size")}</h6>
              {multiItems.map((item, index) => (
                <div
                  key={index}
                  className="btn-group group"
                  role="group"
                  aria-label="Second group"
                >
                  <button
                    onClick={() => handleButtonActions(item.slug)}
                    type="button"
                    className={`btn btn-secondary ${
                      prVarientId === item.slug ? "outlocks" : "outlock"
                    }`}
                  >
                    {item.value}
                  </button>
                </div>
              ))}
            </>
          )
        : multiItems.length !== 0 && (
            <>
              {" "}
              <h6>{t("Color")}</h6>
              {multiItems.map((item, index) => (
                <div
                  className={`my-1 ${
                    prVarientId === item.slug
                      ? "circle-select"
                      : "circle-unselect"
                  }
                `}
                >
                  <span
                    key={index}
                    onClick={() => handleButtonActions(item.slug)}
                  >
                    <img
                      className="mx-1 my-1"
                      src={`${constants.port}${item.varient_color_image}`}
                      style={{
                        width: "18px",
                        height: "18px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                </div>
              ))}
            </>
          )}
      {/* <div className="btn-group group  " role="group" aria-label="Second group">
        <button type="button" className="btn btn-outline-secondary outlocks ">
          35
        </button>
      </div> */}
    </div>
  );
}

export default ModuleSecondVariants;
