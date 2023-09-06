import React, { Fragment } from "react";
import { useTranslation } from "next-i18next";

function ReportOrderCountTable({ reportData, title }) {
  console.log("popopopopopo", reportData);
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="customer-sale">
        <div className="report-section">
          <div>{title}</div>
          <div>{t("Order Quantity")}</div>
          <div>{t("Total Amount")}</div>
        </div>
        {reportData &&
          reportData.map((item, index) => (
            <div
              key={index}
              className="input-theme-prod d-flex justify-content-between  customer my-3"
            >
              <span className="sales-report-name">{item.brand_name}</span>
              <span className="sales-order-number">{item.count}</span>
              <span className="sales-order-price">{item.total_amount} KD</span>
            </div>
          ))}
      </div>
    </Fragment>
  );
}

export default ReportOrderCountTable;
