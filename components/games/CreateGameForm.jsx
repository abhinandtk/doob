import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";

function CreateGameForm() {


  const [formData, setFormData] = useState({
    title:'',
    image:'',
    textArea:'',
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

  return (
    <div>
      <form>
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
