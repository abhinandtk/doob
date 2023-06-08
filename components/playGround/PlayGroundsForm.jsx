import React from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import { useState, useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import { Modal, TimePicker } from "antd";
import { Button } from "react-bootstrap";
import moment from "moment";
import { useRouter } from "next/router";
function PlayGroundsForm({ handlePlaygroundForm, editData }) {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [gameChecked, setGameChecked] = useState([]);
  const [amenityChecked, setAmenityChecked] = useState([]);
  const [country, setCountry] = useState([]);
  const [area, setArea] = useState([]);

  const [visible, setVisible] = useState(false);
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [slots, setSlots] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    gmap: "",
    image: "",
    opening: "",
    closing: "",
    description: "",
    description_ar: "",
    latitude: "",
    longitude: "",
    amount: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const newForm = { ...formData };
    if (e.target.id === "image") {
      const formDatas = new FormData();
      formDatas.append("file_field_name", e.target.files[0]);
      Axios.post(apis.allImagesUpload, formDatas, {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }).then((res) => {
        newForm[e.target.id] = res.data.image_url;
        setFormData({ ...newForm });
      });
    }
    newForm[e.target.id] = e.target.value;
    setFormData({ ...newForm });
    console.log("changeeeeee", formData);
  };

  useEffect(() => {
    Axios.get(apis.listGameAmenities, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setAmenity(res.data.data.amenities);
      setGame(res.data.data.games);
    });

    Axios.get(apis.commonList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCountry(res.data.data.country);
    });
    const countryId = localStorage.getItem("country-select");
    const areaData = country.find(
      (country) => country.country_name === countryId
    );
    if (areaData && areaData.regions) {
      setArea(areaData.regions);
    }
    // console.log("areaData", areaData);
  }, [country]);

  const handleTime = (time) => {
    if (time) {
      setStartTime(time);
    }
  };

  const handleGameChecked = (e) => {
    const id = parseInt(e.target.id);
    console.log("idddddddd", id);
    setGameChecked((prevState) => {
      if (e.target.checked) {
        return [...prevState, parseInt(id)];
      } else {
        return prevState.filter((gameId) => gameId !== id);
      }
    });
    console.log("striiiiiiiiing", gameChecked);
  };
  const handleAmenityChecked = (e) => {
    const id = parseInt(e.target.id);
    setAmenityChecked((prevState) => {
      if (e.target.checked) {
        return [...prevState, id];
      } else {
        return prevState.filter((amenity) => amenity !== id);
      }
    });
  };

  const addSlotHandler = () => {
    if (start_time && end_time) {
      console.log("00/**/*/*/*/*/*", start_time);
      const newSlot = {
        start_time: start_time.format("H:mm"),
        end_time: end_time.format("H:mm"),
      };

      console.log(start_time.format("h:mm A"));
      //   setSlots([...slots, { start_time, end_time }]);
      setSlots([...slots, newSlot]);
      setStartTime(null);
      setEndTime(null);
    }
  };

  useEffect(() => {
    if (editData === "true") {
      Axios.post(
        apis.ground_admin_view_get_put,
        { slug_field: id },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log("edit345", res);
        if (res.data.status == 1) {
          setFormData({
            name: res.data.data.list.stadium_name,
            city: res.data.data.list.city.id,
            location: res.data.data.list.location,
            gmap: res.data.data.management.google_map_location_field,
            image: res.data.data.list.images[0].images,
            opening: res.data.data.list.opening_time,
            closing: res.data.data.list.closing_time,
            description: res.data.data.list.description,
            description_ar: res.data.data.management.description_ar,
            latitude: res.data.data.list.latitude,
            longitude: res.data.data.list.longitude,
            amount: res.data.data.list.amount,
          });
          setAmenityChecked(res.data.data.list.amnities.map((item)=>item.id))
          setGameChecked(res.data.data.list.game.map((item)=>item.id))
          const newSlots = res.data.data.list.timeslot.map((item) => ({
            start_time: moment(item.start_time,'hh:mm:ss').format("H:mm"),
            end_time: moment(item.end_time,'hh:mm:ss').format("H:mm"),
          }));
    
          setSlots(newSlots);
        }
      });
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    handlePlaygroundForm(formData, gameChecked, amenityChecked, slots);
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Name*</label>
        <input
          required
          type="text"
          className="form-control p-2"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group my-2">
        <label for="exampleFormControlSelect1">City *</label>
        <select
          className="form-control "
          style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
          id="city"
          value={formData.city}
          onChange={(e) => handleChange(e)}
        >
          <option style={{ color: "#959595" }} value="">
            --Select--
          </option>
          {area.map((item, index) => (
            <option key={index} style={{ color: "#959595" }} value={item.id}>
              {item.region_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Location*</label>
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
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Google Map Location*</label>
        <input
          required
          type="text"
          className="form-control p-2"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="gmap"
          value={formData.gmap}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Latitude*</label>
        <input
          required
          type="text"
          className="form-control p-2"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="latitude"
          value={formData.latitude}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Longitude *</label>
        <input
          required
          type="text"
          className="form-control p-2"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="longitude"
          value={formData.longitude}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {/* <label for="exampleFormControlInput1">Location</label>
      <div
        className="rounded border-0 d-flex w-100 p-2 align-items-center  "
        style={{ background: "#eeeeee" }}
      >
        <div className="ms-auto">
          <i className="bi bi-geo-alt-fill"></i>
        </div>
      </div> */}

      <div className="form-group my-2">
        <label for="exampleFormControlInput1" id="formfile">
          Image
        </label>
        <input
          type="file"
          className="form-control p-2 "
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          placeholder="No file choosen"
          id="image"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Opening Time*</label>
        <input
          required
          type="time"
          className="form-control p-2"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="opening"
          value={formData.opening}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlInput1">Closing Time*</label>
        <input
          required
          type="time"
          className="form-control p-2"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="closing"
          value={formData.closing}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <h6 style={{ fontSize: "15px", fontWeight: "700" }}>Choose File</h6>
      {game.map((item, index) => (
        <div
          key={index}
          className="slot clearfix  mt-2"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <div>
            <span className="float-start">
              <img
                src={`${constants.port}${item.logo}`}
                style={{ width: "18px", height: "18px", objectFit: "cover" }}
              />
              <span className="mx-1">{item.title}</span>
            </span>
          </div>
          <div style={{ flexGrow: 1, textAlign: "right" }}>
            <input
              className="mx-3"
              id={item.id}
              onChange={(e) => handleGameChecked(e)}
              checked={gameChecked.includes(item.id)}
              style={{ width: "15px", height: "15px" }}
              type="checkbox"
            />
          </div>
        </div>
      ))}

      <div className="form-group my-2 ">
        <label for="exampleFormControlTextarea1">
          <h6 style={{ fontSize: "15px", fontWeight: "700" }}>Description</h6>
        </label>
        <textarea
          className="form-control"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="description"
          onChange={(e) => handleChange(e)}
          rows="3"
          value={formData.description}
        ></textarea>
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlTextarea1">
          <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
            Description Arabic
          </h6>
        </label>
        <textarea
          className="form-control"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="description_ar"
          onChange={(e) => handleChange(e)}
          rows="3"
          value={formData.description_ar}
        ></textarea>
      </div>
      <div className="form-group my-2 ">
        <label for="exampleFormControlTextarea1">
          <h6 style={{ fontSize: "15px", fontWeight: "700" }}>Amount</h6>
        </label>
        <textarea
          className="form-control"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
          }}
          id="amount"
          value={formData.amount}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>

      <br></br>

      <h6 style={{ fontSize: "15px", fontWeight: "700" }}>Amenities</h6>

      {amenity.map((data, index) => (
        <div
          key={index}
          className="slot clearfix  mt-2"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <div>
            <span className="float-start">
              <img
                src={`${constants.port}/media/${data.logo}`}
                style={{ width: "18px", height: "18px", objectFit: "cover" }}
              />
              <span className="mx-1">{data.name}</span>
            </span>
          </div>
          <div style={{ flexGrow: 1, textAlign: "right" }}>
            <input
              className="mx-3"
              id={data.id}
              onChange={(e) => handleAmenityChecked(e)}
              checked={amenityChecked.includes(data.id)}
              style={{ width: "15px", height: "15px" }}
              type="checkbox"
            />
          </div>
        </div>
      ))}

      {/* <div className="slot clearfix mt-3 ">
        <span className="float-start">
          <img src="/images/tournament/disability.png"></img>
          <span> Accessibility for disabled</span>
        </span>
        <div className="checkbox float-end">
          <input type="checkbox" id="checkbox_11" />
          <label for="checkbox_11"></label>
        </div>
      </div> */}
      <div className="bottoms">
        <h6 className=" mx-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Slots
        </h6>
        <div className="play clearfix">
          <div className="example">
            <label className="radio-button">
              <input
                type="radio"
                className="radio-button__input"
                id="choice1-1"
                name="choice1"
              />
              <span className="radio-button__control"></span>
              <span className="radio-button__label">Static Time</span>
            </label>
            <br></br>
            <label className="radio-button">
              <input
                type="radio"
                className="radio-button__input"
                id="choice1-2"
                name="choice1"
              />
              <span className="radio-button__control"></span>
              <span className="radio-button__label">Open time</span>
            </label>
          </div>
          <button
            onClick={() => setVisible(true)}
            type="button"
            className="open-btn"
          >
            Add
          </button>
        </div>

        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          centered
          footer={
            <Button
              type="submit"
              className="modals-btn "
              onClick={addSlotHandler}
            >
              Add
            </Button>
          }
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p>From</p>
              <TimePicker
                use12Hours
                format="h:mm A"
                value={start_time}
                onChange={setStartTime}
              />
            </div>
            <div>
              <p>To</p>
              <TimePicker
                use12Hours
                format="h:mm A"
                value={end_time}
                onChange={setEndTime}
              />
            </div>
          </div>
        </Modal>
        <div className="time-slot">
          {slots &&
            slots.map((item, index) => (
              <div
                key={index}
                className={`p-3 mx-auto d-flex justify-content-between  ${
                  index % 2 === 0 ? "times" : "times1"
                }`}
                style={{ width: "90%" }}
              >
                <span className="time-slot-name">
                  {/* {item.start_time.format("h:mm A")}-
                  {item.end_time.format("h:mm A")} */}
                  {moment(item.start_time, "h:mm").format("h:mm A")}-
                  {moment(item.end_time, "h:mm").format("h:mm A")}
                </span>
                <span
                  onClick={() => setSlots(slots.filter((s) => s !== item))}
                  className="time-delete"
                >
                  Delete
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="product-submit my-3">
        <button type="submit" className="play-sub-btn">
          Submit
        </button>
        <button type="button" className="play-cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PlayGroundsForm;
