import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";


function ProductManagement() {
    const router = useRouter()
  return (
    <div className="content-topic  ">
      <div className="bottom">
        <h6 className=" mx-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Products
        </h6>
        <Button onClick={()=>router.push('/shop/add-products')} type="submit" className="order1-btn ">
          {" "}
          Add Products{" "}
        </Button>

        <div
          className="   mx-auto d-flex justify-content-between align-items-center"
          style={{ width: "90%" }}
        >
          <p style={{ fontWeight: "500" }}>Nike-20 Men’s Sport shoe</p>
          <button className="edit-btn mb-2">Edit</button>
        </div>
        <hr
          className="mx-auto "
          style={{ width: "90%", marginTop: "-2px" }}
        ></hr>
        <div className=" imx  d-flex justify-content-between align-items-center">
          <img
            src="../images/store/v copy.png"
            style={{ width: "82px", height: "82px" }}
          ></img>
        </div>

        <div
          className="p-2   mx-auto d-flex justify-content-between align-items-center"
          style={{ width: "90%" }}
        >
          <span>Brand</span>
          <span>Nike</span>
        </div>
        <div
          className="p-2  mx-auto d-flex justify-content-between align-items-center"
          style={{
            background: "#eeeeee",
            borderRadius: "10px",
            width: "90%",
          }}
        >
          <span>Category item</span>
          <span>Football</span>
        </div>
        <div
          className="p-2   mx-auto d-flex justify-content-between align-items-center"
          style={{ width: "90%" }}
        >
          <span>Sub Category</span>
          <span>Shoe</span>
        </div>
        <div
          className="p-2  mx-auto d-flex justify-content-between align-items-center"
          style={{
            background: "#eeeeee",
            borderRadius: "10px",
            width: "90%",
          }}
        >
          <span style={{ color: "#959595" }}> Status</span>
          <span style={{ color: "#17A803" }}>Pending</span>
        </div>
        <br></br>

        <div className="my-5">
          <div
            className="   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <p style={{ fontWeight: "500" }}>Nike-20 Men’s Sport shoe</p>
            <button className="edit-btn mb-2">Edit</button>
          </div>
          <hr
            className="mx-auto "
            style={{ width: "90%", marginTop: "-2px" }}
          ></hr>
          <div className="  d-flex justify-content-between align-items-center imx">
            <img
              src="../images/store/b.png"
              style={{ width: "82px", height: "82px" }}
            ></img>
          </div>
          <div
            className="p-2   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <span>Brand</span>
            <span>Nike</span>
          </div>
          <div
            className="p-2  mx-auto d-flex justify-content-between align-items-center"
            style={{
              background: "#eeeeee",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <span>Category item</span>
            <span>Football</span>
          </div>
          <div
            className="p-2   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <span>Sub Category</span>
            <span>Shoe</span>
          </div>
          <div
            className="p-2  mx-auto d-flex justify-content-between align-items-center"
            style={{
              background: "#eeeeee",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <span style={{ color: "#959595" }}> Status</span>
            <span style={{ color: "#17A803" }}>Pending</span>
          </div>
        </div>

        <br></br>
      </div>
    </div>
  );
}

export default ProductManagement;
