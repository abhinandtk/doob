import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import moment from "moment";

function CreateGameForm() {
  const { t } = useTranslation();

  const router = useRouter();
  const { booking_id } = router.query;

  const labels = Labels();
  const { locale } = router;

  const [gameData, setGameData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    game: "",
    participants: "",
    description: "",
    visible: "",
    gender: "",
    ageFrom: "",
    ageTo: "",
    lastDay: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    Axios.get(apis.listGameAmenities, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setGameData(res.data.data.games);
    });
  }, []);
  const options = [];

  for (let i = 5; i <= 80; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const changeHandler = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    if (e.target.id === "image") {
      const formdata = new FormData();
      formdata.append("file_field_name", e.target.files[0]);
      Axios.post(apis.allImagesUpload, formdata, {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }).then((res) => {
        newFormData[e.target.id] = res.data.image_url;
        setFormData({ ...newFormData });
      });
    } else {
      newFormData[e.target.id] = e.target.value;
      setFormData({ ...newFormData });
    }
  };

  const submitHandler = (e) => {
    setIsDisabled(true);
    e.preventDefault();
    console.log("form", formData);
    const formdata = new FormData();
    formdata.append("booking_id", booking_id);
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("visible_to", formData.visible);
    formdata.append("gender", formData.gender);
    formdata.append("no_of_participants", formData.participants);
    formdata.append("age_from", formData.ageFrom);
    formdata.append("age_to", formData.ageTo);
    formdata.append("last_date_of_joining", formData.lastDay);
    formdata.append("game", formData.game);
    formdata.append("images", formData.image);
    Axios.post(apis.createGame, formdata, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Game created"]}`,
        });
        setFormData({
          title: "",
          image: "",
          game: "",
          participants: "",
          description: "",
          visible: "",
          gender: "",
          ageFrom: "",
          ageTo: "",
          lastDay: "",
        });
        router.push("/play-ground");
      } else {
        setIsDisabled(false);
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }

      console.log("add game", res, formdata);
    });
  };

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group my-3">
          <label for="exampleInputPassword1">{t("Title")}*</label>
          <input
            required
            type="text"
            className="form-control input-theme-prod p-2"
            style={{
              border: "0px",

              color: "#959595",
            }}
            id="title"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group my-1">
          <label for="exampleFormControlInput1">{t("Image")}*</label>
          <input
            required
            type="file"
            id="image"
            className="form-control input-theme-prod p-2 "
            style={{
              border: "0px",

              color: "grey",
            }}
            placeholder="No file choosen"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group my-2">
          <label for="example ormControlSelect1">{t("Game")}*</label>
          <select
            required
            className="form-control input-theme-prod p-2 "
            style={{
              border: "0px",

              color: "#959595",
            }}
            id="game"
            onChange={(e) => changeHandler(e)}
          >
            <option style={{ color: "#959595" }} value="">
              {t("--Select--")}
            </option>
            {gameData.map((item, index) => (
              <option key={index} style={{ color: "#959595" }} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-3">
          <label for="exampleFormControlTextarea1">{t("Description")}*</label>
          <textarea
            required
            className="form-control input-theme-prod"
            style={{
              border: "0px",

              color: "grey",
            }}
            id="description"
            rows="3"
            onChange={(e) => changeHandler(e)}
          ></textarea>
        </div>
        <div className="form-group my-2">
          <label for="example ormControlSelect1">{t("Visible to")}*</label>
          <select
            required
            className="form-control input-theme-prod p-2 "
            style={{
              border: "0px",

              color: "#959595",
            }}
            id="visible"
            onChange={(e) => changeHandler(e)}
          >
            <option style={{ color: "#959595" }} value="">
              {t("--Select--")}
            </option>
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
        <div className="form-group my-3">
          <label for="exampleFormControlSelect1">{t("Gender")}*</label>
          <select
            required
            className="form-control input-theme-prod p-2 "
            style={{
              border: "0px",

              color: "#959595",
            }}
            id="gender"
            onChange={(e) => changeHandler(e)}
          >
            <option style={{ color: "#959595" }} value="">
              {t("Not Specified")}
            </option>
            <option style={{ color: "#959595" }} value="1">
              {t("Male")}
            </option>
            <option style={{ color: "#959595" }} value="2">
              {t("Female")}
            </option>
          </select>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">{t("Age")}*</label>
              <select
                required
                className="form-control input-theme-prod p-2 "
                style={{
                  border: "0px",

                  color: "#959595",
                }}
                id="ageFrom"
                onChange={(e) => changeHandler(e)}
              >
                <option style={{ color: "#959595" }} value="">
                  {t("From")}
                </option>
                {options}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">{"Age"}*</label>
              <select
                required
                className="form-control input-theme-prod p-2 "
                style={{
                  border: "0px",

                  color: "#959595",
                }}
                id="ageTo"
                onChange={(e) => changeHandler(e)}
              >
                <option style={{ color: "#959595" }} value="">
                  {t("To")}
                </option>
                {options}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group my-3">
          <label for="exampleInputPassword1">
            {t("Number of Participants")}*
          </label>
          <input
            required
            type="text"
            className="form-control input-theme-prod p-2"
            style={{
              border: "0px",

              color: "#959595",
            }}
            id="participants"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group my-3">
          <label for="exampleInputPassword1">{t("Last day of joining")}*</label>
          <input
            required
            type="date"
            className="form-control input-theme-prod p-2"
            style={{
              border: "0px",

              color: "#959595",
            }}
            min={moment().format("YYYY-MM-DD")}
            id="lastDay"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <button type="submit" className="make-btn" disabled={isDisabled}>
          {t("Create")}
        </button>
      </form>
    </div>
  );
}

export default CreateGameForm;
