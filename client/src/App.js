import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Grammar from "./pages/Grammar";
import Test from "./pages/Test";
import Phrases from "./pages/Phrases";
import Progress from "./pages/Progress";

// Newly created NO-AI modules
import Speaking from "./pages/Speaking";
import Scenarios from "./pages/Scenarios";
import Reading from "./pages/Reading";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/test" element={<Test />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/progress" element={<Progress />} />
        
        {/* Advanced Offline Modules */}
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;