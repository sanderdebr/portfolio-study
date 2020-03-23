import React from "react";

const Home = props => {
  let markup;
  for (let i = 0; i < 10000; i++) {
    markup += "<h1>hoi</h1>";
  }
  return markup;
};

export default Home;
