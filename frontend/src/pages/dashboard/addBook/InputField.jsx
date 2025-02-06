import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required: true })}
          className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 
                   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 
                   dark:focus:border-blue-500 dark:placeholder-gray-400"
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required: true })}
          className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 
                   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 
                   dark:focus:border-blue-500 dark:placeholder-gray-400"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;