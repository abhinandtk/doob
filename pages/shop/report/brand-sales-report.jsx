import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart as chartJS, ArcElement, Tooltip, Legend } from "chart.js";
chartJS.register(ArcElement, Tooltip, Legend);
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
  Button,
} from "react-bootstrap";
import React, { useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import ReportOrderCountTable from "@/components/shop/report/ReportOrderCountTable";
import { Doughnut } from "react-chartjs-2";

function BrandSaleReport() {
  const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const options = { 
    plugins: {
      legend: {
        labels:{
            boxWidth:50,
            boxHeight:50,
            color:'red',

        },
        position: 'bottom', // set the position of the legend to bottom
      },
    },
  };
  return (
    <div>
      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Brand Sales Report
              </h6>
              <div className="my-1 mx-4 ">
                <div className="update">
                  <Dropdown className="mx-1">
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-basic"
                      style={{
                        color: "black",
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                    >
                      Last 30 days <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item href="#">English</Dropdown.Item>
                      <Dropdown.Item href="#">Arabic</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <button type="button" className="export-btn">
                      Export
                    </button>
                  </span>
                </div>

                <br></br>
                <div style={{width:'400px',height:'400px'}}><center><Doughnut data={data} options={options}/></center></div>
                
                <ReportOrderCountTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSaleReport;
