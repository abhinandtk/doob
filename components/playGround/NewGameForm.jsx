import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Modal } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
import Login from "../user/Login";

function NewGameForm({ game, country }) {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;
  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState([]);
  console.log("res98", country);
  const [showLogin, setShowLogin] = useState(false);

  const isAuthenticated = constants.token_id;

  useEffect(() => {
    if (router.query.path === "headerNav") {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (country.length > 0) {
      const userCountry = localStorage.getItem("country-select");
      console.log("res988", userCountry);
      const areaData = country.find(
        (country) => country.country_name === userCountry
      );
      console.log("kkkkkk", areaData);
      setArea(areaData.regions);
    }
  }, [country]);

  const [formData, setFormData] = useState({
    sport: "",
    date: "",
    area: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    // setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id === "date") {
      const date = new Date(e.target.value);
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      setFormData({ ...formData, [e.target.id]: formattedDate });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const searchNewGameHandler = (e) => {
    e.preventDefault();
    console.log("ddddddddddddddaaaate", formData);
    Axios.post(
      apis.listStadium,
      {
        sports_id: formData.sport,
        area: formData.area,
        date: formData.date,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    )
      .then((res) => {
        router.push({
          pathname: "/play-ground/stadium-list",
          query: {
            sports_id: formData.sport,
            area: formData.area,
            date: formData.date,
          },
        });
        console.log("Successssssss", res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createGameShowHandler = () => {
    if (isAuthenticated) {
      setVisible(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <Fragment>
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <section>
        <div className="game_clearfix">
          <h5
            className={`${
              locale === "en" ? "float-start" : "float-end"
            } "dark-theme-color"`}
            style={{ fontWeight: "700", fontSize: "19px" }}
          >
            {t("Games")}
          </h5>
          <button
            onClick={() => createGameShowHandler()}
            type="button"
            className={`newGame-btn ${
              locale === "en" ? "float-end" : "float-start"
            }`}
          >
            {t("Create New Game")}
          </button>
        </div>
      </section>

      <Modal
        title={t("Create Game")}
        open={visible}
        onCancel={() => setVisible(false)}
        maskClosable
        centered
        footer={
          <Button
            onClick={(e) => searchNewGameHandler(e)}
            type="submit"
            className="modals-btn "
          >
            {t("Submit")}
          </Button>
        }
      >
        <form>
          <div class="form-group">
            <label for="exampleFormControlSelect1">{t("Choose a sport")}</label>
            <select
              class="form-control "
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="sport"
              onChange={(e) => handleChange(e)}
            >
              <option style={{ color: "#959595" }} value="">
                {t("--Select--")}
              </option>
              {game.map((item, index) => (
                <option
                  style={{ color: "#959595" }}
                  key={index}
                  value={item.id}
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group my-3">
            <label for="exampleInputPassword1">{t("Select s Date")}</label>
            <input
              type="date"
              class="form-control play"
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="date"
              placeholder="Date"
              min={moment().format("YYYY-MM-DD")}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">{t("Choose area")}</label>
            <select
              class="form-control "
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="area"
              onChange={(e) => handleChange(e)}
            >
              <option style={{ color: "#959595" }} value="">
                --Select--
              </option>
              {area.map((item, index) => (
                <option
                  style={{ color: "#959595" }}
                  key={index}
                  value={item.id}
                >
                  {item.region_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
      <br></br>
    </Fragment>
  );
}

export default NewGameForm;
