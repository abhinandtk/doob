import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Nav, Navbar, Dropdown, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import Axios from "axios";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
function FeedbackPage() {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    description: "",
  });
  const changeHandler = (e) => {
    e.preventDefault();
    const newForm = { ...formData };
    newForm[e.target.id] = e.target.value;
    setFormData({ ...newForm });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData)
    Axios.post(
      apis.feedback,
      {
        title: formData.title,
        description: formData.description,
        email: formData.email,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log(res);
      notification.success({
        message: "Success",
        description: "Feedback Submitted SuccessFully",
      });
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />

      <div className="side-container">
        <div className="side">
          <a href="#home">
            <svg
              width="25"
              height="21"
              viewBox="0 0 25 21"
              fill="none"
              className="svg "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4466 0.774414H9.66795C5.58184 0.774414 3.53878 0.774414 2.26939 2.00196C1 3.2295 1 5.2052 1 9.15655V11.9507C1 15.902 1 17.8778 2.26939 19.1053C3.53878 20.3329 5.58184 20.3329 9.66795 20.3329H15.4466C19.5327 20.3329 21.5758 20.3329 22.8452 19.1053C24.1145 17.8778 24.1145 15.902 24.1145 11.9507V9.15655C24.1145 5.2052 24.1145 3.2295 22.8452 2.00196C21.5758 0.774414 19.5327 0.774414 15.4466 0.774414Z"
                stroke="black"
                stroke-width="1.3039"
              />
              <path
                d="M6.33398 6.11035H9.89007"
                stroke="black"
                stroke-width="1.3039"
                stroke-linecap="round"
              />
              <path
                d="M21.7434 16.7765H19.3727C18.2551 16.7765 17.6963 16.7765 17.3491 16.3859C17.002 15.9953 17.002 15.3667 17.002 14.1094C17.002 12.8522 17.002 12.2236 17.3491 11.833C17.6963 11.4424 18.2551 11.4424 19.3727 11.4424H21.7434C22.861 11.4424 23.4197 11.4424 23.7669 11.833C24.1141 12.2236 24.1141 12.8522 24.1141 14.1094C24.1141 15.3667 24.1141 15.9953 23.7669 16.3859C23.4197 16.7765 22.861 16.7765 21.7434 16.7765Z"
                stroke="black"
                stroke-width="1.3039"
              />
            </svg>{" "}
            <span className="mx-2">Wallet</span>
          </a>
          <a href="#services">
            <svg
              width="25"
              height="22"
              className="svg"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4283 19.7321H16.9417C16.8028 19.8749 16.6178 19.9522 16.4283 19.9522H3.58687C3.39735 19.9522 3.21234 19.8749 3.07346 19.7321H3.58687H7.4393H7.98964V19.1818V14.4488H8.17309V19.1818V19.7321H8.72344H16.4283ZM17.1621 19.1818C17.1621 19.3718 17.0953 19.5523 16.9786 19.6912V19.1818V14.4488H17.1621V19.1818ZM2.85308 19.1818V14.4488H3.03653V19.1818V19.6912C2.91986 19.5523 2.85308 19.3718 2.85308 19.1818Z"
                stroke="#080707"
                stroke-width="1.10069"
              />
              <path
                d="M19.2826 7.34042C19.2826 7.34041 19.2826 7.3404 19.2825 7.34039L16.7567 1.77377L16.7562 1.7726C16.693 1.63246 16.599 1.52206 16.4911 1.44832C16.3839 1.37507 16.2657 1.33951 16.1495 1.33941H3.86609C3.74986 1.33951 3.6317 1.37507 3.52451 1.44832C3.4166 1.52206 3.32257 1.63246 3.25937 1.7726L3.25885 1.77377L0.733029 7.34039C0.732995 7.34046 0.732962 7.34054 0.732928 7.34061C0.67985 7.45805 0.651432 7.5901 0.651914 7.72566L0.651921 7.72761L0.651918 9.82897V9.82994C0.651559 10.0317 0.714941 10.2211 0.822476 10.3665C1.04633 10.6475 1.31892 10.8687 1.61971 11.0185C1.9223 11.1692 2.24805 11.2451 2.57542 11.2435L2.57907 11.2435C3.11341 11.2444 3.63961 11.0413 4.06659 10.6555L4.43565 10.3221L4.80461 10.6556C5.2318 11.0418 5.75818 11.2456 6.29296 11.2456C6.82773 11.2456 7.35411 11.0418 7.78131 10.6556L8.15037 10.322L8.51944 10.6556C8.94663 11.0418 9.47301 11.2456 10.0078 11.2456C10.5426 11.2456 11.0689 11.0418 11.4961 10.6556L11.8652 10.322L12.2343 10.6556C12.6615 11.0418 13.1878 11.2456 13.7226 11.2456C14.2574 11.2456 14.7838 11.0418 15.211 10.6556L15.5802 10.3218L15.9493 10.6558C16.4256 11.0867 17.0239 11.2891 17.6184 11.2369C18.2113 11.1849 18.7764 10.8815 19.1894 10.3701M19.1894 10.3701C19.1881 10.3717 19.1869 10.3733 19.1857 10.375L19.623 10.7091L19.1939 10.3645C19.1924 10.3664 19.1909 10.3682 19.1894 10.3701ZM19.914 9.83579V7.72761C19.9148 7.51456 19.8702 7.30427 19.784 7.11358L19.914 9.83579Z"
                stroke="#080707"
                stroke-width="1.10069"
              />
            </svg>
            <span className="mx-2">Favourite Store</span>{" "}
          </a>
          <a href="#clients">
            <svg
              width="25"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3278 20.0134C11.2241 20.0118 11.1225 19.9837 11.0327 19.9318C10.9207 19.8808 8.39705 18.4429 5.83264 16.1382C2.32185 12.9666 0.541017 9.81545 0.541017 6.75606C0.540094 5.49027 0.944398 4.25757 1.6945 3.23915C2.4446 2.22074 3.50093 1.47033 4.70821 1.09824C5.91549 0.726152 7.21005 0.752003 8.40158 1.172C9.59311 1.59199 10.6188 2.38397 11.3278 3.43152C12.0368 2.38397 13.0625 1.59199 14.254 1.172C15.4455 0.752003 16.7401 0.726152 17.9474 1.09824C19.1547 1.47033 20.211 2.22074 20.9611 3.23915C21.7112 4.25757 22.1155 5.49027 22.1146 6.75606C22.1146 9.81545 20.3337 12.9666 16.8229 16.1382C14.2585 18.4429 11.7348 19.8808 11.6229 19.9318C11.533 19.9837 11.4315 20.0118 11.3278 20.0134ZM6.44322 2.06499C5.20172 2.06499 4.01108 2.55923 3.13321 3.43897C2.25534 4.31872 1.76216 5.51191 1.76216 6.75606C1.76216 12.5995 9.67925 17.6985 11.3278 18.6877C12.9763 17.6985 20.8934 12.5995 20.8934 6.75606C20.8958 5.66984 20.5219 4.61646 19.8357 3.77569C19.1494 2.93491 18.1933 2.35886 17.1304 2.14584C16.0676 1.93281 14.9639 2.09602 14.0077 2.6076C13.0516 3.11919 12.3022 3.94744 11.8875 4.95102C11.8437 5.06409 11.7668 5.16125 11.6669 5.22976C11.567 5.29827 11.4488 5.33493 11.3278 5.33493C11.2068 5.33493 11.0886 5.29827 10.9887 5.22976C10.8888 5.16125 10.8119 5.06409 10.7681 4.95102C10.4123 4.09565 9.81163 3.36507 9.04192 2.85144C8.27222 2.33781 7.36795 2.06415 6.44322 2.06499Z"
                fill="black"
              />
            </svg>
            <span className="mx-2">Favourite Products</span>
          </a>
          <a href="#contact">
            <svg
              width="22"
              height="21"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1654 2.98868V3.10854H19.2853H19.8156C21.0185 3.10988 21.9934 4.08484 21.9947 5.28779V19.4337C21.9941 20.6366 21.0185 21.6122 19.8157 21.6129H2.83997C1.63712 21.6115 0.66221 20.6366 0.660869 19.4336L0.660869 5.28772C0.662245 4.0848 1.63714 3.10988 2.83997 3.10854H3.37033H3.49019V2.98868V1.0434C3.49019 0.621496 3.83264 0.279033 4.2545 0.279033C4.67635 0.279033 5.01881 0.621496 5.01881 1.0434V2.98868V3.10854H5.13866H17.5169H17.6368V2.98868V1.0434C17.6368 0.621496 17.9792 0.279033 18.4011 0.279033C18.823 0.279033 19.1654 0.621496 19.1654 1.0434V2.98868ZM2.83984 4.63727L2.83955 4.63727C2.48074 4.63814 2.19035 4.92855 2.18949 5.28737V5.28766V7.23294V7.35279H2.30934H20.3463H20.4661V7.23294V5.28766C20.4661 4.92862 20.1748 4.63727 19.8158 4.63727L2.83984 4.63727ZM2.30934 8.88153H2.18949V9.00138V19.4338C2.18949 19.7928 2.4808 20.0842 2.83984 20.0842H19.8158C20.1748 20.0842 20.4661 19.7928 20.4661 19.4338V9.00138V8.88153H20.3463H2.30934Z"
                fill="black"
                stroke="black"
                stroke-width="0.239706"
              />
            </svg>{" "}
            <span className="mx-1">Booking</span>{" "}
          </a>
          <a href="#home">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.8769 5.84048H16.1802C16.1802 4.3306 15.6119 2.88256 14.6005 1.81491C13.589 0.74726 12.2172 0.147461 10.7868 0.147461C9.35636 0.147461 7.98453 0.74726 6.97308 1.81491C5.96162 2.88256 5.39339 4.3306 5.39339 5.84048H2.69669C1.98149 5.84048 1.29557 6.14038 0.789844 6.67421C0.284115 7.20803 0 7.93205 0 8.68699L0 18.1754C0.00142732 19.4331 0.475411 20.639 1.31798 21.5283C2.16055 22.4177 3.30292 22.918 4.49449 22.9196H17.0791C18.2706 22.918 19.413 22.4177 20.2556 21.5283C21.0981 20.639 21.5721 19.4331 21.5736 18.1754V8.68699C21.5736 7.93205 21.2894 7.20803 20.7837 6.67421C20.278 6.14038 19.5921 5.84048 18.8769 5.84048ZM10.7868 2.04514C11.7404 2.04514 12.6549 2.445 13.3292 3.15677C14.0036 3.86853 14.3824 4.83389 14.3824 5.84048H7.19119C7.19119 4.83389 7.57001 3.86853 8.24431 3.15677C8.91862 2.445 9.83317 2.04514 10.7868 2.04514V2.04514ZM19.7758 18.1754C19.7758 18.9303 19.4916 19.6543 18.9859 20.1882C18.4802 20.722 17.7943 21.0219 17.0791 21.0219H4.49449C3.77928 21.0219 3.09337 20.722 2.58764 20.1882C2.08191 19.6543 1.7978 18.9303 1.7978 18.1754V8.68699C1.7978 8.43535 1.8925 8.19401 2.06108 8.01607C2.22965 7.83812 2.45829 7.73816 2.69669 7.73816H5.39339V9.63583C5.39339 9.88748 5.4881 10.1288 5.65667 10.3068C5.82525 10.4847 6.05389 10.5847 6.29229 10.5847C6.53069 10.5847 6.75933 10.4847 6.92791 10.3068C7.09648 10.1288 7.19119 9.88748 7.19119 9.63583V7.73816H14.3824V9.63583C14.3824 9.88748 14.4771 10.1288 14.6457 10.3068C14.8142 10.4847 15.0429 10.5847 15.2813 10.5847C15.5197 10.5847 15.7483 10.4847 15.9169 10.3068C16.0855 10.1288 16.1802 9.88748 16.1802 9.63583V7.73816H18.8769C19.1153 7.73816 19.3439 7.83812 19.5125 8.01607C19.6811 8.19401 19.7758 8.43535 19.7758 8.68699V18.1754Z"
                fill="black"
              />
            </svg>
            <span className="mx-2">My Orders</span>
          </a>
          <a href="#services">
            <svg
              width="22"
              height="22"
              viewBox="0 0 21 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.614 21.1883C16.4962 21.8806 15.907 22.358 15.2236 22.358H4.24188V24.2678H15.2236C16.8261 24.2678 18.1929 23.0981 18.4757 21.5225L19.9839 12.9284C20.1489 11.9496 19.8897 10.9469 19.277 10.2069C18.6407 9.44298 17.7216 9.01327 16.7554 9.01327H13.0084C13.2912 8.12998 13.6683 6.84087 13.9746 5.14591L14.116 4.14327C14.3281 2.56768 13.2441 1.13532 11.7123 0.920469C10.9582 0.824978 10.2276 1.01596 9.61492 1.46954C9.0022 1.92312 8.62515 2.61542 8.50732 3.35547L8.36592 4.31037C8.34235 4.42974 8.31879 4.5491 8.31879 4.66846C8.29522 4.78783 8.27166 4.90719 8.24809 5.02655C7.51755 8.51195 4.78389 11.3289 1.249 12.2361L0 12.5464V24.2678H1.88528V14.0265C6.00932 12.9045 9.23786 9.56234 10.1098 5.43238C10.1334 5.28915 10.1569 5.14591 10.2041 5.00268C10.2276 4.85944 10.2512 4.71621 10.2748 4.57297L10.4162 3.61807C10.4397 3.35547 10.5811 3.14062 10.7932 2.99738C11.0053 2.85415 11.241 2.78253 11.5002 2.8064C12.0186 2.87802 12.3721 3.35547 12.3014 3.88067L12.1836 4.8117C11.6887 7.58092 11.0053 9.18038 10.8875 9.49072L10.8168 9.6817V10.9231H16.8261C17.2503 10.9231 17.6509 11.1141 17.9101 11.4244C18.1694 11.7586 18.2872 12.1883 18.2165 12.5942L16.614 21.1883Z"
                fill="black"
              />
            </svg>
            <span className="mx-2"> FeedBack</span>
          </a>
          <a href="#clients">
            <svg
              width="23"
              height="25"
              viewBox="0 0 23 25"
              className="svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.2186 0.175782H10.7269C9.88679 0.175782 9.08129 0.503771 8.48866 1.08719C7.96338 1.6043 7.64207 2.28608 7.58011 3.01156L7.56983 3.24588C7.55838 4.00889 6.94197 4.60414 6.18537 4.60407C6.01379 4.60228 5.83558 4.56312 5.67153 4.48935L5.5106 4.4053C4.02399 3.57002 2.09112 4.08165 1.21893 5.56476L0.434696 6.82731C-0.399201 8.24475 0.0120873 10.0254 1.3582 10.9426L1.54541 11.0603C2.00682 11.3222 2.27058 11.7698 2.27058 12.2542C2.27058 12.6997 2.04719 13.1162 1.67462 13.3688L1.54743 13.4469C0.152809 14.2365 -0.396688 15.9794 0.304335 17.4291L0.40679 17.6221L1.17659 18.9244C1.57671 19.6321 2.26236 20.1652 3.07329 20.391C3.79206 20.5911 4.55912 20.5358 5.23916 20.2361L5.45419 20.1309C5.81611 19.9259 6.19 19.8768 6.54092 19.9688C6.89184 20.0608 7.19071 20.2863 7.3711 20.5952C7.47055 20.7596 7.52893 20.9292 7.54977 21.1048L7.56003 21.2832C7.55825 22.9427 8.97691 24.3326 10.7269 24.3326H12.219C13.8714 24.3326 15.2429 23.0889 15.377 21.4838L15.3868 21.2765C15.3859 20.8756 15.5307 20.5308 15.7898 20.2769C16.0489 20.0231 16.4008 19.8812 16.7672 19.883C16.9357 19.8876 17.1207 19.9289 17.2922 20.004L17.4566 20.087C18.8436 20.8714 20.6611 20.4685 21.5972 19.1496L21.7173 18.9662L22.5141 17.6658C22.943 16.9446 23.0591 16.0972 22.8426 15.3016C22.6506 14.5964 22.2106 13.9811 21.6015 13.5636L21.3998 13.437C21.0493 13.2385 20.8183 12.9436 20.7241 12.5977C20.63 12.2517 20.6805 11.8833 20.8644 11.5739C20.9663 11.3997 21.1018 11.2548 21.2642 11.1438L21.575 10.9525C22.8334 10.1154 23.3047 8.46784 22.6423 7.08273L22.5736 6.94784C22.5588 6.91266 22.5416 6.87836 22.522 6.84517L21.7814 5.58604C20.9574 4.18483 19.1756 3.64105 17.69 4.32532L17.4921 4.42544C17.1371 4.62894 16.7623 4.68039 16.4093 4.59061C16.0564 4.50083 15.7545 4.27721 15.57 3.96906C15.4754 3.81279 15.417 3.64325 15.3962 3.46757L15.3859 3.28918C15.4119 2.53069 15.0889 1.71796 14.492 1.11634C13.8951 0.514719 13.075 0.175436 12.2186 0.175782ZM10.7269 1.92566H12.219C12.5934 1.92551 12.9515 2.07369 13.2122 2.33644C13.4729 2.59918 13.6139 2.95413 13.6032 3.32041L13.6191 3.62486C13.673 4.09024 13.8125 4.4951 14.0328 4.85881C14.4546 5.56357 15.1491 6.07789 15.9608 6.28437C16.7724 6.49085 17.6346 6.37253 18.3571 5.95552L18.4817 5.89332L18.6158 5.84071C19.2057 5.64677 19.9009 5.89223 20.235 6.46032L20.9413 7.66233L20.9566 7.69619L21.042 7.85749C21.3278 8.45682 21.089 9.21494 20.4705 9.56936L20.2764 9.68916C19.8646 9.96939 19.5488 10.3074 19.319 10.7005C18.8991 11.4064 18.783 12.2538 18.9996 13.0495C19.1965 13.7728 19.6535 14.3991 20.2823 14.8155L20.6112 15.0192C20.8432 15.1792 21.0345 15.4468 21.118 15.7534C21.2122 16.0993 21.1617 16.4678 20.9777 16.7771L20.1994 18.0479L20.1119 18.182C19.7517 18.6882 19.0412 18.8762 18.4422 18.6185L18.0605 18.4276C17.6349 18.2399 17.2185 18.147 16.7954 18.1359C15.933 18.1316 15.1236 18.4579 14.5277 19.0417C13.9318 19.6256 13.5988 20.4186 13.6029 21.2443L13.596 21.376C13.5397 22.0418 12.9404 22.5852 12.219 22.5852H10.7269C10.0135 22.5852 9.42627 22.0564 9.35114 21.3771L9.32679 20.95C9.27282 20.4847 9.1334 20.0798 8.91308 19.7161C8.50351 19.0144 7.81302 18.4934 7.00227 18.2808C6.19152 18.0683 5.3277 18.1818 4.60281 18.5962L4.47149 18.6592C4.21012 18.7734 3.87509 18.7976 3.56119 18.7102C3.20703 18.6116 2.90758 18.3788 2.72911 18.0632L1.96908 16.7787L1.90109 16.65C1.61319 16.0529 1.85223 15.2947 2.47168 14.9436L2.65986 14.8277C3.54392 14.2291 4.05534 13.2755 4.05534 12.2554C4.05534 11.2203 3.52923 10.2585 2.66199 9.68395L2.34709 9.48857C1.79067 9.1086 1.61094 8.33048 1.9703 7.71946L2.75453 6.45689C3.14628 5.79125 3.99043 5.5678 4.65245 5.93946L4.8848 6.05952C5.31876 6.256 5.74431 6.34951 6.17598 6.3539C7.85056 6.35411 9.21989 5.09399 9.34485 3.48832L9.36108 3.12006C9.38559 2.84322 9.52531 2.54676 9.75369 2.32193C10.0114 2.06827 10.3616 1.92566 10.7269 1.92566ZM11.478 8.30781C9.25279 8.30781 7.44891 10.0751 7.44891 12.2553C7.44891 14.4354 9.25279 16.2027 11.478 16.2027C13.7032 16.2027 15.507 14.4354 15.507 12.2553C15.507 10.0751 13.7032 8.30781 11.478 8.30781ZM11.4785 10.0579C12.718 10.0579 13.7228 11.0423 13.7228 12.2567C13.7228 13.4711 12.718 14.4555 11.4785 14.4555C10.239 14.4555 9.23422 13.4711 9.23422 12.2567C9.23422 11.0423 10.239 10.0579 11.4785 10.0579Z"
                fill="black"
              />
            </svg>
            <span className="mx-2">Settings </span>
          </a>
          <a href="#contact">
            <svg
              width="22"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0844 4.40723C15.0065 4.36444 14.9135 4.33891 14.8145 4.33891C14.5015 4.33891 14.2475 4.59114 14.2475 4.90192C14.2475 5.11437 14.3662 5.29978 14.5416 5.39512L14.5446 5.39662C17.3343 6.9205 19.1933 9.82037 19.1933 13.1504C19.1933 18.0215 15.216 21.9709 10.3102 21.9709C5.40453 21.9709 1.4272 18.0215 1.4272 13.1504C1.4272 9.83163 3.2726 6.94152 6.00026 5.43566L6.04562 5.41239C6.22102 5.3148 6.3382 5.13088 6.3382 4.91994C6.3382 4.60916 6.08418 4.35693 5.77119 4.35693C5.67216 4.35693 5.57841 4.38245 5.49752 4.42674L5.50054 4.42524C2.37447 6.1488 0.293945 9.40825 0.293945 13.1496C0.293945 18.6424 4.77856 23.0954 10.3102 23.0954C15.8419 23.0954 20.3265 18.6424 20.3265 13.1496C20.3265 9.39399 18.2301 6.12478 15.1366 4.432L15.0852 4.40573L15.0844 4.40723ZM10.2717 11.11C10.5847 11.11 10.8387 10.8578 10.8387 10.547V1.51711C10.8387 1.20633 10.5847 0.954102 10.2717 0.954102C9.9587 0.954102 9.70468 1.20633 9.70468 1.51711V10.547C9.70468 10.8578 9.9587 11.11 10.2717 11.11Z"
                fill="#080808"
              />
            </svg>
            <span className="mx-2">Logout</span>{" "}
          </a>
        </div>

        <div className="content-page">
          <br></br>
          <div className="head">Feedback</div>

          <Form className="my-3" onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                id="title"
                type="text"
                placeholder=" title"
                className="  mx-2  op"
                style={{ width: "90%" }}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                id="email"
                type="email"
                placeholder="  email"
                className="  mx-2   op"
                style={{ width: "90%" }}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <textarea
                class="form-control   mx-2 op"
                style={{ width: "90%", height: "190px" }}
                id="description"
                rows="3"
                placeholder="Description"
                onChange={(e) => changeHandler(e)}
              ></textarea>
            </Form.Group>
            <button type="submit" className="side-menus__suggestions-btns">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
