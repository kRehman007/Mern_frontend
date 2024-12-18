import React, { useState } from "react";
import Detail from "./Detail";
import Detail2 from "./Detail2";
import ReviewAndRatings from "./ReviewAndRatings";
import FAQ from "./FAQ";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";

const DetailPage = () => {
  return (
    <div>
      <Nav />
      <Detail />
      <Detail2 />
      <ReviewAndRatings />
      <FAQ />
      <Footer />
    </div>
  );
};

export default DetailPage;
