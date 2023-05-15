import { setProVarient } from "@/Redux/productDetail";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ModuleSecondVariants({ product }) {
  const dispatch = useDispatch();

  const primaryIndex = useSelector(
    (state) => state.product.proPrimaryVarientId
  );
  console.log("test1primaryIndex", primaryIndex);
  const multiItems = [];
  const prVarientId = useSelector((state) => state.product.proVarient);

  product.Product_Items.map((item, index) => {
    item.multivarient.map((item_, index_) => {
      if (item.varent_id === primaryIndex) {
        multiItems.push({
          value: item_.values,
          slug: item_.slug_id,
        });
      }
    });
  });

  console.log("oooooo", product);
  console.log("multiitems", multiItems);

  return (
    <div>
      {multiItems.length !== 0 && (
        <>
          <h6>Choose size</h6>
          {multiItems.map((item, index) => (
            <div
              key={index}
              className="btn-group group  "
              role="group"
              aria-label="Second group"
            >
              <button
                onClick={() => dispatch(setProVarient(item.slug))}
                type="button"
                className={`btn btn-secondary ${prVarientId === item.slug ? 'outlocks' : 'outlock'}`}
              >
                {item.value}
              </button>
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
