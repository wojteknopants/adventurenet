import React, { useEffect, useState } from "react";
import { iconLight, iconDark } from "../assets";

const DarkMode = () => {
  const [theme, setTheme] = useState<null | "dark" | "light">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div>
      <div className="flex justify-between border-b p-2 items-center text-mainGray">
        <p>Change theme</p>
        <button
          type="button"
          onClick={handleThemeSwitch}
          className="text-mainBlue border border-mainBlue rounded-lg p-1"
        >
          {theme === "dark" ? "dark" : "light"}
        </button>
      </div>
    </div>
  );
};

export default DarkMode;
