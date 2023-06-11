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

function StoreProductsCard({ products, title }) {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(true);

  const [updatedStore, setUpdatedStore] = useState(
    products.map((item) => ({
      ...item,
      isWish: item.is_favorite,
    }))
  );
  // products = updatedStore
  console.log("wewewewewewewewewe", products);
  console.log("wewewewewewewewewe787", updatedStore);
  const addWishlistHandler = (id, favorite) => {
    console.log("weeeeeeeeeeeeeeeeeeeeee", favorite);
    console.log("w444eeeeeeeeeeeeeeeeeeeeee", !favorite);
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
          ...updatedStore.find((item) => item.slug_Id === id),
          isWish: !favorite,
        };
      }
      setUpdatedStore((prevStore) =>
        prevStore.map((item) => (item.slug_Id === id ? updatedItem : item))
      );

      console.log("wishlisttttttttttttttttttttttttttttttttttttt", res);
    });
  };
  return (
    <div>
      {console.log("wetrrtrtweeee()))()", updatedStore)}

      <h5>
        {title}
        {/* <span className="view">View All</span> */}
      </h5>
      <div className="row row-cols-2 store ">
        {updatedStore &&
          updatedStore.map((item, index) => (
            <div key={index} className="col-md-4 col-lg-3 col-sm-6 col-xs-6   ">
              <Card
                key={index}
                style={{
                  backgroundColor: "#343C42",
                  borderRadius: "0%",
                  border: "0px",
                }}
              >
                <Link
                  href={`/store/product/${item.slug_Id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    onClick={() => dispatch(setProVarient(item.slug_Id))}
                    style={{
                      borderRadius: "0px 0px 0px 0px",
                      width: "100%",
                      objectFit: "cover",
                      aspectRatio: "1",
                    }}
                    src={`${constants.port}${item.image}`}
                  />
                </Link>
                <Card.Body className="favouite-card">
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    <i
                      className="bi bi-star-fill" 
                      style={{ color: "yellow" }}
                    ></i>
                    <span style={{ color: "white" }} className="mx-1">{item.review}</span>
                    <span
                      onClick={() =>
                        addWishlistHandler(item.slug_Id, item.isWish)
                      }
                      style={{ float: "right" }}
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
                      href={`/store/product/${item.slug_Id}`}
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
                        onClick={() => dispatch(setProVarient(item.slug_Id))}
                      >
                        {item.Name}
                      </p>
                    </Link>

                    <p style={{ color: "#fff", fontSize: "15px" }}>
                      <s>{item.display_price} KD</s>
                      <span>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#17A803",
                            fontWeight: "700",
                          }}
                        >
                          {item.selling_price} KD
                        </p>
                      </span>
                    </p>
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
