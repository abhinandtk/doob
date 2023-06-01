import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ProductDetailImages from "@/components/stores/product-details/ProductDetailImages";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import ProductDetailFullWidth from "@/components/stores/product-details/ProductDetailFullWidth";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";

function ProductDetailPage() {
  const [productDetails, setProductDetails] = useState([]);
  const router = useRouter();
  const { pid } = router.query;       
  console.log("productttttttttttttttttttttttt444444444");
            
      
                                                                                                                                                                                                                                    
  useEffect(()=>{
    Axios.post(
      apis.productDetail,
      {
        slug_Id: pid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setProductDetails([res.data.data[0]]);
      console.log("productttttttttttttttttttttttt", res);
    });
  },[pid])

  return (
    <>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <form className="nosubmit ">
          <span>
            
            <input className="nosubmit1" type="search" placeholder="Search" />
            <img
              src="../../images/store/Fil-icon.png"
              className="filters-icon"
            ></img>
          </span>
        </form>

        <section className=" my-3 h-75">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card cart">
                <div className="card-body p-4">
                  <div className="row ">
                    <ProductDetailFullWidth product={productDetails} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <MobileFooter />

    </>
  );
}

export default ProductDetailPage;
