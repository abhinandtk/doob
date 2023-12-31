import constants from "@/public/data/my-constants/Constants";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

function Stores({ storeData, title }) {
  const { theme } = useTheme();
  return (
    // <div className='row row-cols-2 store'>
    <div className="products-card-store">
      <div className="row store products-card-store">
        <h5
          className="mx-2"
          style={{ color: theme === "dark" ? "#FFFF" : "#212529" }}
        >
          {title}
        </h5>
        {storeData.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs-6 ">
            <Link href={`/store/${item.slug_store}`}>
              <img
                src={`${constants.port}${item.logo}`}
                style={{ width: "100%", objectFit: "cover", aspectRatio: "1" }}
              ></img>
            </Link>
          </div>
        ))}

        {/* <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6  '>
            <img src='../images/store/s1.png'  style={{width:'100%'}} ></img>
        </div> */}

        {/* <div class="owl-carousel">
  <div class="item"><img src='../images/store/s1.png'></img></div>
  <div class="item"><img src='../images/store/s1.png'></img></div>
  <div class="item"><img src='../images/store/s1.png'></img></div>
  <div class="item"><img src='../images/store/s1.png'></img></div> 
  </div> */}
      </div>
    </div>
  );
}

export default Stores;
