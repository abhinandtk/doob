import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";

function RankingTable({ data }) {
  console.log("rrrrrrrrreeeeeeeeeeeee", data);

  const router = useRouter();
  return (
    <Fragment>
      {data && (
        <div className="tables">
          <ul className="responsive-table">
            {data.map((item, index) =>
              index === 0 ? (
                <li
                  onClick={() =>
                    router.push(`/tournament/player/${item.username}`)
                  }
                  key={index}
                  className="table-row p-3"
                  style={{ cursor: "pointer" }}
                >
                  <div className="col col-1 mt-4  id " data-label="Job Id">
                    #{index + 1}
                  </div>

                  <span className="ahmed">
                    <img
                      src={
                        item.image
                          ? `${constants.port}${item.image}`
                          : "/images/accounts/user_default.png"
                      }
                      className="tour_rank_img"
                    ></img>
                  </span>

                  <span
                    className="col col-8 name mt-3"
                    data-label="Customer Name"
                  >
                    {item.name}
                  </span>
                  <div
                    className="col col-1 mt-3 views "
                    data-label="Payment Status"
                  >
                    View
                  </div>
                </li>
              ) : (
                <li
                  key={index}
                  className="table-row1"
                  onClick={() =>
                    router.push(`/tournament/player/${item.username}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="col col-1 mt-3  id " data-label="Job Id">
                    #{index + 1}
                  </div>
                  <Link
                    href={`/tournament/player/${item.username}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span className="ahmed1">
                      <img
                        className="tour_rank_img1"
                        src={
                          item.image
                            ? `${constants.port}${item.image}`
                            : "/images/accounts/user_default.png"
                        }
                      ></img>
                    </span>
                  </Link>

                  <span
                    className="col col-8 name1 mt-3"
                    data-label="Customer Name"
                  >
                    {item.name}
                  </span>

                  <div
                    className="col col-1 mt-3 views1 "
                    data-label="Payment Status"
                  >
                    View
                  </div>
                </li>
              )
            )}
            {/* <li className="table-row1">
              <div className="col col-1 mt-3  id " data-label="Job Id">
                #2
              </div>
              <span className="ahmed1">
                <img src="../images/tournament/Masid .png"></img>
              </span>
              <span className="col col-8 name1 mt-3" data-label="Customer Name">
                Musaid
              </span>
              <div
                className="col col-1 mt-4 views "
                data-label="Payment Status"
              >
                View
              </div>
            </li>

            <li className="table-row1">
              <div className="col col-1 mt-3 id " data-label="Job Id">
                #130
              </div> 
              <span className="ahmed2">
                <img src="../images/tournament/Masid .png"></img>
              </span>
              <span className="col col-8 name2 mt-3" data-label="Customer Name">
                Me
              </span>
              <div
                className="col col-1 mt-4 views "
                data-label="Payment Status"
              >
                View
              </div>
            </li> */}
            <br></br>
          </ul>
        </div>
      )}
    </Fragment>
  );
}

export default RankingTable;
