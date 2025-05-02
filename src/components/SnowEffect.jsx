import { useEffect } from "react";

const SnowEffect = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js";
    script.onload = () => {
      new window.Snowflakes();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default SnowEffect;
