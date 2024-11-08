import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AdvancedJS from "./components/AdvancedJS";
import FAQ from "./components/FAQ";
import Invoice from "./components/Invoice";
import { HashRouter as HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/*React Fragment: serve as parent component in JSX and doesn't add anything to the DOM */}
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedJS" element={<AdvancedJS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
