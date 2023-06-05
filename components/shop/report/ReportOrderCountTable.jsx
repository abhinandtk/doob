import React, { Fragment } from "react";

function ReportOrderCountTable({ reportData, title }) {
  console.log("popopopopopo", reportData);
  return (
    <Fragment>
      <div className="customer-sale">
        <div id="header" >
          <div id="logo">{title}</div>
          <div id="header-middle ">Order Count</div>
          <div id="header-right">Total Amount</div>
        </div>
        {reportData.length !== 0  ? (
          reportData.map((item, index) => (
            <div
              key={index}
              className="p-3 d-flex justify-content-between  customer"
            >
              <span className="sales-report-name">{item.brand_name}</span>
              <span>{item.count}</span>
              <span>{item.total_amount} KD</span>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
}

export default ReportOrderCountTable;
