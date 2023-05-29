import constants from "@/public/data/my-constants/Constants";
import { Card, Carousel, Image } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ProductDetailImages({ product }) {

  const carouselRef=useRef()
  const [productImages, setProductImages] = useState([]);
  const prVarientId = useSelector((state) => state.product.proVarient);

  console.log("ttttttttt", product);

  useEffect(() => {
    let thumbnail_images = [];
    product.Product_Items.map((item, index) => {
      if (item.multivarient.length !== 0) {
        item.multivarient.map((item_, index_) => {
          if (
            item_.slug_id === prVarientId &&
            item_.Thumbnail_images.length !== 0
          ) {
            let images = [];
            item_.Thumbnail_images.map((item) => {
              images.push(`${constants.port}${item.Images}`);
            });
            setProductImages(images);
          }
        });
      } else {
        if (
          item.slug_id === prVarientId &&
          item.Thumbnail_images.length !== 0
        ) {
          let images = [];
          item.Thumbnail_images.map((item) => {
            images.push(`${constants.port}${item.Images}`);
          });
          setProductImages(images);
        }
      }
    });
  }, [product, prVarientId]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    carouselRef.current.goTo(index);
  };
  console.log("images34", productImages);
  return (
    <div className="col-lg-7">
      <Carousel
        ref={carouselRef}
        autoplay={false}
        beforeChange={(oldIndex, newIndex) => {
          setCurrentImageIndex(newIndex);
          console.log("current6666666", newIndex);
        }}
      >
        {productImages &&
          productImages.map((image, index) => (
            <div key={index}>
              <Image src={image} alt="doob" />
            </div>
          ))}
      </Carousel>
      <div style={{ display: "flex", marginTop: "10px" }}>
        {productImages.map((image, index) => (
          <div key={index} style={{ marginRight: "10px" }}>
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              preview={false}
              width={50}
              height={50}
              style={{
                border: currentImageIndex === index ? "2px solid #1890ff" : "",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
      {/* ... */}
    </div>
  );
}

export default ProductDetailImages;
