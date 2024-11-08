//Import all dependencies, other Components
import React from "react";
import { useLocation } from "react-router-dom";

//Function Component
function Invoice() {
  //Use "useLocation" hook to access the "location" object containing "data" passed from "Home"
  const location = useLocation();
  console.log(location.state);
  const receivedData = location.state.attachedData;
  if (!receivedData) {
    return <h2>ERROR! No data is passed on.</h2>;
  }

  const formatRepairDate = (date) => {
    const d = new Date(date);

    // Get components
    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "long" });
    const day = String(d.getDate()).padStart(2, "0");

    // Convert hours to 12-hour format and determine AM/PM
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 as fallback for midnight

    // Return formatted string
    return `${month} ${day}, ${year} - ${hours}:${minutes} ${ampm}`;
  };

  let formattedRepairDate = formatRepairDate(
    receivedData.repairDetails.repairDate
  );

  return (
    <>
      <div style={{ minHeight: "60vh" }}>
        {/* Header */}
        <div className="bg-secondary p-3 row">
          <h1 className="col-6">Repair Booking</h1>
          <p className="col-6">
            Amount Due: <br />
            <span style={{ fontSize: "23px" }}>
              $
              {(
                receivedData.sharedBond +
                (receivedData.sharedServiceFee ? 0 : 85) +
                (receivedData.sharedBond +
                  (receivedData.sharedServiceFee ? 0 : 85)) *
                  0.15
              ).toFixed(2)}
            </span>{" "}
          </p>
        </div>
        {/* Customer Details */}
        <div className="p-3 row">
          <div className="col-6">
            <h4>Customer Details:</h4>
            <p>
              Customer type:{" "}
              {receivedData.sharedCustomerType ? "Customer" : "Business"}{" "}
            </p>
            <p>
              {receivedData.customerDetails.title}{" "}
              {receivedData.customerDetails.firstName}{" "}
              {receivedData.customerDetails.lastName}
            </p>
            <p>
              {receivedData.customerDetails.street}, <br />
              {receivedData.customerDetails.suburb}
              {", "}
              {receivedData.customerDetails.city}{" "}
              {receivedData.customerDetails.postcode}
            </p>
            <p>
              {receivedData.customerDetails.phone} <br />
              {receivedData.customerDetails.email}
            </p>
          </div>
          <div className="col-6">
            <h4>Repair Job:</h4>
            <p>
              Job number: {receivedData.jobNumber} <br />
              Invoice Date: {receivedData.invoiceDate} <br />
              Payment Due: {receivedData.paymentDate}
            </p>
          </div>
        </div>
        {/* Repair Detais */}
        <hr />
        <div className="p-3">
          <h4>Repair Details:</h4>
          <br />
          <p>
            <b>Purchase Date: </b> {receivedData.formattedPurchaseDate}
            <br />
            <b>Repair Date: </b> {formattedRepairDate}
            <br />
            <b>Under Warranty: </b>
            {receivedData.sharedWarranty ? "Yes" : "No"}
            <br />
            <b>IMEI Number: </b> {receivedData.repairDetails.imei}
            <br />
            <b>Device Make: </b> {receivedData.repairDetails.make}
            <br />
            <b>Model Number: </b> {receivedData.repairDetails.model}
            <br />
            <b>Fault Category: </b> {receivedData.repairDetails.fault}
            <br />
            <b>Fault Description: </b> {receivedData.repairDetails.description}
          </p>
        </div>
        {/* Courtesy Loan Device Detais */}
        <div className="p-3">
          <h4>Courtesy Loan Device Details:</h4>
          <div className="mt-2 ms-3 me-3 bg-white">
            <table className="table table-bordered" style={{ width: "40%" }}>
              <tbody>
                <tr>
                  <th style={{ width: "70%" }}>Item</th>
                  <th style={{ width: "30%" }}>Cost</th>
                </tr>
                {receivedData.selectedPhone && (
                  <tr>
                    <td>{receivedData.selectedPhone.name}</td>
                    <td>${receivedData.selectedPhone.bond.toFixed(2)}</td>
                  </tr>
                )}
                {receivedData.selectedCharger && (
                  <tr>
                    <td>{receivedData.selectedCharger.name}</td>
                    <td>${receivedData.selectedCharger.bond.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* TOTALS */}
        <div className="p-3 row">
          <div className="col-6"></div>
          <div className="col-6">
            <h4>TOTALS:</h4>
            <p>
              Bond: $
              {receivedData.sharedCustomerType
                ? receivedData.sharedBond.toFixed(2)
                : (0).toFixed(2)}{" "}
              <br />
              Service Fee: $
              {(receivedData.sharedServiceFee ? 0 : 85).toFixed(2)} <br />
              Total: $
              {(
                receivedData.sharedBond +
                (receivedData.sharedServiceFee ? 0 : 85)
              ).toFixed(2)}{" "}
              <br />
              GST: $
              {(
                (receivedData.sharedBond +
                  (receivedData.sharedServiceFee ? 0 : 85)) *
                0.15
              ).toFixed(2)}{" "}
              <br />
              Total(+GST): $
              {(
                receivedData.sharedBond +
                (receivedData.sharedServiceFee ? 0 : 85) +
                (receivedData.sharedBond +
                  (receivedData.sharedServiceFee ? 0 : 85)) *
                  0.15
              ).toFixed(2)}{" "}
            </p>
          </div>
        </div>
        {/* Footer */}
        <hr />
        <div className="p-3 row">
          <div className="col-6">
            <p className="fs-5">
              <strong>PHONE FIX SERVICES</strong>
            </p>
            <p>
              Address: 501 Gloucester Street <br />
              Taradale, Napier 4112
            </p>
          </div>
          <div className="col-6">
            <p className="fs-5">
              <strong>Contact Us:</strong>
            </p>
            <p>Phone: 06 974 8000 </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
