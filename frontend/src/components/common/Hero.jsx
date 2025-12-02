import React from "react";

const Hero = ({ title, subtitle, bgImage }) => (
  <section
    className="relative home-hero bg-cover bg-center"
    style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
  >
    {bgImage && <div className="absolute inset-0 bg-black bg-opacity-50"></div>}
    <div className="container relative z-10 text-center">
      <h1 className="home-hero-title">{title}</h1>
      {subtitle && <p className="home-hero-subtitle">{subtitle}</p>}
    </div>
  </section>
);

export default Hero;
