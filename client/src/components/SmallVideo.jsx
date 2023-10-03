import React from "react";

export default function SmallVideo({ vid }) {
  return (
    <div className="flex">
      <div className="bg-white">
        <video src={vid}></video>
      </div>
    </div>
  );
}
