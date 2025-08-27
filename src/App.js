import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
       
      </Routes>
    </Router>
  );
}

export default App;
