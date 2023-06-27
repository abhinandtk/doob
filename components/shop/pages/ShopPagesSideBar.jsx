import Link from "next/link";
import React from "react";

function ShopPagesSideBar({ currentPage }) {
  return (
    <div className="sides">
      <Link href="/shop/category-management" style={{ textDecoration: "none" }}>
        <svg
          width="22"
          height="23"
          className="svg"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.55887 0C0.69915 0 0 0.705911 0 1.56691V8.2021C0 9.06291 0.69915 9.769 1.55887 9.769H8.17807C9.03779 9.769 9.74498 9.06291 9.74498 8.2021V1.56691C9.74498 0.706093 9.03783 0 8.17807 0H1.55887ZM1.55887 0.511583H8.17807C8.75749 0.511583 9.23339 0.984794 9.23339 1.56691V8.2021C9.23339 8.78416 8.75767 9.25742 8.17807 9.25742H1.55887C0.97945 9.25742 0.511583 8.78421 0.511583 8.2021V1.56691C0.511583 0.98484 0.97945 0.511583 1.55887 0.511583Z"
            fill="black"
          />
          <path
            d="M13.813 0C12.9549 0 12.2461 0.70486 12.2461 1.56691V8.2021C12.2461 9.06396 12.9549 9.769 13.813 9.769H20.4322C21.2901 9.769 21.9991 9.06309 21.9991 8.2021V1.56691C21.9991 0.705911 21.2901 0 20.4322 0H13.813ZM13.813 0.511583H20.4322C21.0091 0.511583 21.4875 0.984474 21.4875 1.56691V8.2021C21.4875 8.78453 21.0093 9.25742 20.4322 9.25742H13.813C13.2355 9.25742 12.7577 8.78471 12.7577 8.2021V1.56691C12.7577 0.984474 13.2355 0.511583 13.813 0.511583Z"
            fill="black"
          />
          <path
            d="M1.55887 12.2246C0.698054 12.2246 0 12.9321 0 13.7915V20.4267C0 21.2859 0.698054 22.0017 1.55887 22.0017H8.17807C9.03888 22.0017 9.74498 21.2861 9.74498 20.4267V13.7915C9.74498 12.9323 9.03888 12.2246 8.17807 12.2246H1.55887ZM1.55887 12.7362H8.17807C8.75799 12.7362 9.23339 13.2114 9.23339 13.7915V20.4267C9.23339 21.0066 8.75822 21.4898 8.17807 21.4898H1.55887C0.978947 21.4898 0.511583 21.0066 0.511583 20.4267V13.7915C0.511583 13.2116 0.978902 12.7362 1.55887 12.7362Z"
            fill="black"
          />
          <path
            d="M13.813 12.2246C12.9538 12.2246 12.2461 12.9311 12.2461 13.7915V20.4267C12.2461 21.2872 12.9536 22.0017 13.813 22.0017H20.4322C21.2912 22.0017 21.9991 21.2863 21.9991 20.4267V13.7915C21.9991 12.9322 21.2912 12.2246 20.4322 12.2246H13.813ZM13.813 12.7362H20.4322C21.0097 12.7362 21.4875 13.211 21.4875 13.7915V20.4267C21.4875 21.0072 21.0098 21.4898 20.4322 21.4898H13.813C13.235 21.4898 12.7577 21.0072 12.7577 20.4267V13.7915C12.7577 13.211 13.235 12.7362 13.813 12.7362Z"
            fill="black"
          />
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "category" ? "#17A803" : ""}` }}
        >
          Category
        </span>
      </Link>
      <Link href="/shop/brand-management" style={{ textDecoration: "none" }}>
        <svg
          width="25"
          height="26"
          className="svg"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1544 3.66667C15.1544 2.95942 14.8749 2.28115 14.3773 1.78105C13.8798 1.28095 13.205 1 12.5013 1C11.7977 1 11.1229 1.28095 10.6253 1.78105C10.1278 2.28115 9.84827 2.95942 9.84827 3.66667M8.51113 17H12.4907M16.4703 17H12.4907M12.4907 17V13M12.4907 17V21M22.1319 9.928L23.9692 21.928C24.0273 22.3078 24.003 22.6957 23.8981 23.0652C23.7932 23.4348 23.61 23.7771 23.3612 24.0689C23.1124 24.3606 22.8038 24.5948 22.4566 24.7556C22.1093 24.9163 21.7316 24.9997 21.3493 25H3.65338C3.27085 25 2.89283 24.9169 2.54525 24.7564C2.19767 24.5959 1.88873 24.3617 1.63963 24.0699C1.39053 23.7781 1.20715 23.4356 1.10207 23.0659C0.996986 22.6962 0.972683 22.308 1.03083 21.928L2.86807 9.928C2.96444 9.29812 3.28205 8.72376 3.76338 8.30894C4.2447 7.89412 4.85791 7.66627 5.49195 7.66667H19.5107C20.1445 7.66659 20.7574 7.89458 21.2385 8.30937C21.7195 8.72416 22.0369 9.29835 22.1333 9.928H22.1319Z"
            stroke="black"
            stroke-width="0.84156"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "brand" ? "#17A803" : ""}` }}
        >
          Brand
        </span>
      </Link>
      <Link href="/shop/product-management" style={{ textDecoration: "none" }}>
        <svg
          width="25"
          height="26"
          className="svg mb-1"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1544 3.66667C15.1544 2.95942 14.8749 2.28115 14.3773 1.78105C13.8798 1.28095 13.205 1 12.5013 1C11.7977 1 11.1229 1.28095 10.6253 1.78105C10.1278 2.28115 9.84827 2.95942 9.84827 3.66667M8.51113 17H12.4907M16.4703 17H12.4907M12.4907 17V13M12.4907 17V21M22.1319 9.928L23.9692 21.928C24.0273 22.3078 24.003 22.6957 23.8981 23.0652C23.7932 23.4348 23.61 23.7771 23.3612 24.0689C23.1124 24.3606 22.8038 24.5948 22.4566 24.7556C22.1093 24.9163 21.7316 24.9997 21.3493 25H3.65338C3.27085 25 2.89283 24.9169 2.54525 24.7564C2.19767 24.5959 1.88873 24.3617 1.63963 24.0699C1.39053 23.7781 1.20715 23.4356 1.10207 23.0659C0.996986 22.6962 0.972683 22.308 1.03083 21.928L2.86807 9.928C2.96444 9.29812 3.28205 8.72376 3.76338 8.30894C4.2447 7.89412 4.85791 7.66627 5.49195 7.66667H19.5107C20.1445 7.66659 20.7574 7.89458 21.2385 8.30937C21.7195 8.72416 22.0369 9.29835 22.1333 9.928H22.1319Z"
            stroke="black"
            stroke-width="0.84156"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "products" ? "#17A803" : ""}` }}
        >
          Products
        </span>
      </Link>
      <Link href="/shop/stocks" style={{ textDecoration: "none" }}>
        <svg
          width="22"
          height="31"
          className="svg mb-1"
          viewBox="0 0 22 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.7518 13.382V25.1605C20.7518 28.7846 18.5482 29.9927 15.8275 29.9927H5.97897C3.2583 29.9927 1.05469 28.7846 1.05469 25.1605V13.382C1.05469 9.45584 3.2583 8.5498 5.97897 8.5498C5.97897 9.29879 6.2867 9.9753 6.79144 10.4706C7.29618 10.9659 7.98562 11.2679 8.74888 11.2679H13.0576C14.5842 11.2679 15.8275 10.0478 15.8275 8.5498C18.5482 8.5498 20.7518 9.45584 20.7518 13.382Z"
            stroke="black"
            stroke-width="0.84156"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.3229 3.6301C15.3229 5.15493 14.2082 6.39692 12.8395 6.39692H8.97653C8.29223 6.39692 7.67411 6.0895 7.22159 5.58532C6.76906 5.08115 6.49316 4.39252 6.49316 3.6301C6.49316 2.10528 7.60792 0.863281 8.97653 0.863281H12.8395C13.5239 0.863281 14.1419 1.17071 14.5945 1.67488C15.047 2.17906 15.3229 2.86769 15.3229 3.6301Z"
            stroke="black"
            stroke-width="0.84156"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.49316 14.0044H9.88922"
            stroke="black"
            stroke-width="0.84156"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.49316 23.7671H15.3229"
            stroke="black"
            stroke-width="0.84156"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span
          className=" customs"
          style={{ color: `${currentPage === "settings" ? "#17A803" : ""}` }}
        >
          {" "}
          Stock
        </span>
      </Link>
      <Link href="/shop/admin-all-orders" style={{ textDecoration: "none" }}>
        <svg
          width="25"
          className="svg"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.2486 23C1.01676 23 0 21.9592 0 20.6531V2.34694C0 1.06122 0.997207 0 2.2486 0H18.7514C19.9832 0 21 1.04082 21 2.34694V11L20.9218 10.9796C20.5894 10.8776 20.2765 10.8367 19.9246 10.8367H19.905L19.8855 10.7755H19.8268V2.34694C19.8268 1.7551 19.3184 1.22449 18.7514 1.22449H2.2486C1.68156 1.22449 1.17318 1.7551 1.17318 2.34694V20.6531C1.17318 21.2449 1.68156 21.7755 2.2486 21.7755H10.9106L10.9302 21.7959C11.1453 22.102 11.0279 22.3265 10.9497 22.4898C10.8715 22.6327 10.8324 22.7347 10.9693 22.8776L11.0866 23H2.2486Z"
            fill="black"
          />
          <path
            d="M9.68435 3H3.37135C3.20424 3 3.0557 3.21918 3.0557 3.51142C3.0557 3.80365 3.20424 4.02283 3.37135 4.02283H9.68435C9.85146 4.02283 10 3.80365 10 3.51142C10 3.21918 9.87003 3 9.68435 3ZM3.29708 7C3.12997 7 3 6.76256 3 6.43379C3 6.10502 3.12997 5.86758 3.29708 5.86758H7.82759C7.9947 5.86758 8.12467 6.10502 8.12467 6.43379C8.12467 6.76256 7.9947 7 7.82759 7H3.29708Z"
            fill="black"
          />
          <path
            d="M8.01887 6.19181H3.23526C3.09802 6.19181 3 6.43762 3 6.76536C3 7.09311 3.09802 7.33892 3.23526 7.33892H8.01887C8.15611 7.33892 8.25413 7.09311 8.25413 6.76536C8.25413 6.43762 8.1365 6.19181 8.01887 6.19181ZM17.8998 26C17.2136 26 16.4686 25.959 15.508 25.8771C14.116 25.7542 12.8417 25.0782 11.6066 23.8287L6.03877 18.1341C4.74484 16.8231 4.68603 15.1024 5.84272 13.7914C6.33285 13.2588 7.09744 12.9311 7.92085 12.9311C8.74426 12.9311 9.48925 13.2588 9.95977 13.8324C9.97937 13.8529 10.0186 13.8939 10.097 13.9348C10.1166 13.9553 10.1558 13.9758 10.1754 13.9963V11.2514V9.89944C10.1754 8.85475 10.1754 7.78957 10.195 6.74488C10.2146 5.18808 11.3713 4 12.9005 4H12.9201C14.3905 4 15.508 5.12663 15.5864 6.66294C15.606 7.01117 15.606 7.37989 15.5864 7.7486V8.21974H15.8805C16.8999 8.21974 17.6841 8.58845 18.2527 9.36685C18.2723 9.40782 18.3899 9.44879 18.5467 9.44879C18.6056 9.44879 18.6644 9.44879 18.7036 9.42831C18.88 9.40782 19.0565 9.38734 19.2133 9.38734C19.9975 9.38734 20.6837 9.71508 21.2718 10.3911C21.3699 10.4935 21.5855 10.5754 21.7816 10.5754H21.86C21.9972 10.5549 22.1541 10.5345 22.2913 10.5345C23.7617 10.5345 24.938 11.6201 24.9576 13.0335C25.0164 15.635 25.0556 18.1955 24.7811 20.7356C24.4478 23.8082 22.8794 25.4469 19.8211 25.8566C19.2525 25.959 18.6056 26 17.8998 26ZM7.82282 14.0987C7.41112 14.0987 7.01902 14.2626 6.72495 14.5493C6.37206 14.9181 6.17601 15.3482 6.17601 15.8194C6.17601 16.311 6.39166 16.8026 6.78376 17.2123L7.52875 17.9907C9.15596 19.6704 10.842 21.3911 12.528 23.0912C13.3514 23.9106 14.2925 24.4432 15.3315 24.648C16.1353 24.8119 16.9391 24.8939 17.7233 24.8939C18.4291 24.8939 19.1349 24.8324 19.8211 24.689C22.3109 24.2179 23.448 22.9683 23.6832 20.5512C23.8989 18.2365 23.8793 15.8603 23.8401 13.5661V13.1974C23.8205 12.3575 23.2519 11.784 22.4481 11.784C22.2325 11.784 22.0364 11.825 21.8208 11.9069V15.1024C21.8208 15.3892 21.8208 15.9423 21.2718 15.9423H21.2522C21.0758 15.9423 20.9386 15.9013 20.8601 15.7989C20.7033 15.635 20.6837 15.3277 20.6837 15.0819V14.959C20.6837 14.0168 20.7033 13.054 20.6837 12.0912C20.6641 11.2514 20.0955 10.6574 19.3113 10.6574C19.1153 10.6574 18.9192 10.6983 18.7428 10.7598V14.0782C18.7428 14.365 18.684 14.5903 18.5467 14.7337C18.4487 14.8361 18.3115 14.8976 18.135 14.8976H18.1154C17.5861 14.8771 17.5861 14.3035 17.5861 14.0987V12.7467V11.0261C17.5861 10.6369 17.4293 10.2272 17.1352 9.91993C16.8607 9.63315 16.4882 9.46927 16.1157 9.46927C15.9589 9.46927 15.7824 9.48976 15.6256 9.55121V11.0261C15.6256 11.7225 15.6256 12.46 15.5864 13.1769C15.5668 13.3613 15.4099 13.5047 15.2531 13.648C15.1943 13.7095 15.1159 13.7709 15.0571 13.8324L14.9982 13.8939L14.959 13.7914C14.9198 13.73 14.861 13.6685 14.8022 13.6276C14.6846 13.4842 14.5473 13.3408 14.4689 13.1769C14.4101 13.054 14.4297 12.9106 14.4297 12.7877V12.6238V10.8417C14.4297 9.53073 14.4297 8.17877 14.4101 6.8473C14.4101 5.86406 13.8023 5.20857 12.9201 5.18808C11.9595 5.18808 11.3125 5.90503 11.3125 6.94972V16.5978L11.0576 16.7616L11.038 16.7207C10.8616 16.5158 10.6655 16.311 10.4891 16.1061C10.0774 15.6555 9.64609 15.1639 9.21478 14.7132C8.82268 14.324 8.33255 14.0987 7.82282 14.0987Z"
            fill="black"
          />
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "allOrders" ? "#17A803" : ""}` }}
        >
          All Orders
        </span>
      </Link>
      <Link
        href="/shop/report/earnings-report"
        style={{ textDecoration: "none" }}
      >
        <svg
          width="26"
          height="27"
          className="svg mb-1"
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2769_12037)">
            <path
              d="M13.0054 4.80469C6.12423 4.80469 0.525391 10.6189 0.525391 17.7647C0.525391 24.9105 6.12423 30.7247 13.0054 30.7247C19.8866 30.7247 25.4854 24.9105 25.4854 17.7647C25.4854 10.6189 19.8866 4.80469 13.0054 4.80469ZM13.0054 29.6447C6.69727 29.6447 1.56539 24.3154 1.56539 17.7647C1.56539 11.2139 6.69727 5.88469 13.0054 5.88469C19.3135 5.88469 24.4454 11.2139 24.4454 17.7647C24.4454 24.3154 19.3135 29.6447 13.0054 29.6447Z"
              fill="black"
            />
            <path
              d="M11.9642 11.2835H14.0442C15.4779 11.2835 16.6442 12.4947 16.6442 13.9835H17.6842C17.6842 11.8991 16.0509 10.2035 14.0442 10.2035H13.5242V8.5835H12.4842V10.2035H11.9642C9.95754 10.2035 8.32422 11.8991 8.32422 13.9835V14.5235C8.32422 16.6079 9.95754 18.3035 11.9642 18.3035H14.0442C15.4779 18.3035 16.6442 19.5147 16.6442 21.0035V21.5435C16.6442 23.0323 15.4779 24.2435 14.0442 24.2435H11.9642C10.5306 24.2435 9.36422 23.0323 9.36422 21.5435H8.32422C8.32422 23.6279 9.95754 25.3235 11.9642 25.3235H12.4842V26.9435H13.5242V25.3235H14.0442C16.0509 25.3235 17.6842 23.6279 17.6842 21.5435V21.0035C17.6842 18.9191 16.0509 17.2235 14.0442 17.2235H11.9642C10.5306 17.2235 9.36422 16.0123 9.36422 14.5235V13.9835C9.36422 12.4947 10.5306 11.2835 11.9642 11.2835Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2769_12037">
              <rect width="26" height="27" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "earnings" ? "#17A803" : ""}` }}
        >
          Earnings
        </span>
      </Link>

      <Link href="/shop/report" style={{ textDecoration: "none" }}>
        <svg
          width="25"
          height="33"
          viewBox="0 0 25 33"
          className="mb-2 "
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.4565 31.8696H23.913V21.6957C23.913 21.5457 23.8558 21.402 23.7539 21.296C23.6519 21.19 23.5137 21.1304 23.3696 21.1304C23.2254 21.1304 23.0872 21.19 22.9853 21.296C22.8833 21.402 22.8261 21.5457 22.8261 21.6957V31.8696H19.5652V12.087C19.5652 11.7871 19.6797 11.4996 19.8836 11.2876C20.0874 11.0756 20.3639 10.9565 20.6522 10.9565H21.7391C22.0274 10.9565 22.3039 11.0756 22.5077 11.2876C22.7116 11.4996 22.8261 11.7871 22.8261 12.087V12.6522C22.8261 12.8021 22.8833 12.9458 22.9853 13.0518C23.0872 13.1578 23.2254 13.2174 23.3696 13.2174C23.5137 13.2174 23.6519 13.1578 23.7539 13.0518C23.8558 12.9458 23.913 12.8021 23.913 12.6522V12.087C23.913 11.4873 23.684 10.9123 23.2763 10.4883C22.8686 10.0643 22.3157 9.82609 21.7391 9.82609H20.6522C20.0756 9.82609 19.5227 10.0643 19.115 10.4883C18.7073 10.9123 18.4783 11.4873 18.4783 12.087V31.8696H16.3043V17.7391C16.3043 17.4422 16.2481 17.1482 16.1389 16.8739C16.0296 16.5996 15.8695 16.3504 15.6676 16.1405C15.4658 15.9305 15.2261 15.764 14.9624 15.6504C14.6986 15.5367 14.4159 15.4783 14.1304 15.4783H13.0435C12.758 15.4783 12.4753 15.5367 12.2116 15.6504C11.9478 15.764 11.7082 15.9305 11.5063 16.1405C11.3044 16.3504 11.1443 16.5996 11.035 16.8739C10.9258 17.1482 10.8696 17.4422 10.8696 17.7391V31.8696H8.69565V23.3913C8.69565 23.0944 8.63942 22.8004 8.53017 22.5261C8.42092 22.2518 8.26079 22.0026 8.05893 21.7926C7.85706 21.5827 7.61741 21.4162 7.35366 21.3025C7.08991 21.1889 6.80722 21.1304 6.52174 21.1304H5.43478C5.1493 21.1304 4.86661 21.1889 4.60286 21.3025C4.33911 21.4162 4.09946 21.5827 3.89759 21.7926C3.69573 22.0026 3.5356 22.2518 3.42635 22.5261C3.3171 22.8004 3.26087 23.0944 3.26087 23.3913V31.8696H1.08696V7.56522C1.08696 7.41531 1.0297 7.27155 0.927775 7.16555C0.825853 7.05955 0.687618 7 0.543478 7C0.399339 7 0.261103 7.05955 0.159181 7.16555C0.0572592 7.27155 0 7.41531 0 7.56522V32.4348C-3.3455e-09 32.509 0.0140575 32.5825 0.0413698 32.6511C0.0686822 32.7197 0.108715 32.782 0.159181 32.8345C0.209648 32.8869 0.26956 32.9286 0.335498 32.957C0.401436 32.9854 0.472108 33 0.543478 33H24.4565C24.6007 33 24.7389 32.9405 24.8408 32.8345C24.9427 32.7285 25 32.5847 25 32.4348C25 32.2849 24.9427 32.1411 24.8408 32.0351C24.7389 31.9291 24.6007 31.8696 24.4565 31.8696ZM7.6087 31.8696H4.34783V23.3913C4.34783 23.0915 4.46234 22.804 4.66619 22.592C4.87003 22.38 5.1465 22.2609 5.43478 22.2609H6.52174C6.66448 22.2609 6.80582 22.2901 6.9377 22.3469C7.06957 22.4037 7.1894 22.487 7.29033 22.592C7.39127 22.6969 7.47133 22.8216 7.52596 22.9587C7.58058 23.0959 7.6087 23.2429 7.6087 23.3913V31.8696ZM15.2174 31.8696H11.9565V17.7391C11.9565 17.4393 12.071 17.1518 12.2749 16.9398C12.4787 16.7278 12.7552 16.6087 13.0435 16.6087H14.1304C14.2732 16.6087 14.4145 16.6379 14.5464 16.6947C14.6783 16.7516 14.7981 16.8348 14.899 16.9398C15 17.0448 15.08 17.1694 15.1347 17.3065C15.1893 17.4437 15.2174 17.5907 15.2174 17.7391V31.8696Z"
            fill="black"
          />
          <path
            d="M2.50001 2.00555C2.43435 2.00555 2.36933 2.01846 2.30867 2.04354C2.24801 2.06862 2.19289 2.10538 2.14646 2.15172C2.10003 2.19807 2.0632 2.25308 2.03808 2.31363C2.01295 2.37419 2.00002 2.43908 2.00002 2.50462V4.50092C2.00002 4.63329 2.05269 4.76023 2.14646 4.85382C2.24023 4.94742 2.3674 5 2.50001 5C2.63261 5 2.75979 4.94742 2.85356 4.85382C2.94732 4.76023 3 4.63329 3 4.50092V2.50462C3 2.37226 2.94732 2.24532 2.85356 2.15172C2.75979 2.05813 2.63261 2.00555 2.50001 2.00555ZM2.96 0.318671C2.93468 0.258191 2.89917 0.202487 2.855 0.153976L2.78 0.0940869C2.75213 0.0751987 2.72187 0.0600937 2.69 0.0491698L2.60001 0.00924377C2.50251 -0.0097518 2.40155 0.000672946 2.31001 0.0391883C2.24796 0.0616028 2.19162 0.0973641 2.14496 0.143937C2.0983 0.190511 2.06247 0.246756 2.04002 0.30869C2.01308 0.371783 1.99947 0.43974 2.00002 0.50832C1.99964 0.574001 2.01225 0.639112 2.03713 0.699918C2.06201 0.760724 2.09867 0.81603 2.14501 0.862663C2.19257 0.908099 2.24864 0.943716 2.31001 0.967469C2.37012 0.993043 2.43467 1.00661 2.50001 1.0074C2.56581 1.00778 2.63104 0.995186 2.69196 0.970349C2.75288 0.945513 2.80828 0.908918 2.855 0.862663C2.94637 0.767024 2.99816 0.640458 3 0.50832C2.99921 0.443102 2.98562 0.378671 2.96 0.318671Z"
            fill="black"
          />
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "report" ? "#17A803" : ""}` }}
        >
          Report
        </span>
      </Link>
      <Link href="/shop/store-settings" style={{ textDecoration: "none" }}>
        <svg
          width="23"
          className="svg"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.826 10.2039H18.723C18.4137 10.2039 18.1434 9.99474 18.0484 9.68981C17.9515 9.37852 17.8339 9.07469 17.6964 8.78055C17.5648 8.49715 17.6168 8.15782 17.8317 7.93277L20.0185 5.6511C20.1028 5.56307 20.1028 5.42039 20.0187 5.33252L17.8893 3.11079C17.8053 3.023 17.6687 3.023 17.5845 3.11094L15.4054 5.3848C15.1893 5.61026 14.8616 5.66402 14.589 5.524C14.3055 5.37797 14.0124 5.25303 13.7119 5.15013C13.4207 5.05079 13.2213 4.76871 13.2213 4.44681V1.2251C13.2213 1.1654 13.1986 1.10815 13.1581 1.06594C13.1177 1.02373 13.0628 1.00001 13.0056 1H9.99448C9.93727 1.00001 9.8824 1.02373 9.84195 1.06594C9.80149 1.10815 9.77876 1.1654 9.77876 1.2251V4.51944C9.77876 4.83399 9.58833 5.11141 9.30687 5.21619C9.024 5.32208 8.75101 5.44583 8.48966 5.5868C8.21543 5.73467 7.88072 5.68328 7.66102 5.45403L5.41556 3.11094C5.39555 3.09003 5.37177 3.07343 5.34561 3.06211C5.31944 3.05079 5.29139 3.04497 5.26307 3.04497C5.23474 3.04497 5.20669 3.0508 5.18053 3.06213C5.15436 3.07345 5.1306 3.09005 5.11058 3.11097L2.98138 5.3325C2.96133 5.3534 2.94542 5.37822 2.93456 5.40554C2.92371 5.43287 2.91812 5.46215 2.91812 5.49173C2.91812 5.52131 2.92371 5.55059 2.93456 5.57791C2.94542 5.60524 2.96133 5.63006 2.98138 5.65096L5.30283 8.07335C5.51497 8.29398 5.56932 8.62757 5.44467 8.90912C5.33253 9.16293 5.235 9.4235 5.1526 9.68944C5.05778 9.99444 4.78687 10.2039 4.47735 10.2039H1.17412C1.11691 10.2039 1.06205 10.2276 1.02159 10.2698C0.981138 10.312 0.958409 10.3693 0.958403 10.429V13.5708C0.958409 13.6305 0.981138 13.6877 1.02159 13.7299C1.06205 13.7721 1.11691 13.7959 1.17412 13.7959H4.56205C4.86272 13.7959 5.12787 13.9935 5.22963 14.2862C5.31313 14.5265 5.40922 14.7617 5.51745 14.9909C5.65089 15.2753 5.59939 15.6172 5.38323 15.8428L2.98124 18.3492C2.89708 18.4369 2.89708 18.5793 2.98136 18.6672L5.11075 20.889C5.19484 20.9768 5.33124 20.9768 5.41556 20.8888L7.82562 18.374C8.04122 18.1497 8.36784 18.0953 8.63938 18.2337C8.85697 18.3442 9.08013 18.4423 9.30787 18.5277C9.58887 18.6337 9.77878 18.9104 9.77878 19.2247V22.7749C9.77879 22.8346 9.80152 22.8918 9.84197 22.9341C9.88242 22.9763 9.93729 23 9.9945 23H13.0056C13.0628 23 13.1177 22.9763 13.1581 22.9341C13.1986 22.8918 13.2213 22.8346 13.2213 22.7749V19.2975C13.2213 18.9753 13.4209 18.6932 13.7122 18.5936C13.9599 18.5089 14.2027 18.4093 14.4394 18.2955C14.7093 18.1654 15.0286 18.222 15.2402 18.4428L17.5847 20.889C17.6688 20.9768 17.8053 20.9768 17.8895 20.8888L20.0186 18.6674C20.1028 18.5794 20.1028 18.4369 20.0187 18.3491L17.7504 15.9821C17.5313 15.7527 17.4821 15.4038 17.6236 15.1181C17.7553 14.8518 17.8713 14.574 17.9715 14.2855C18.0734 13.9931 18.3382 13.7959 18.6385 13.7959H21.826C21.8832 13.7959 21.938 13.7722 21.9785 13.73C22.019 13.6877 22.0417 13.6305 22.0417 13.5708V10.429C22.0417 10.3693 22.019 10.312 21.9785 10.2698C21.938 10.2276 21.8832 10.2039 21.826 10.2039L21.826 10.2039ZM21.826 9.20387C22.4743 9.20387 23 9.75238 23 10.429V13.5708C23 14.2474 22.4743 14.7959 21.826 14.7959H18.8116C18.7345 15.0037 18.6492 15.208 18.5559 15.4085L20.6963 17.6419C21.1546 18.1202 21.1546 18.8957 20.6963 19.3744L18.5672 21.5957C18.1088 22.0745 17.3651 22.0745 16.9068 21.5959L14.6841 19.2767C14.5183 19.3519 14.35 19.4209 14.1796 19.4838V22.7749C14.1796 23.4515 13.6539 24 13.0055 24H9.9944C9.34601 24 8.82035 23.4515 8.82035 22.7749V19.4053C8.6712 19.3454 8.52387 19.2806 8.3786 19.2111L6.09313 21.5959C5.63453 22.0745 4.89112 22.0745 4.43292 21.5959L2.30367 19.3744C1.84507 18.8958 1.84507 18.1201 2.30367 17.6419L4.581 15.2656C4.51232 15.1112 4.44841 14.9545 4.38935 14.7959H1.17405C0.525656 14.7959 0 14.2474 0 13.5708V10.429C0 9.75238 0.525656 9.20387 1.17405 9.20387H4.29806C4.36025 9.01805 4.42896 8.83468 4.50407 8.65413L2.30367 6.35806C1.84509 5.87955 1.84509 5.10391 2.30369 4.62537L4.43275 2.40398C4.89112 1.92527 5.63453 1.92527 6.09313 2.40384L8.2111 4.6139C8.41029 4.51282 8.61357 4.42077 8.82038 4.33802V1.2251C8.82038 0.548511 9.34603 0 9.99443 0H13.0055C13.6539 0 14.1796 0.548511 14.1796 1.2251V4.26006C14.4082 4.34459 14.6329 4.44039 14.8528 4.54712L16.9067 2.40396C17.3651 1.92522 18.1089 1.92522 18.5671 2.40379L20.6964 4.62552C21.1546 5.10401 21.1546 5.8794 20.6963 6.35806L18.6338 8.50999C18.7337 8.73679 18.8234 8.96833 18.9026 9.20387H21.8259H21.826ZM14.8542 11.875C14.8542 13.8771 13.2989 15.5 11.3802 15.5C9.46152 15.5 7.90627 13.8771 7.90627 11.875C7.90627 9.87286 9.46152 8.24998 11.3802 8.24998C13.2989 8.24998 14.8542 9.87286 14.8542 11.875ZM13.8958 11.875C13.8958 10.4251 12.7697 9.24998 11.3802 9.24998C9.99078 9.24998 8.8646 10.4251 8.8646 11.875C8.8646 13.3248 9.99078 14.5 11.3802 14.5C12.7697 14.5 13.8958 13.3248 13.8958 11.875Z"
            fill="black"
          />
        </svg>
        <span
          className="customs"
          style={{ color: `${currentPage === "settings" ? "#17A803" : ""}` }}
        >
          Settings
        </span>
      </Link>

      <Link href="/shop/support" style={{ textDecoration: "none" }}>
        <svg
          width="18"
          height="24"
          className="svg"
          viewBox="0 0 18 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5202 12.7522C12.4287 12.3102 13.1982 11.619 13.7423 10.7562H15.1457C15.4555 10.7377 15.7455 10.5951 15.9525 10.3597C16.1595 10.1243 16.2667 9.81506 16.2507 9.49946V6.54653C16.2512 6.39085 16.2239 6.23637 16.17 6.09065V6.08244C15.7585 4.63689 15.0429 3.29991 14.073 2.16436L14.0205 2.10276C13.3851 1.38566 12.5957 0.827672 11.7138 0.472277C10.7969 0.111788 9.81506 -0.0453735 8.8338 0.0112845C7.85255 0.0679425 6.89445 0.337116 6.02346 0.800837C5.4204 1.14168 4.87673 1.58156 4.41437 2.10276L4.36194 2.16436C3.39197 3.29991 2.67638 4.63689 2.26488 6.08244V6.09065C2.21105 6.23637 2.18372 6.39085 2.18422 6.54653V9.49946C2.16825 9.81506 2.27545 10.1243 2.48245 10.3597C2.68944 10.5951 2.97944 10.7377 3.28921 10.7562H4.69263C5.23672 11.619 6.00622 12.3102 6.91471 12.7522C5.1806 13.2226 3.64722 14.2623 2.55213 15.7102C1.45704 17.158 0.861374 18.9333 0.857422 20.7609V23.0033C0.857422 23.1122 0.89991 23.2167 0.97554 23.2937C1.05117 23.3707 1.15375 23.414 1.2607 23.414H17.1742C17.2812 23.414 17.3837 23.3707 17.4594 23.2937C17.535 23.2167 17.5775 23.1122 17.5775 23.0033V20.7609C17.5735 18.9333 16.9779 17.158 15.8828 15.7102C14.7877 14.2623 13.2543 13.2226 11.5202 12.7522ZM15.4441 6.54653V9.49946C15.4441 9.72946 15.303 9.93481 15.1457 9.93481H14.1738C14.2423 9.76231 14.3069 9.58571 14.3593 9.405C14.3593 9.4009 14.3593 9.4009 14.3633 9.39679C14.683 8.32358 14.669 7.17593 14.323 6.11119H15.1457C15.303 6.11119 15.4441 6.31654 15.4441 6.54653ZM3.28921 9.93481C3.13193 9.93481 2.99078 9.72946 2.99078 9.49946V6.54653C2.99078 6.31654 3.13193 6.11119 3.28921 6.11119H4.11191C3.70587 7.36215 3.75888 8.7206 4.26112 9.93481H3.28921ZM3.39406 5.28979C3.77515 4.34857 4.3051 3.4773 4.96283 2.71059L5.01122 2.6572C5.41239 2.2009 5.887 1.81757 6.41464 1.52367C7.18241 1.121 8.02476 0.887317 8.88698 0.837787C9.7492 0.788258 10.612 0.923994 11.4194 1.23618C12.1869 1.54472 12.8731 2.03128 13.4237 2.6572L13.4721 2.71059C14.1298 3.4773 14.6598 4.34857 15.0408 5.28979H13.9842C13.5317 4.39996 12.8478 3.65391 12.0071 3.13316C11.1665 2.6124 10.2014 2.33698 9.21745 2.33698C8.23348 2.33698 7.26844 2.6124 6.42777 3.13316C5.58711 3.65391 4.90316 4.39996 4.45066 5.28979H3.39406ZM4.64827 7.81149C4.64752 7.15654 4.78254 6.50882 5.04449 5.91067C5.30645 5.31252 5.68944 4.77743 6.16843 4.34038C6.64741 3.90334 7.21159 3.57419 7.82407 3.37446C8.43655 3.17473 9.08353 3.10893 9.7227 3.18135C10.3619 3.25377 10.9788 3.46279 11.5332 3.79473C12.0876 4.12667 12.567 4.57406 12.9399 5.10763C13.3128 5.64121 13.571 6.24895 13.6974 6.8911C13.8239 7.53326 13.8158 8.19537 13.6737 8.83413H12.3268C12.244 8.59417 12.0902 8.38627 11.8865 8.23915C11.6828 8.09202 11.4392 8.01291 11.1895 8.01273H9.97966C9.65878 8.01273 9.35106 8.14254 9.12417 8.3736C8.89728 8.60467 8.76981 8.91806 8.76981 9.24483C8.76981 9.5716 8.89728 9.88499 9.12417 10.1161C9.35106 10.3471 9.65878 10.4769 9.97966 10.4769H11.1895C11.4392 10.4768 11.6828 10.3976 11.8865 10.2505C12.0902 10.1034 12.244 9.89549 12.3268 9.65553H13.4116C12.9949 10.6383 12.2582 11.4448 11.3257 11.9388C10.3932 12.4329 9.32196 12.5844 8.29255 12.3678C7.26313 12.1512 6.33855 11.5797 5.6747 10.7497C5.01084 9.91971 4.64833 8.88198 4.64827 7.81149ZM11.5928 9.24072V9.24894C11.5926 9.30262 11.582 9.35573 11.5616 9.40523C11.5412 9.45473 11.5114 9.49965 11.4739 9.53742C11.4365 9.57518 11.3921 9.60505 11.3433 9.62532C11.2945 9.64559 11.2422 9.65585 11.1895 9.65553H9.97966C9.8727 9.65553 9.77012 9.61226 9.69449 9.53524C9.61886 9.45822 9.57637 9.35375 9.57637 9.24483C9.57637 9.13591 9.61886 9.03144 9.69449 8.95442C9.77012 8.8774 9.8727 8.83413 9.97966 8.83413H11.1895C11.2422 8.83381 11.2945 8.84407 11.3433 8.86434C11.3921 8.88461 11.4365 8.91448 11.4739 8.95224C11.5114 8.99001 11.5412 9.03493 11.5616 9.08443C11.582 9.13393 11.5926 9.18704 11.5928 9.24072ZM16.7709 22.5926H1.66399V20.7609C1.66697 18.7794 2.44122 16.8799 3.81704 15.4788C5.19286 14.0777 7.05801 13.2892 9.00371 13.2861H9.43119C11.3769 13.2892 13.242 14.0777 14.6179 15.4788C15.9937 16.8799 16.7679 18.7794 16.7709 20.7609V22.5926Z"
            fill="black"
          />
        </svg>

        <span
          className="customs"
          style={{ color: `${currentPage === "support" ? "#17A803" : ""}` }}
        >
          {" "}
          Support{" "}
        </span>
        </Link>
    </div>
  );
}

export default ShopPagesSideBar;
