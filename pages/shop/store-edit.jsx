import apis from "@/public/data/my-constants/Apis";
import React, { useState } from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MobileFooter from "@/components/shared/MobileFooter";
import { useEffect } from "react";
function StoreEditPage() {
  const [slug, setSlug] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    location: "",
    gmap: "",
    contact: "",
    email: "",
    logo: "",
    cover: "",
    start: "",
    end: "",
  });
  useEffect(() => {
    Axios.get(apis.storeSettings, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("editstore", res);
      setSlug(res.data.data.slug_store)
      setFormData({
        title: res.data.data.title,
        description: res.data.data.description,
        address: res.data.data.address,
        location: res.data.data.location,
        contact: res.data.data.contact_no,
        email: res.data.data.store_email,
        // logo: res.data.data.logo,
        // cover: res.data.data.cover_photo,
        start: res.data.data.start_time,
        end: res.data.data.end_time,
      });
    });
  }, []);

  const router = useRouter();
  const labels = Labels();

  const changeHandler = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };

  const changeHandlerFile = (e) => {
    console.log('file')
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.files[0];
    setFormData({ ...newFormData });
    console.log('files',e.target.files[0])
    // const formdata = new FormData();
    // formdata.append("file_field_name", e.target.files[0]);
    // Axios.post(apis.allImagesUpload, formdata, {
    //   headers: {
    //     Authorization: `Token ${constants.token_id}`,
    //   },
    // }).then((res) => {
    //   newFormData[e.target.id] = res.data.image_url;
    //   setFormData({ ...newFormData });
    //   console.log(",form23", newFormData);
    // });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("slug_store", slug);
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("address", formData.address);
    formdata.append("location", formData.location);
    formdata.append("contact_no", formData.contact);
    formdata.append("store_email", formData.email);
    formdata.append("start_time", formData.start);
    formdata.append("end_time", formData.end);
    formData.logo && formdata.append("logo", formData.logo);
    formData.cover && formdata.append("cover_photo", formData.cover);
    console.log("resultof store", formData);

    Axios.put(apis.editStore, formdata, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("resultfrom", res);
      if (res.data.status === 1) {
        router.back();
        notification.success({
          message: constants.Success,
          description: `${labels["Store edited successfully"]}`,
        });
      } else {
        notification.error({
          message: constants.Error,
          description: res.data.message_en,
        });
      }
      
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar currentPage="settings" />
          <div className="content-topics ">
            <h6
              className=" my-4"
              style={{ color: "#17a803", fontWeight: "700" }}
            ></h6>

            <div className="my-4 mx-4 ">
              <h6 style={{ fontSize: "14px", fontWeight: "700" }}>
                Store Details
              </h6>
              <br></br>
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">Title</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="title"
                    value={formData.title}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">Description</label>
                  <textarea
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    rows={3}
                    id="description"
                    value={formData.description}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">Address</label>
                  <textarea
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    rows={3}
                    id="address"
                    value={formData.address}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">Location</label>
                  <input
                    required
                    type="text"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="location"
                    value={formData.location}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>

                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">Contact No</label>
                  <input
                    required
                    type="number"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">Store E-mail</label>
                  <input
                    required
                    type="email"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="email"
                    value={formData.email}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">Logo</label>
                  <input
                    
                    type="file"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="logo"
                    onChange={(e) => changeHandlerFile(e)}
                  />
                </div>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">Cover Photo</label>
                  <input
                    
                    type="file"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="cover"
                    onChange={(e) => changeHandlerFile(e)}
                  />
                </div>

                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">Start Time</label>
                  <input
                    required
                    type="time"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="start"
                    value={formData.start}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">End Time</label>
                  <input
                    required
                    type="time"
                    className="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="end"
                    value={formData.end}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>

                <div className="product-submit my-3">
                  <button type="submit" className="submit-cart-btn">
                    Submit
                  </button>
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="sub-cart-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreEditPage;
