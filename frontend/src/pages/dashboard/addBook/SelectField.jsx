import React from 'react';

const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</label>
      <select
        {...register(name, { required: true })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300
                 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 
                 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="dark:bg-gray-800 dark:text-gray-200"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;