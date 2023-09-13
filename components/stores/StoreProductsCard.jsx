import constants from "@/public/data/my-constants/Constants";
import React from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Carousel,
  Card,
} from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { useState } from "react";
import Link from "next/link";
import { setProVarient } from "@/Redux/productDetail";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

function StoreProductsCard({ products, title }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  console.log("reere", products);

  const [updatedStore, setUpdatedStore] = useState(
    products.map((item) => ({
      ...item,
      isWish: item.is_favorite,
    }))
  );
  // products = updatedStore
  const { theme } = useTheme();
  const addWishlistHandler = (id, favorite) => {
    const api = favorite ? apis.removewishlist : apis.addwishlist;
    Axios.post(
      api,
      {
        product_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      let updatedItem = {};

      if (res.data.status === 1) {
        updatedItem = {
          ...updatedStore.find((item) => item.slug_product_varient === id),
          isWish: !favorite,
        };
      }
      setUpdatedStore((prevStore) =>
        prevStore.map((item) =>
          item.slug_product_varient === id ? updatedItem : item
        )
      );

      console.log("wishlisttttttttttttttttttttttttttttttttttttt", res);
    });
  };
  return (
    <div className="products-card-store">
      <h5 style={{ color: theme === "dark" ? "#FFFF" : "#212529" }}>
        {title}
        {/* <span className="view">View All</span> */}
      </h5>
      <div className="row row-cols-2 store my-2">
        {updatedStore &&
          updatedStore.map((item, index) => (
            <div key={index} className="col-md-4 col-lg-3 col-sm-6 col-xs-6 ">
              <Card
                key={index}
                style={{
                  backgroundColor: "#343C42",
                  borderRadius: "0%",
                  border: "0px",
                }}
              >
                <Link
                  href={`/store/product/${item.slug_product_varient}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    onClick={() =>
                      dispatch(setProVarient(item.slug_product_varient))
                    }
                    style={{
                      borderRadius: "0px 0px 0px 0px",
                      width: "100%",
                      objectFit: "cover",
                      aspectRatio: "1",
                    }}
                    src={`${constants.port}${item.Thumbnail_image}`}
                  />
                </Link>
                <Card.Body className="favouite-card">
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    <i
                      className="bi bi-star-fill"
                      style={{ color: "yellow" }}
                    ></i>
                    <span style={{ color: "white" }} className="mx-1">
                      {item.review}
                    </span>
                    <span
                      onClick={() =>
                        addWishlistHandler(
                          item.slug_product_varient,
                          item.isWish
                        )
                      }
                      style={{ float: locale === "en" ? "right" : "left" }}
                    >
                      <i
                        className={`${
                          item.isWish
                            ? "bi bi-suit-heart-fill"
                            : "bi bi-suit-heart"
                        }`}
                        style={{ color: item.isWish ? "#17A803" : "#fff" }}
                      ></i>
                    </span>
                    <br></br>
                    <Link
                      href={`/store/product/${item.slug_product_varient}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          color: "white",
                          fontWeight: "400",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: "35px",
                        }}
                        onClick={() =>
                          dispatch(setProVarient(item.slug_product_varient))
                        }
                      >
                        {locale === "en" ? item.Name : item.arabic_translator}
                      </p>
                    </Link>

                    {item.product_stock <= 0 ? (
                      <p className="my-1" style={{ color: "red" }}>
                        Out of stock
                      </p>
                    ) : item.product_brand === "Active" &&
                      item.product_category == true &&
                      item.product_status === "Active" &&
                      item.product_varient_status === "Active" ? (
                      <p style={{ color: "#fff", fontSize: "15px" }}>
                        <s>{item.Display_Prize} KD</s>
                        <span>
                          <p
                            style={{
                              fontSize: "16px",
                              color: "#17A803",
                              fontWeight: "700",
                            }}
                          >
                            {item.Selling_Prize} KD
                          </p>
                        </span>
                      </p>
                    ) : (
                      <p className="my-1" style={{ color: "red" }}>
                        Currrently unavailable
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}

        {/* <div className='col-lg-3 col-md-4  '>
        <Card   style={{backgroundColor:'#343C42',borderRadius:'0%',border:'0px'}} >
          <Card.Img  style={{borderRadius:'0px 0px 0px 0px',width:'100%'}} src="../images/store/shoes.jpg"  />
          <Card.Body>
            
            <div style={{fontSize:'14px',fontWeight:'500'}}  >
            <i className="bi bi-star-fill" style={{color:'yellow'}}></i> <span style={{color:'white'}}>4.5</span><span style={{float:'right'}}><i className="bi bi-suit-heart  " style={{color:'white'}}></i></span><br></br><p style={{fontSize:'12px',color:'white',fontWeight:'400;'}}>Edge Identity Running Shoes For Men</p>
              <p style={{color:'#fff',fontSize:'15px'}}><s>13.000 KD</s><span><p style={{fontSize:'16px',color:'#17A803',fontWeight:'700'}}>14.450 KD</p></span></p>
            </div>
          
          </Card.Body> 
        </Card>
      </div> */}
      </div>
    </div>
  );
}

export default StoreProductsCard;
