import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";

function AmenitiesList({amenitiesData}) {
  return (
    <Fragment>
      <h5 className="amenties">Amenities</h5>
      <div className="Amenties">
        {amenitiesData.map((item,index)=>(
        <span key={index} className="mx-2">
          <span>
            <img src={`${constants.port}${item.logo}`} style={{width:'18px',height:'18px',objectFit:'cover',borderRadius:'50%'}} />
          </span>
          <span className="mx-2">{item.name}</span>
        </span>
        ))}
        <br></br>
        <br></br>
    

      </div>
    </Fragment>
  );
}

export default AmenitiesList;
