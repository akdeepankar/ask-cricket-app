// components/LottiePlaceholder.jsx
"use client";
import Lottie from "lottie-react";
import emptyStateAnimation from "@/public/lottie/cricket.json"; // adjust if needed
export default function LottiePlaceholder() {
  return (
    <div className="lottie-wrapper" style={{ width: "450px", height: "450px", margin: "0 auto" }}>
      <Lottie animationData={emptyStateAnimation} loop={true} />
    </div>
  );
}
