import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";

export default function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      if (!localStorage.getItem("chat-app-user")) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="/setavatar" element={<SetAvatar />} />
        {/* <Route path="/stickers" element={<Stickers />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
