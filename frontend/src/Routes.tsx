import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Clientes from "./pages/Clientes";

function AppRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;