import React from "react";
import { Switch } from "@material-tailwind/react";

const SwitchToggle = () => {
  return (
    <div className="flex w-max gap-4 absolute h-10">
      <Switch crossOrigin="" color="blue" defaultChecked />
    </div>
  );
};

export default SwitchToggle;
