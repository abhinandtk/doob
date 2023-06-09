import React, { Fragment } from "react";

function ReportOrderCountTable({ reportData, title }) {
  console.log("popopopopopo", reportData);
  return (
    <Fragment>
      <div className="customer-sale">
      <div  className="report-section">
                    <div >Game</div>
                    <div >Order Count</div>
                    <div>Total Amount</div>
                  </div>
        {reportData &&
          reportData.map((item, index) => (
            <div
              key={index}
              className=" d-flex justify-content-between  customer my-3"
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
