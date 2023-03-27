import React from "react";
import axios from "axios";
import "./sass/current/current.css";

// https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed

interface Prop {
  name: string;
}

const RenderCurrent = ({ name }: Prop) => {
  return (
    <div className="current">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe id="gmap_canvas" src={`https://maps.google.com/maps?q=${name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
          <br />
        </div>
      </div>
    </div>
  );
};

export default RenderCurrent;
