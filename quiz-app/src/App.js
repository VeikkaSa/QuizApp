import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import Quiz from "./Quiz";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<CreateQuiz />} />
            <Route path="/quiz" element={<Quiz />} />
        </Routes>
    </Router>
  );
}

export default App;