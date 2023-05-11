import {
  setProPrimaryVarient,
  setProSecondaryVarientId,
  setProVarient,
} from "@/Redux/productDetail";
import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ModuleVariants({ product }) {
  console.log("tttttttttttt45", product);
  const dispatch = useDispatch();
  const [primaryIndex, setPrimaryIndex] = useState(
    useSelector((state) => state.product.proPrimaryVarientId)
  );
  const prVarientId = useSelector((state) => state.product.proVarient);
  const items = [];

  product.Product_Items.map((item, index) => {
      const isExist = (obj) => obj.varent_id === item.varent_id;
      if (items.some(isExist) === false) {
         
          items.push({
              varent_id: item.varent_id,
              values_values: item.values_values,
              secondVarientSlug:
                  item.multivarient.length !== 0
                      ? item.multivarient[0].slug_id
                      : item.slug_id,
          });
      }
  });

  console.log('items module',items)



  return (
    <div>
      <h6 style={{ marginTop: "-8px" }}>
        Color<br></br>
        <div>
          {product.Product_Items.map((item, index) => (
            <span key={index}>
              <img
                className="mx-1"
                src={`${constants.port}${item.varient_color_image}`}
                style={{
                  width: "18px",
                  height: "18px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </span>
          ))}
        </div>
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
