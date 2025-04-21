import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Crick = () => {
  return (
    <div
      className="w-[60px] h-[60px] flex items-center justify-center overflow-hidden"
      style={{ maxWidth: "", maxHeight: "500px" }}
    >
      <DotLottieReact
        src="https://lottie.host/7799a9b0-000a-4c33-a54d-d36aca98e443/h330EIwnng.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
