import NavBar from "./components/NavBar";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Contact } from "./components/Pages/Contact";
import { Summarise } from "./components/Pages/Summarise";
import { Rag } from "./components/Pages/Rag";


function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/summarise" element={<Summarise />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rag" element={<Rag />} />
          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
