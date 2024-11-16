import { useState } from "react";

import iconArrow from "../assets/images/icon-arrow.svg";

import InputField from "./Inputs/InputField";

const MainArea = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [age, setAge] = useState({});

  const [errors, setErrors] = useState({});

  const validateDate = (day, month, year) => {
    const errors = {};

    if (!day || !month || !year) {
      errors.empty = "All fields are required.";
      return errors;
    }

    if (day < 1 || day > 31) {
      errors.day = "Day must be between 1 and 31.";
    }

    if (month < 1 || month > 12) {
      errors.month = "Month must be between 1 and 12.";
    }

    const inputDate = new Date(+year, +month - 1, +day);
    const today = new Date();

    if (inputDate > today) {
      errors.future = "Date cannot be in the future.";
    }

    if (
      inputDate.getFullYear() !== +year ||
      inputDate.getMonth() !== +month - 1 ||
      inputDate.getDate() !== +day
    ) {
      errors.invalid = "Invalid date.";
    }

    return errors;
  };

  const calculateAge = (day, month, year) => {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (
      birthDate.getDate() === today.getDate() &&
      birthDate.getMonth() === today.getMonth() &&
      birthDate.getFullYear() === today.getFullYear()
    ) {
      return { years: 0, months: 0, days: 0 }; 
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const handleSubmit = () => {
    const validationErrors = validateDate(day, month, year);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const { years, months, days } = calculateAge(day, month, year);
      setAge({ years, months, days });
    }
  };

  return (
    <div className="flex flex-col px-8 py-8 gap-2 bg-neutral-white rounded-2xl rounded-br-[100px]">
      <div className="flex items-center gap-3 px-[2rem]">
        <InputField
          error={errors.day}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          label={"DAY"}
          placeholder={"DD"}
          maxLength={2}
        />
        <InputField
          error={errors.month}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label={"MONTH"}
          placeholder={"MM"}
          maxLength={2}
        />
        <InputField
          value={year}
          onChange={(e) => setYear(e.target.value)}
          label={"YEAR"}
          placeholder={"YYYY"}
          maxLength={4}
        />
      </div>
      {errors.empty && (
        <p className="text-red-500 font-light text-xs">{errors.empty}</p>
      )}
      {errors.future && (
        <p className="text-red-500 font-light text-xs">{errors.future}</p>
      )}
      {errors.invalid && (
        <p className="text-red-500 font-light text-xs">{errors.invalid}</p>
      )}

      <div className="flex items-center justify-between w-full">
        <hr className="border w-full" />
        <button
          onClick={handleSubmit}
          className="bg-primary-purple rounded-full p-2 transition-all  hover:bg-neutral-off-black"
        >
          <img src={iconArrow} className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-primary-purple text-5xl italic">
            {age.years || "--"}
          </h1>
          <h2 className="font-bold text-5xl italic">years</h2>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-primary-purple text-5xl italic">
            {age.months || "--"}
          </h1>
          <h2 className="font-bold text-5xl italic">months</h2>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-primary-purple text-5xl italic">
            {age.days || "--"}
          </h1>
          <h2 className="font-bold text-5xl italic">days</h2>
        </div>
      </div>
    </div>
  );
};

export default MainArea;
