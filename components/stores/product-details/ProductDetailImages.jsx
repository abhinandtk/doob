import { Card, Carousel,Image } from "antd";
import React from "react";

function ProductDetailImages() {
  return (
    <div className="col-lg-7">
      {/* <Carousel
        autoplay={false}
        beforeChange={(oldIndex, newIndex) =>
          setCurrentImageIndex(newIndex)
        }
      >
        {images.map((image, index) => ( 
          <div key={index}>
            <Image src={image} alt={`Product Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div style={{ display: 'flex', marginTop: '10px' }}>
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
      </div> */}
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetailImages;
