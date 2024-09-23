import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input, Option, Select } from "@material-tailwind/react";
import React from "react";

const TableHeading = ({ setSearchQuery, setStatus }) => {
  return (
    <div className="bg-white p-4 rounded-lg border flex justify-between">
      <h1 className="text-2xl font-bold text-blue-gray-500">All Bookings</h1>
      <div className="w-1/2 flex gap-4">
        <Input
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          label="Search By ID, Name, Phone number"
          icon={<MagnifyingGlassIcon className="w-4 h-4" />}
        />
        <div className="w-1/2">
          <Select
            color="teal"
            label="Status"
            onChange={(val) => setStatus(val)}
          >
            <Option value="all">All</Option>
            <Option value="completed">Completed</Option>
            <Option value="notCompleted">Not completed</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TableHeading;
