import { Link } from "react-router-dom";

//Function Component
function Header() {
  const headerStyle = {
    minHeight: "15vh",
    backgroundColor: "#2C3E50",
  };
  const taglineStyle = {
    minHeight: "15vh",
    backgroundColor: "#2C3E50",
  };
  //Component UI: HTML Rendering
  return (
    <>
      <div className="container-fluid">
        <header className="row" style={headerStyle}>
          <div
            className="col-12 col-md-12 col-lg-8 text-center text-white display-5"
            style={taglineStyle}>
            {" "}
            Phone Fix Booking System
          </div>
          <div className="col-12 col-md-12 col-lg-4">
            <div className="row">
              <Link
                to="/"
                class="col-12 col-md-6 col-lg-6 p-0 m-0 bg-info border border-dark text-center text-white"
                style={{ textDecoration: "none" }}>
                HOME
              </Link>
              <Link
                to="/advancedJS"
                class="col-12 col-md-6 col-lg-6 p-0 m-0 bg-info border border-dark text-center text-white"
                style={{ textDecoration: "none" }}>
                EXTENSION
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
