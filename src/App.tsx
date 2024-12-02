import { Routes, Route } from "react-router-dom";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import { Home } from "./pages/home/home";
import { LearningPage } from "./pages/learning";

function App() { 

  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/editor" element={<CodeEditor />} />
      </Routes>
    // </Router>
  );
}

export default App;

