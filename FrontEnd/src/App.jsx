import Form from "./components/Form";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SharedLayout from "./components/sharedLayout";
import { Routes, Route } from "react-router";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default App;
