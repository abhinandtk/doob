import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";

function TeamsCard({ teamsData }) {
  console.log("teamData", teamsData);
  return (
    <Fragment>
      {teamsData &&
        teamsData.map((item, index) => (
          <div
            className="rounded border-0 d-flex p-1   my-3"
            style={{ background: "#eeeeee", width: "590px" }}
          >
            <p
              className=" mb-1 mx-3"
              style={{ fontWeight: "500", fontSize: "14px" }}
            >
              <img
                src={`${constants.port}/media/${item.team_logo}`}
                className="club1"
              ></img>{" "}
              {item.team_name}
            </p>
            <div className="ms-auto">
              <svg
                width="2"
                height="14"
                className="mx-4"
                viewBox="0 0 2 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.416016 0.958333C0.416016 0.429061 0.752798 0 1.16824 0C1.58368 0 1.92046 0.429061 1.92046 0.958333C1.92046 1.48761 1.58368 1.91667 1.16824 1.91667C0.752798 1.91667 0.416016 1.48761 0.416016 0.958333Z"
                  fill="black"
                />
                <path
                  d="M0.416016 6.70833C0.416016 6.17906 0.752798 5.75 1.16824 5.75C1.58368 5.75 1.92046 6.17906 1.92046 6.70833C1.92046 7.23761 1.58368 7.66667 1.16824 7.66667C0.752798 7.66667 0.416016 7.23761 0.416016 6.70833Z"
                  fill="black"
                />
                <path
                  d="M0.416016 12.4583C0.416016 11.9291 0.752798 11.5 1.16824 11.5C1.58368 11.5 1.92046 11.9291 1.92046 12.4583C1.92046 12.9876 1.58368 13.4167 1.16824 13.4167C0.752798 13.4167 0.416016 12.9876 0.416016 12.4583Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        ))}

      <button type="button" className="teams-btn">
        Add
      </button>
    </Fragment>
  );
}

export default TeamsCard;
