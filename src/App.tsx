import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/useUserContext";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
//Components

import About from "./pages/About/About";
//Pages
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";

function App() {
  const [customer, setCustomer] = useState<string>("");
  const customerSend = (name: string) => {
    setCustomer(name);
  };

  return (
    <div className="App">
      <UserProvider value={{ customer }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home customerSend={customerSend} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart/" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
