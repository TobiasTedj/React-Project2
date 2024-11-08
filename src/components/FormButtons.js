import { Link } from "react-router-dom";

function FormButtons() {
  //Component UI: HTML Rendering
  return (
    <>
      <input
        type="submit"
        className="btn me-3 text-dark bg-white"
        style={{ width: "5em" }}
        value="SUBMIT"
      />
      <input
        type="reset"
        className="btn me-3 text-dark bg-white"
        style={{ width: "5em" }}
        value="RESET"
      />
      <Link
        to="/faq"
        className="btn me-3 text-dark bg-white"
        style={{ width: "5em" }}>
        FAQ
      </Link>
    </>
  );
}

export default FormButtons;
