import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Carousel, Card } from "react-bootstrap";

function PlaygroundBanner({ banners }) {
  return (
    <Carousel className="mx-1">
      {banners.map((item, index) => (
        <Carousel.Item key={index} interval={1000}>
          <img
            className=" w-100 "
            src={`${constants.port}${item.image}`}
            style={{ width: "100%", aspectRatio: "2.6" }}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default PlaygroundBanner;
