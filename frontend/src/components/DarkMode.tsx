import React, { useEffect, useState } from "react";
import { iconLight, iconDark } from "../assets";

const DarkMode = () => {
  const [theme, setTheme] = useState<null | "dark" | "light">(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleThemeSwitch}
        className=" text-lg rounded-md mt-2 px-3.5 "
      >
        {theme === "dark" ? <img src={iconDark} /> : <img src={iconLight} />}
      </button>
    </div>
  );
};

export default DarkMode;
