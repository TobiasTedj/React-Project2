function FormCost(props) {
  //Calculate the total cost
  const bond = props.sharedPropCustomerType ? props.sharedPropBond : 0;
  const serviceFee = props.sharedPropWarranty ? 0 : 85;
  const total = bond + serviceFee;
  const gst = (bond + serviceFee) * 0.15;
  const totalWithGst = total + gst;

  //Component UI: HTML Rendering
  return (
    <>
      <h2>Cost</h2>
      <div className="row mt-2 ms-3">
        <label className="col-12 col-md-12 col-lg-5">Bond: ($)</label>
        <input
          className="col-12 col-md-12 col-lg-6"
          type="number"
          id="bond"
          value={bond.toFixed(2)}
          readOnly
        />
      </div>
      <div className="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-5">Service Fee: ($)</label>
        <input
          className="col-12 col-md-12 col-lg-6"
          type="number"
          id="serviceFee"
          value={serviceFee.toFixed(2)}
          readOnly
        />
      </div>
      <div class="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-5">Total: ($)</label>
        <input
          className="col-12 col-md-12 col-lg-6"
          type="number"
          id="totalFee"
          value={total.toFixed(2)}
          readOnly
        />
      </div>
      <div class="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-5">GST: ($)</label>
        <input
          className="col-12 col-md-12 col-lg-6"
          type="number"
          id="gst"
          value={gst.toFixed(2)}
          readOnly
        />
      </div>
      <div class="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-5">Total(+GST): ($)</label>
        <input
          className="col-12 col-md-12 col-lg-6"
          type="number"
          id="totalFeeGst"
          value={totalWithGst.toFixed(2)}
          readOnly
        />
      </div>
    </>
  );
}

export default FormCost;
