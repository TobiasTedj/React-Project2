import { useState } from "react";

//Function Component
function FormCourtesyPhone({
  passDataToParent,
  sendSelectedPhone,
  sendSelectedCharger,
}) {
  //Assume there is a list of courtesy items as below
  let courtesyList = [
    { id: 0, type: "none", name: "none", bond: 0 },
    { id: 1, type: "phone", name: "iPhone 10", bond: 275 },
    { id: 2, type: "phone", name: "iPhone 14", bond: 300 },
    { id: 3, type: "phone", name: "iPhone 16", bond: 500 },
    { id: 4, type: "phone", name: "Samsung Galaxy", bond: 200 },
    { id: 5, type: "phone", name: "Nokia", bond: 150 },
    { id: 6, type: "phone", name: "Xiaomi", bond: 100 },
    { id: 7, type: "charger", name: "iPhone Charger", bond: 45 },
    { id: 8, type: "charger", name: "Samsung Charger", bond: 30 },
    { id: 9, type: "charger", name: "Nokia Charger", bond: 25 },
    { id: 10, type: "charger", name: "Xiaomi Charger", bond: 25 },
  ];

  //Declare "state"
  const [phoneBorrow, setPhoneBorrow] = useState(0); // 0 = 'none'
  //Handle "onChange" event
  let addPhone = (selectedOption) => {
    selectedOption === "none"
      ? setPhoneBorrow(0)
      : setPhoneBorrow(Number(selectedOption));
    //Update totalBond
    let updateId = 0;
    selectedOption === "none"
      ? (updateId = 0)
      : (updateId = Number(selectedOption));
    let updateBond =
      courtesyList.filter((item) => {
        return item.id === updateId;
      })[0].bond +
      courtesyList.filter((item) => {
        return item.id === chargerBorrow;
      })[0].bond;
    const selectedPhone = courtesyList.find(
      (item) => item.id === Number(selectedOption)
    );
    //Send data upto Parent by calling callback function "passDataToParent"
    passDataToParent(updateBond);
    sendSelectedPhone(selectedPhone);
  };

  const [chargerBorrow, setChargerBorrow] = useState(0);
  // Handle "onChange" event
  let addCharger = (selectedOption) => {
    selectedOption === "none"
      ? setChargerBorrow(0)
      : setChargerBorrow(Number(selectedOption));
    //Update totalBond
    let updateId = 0;
    selectedOption === "none"
      ? (updateId = 0)
      : (updateId = Number(selectedOption));
    let updateBond =
      courtesyList.filter((item) => {
        return item.id === phoneBorrow;
      })[0].bond +
      courtesyList.filter((item) => {
        return item.id === updateId;
      })[0].bond;
    const selectedCharger = courtesyList.find(
      (item) => item.id === Number(selectedOption)
    );
    //Send data upto Parent by calling callback function "passDataToParent"
    passDataToParent(updateBond);
    sendSelectedCharger(selectedCharger);
  };

  //--------------------------------
  //Component UI: HTML Rendering
  return (
    <>
      <h2>Courtesy Phone</h2>
      <h4>Choose a phone: </h4>
      <div class="row mt-2 ms-3">
        <label class="col-12 col-md-12 col-lg-4">Item Type </label>
        <select
          class="col-12 col-md-12 col-lg-7"
          id="phoneList"
          onChange={(selected) => addPhone(selected.target.value)}>
          <option value="none" selected>
            None
          </option>
          {courtesyList.map((item) => {
            if (item.type.toLowerCase() === "phone") {
              return <option value={item.id}>{item.name}</option>;
            }
            return null;
          })}
        </select>
      </div>
      <h4>Choose a charger: </h4>
      <div class="row mt-2 ms-3">
        <label class="col-12 col-md-12 col-lg-4">Item Type </label>
        <select
          class="col-12 col-md-12 col-lg-7"
          id="chargerList"
          onChange={(selected) => addCharger(selected.target.value)}>
          <option value="none" selected>
            None
          </option>
          {courtesyList.map((item) => {
            if (item.type.toLowerCase() === "charger") {
              return <option value={item.id}>{item.name}</option>;
            }
            return null;
          })}
        </select>
      </div>
      {/*Table of added Courtesy items*/}
      <div class="row mt-2 ms-3 me-3 bg-white">
        <table class="table table-bordered" id="borrowItems">
          <thead>
            <tr>
              <th style={{ width: "70%" }}>Item</th>
              <th style={{ width: "30%" }}>Cost</th>
            </tr>
          </thead>

          {/*Display all items in the state in the table */}
          {phoneBorrow === 0 ? null : (
            <tr>
              <td>
                {
                  courtesyList.filter((item) => {
                    return item.id === phoneBorrow;
                  })[0].name
                }
              </td>
              <td>
                $
                {
                  courtesyList.filter((item) => {
                    return item.id === phoneBorrow;
                  })[0].bond
                }
              </td>
            </tr>
          )}
          {chargerBorrow === 0 ? null : (
            <tr>
              <td>
                {
                  courtesyList.filter((item) => {
                    return item.id === chargerBorrow;
                  })[0].name
                }
              </td>
              <td>
                $
                {
                  courtesyList.filter((item) => {
                    return item.id === chargerBorrow;
                  })[0].bond
                }
              </td>
            </tr>
          )}
        </table>
      </div>
    </>
  );
}

export default FormCourtesyPhone;
