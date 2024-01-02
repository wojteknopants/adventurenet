import React from "react";

const DropdownMenu = ({
  handleDropdown,
  isOpen,
  placeHolder,
  dropDownContent,
  setValue,
}: {
  placeHolder: string;
  handleDropdown: () => void;
  isOpen: boolean;
  dropDownContent: any;
  setValue: (arg: any) => void;
}) => {
  return (
    <>
      <div className="flex flex-col relative">
        <button
          onClick={handleDropdown}
          data-dropdown-toggle="dropdown"
          className="flex flex-col justify-center items-center shadow-md px-4 grow text-mainGray bg-white  rounded-xl relative"
          type="button"
        >
          {placeHolder}
          <svg
            className="w-2.5 h-2.5 absolute bottom-1 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="z-10 absolute top-14 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-md">
            <ul
              onClick={handleDropdown}
              className="p-2 text-sm text-mainGray flex flex-col justify-center items-center"
              aria-labelledby="dropdownDefaultButton"
            >
              {dropDownContent.map((item: any) => (
                <li
                  onClick={() => setValue(item)}
                  className="  hover:bg-mainGray/20 hover:text-mainBlue px-4 py-2 rounded-lg cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
