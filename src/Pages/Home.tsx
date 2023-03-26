import React, { useState } from "react";
import CurrentLocation from "../Components/CurrentLocation";



const Home = () => {
const [query,setQuery] = useState<string>('')
  
  return (
    <div>
      <CurrentLocation />
    </div>
  );
};

export default Home;
