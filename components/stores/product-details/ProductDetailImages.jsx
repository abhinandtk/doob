import constants from "@/public/data/my-constants/Constants";
import { Card, Carousel,Image } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ProductDetailImages({product}) {
  const [productImages, setProductImages] = useState([]);
  const prVarientId = useSelector((state) => state.product.proVarient);

  console.log('ttttttttt',product)


  useEffect(() => {
       
    let thumbnail_images = []
    product.Product_Items.map((item, index) => {
        if (item.multivarient.length !== 0) {
            item.multivarient.map((item_, index_) => {
                if (item_.slug_id === prVarientId && item_.Thumbnail_images.length !==0 ) {
                  let images = [];
                  item_.Thumbnail_images.map((item) => {
                      images.push(`${constants.port}${item.Images}`);
                  });
                  setProductImages(images);
                }
              })
        }else{
            if (item.slug_id === prVarientId && item.Thumbnail_images.length !==0 ) {
                let images = [];
                item.Thumbnail_images.map((item) => {
                    images.push(`${constants.port}${item.Images}`);
                });
                setProductImages(images);
              }
            
        }

    })
}, [product, prVarientId]);
console.log('images34',productImages)
  return (
    <div className="col-lg-7">
      <Carousel
        autoplay={false}
        // beforeChange={(oldIndex, newIndex) =>
        //   setCurrentImageIndex(newIndex)
        // }
      >
        {productImages && productImages.map((image, index) => ( 
          <div key={index}>
            <Image src={image} alt='doob' />
          </div>
        ))}
      </Carousel>
      {/* <div style={{ display: 'flex', marginTop: '10px' }}>
        {images.map((image, index) => (
          <div key={index} style={{ marginRight: '10px' }}>
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              preview={false}
              width={50}
              height={50}
              style={{
                border: currentImageIndex === index ? '2px solid #1890ff' : '',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
      </div>
      <div className="col-lg-8">
        <div className="row row-cols-6  colors ">
          <div className="col-md-3 col-sm-6 col-xs-6  ">
            <img
              src="../../images/store/red.png"
              style={{ width: "50px", height: "50px" }}
            ></img>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6 ">
            <img
              src="../../images/store/purple.png"
              style={{ width: "50px", height: "50px" }}
            ></img>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6  ">
            <img
              src="../../images/store/violet.png"
              style={{ width: "50px", height: "50px" }}
            ></img>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default ProductDetailImages;
