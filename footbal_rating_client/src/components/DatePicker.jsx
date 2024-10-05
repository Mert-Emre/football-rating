import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "../styles/DatePicker.css";

import { setPickerDate } from "../store";

function DatePicker() {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.date.day);
  const selectedMonth = useSelector((state) => state.date.month);
  const selectedYear = useSelector((state) => state.date.year);
  const [pickerMonth, setPickerMonth] = useState(selectedMonth);
  const [pickerYear, setPickerYear] = useState(selectedYear);

  const handleClick = (day, month, year) => {
    dispatch(setPickerDate({ day, month, year }));
  };
  const decreaseMonth = () => {
    setPickerMonth((month) => {
      if (pickerMonth === 0) {
        setPickerYear(pickerYear - 1);
        return 11;
      }
      return month - 1;
    });
  };

  const increaseMonth = () => {
    setPickerMonth((month) => {
      if (pickerMonth === 11) {
        setPickerYear(pickerYear + 1);
        return 0;
      }
      return month + 1;
    });
  };
  const calcCol = (y, m, d) => {
    return new Date(y, m, d).getDay() + 1;
  };

  const yearAndMonth = (y, m) => {
    return (
      <div className="picker-year-month">
        <div onClick={decreaseMonth} className="arrow-icon">
          <AiOutlineArrowLeft />
        </div>
        <div>{monthString(m) + " " + y}</div>
        <div onClick={increaseMonth} className="arrow-icon">
          <AiOutlineArrowRight />
        </div>
      </div>
    );
  };

  const monthString = (month) => {
    if (month > 11 || month < 0) {
      return;
    }
    return [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ][month];
  };

  const dayNamesRow = () => {
    const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(
      (day) => {
        return <div className="day-name">{day}</div>;
      }
    );

    return <div className="day-names-row">{dayNames}</div>;
  };
  const createDays = (y, m) => {
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const days = (isNaN(daysInMonth) ? [] : [...Array(daysInMonth).keys()]).map(
      (day) => {
        const className =
          day + 1 === selectedDay &&
          pickerMonth === selectedMonth &&
          pickerYear === selectedYear
            ? "day day-active"
            : "day";
        return (
          <div
            className={className}
            style={{
              gridColumn: `${calcCol(y, m, day)} / span 1`,
            }}
            onClick={() => handleClick(day + 1, pickerMonth, pickerYear)}
          >
            {day + 1}
          </div>
        );
      }
    );
    return <div className="days-container">{days}</div>;
  };
  return (
    <div className="date-picker">
      <>{yearAndMonth(pickerYear, pickerMonth)}</>
      <>{dayNamesRow()}</>
      <>{createDays(pickerYear, pickerMonth)}</>
    </div>
  );
}

export default DatePicker;
