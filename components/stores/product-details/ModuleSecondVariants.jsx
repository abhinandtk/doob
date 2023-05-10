import React from "react";
import { useSelector } from "react-redux";

function ModuleSecondVariants({ product }) {

  const primaryIndex=useSelector((state)=>state.product.proPrimaryVarientId)
  const multiItems = [];
  const prVarientId = useSelector((state)=>state.product.proVarient)
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

  return (
    <div>
      <h6>Choose size</h6>
      <div className="btn-group group  " role="group" aria-label="Second group">
        <button type="button" className="btn btn-secondary outlock ">
          34
        </button>
      </div>
      <div className="btn-group group  " role="group" aria-label="Second group">
        <button type="button" className="btn btn-outline-secondary outlocks ">
          35
        </button>
      </div>
      <div className="btn-group group  " role="group" aria-label="Second group">
        <button type="button" className="btn btn-secondary outlock ">
          34
        </button>
      </div>
      <div className="btn-group group  " role="group" aria-label="Second group">
        <button type="button" className="btn btn-outline-secondary outlock ">
          35
        </button>
      </div>
    </div>
  );
}

export default ModuleSecondVariants;
