import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

export default function Loading({loading}) {


  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#36d7b7" loading={loading} size={50} />
    </div>
  );
}