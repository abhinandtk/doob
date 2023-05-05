import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Modal } from "antd";
import { useEffect } from "react";
function NewGameForm({ game, country }) {
  //   console.log('88888888',game.amenity)
  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState([]);
  console.log("res98", country);

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

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "date") {
      const date = new Date(e.target.value);
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      setFormData({ ...formData, [e.target.id]: formattedDate });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    // const newForm = { ...formData };
    // newForm[e.target.id] = e.target.value;
    // setFormData({ ...newForm });
  };
  const searchNewGameHandler = (e) => {
    console.log("ooooooooooooooo", formData);
    e.preventDefault();
  //   Axios.post(apis.listStadium, {
  //     headers: {
  //       Authorization: `Token ${constants.token_id}`,
  //     },
  //     params: {
  //       area: formData.area,
  //       sports_id: formData.sport,
  //       date: formData.date,
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };

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
          console.log("Successssssss",res);
        })
        .catch((error) => {
          console.error(error);
        });
    };

  return (
    <Fragment>
      <section>
        <div className="game_clearfix">
          <h5
            className="float-start"
            style={{ fontWeight: "700", fontSize: "19px" }}
          >
            Games
          </h5>
          <button
            onClick={() => setVisible(true)}
            type="button"
            className="newGame-btn float-end"
          >
            New Game
          </button>
        </div>
      </section>
      <Modal
        title="Create Game"
        open={visible}
        onCancel={() => setVisible(false)}
        maskClosable
        centered
        footer={null}
      >
        <form onSubmit={(e) => searchNewGameHandler(e)}>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Choose a sport</label>
            <select
              class="form-control "
              style={{ border: "0px", background: "#eeeeee", color: "#959595" }}
              id="sport"
              onChange={(e) => handleChange(e)}
            >
              <option style={{ color: "#959595" }} value="">
                {" "}
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
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Choose are</label>
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
          <Button type="submit" className="modals-btn ">
            Submit
          </Button>
        </form>
      </Modal>
      <br></br>
    </Fragment>
  );
}

export default NewGameForm;
