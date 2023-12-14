import { Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";

function App() {
  return (
    <Routes>
      <Route path = "/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route  index  element={<Dashboard />} />
    </Routes>
  );
}

export default App;
