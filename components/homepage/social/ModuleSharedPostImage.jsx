import moment from "moment";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";

function ModuleSharedPostImage({ data }) {
  return (
    <Fragment>
      {data && (
        <Link
          href={
            data.post_type === "Product"
              ? `/store/product/${data.products.slug_product_varient}`
              : data.post_type === "Store"
              ? `/store/${data.stores.slug_store}`
              : data.post_type === "Field"
              ? {
                  pathname: `/play-ground/${data.stadiums.slug_field}`,
                  query: { stadium_id: data.stadiums.id, date: moment().format("YYYY-MM-DD") }, // Add your query parameters here
                }
              : ""
          }
          style={{ textDecoration: "none" }}
        >
             
          <div className="post__medias">
         

          
                
            <img
              className="post__media"
              src={`${data.image}`}
              
              alt="Post Content"
                   />  
            
            {/* multiple image */}
            {/* <img
                  className="post__media"
                  src="../images/soccer-into-goal-success-concept 2.png"
                  alt="Post Content"
                /> */}
    
          </div>
           
      <img src="/images/locks.png" className="locks "></img>

        </Link>
      )}
    </Fragment>
  );
}

export default ModuleSharedPostImage;
