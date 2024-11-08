import React, { useRef, useState, useEffect } from "react";

function FormRepairDetail({
  passDataToParent,
  sendRepairDetails,
  sendPurchaseDate,
}) {
  // Determine the current date
  const today = new Date().toLocaleDateString("en-CA");

  const [isWarrantyDisabled, setIsWarrantyDisabled] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const underWarrantyRef = useRef(null);
  const [repairDetails, setRepairDetails] = useState({
    purchaseDate: "",
    repairDate: "",
    underWarranty: false,
    imei: "",
    make: "",
    model: "",
    fault: "",
    description: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRepairDetails({ ...repairDetails, ...{ [name]: value } });
  };

  useEffect(() => {
    sendRepairDetails(repairDetails);
  }, [repairDetails, sendRepairDetails]);

  const handlePurchaseDateChange = (event) => {
    // Get date from purchase date field
    const selectedDate = new Date(event.target.value);
    setPurchaseDate(event.target.value);
    sendPurchaseDate(selectedDate);

    // Calculate 24 months after purchase date
    const warrantyExpiryDate = new Date(selectedDate); // Temporarily set warranty expiry date as selected purchase date
    warrantyExpiryDate.setMonth(warrantyExpiryDate.getMonth() + 24); // Add 24 months to selected purchase date

    // Compare with today's date
    const todayDate = new Date();
    if (todayDate > warrantyExpiryDate) {
      underWarrantyRef.current.checked = false;
      underWarrantyRef.current.disabled = true;
      setIsWarrantyDisabled(true);
      passDataToParent(false);
    } else {
      underWarrantyRef.current.disabled = false;
      setIsWarrantyDisabled(false);
      passDataToParent(underWarrantyRef.current.checked);
    }
  };

  const handleWarrantyChange = (event) => {
    passDataToParent(event.target.checked); // Update sharedWarranty based on checkbox state
  };

  //Component UI: HTML Rendering
  return (
    <>
      <h2>Repair Details</h2>
      <div className="row mt-1">
        <label class="col-12 col-md-12 col-lg-4">Purchase Date: *</label>
        <input
          class="col-12 col-md-12 col-lg-7"
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          required
          max={today}
          value={purchaseDate}
          onChange={handlePurchaseDateChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Repair Date: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="date"
          id="repairDate"
          name="repairDate"
          required
          min={today}
          onChange={handleChange}
        />
      </div>
      {/*Under Warranty*/}
      <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
          <legend className="col-11 float-none w-auto">Under Warranty</legend>
          {isWarrantyDisabled ? (
            <p className="text-danger">Phone is out of warranty</p>
          ) : null}
          <div>
            <label className="col-12 col-md-12 col-lg-4">Warranty:</label>
            <input
              type="checkbox"
              ref={underWarrantyRef}
              onChange={handleWarrantyChange}
            />
          </div>
        </fieldset>
      </div>
      {/*IMEI number*/}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">IMEI Number: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="imei"
          name="imei"
          required
          pattern="\d{15}"
          maxLength="15"
          title="Must be 15 numbers long."
          onChange={handleChange}
        />
      </div>
      {/* Make */}
      <div className="row mt-1">
        <label for="make" className="col-12 col-md-12 col-lg-4">
          Make: *
        </label>
        <select
          className="col-12 col-md-12 col-lg-7"
          id="make"
          name="make"
          required
          onChange={handleChange}>
          <option value="" disabled selected>
            --Please select--
          </option>
          <option value="Apple">Apple</option>
          <option value="LG">LG</option>
          <option value="Motorola">Motorola</option>
          <option value="Nokia">Nokia</option>
          <option value="Samsung">Samsung</option>
          <option value="Sony">Sony</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Model */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Model number:</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="modelNumber"
          name="model"
          onChange={handleChange}
        />
      </div>
      {/* Fault category */}
      <div className="row mt-1">
        <label for="fault" className="col-12 col-md-12 col-lg-4">
          Fault Category: *
        </label>
        <select
          className="col-12 col-md-12 col-lg-7"
          id="fault"
          name="fault"
          required
          onChange={handleChange}>
          <option value="" disabled selected>
            --Please select--
          </option>
          <option value="Battery">Battery</option>
          <option value="Charging">Charging</option>
          <option value="Screen">Screen</option>
          <option value="SD-storage">SD-storage</option>
          <option value="Software">Software</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Description */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Description: *</label>
        <textarea
          className="col-12 col-md-12 col-lg-7"
          id="description"
          name="description"
          onChange={handleChange}
          required
          style={{ minHeight: "100px", maxHeight: "130px" }}
        />
      </div>
    </>
  );
}

export default FormRepairDetail;
