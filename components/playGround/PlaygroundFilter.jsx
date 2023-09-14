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

function PlaygroundFilter({ playgroundFilterHandler, setMapShow, pageCount }) {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;
  const data = router.query;
  console.log("44444", data);

  const [visible, setVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [area, setArea] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [game, setGame] = useState([]);
  const [country, setCountry] = useState([]);
  const [amenityChecked, setAmenityChecked] = useState([]);
  const [formData, setFormData] = useState({
    sport: data.sports_id,
    date: data.date,
    area: data.area,
  });
  useEffect(() => {
    if (data.sports_id && data.date && data.area) {
      setFormData({
        sport: data.sports_id,
        date: data.date,
        area: data.area,
      });
    }
  }, [data]);
  useEffect(() => {
    Axios.get(apis.listGameAmenities, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setAmenity(res.data.data.amenities);
      setGame(res.data.data.games);
      console.log("ggggggggg", res.data.data);
    });

    Axios.get(apis.commonList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCountry(res.data.data.country);
      console.log("gggggggggfffffffffff", res);
    });
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
  const handleAmenityChecked = (e) => {
    const id = parseInt(e.target.id);
    setAmenityChecked((prevState) => {
      if (e.target.checked) {
        return [...prevState, parseInt(id)];
      } else {
        return prevState.filter((gameId) => gameId !== id);
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

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
  const changeSearchHandler = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };
  useEffect(() => {
    if (data.sports_id && data.date && data.area) {
      playgroundFilterHandler(formData, amenityChecked, searchKey);
    }
  }, [formData, searchKey, pageCount]);

  const submitSearchHandler = () => {
    playgroundFilterHandler(formData, amenityChecked, searchKey);
    setVisible(false);
  };

  return (
    <Fragment>
      <form className="nosubmit" onSubmit={() => submitSearchHandler()}>
        <span>
          <input
            className="tour"
            id="search"
            type="search"
            value={searchKey}
            placeholder={t("Search")}
            onChange={(e) => changeSearchHandler(e)}
          />
          <span onClick={() => setMapShow((prev) => !prev)}>
            <img
              src="/images/tournament/location-icon.png"
              className="location-icon"
            ></img>
          </span>
          <span onClick={() => setVisible(true)}>
            <img
              src="/images/tournament/Fil-icon.png"
              className="tour-icon"
            ></img>
          </span>
        </span>
      </form>

      <Modal
        title={t("Create Game")}
        open={visible}
        onCancel={() => setVisible(false)}
        maskClosable
        centered
        footer={
          <Button
            onClick={() => submitSearchHandler()}
            type="submit"
            className="modals-btn "
          >
            {t("Submit")}
          </Button>
        }
      >
        <form>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Choose a sport</label>
            <select
              class="form-control "
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="sport"
              onChange={(e) => handleChange(e)}
              value={formData.sport}
            >
              <option style={{ color: "#959595" }} value="">
                --Select--
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
            <label for="exampleInputPassword1">Select s Date</label>
            <input
              type="date"
              class="form-control play"
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="date"
              placeholder="Date"
              onChange={(e) => handleChange(e)}
              min={moment().format("YYYY-MM-DD")}
              defaultValue={moment(formData.date).format("YYYY-MM-DD")}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Choose area</label>
            <select
              class="form-control "
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="area"
              onChange={(e) => handleChange(e)}
              value={formData.area}
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

          <div>
            <h6 style={{ fontSize: "15px", fontWeight: "700" }}>Choose File</h6>
            {amenity.map((item, index) => (
              <div
                key={index}
                className="slot clearfix  mt-2"
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                <div>
                  <span className="float-start">
                    <img
                      src={`${constants.port}${item.logo}`}
                      style={{
                        width: "18px",
                        height: "18px",
                        objectFit: "cover",
                      }}
                    />
                    <span className="mx-1">{item.name}</span>
                  </span>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: locale === "en" ? "right" : "left",
                  }}
                >
                  <input
                    className="mx-3"
                    id={item.id}
                    onChange={(e) => handleAmenityChecked(e)}
                    checked={amenityChecked.includes(item.id)}
                    style={{ width: "15px", height: "15px" }}
                    type="checkbox"
                  />
                </div>
              </div>
            ))}

            <div></div>
          </div>
        </form>
      </Modal>
      <br></br>
    </Fragment>
  );
}

export default PlaygroundFilter;
