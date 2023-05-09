// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Chart as chartJS, ArcElement, Tooltip, Legend ,Category } from "chart.js";
// chartJS.register(ArcElement, Tooltip, Legend,Category);
// import {
//   Container,
//   Nav,
//   Navbar,
//   Dropdown,
//   CardImg,
//   Card,
//   Button,
// } from "react-bootstrap";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import React, { useState } from "react";
// import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
// import { Line } from "react-chartjs-2";

// function store() {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const data = {
//     labels: ["Red", "Green", "Yellow"],
//     datasets: [
//       {
//         data: [300, 50, 100],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };
//   const options = { 
//     plugins: {
//       legend: {
//         labels:{
//             boxWidth:50,
//             boxHeight:50,
//             color:'red',

//         },
//         position: 'bottom', // set the position of the legend to bottom
//       },
//     },
//   };
//   return (
//     <div>
//       <div className="store-container">
//         <div className="bottom">
//           <ShopPagesSideBar />

//           <div class="content-topics ">
//             <div className="bottom">
//               <h6
//                 className=" ms-4"
//                 style={{ color: "#17a803", fontWeight: "700" }}
//               >
//                 Product Sales Report
//               </h6>
//               <div className="my-1 mx-4 ">
//                 <div className="update">
//                   <Dropdown className="mx-1">
//                     <Dropdown.Toggle
//                       variant=""
//                       id="dropdown-basic"
//                       style={{
//                         color: "black",
//                         borderColor: "transparent",
//                         background: "transparent",
//                       }}
//                     >
//                       Last 30 days <i className="bi bi-chevron-down "></i>
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu align="center" className="Menu">
//                       <Dropdown.Item href="#">English</Dropdown.Item>
//                       <Dropdown.Item href="#">Arabic</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                   <span>
//                     <button type="button" className="export-btn">
//                       Export
//                     </button>
//                   </span>
//                 </div>

//                 <Card className="reports">
//                   <div>
//                     <div className="total-order">
//                       <p className="text-center">Total Orders</p>
//                       <h1 className="text-center ">1200</h1>
//                     </div>
//                   </div>
//                 </Card>
//                 <Line data={data} options={options} />
//                 <br></br>
//                 <div className="customer-sale">
//                   <div className="p-3 d-flex justify-content-between  customer">
//                     <span className="sales-report-name">
//                       RED TAPE Runing Shoe Men RED TAPE Runing Shoetext
//                     </span>
//                     <span>4500.000 KD</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default store;
