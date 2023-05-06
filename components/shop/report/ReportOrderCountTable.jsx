import React, { Fragment } from "react";

function ReportOrderCountTable() {
  return (
    <Fragment>
      <div className="customer-sale">
        <div id="header">
          <div id="logo">Product</div>
          <div id="header-middle">Order Count</div>
          <div id="header-right">Total Amount</div>
        </div>

        <div className="p-3 d-flex justify-content-between  customer">
          <span className="sales-report-name">
            RED TAPE Runing Shoe Men RED TAPE Runing Shoe{" "}
          </span>
          <span>1450</span>
          <span>4500.000 KD</span>
        </div>
        <div className="p-3 d-flex justify-content-between ">
          <span className="sales-report-name">
            RED TAPE Runing Shoe Men RED TAPE Runing Shoe{" "}
          </span>
          <span>1450</span>
          <span>4500.000 KD</span>
        </div>
        <div className="p-3 d-flex justify-content-between  customer">
          <span className="sales-report-name">
            RED TAPE Runing Shoe Men RED TAPE Runing Shoe{" "}
          </span>
          <span>1450</span>
          <span>4500.000 KD</span>
        </div>
      </div>
    </Fragment>
  );
}

export default ReportOrderCountTable;
