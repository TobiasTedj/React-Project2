import { useState, useEffect } from "react";

function FormCustomerDetail({ passDataToParent, sendCustomerDetails }) {
  const [type, setType] = useState({ customer: "checked", business: "" });
  //update customer type
  const updateCustomerType = (event) => {
    if (event.target.value === "customer") {
      passDataToParent(true);
      setType({ customer: "checked", business: "" });
    } else {
      passDataToParent(false);
      setType({ customer: "", business: "checked" });
    }
  };
  // Set the default customer details
  const [customerDetails, setCustomerDetails] = useState({
    type: "",
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    suburb: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target; //Get updated pair-value: “name” and “value
    setCustomerDetails({ ...customerDetails, ...{ [name]: value } });
  };
  //useEffect() hook "SYNCHRONIZE" a component with another component (or external system)
  //useEffect Hook syntax: useEffect(() => {}, [dependencies]);
  useEffect(() => {
    //Call-back function
    sendCustomerDetails(customerDetails);
  }, [customerDetails, sendCustomerDetails]);

  //Component UI: HTML Rendering
  return (
    <>
      <h2>Customer Details</h2>
      {/*Customer type*/}
      <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
          <legend className="col-11 float-none w-auto">Customer type *</legend>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Customer</label>
            <input
              type="radio"
              id="customerType"
              name="customer-type"
              value="customer"
              checked={type.customer}
              onChange={(event) => updateCustomerType(event)}
            />
          </div>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Business</label>
            <input
              type="radio"
              id="businessType"
              name="customer-type"
              value="business"
              defaultChecked={type.business}
              onChange={(event) => updateCustomerType(event)}
            />
          </div>
        </fieldset>
      </div>

      {/*Details*/}
      <div className="row mt-2">
        <label for="title" className="col-12 col-md-12 col-lg-4">
          Title: *
        </label>
        <select
          className="col-12 col-md-12 col-lg-7"
          id="title"
          name="title"
          onChange={handleChange}
          required>
          <option value="" disabled selected>
            --Please select--
          </option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">First Name: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="firstName"
          name="firstName"
          required
          pattern="[A-Za-z\s\u2013\u002D]+"
          title="Must only contain, alphabetical characters, spaces, '-' symbol."
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Last Name: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="lastName"
          name="lastName"
          required
          pattern="[A-Za-z\s\u2013\u002D]+"
          title="Must only contain, alphabetical characters, spaces, '-' symbol."
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Street: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="street"
          name="street"
          required
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Suburb:</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="suburb"
          name="suburb"
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">City: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="city"
          name="city"
          required
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Post Code:</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="postcode"
          name="postcode"
          maxlength="4"
          pattern="[\d]+"
          title="Must only contain numbers."
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Phone Number: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="phone"
          name="phone"
          required
          pattern="[\d\s\-\+\(\)]+"
          title="Must only contain, numbers, spaces, (), -, +."
          onChange={handleChange}
        />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Email: *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default FormCustomerDetail;
