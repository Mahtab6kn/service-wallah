import React from "react";

const Heading = ({ icon, title, buttons }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {icon && icon}
          <h2 className="text-sm lg:text-lg">{title}</h2>
        </div>

        <div className="flex gap-4 items-center">
          {buttons &&
            buttons.map((button, index) => <div key={index}>{button}</div>)}
        </div>
      </div>

      <div
        className={`rounded-full w-full bg-gradient-to-r from-red-400 to-pink-400 h-1`}
      ></div>
    </div>
  );
};

export default Heading;
