import React, { Fragment } from "react";

function SearchCategory({ category }) {
  return (
    <Fragment>
      <div  className="my-2">
        <h5>Category</h5>
        <div className="btn-group me-2" role="group" aria-label="Second group">
          <button
            type="button"
            className="btn btn-outline-secondary outline"
            style={{ padding: "5px 27px" }}
          >
            All
          </button>
        </div> 
        {category.map((item,index)=>(
        <div className="btn-group me-2" role="group" aria-label="Second group">
          <button type="button" className="btn btn-secondary secondary" >
            {item.title}
          </button>
        </div>
        ))} 
      </div>
    </Fragment>
  );
}

export default SearchCategory;
