import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import Axios from 'axios'
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
function CreateGameForm() {


  const [formData, setFormData] = useState({
    title:'',
    image:'',
    participants:'',
    description:'',
    visible:'',
    gender:'',
    ageFrom:'',
    ageTo:'',
    lastDay:''

  });
  const options = [];

  for (let i = 5; i <= 80; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const changeHandler=(e)=>{
    e.preventDefault()
    const newFormData ={...formData}
    if (e.target.id === "image") {
      newFormData[e.target.id] = e.target.files[0];
    } else {
      newFormData[e.target.id] = e.target.value;
    }
    setFormData({...newFormData})
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    Axios.post(apis.createGame,{
      booking_id:df,
      title:formData.title,
      description:formData.description,
      visible_to:formData.visible,
      gender:formData.gender,
      no_of_participants:formData.participants,
      game:formData.f,
      age_from:formData.ageFrom,
      age_to:formData.ageTo,
      last_date_of_joining:formData.lastDay,
      images:formData.
    },
    {
      'Authorization':`Token ${constants.port}`,
    })
  }

  return (
    <div>
      <form onSubmit={(e)=>submitHandler(e)}>
        <div class="form-group my-3">
          <label for="exampleInputPassword1">Title</label>
          <input
            type="text"
            class="form-control p-2"
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            id="title"
            onChange={(e)=>changeHandler(e)}
          />
        </div>
        <div className="form-group my-1">
          <label for="exampleFormControlInput1" id="formfile">
            Image
          </label>
          <input
            type="file"
            id="image"
            class="form-control p-2 grey"
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "grey",
            }}
            placeholder="No file choosen"
          />
        </div>
        <div class="form-group my-3">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            class="form-control"
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "grey",
            }}
            id="description"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group my-2">
          <label for="example ormControlSelect1">Visible to</label>
          <select
            class="form-control p-2 "
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            id="visible"
          >
            <option style={{ color: "#959595" }} value="1">
              Private
            </option>
            <option style={{ color: "#959595" }} value="2">
              Public
            </option>
            <option style={{ color: "#959595" }} value="3">
              Link shared
            </option>
          </select>
        </div>
        <div class="form-group my-3">
          <label for="exampleFormControlSelect1">Gender</label>
          <select
            class="form-control p-2 "
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            id="gender"
          >
            <option style={{ color: "#959595" }} value="">
              Not Specified
            </option>
            <option style={{ color: "#959595" }} value="1">
              Male
            </option>
            <option style={{ color: "#959595" }} value="2">
              Female
            </option>
          </select>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Age</label>
              <select
                class="form-control p-2 "
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "#959595",
                }}
                id="ageFrom"
              >
                <option style={{ color: "#959595" }} value="">
                  From
                </option>
                {options}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Age</label>
              <select
                class="form-control p-2 "
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "#959595",
                }}
                id="ageTo"
              >
                <option style={{ color: "#959595" }} value="">
                  To
                </option>
                {options}
              </select>
            </div>
          </div>
        </div>
        <div class="form-group my-3">
          <label for="exampleInputPassword1">Number of Participants</label>
          <input
            type="text"
            class="form-control p-2"
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            id="participants"
          />
        </div>
        <div class="form-group my-3">
          <label for="exampleInputPassword1">Last day of joining</label>
          <input
            type="text"
            class="form-control p-2"
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            id="lastDay"
          />
        </div>
        <button type="submit" className="make-btn">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateGameForm;
