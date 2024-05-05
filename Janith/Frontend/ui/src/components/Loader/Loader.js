import React from "react";
import { trefoil } from "ldrs";

trefoil.register();

const Loader = () => {
  return (
    <l-trefoil
      size="80"
      stroke="4"
      stroke-length="0.25"
      bg-opacity="0.1"
      speed="1.4"
      color="black"
    ></l-trefoil>
  );
};

export default Loader;