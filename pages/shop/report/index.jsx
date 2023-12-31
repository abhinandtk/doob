import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function ReportPage() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="report" />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                {t("Report")}
              </h6>
              <div className="my-4 mx-4 ">
                <div className="basic">
                  <Link
                    href="/shop/report/sales-report"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    <h6 className="dark-theme-color">
                      {t("Sales Report")}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/shop/report/brand-sales-report"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    <h6 className="dark-theme-color my-4">
                      {t("Brand Sales Report")}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/shop/report/category-sales-report"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    <h6 className="dark-theme-color my-4">
                      {t("Category Sales Report")}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/shop/report/product-sales-report"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    <h6 className="dark-theme-color my-4">
                      {t("Product Sales Report")}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/shop/report/customer-sales-report"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    <h6 className="dark-theme-color my-4">
                      {t("Customer Sales Report")}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default ReportPage;
