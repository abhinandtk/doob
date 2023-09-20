import {
  setProPrimaryVarientId,
  setProSecondaryVarientId,
  setProVarient,
} from "@/Redux/productDetail";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

function ModuleVariants({ product }) {
  console.log("ttt-product123", product);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [primaryIndex, setPrimaryIndex] = useState(
    useSelector((state) => state.product.proPrimaryVarientId)
  );
  const prVarientId = useSelector((state) => state.product.proVarient);
  const items = [];
  console.log("ttt-productitems det32 secondvarId", product.Product_Items);

  product.Product_Items.map((item, index) => {
    const isExist = (obj) => obj.varent_id === item.varent_id;
    if (items.some(isExist) === false) {
      items.push({
        varent_id: item.varent_id,
        values_values: item.values_values,
        varient_color_image: item.varient_color_image,
        secondVarientSlug:
          item.multivarient.length !== 0
            ? item.multivarient[0].slug_id
            : item.slug_id,
      });
    }
  });

  const handleButtonActions = (varent_id, secondVarientSlug) => {
    console.log(
      "00000000000000",
      primaryIndex,
      varent_id,
      prVarientId,
      secondVarientSlug
    );
    setPrimaryIndex(varent_id);
    dispatch(setProPrimaryVarientId(varent_id));
    dispatch(setProVarient(secondVarientSlug));
    dispatch(setProSecondaryVarientId(secondVarientSlug));
    // router.push(`/store/product/${secondVarientSlug}`, `/store/product/${secondVarientSlug}`, { shallow: true });
  };

  return (
    <div>
      <h6 style={{ marginTop: "-8px" }}>
        {product.primary_varient === "Color" ? (
          <>
            {t("Color")}
            <br></br>
            <div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`my-1 ${
                    prVarientId === item.secondVarientSlug
                      ? "circle-select"
                      : primaryIndex === item.varent_id
                      ? "circle-select"
                      : "circle-unselect"
                  }
              `}
                >
                  <span
                    key={index}
                    onClick={() =>
                      handleButtonActions(
                        item.varent_id,
                        item.secondVarientSlug
                      )
                    }
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
            </div>
          </>
        ) : (
          <>
            {t("Size")}
            <br></br>
            <div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="btn-group group  "
                  role="group"
                  aria-label="Second group"
                >
                  <button
                    onClick={() =>
                      handleButtonActions(
                        item.varent_id,
                        item.secondVarientSlug
                      )
                    }
                    type="button"
                    // className={`btn btn-secondary ${
                    //   prVarientId === item.slug ? "outlocks" : "outlock"
                    // }`}
                    className="btn btn-secondary outlocks"
                  >
                    {item.values_values}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {/* <div className="btn-group group  " role="group" aria-label="Second group">
        <button type="button" className="btn btn-secondary outlock ">
        Purple
        </button>
      </div> */}
      </h6>
    </div>
  );
}

export default ModuleVariants;
