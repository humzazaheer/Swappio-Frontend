import Header from "@layout/header";
import { Outlet } from "react-router";
import Footer from "./footer";


const Base = () => {
    
  return (
    <>
      <Header />
      <main className="main-content min-h-screen py-5">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};
export default Base;
