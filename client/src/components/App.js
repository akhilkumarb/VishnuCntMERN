import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import { AuthProvider } from "./AuthProvider.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home/*"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
