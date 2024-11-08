import FormButtons from "./FormButtons";
import FormCost from "./FormCost";
import FormCourtesyPhone from "./FormCourtesyPhone";
import FormCustomerDetail from "./FormCustomerDetail";
import FormRepairDetail from "./FormRepairDetail";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [sharedBond, setsharedBond] = useState(0); //Child2(FormCost) receive data from Child1
  const updateSharedState = (value) => setsharedBond(value); //Child1(FormCourtesyPhone) pass data to Child2

  const [sharedWarranty, setsharedWarranty] = useState(false); //Child2 receive data from Child1
  const updateWarranty = (value) => setsharedWarranty(value); //Child1 pass data to Child2

  const [sharedCustomerType, setsharedCustomerType] = useState(true); //Child2 receive data from Child1
  const updateCustomerType = (value) => setsharedCustomerType(value); //Child1 pass data to Child2

  //Pass customerDetails from "FormCustomerDetail" component to "Home"
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

  // Pass repairDetails from "FormRepairDetail" component to "Home"
  const [repairDetails, setRepairDetails] = useState({
    repairDate: "",
    underWarranty: false,
    imei: "",
    make: "",
    model: "",
    fault: "",
    description: "",
  });

  const [purchaseDate, setPurchaseDate] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedCharger, setSelectedCharger] = useState("");

  console.log(sharedWarranty);

  const generateJobNumber = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `JOB-${timestamp}-${randomNum}`;
  };

  const formatInvoiceDate = (date) => {
    const d = new Date(date);

    // Get components
    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "long" });
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    // Return formatted string
    return `${month} ${day}, ${year} - ${hours}:${minutes}`;
  };

  const formatPaymentDate = (date) => {
    const d = new Date(date);

    // Get components
    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "long" });
    const day = String(d.getDate()).padStart(2, "0");

    // Return formatted string
    return `${month} ${day}, ${year}`;
  };

  const calculatePaymentDate = (date) => {
    const paymentDate = new Date(date);
    paymentDate.setDate(paymentDate.getDate() + 5);
    return formatPaymentDate(paymentDate);
  };

  const formatPurchaseDate = (date) => {
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

  let formattedPurchaseDate = formatPurchaseDate(purchaseDate);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault(); //prevent browser from sending data to server
    try {
      //open the "Invoice" component
      //alert('Form was submitted!');
      const jobNumber = generateJobNumber();
      const invoiceDate = formatInvoiceDate(Date.now());
      const paymentDate = calculatePaymentDate(Date.now());
      const attachedData = {
        sharedBond,
        sharedCustomerType,
        customerDetails,
        sharedWarranty,
        jobNumber,
        invoiceDate,
        paymentDate,
        repairDetails,
        formattedPurchaseDate,
        selectedPhone,
        selectedCharger,
      };
      //Embed this attached data with the link
      navigate("/invoice", { state: { attachedData } });
    } catch (e) {
      alert("ERROR!!!");
    }
    console.log(customerDetails);
  };
  //Component UI: HTML Rendering
  return (
    <>
      <div className="container-fluid">
        <form className="row" style={{ minHeight: "60vh" }} onSubmit={onSubmit}>
          {/*Customer Details*/}
          <div
            className="col-12 col-lg-4 p-4 m-0"
            style={{ minHeight: "30vh", backgroundColor: "#FCF3CF" }}>
            <FormCustomerDetail
              passDataToParent={updateCustomerType}
              sendCustomerDetails={(value) => setCustomerDetails(value)}
            />
          </div>
          {/*Repair Details*/}
          <div
            className="col-12 col-lg-4 p-4 m-0"
            style={{ minHeight: "30vh", backgroundColor: "#D5F5E3" }}>
            <FormRepairDetail
              passDataToParent={updateWarranty}
              sendRepairDetails={(value) => setRepairDetails(value)}
              sendPurchaseDate={(value) => setPurchaseDate(value)}
            />
          </div>
          {/*Courtesy Phone & Cost*/}
          <div className="col-12 col-lg-4 p-0 m-0">
            {/*Courtesy phone*/}
            <div
              className="p-4"
              style={{ minHeight: "30vh", backgroundColor: "#2874A6" }}>
              <FormCourtesyPhone
                passDataToParent={updateSharedState}
                sendSelectedPhone={(value) => setSelectedPhone(value)}
                sendSelectedCharger={(value) => setSelectedCharger(value)}
              />
            </div>
            {/*Cost*/}
            <div
              className="p-4"
              style={{ minHeight: "20vh", backgroundColor: "#EDBB99" }}>
              <FormCost
                sharedPropBond={sharedBond}
                sharedPropWarranty={sharedWarranty}
                sharedPropCustomerType={sharedCustomerType}
              />
            </div>
          </div>
          {/*Button area*/}
          <div
            className="p-4 text-center"
            style={{ minHeight: "10vh", backgroundColor: "#EDBB99" }}>
            <FormButtons />
          </div>
        </form>
      </div>
    </>
  );
}

export default Home;
