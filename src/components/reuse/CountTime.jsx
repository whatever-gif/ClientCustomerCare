// Import các hook từ thư viện react
import React, { useEffect, useState } from "react";

// Component CountTime nhận prop là baseTime
const CountTime = ({ baseTime }) => {
  // Nếu không có baseTime thì trả về Fragment rỗng
  if (!baseTime) return <></>;

  // Hàm parseTime chuyển đổi chuỗi thời gian thành object gồm giờ, phút, giây
  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return { hours, minutes, seconds };
  };

  // Sử dụng useState để quản lý trạng thái thời gian
  const [time, setTime] = useState(parseTime(baseTime));

  // Sử dụng useEffect để cập nhật thời gian sau mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      let crTime = time;
      crTime.seconds++;
      if (crTime.seconds === 60) {
        crTime.seconds = 0;
        crTime.minutes++;
      }
      if (crTime.minutes === 60) {
        crTime.minutes = 0;
        crTime.hours++;
      }
      setTime({ ...crTime });
    }, 1000);
    // Dọn dẹp khi component unmount
    return () => clearInterval(timer);
  }, []);

  // Hàm formatTime định dạng thời gian (nếu nhỏ hơn 10 thì thêm số 0 đằng trước)
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Trả về JSX
  return (
    <div>
      {formatTime(time.hours)}:{formatTime(time.minutes)}:
      {formatTime(time.seconds)}
    </div>
  );
};

// Xuất component CountTime
export default CountTime;