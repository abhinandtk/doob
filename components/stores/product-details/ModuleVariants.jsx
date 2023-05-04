import constants from "@/public/data/my-constants/Constants";
import React from "react";

function ModuleVariants({ product }) {
    console.log('tttttttttttt45',product)
  return (
    <div>
      <h6 style={{ marginTop: "-8px" }}>
        Color<br></br>
        <div >
        {product.Product_Items.map((item,index)=>(
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
          </span>))}
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
