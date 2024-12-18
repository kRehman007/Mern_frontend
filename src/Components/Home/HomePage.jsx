import React from "react";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Nav from "./Nav";
import Footer from "./Footer";
import Mentorship from "./Mentorship";

const HomePage = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Mentorship />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
