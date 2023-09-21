import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Guides } from "../pages/guides";
import { About } from "../pages/about";
import { Contact } from "../pages/contact";
import { Pets } from "../pages/pets";
import { Home } from "../pages/home";
import { Inform } from "../pages/inform";
import { Events } from "../pages/events";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const App = ()=>{
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>

            <Route element={<UnAuthenticatedLayout/>}>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Route>
            
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/pets" element={<Pets/>} />
              <Route path="/guides" element={<Guides/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/inform" element={<Inform/>} />
              <Route path="/event" element={<Events/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const AuthLayout= ()=>{
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
}

const UnAuthenticatedLayout = ()=>{
  return (
    <div className="un-authenticate-page">
    <Outlet/>
    </div>
  );
}