import React, { useState, useEffect } from 'react';
import './progress.css';
import * as ReactDOM from 'react-dom';

const Progress = ({ step }) => {
  // const [step, setStep] = useState(2);
  const [progress, setProgress] = useState(50);
  const circles = document.querySelectorAll('.circle');

  // setProgress(50);

  // useEffect(() => {
  //   circles.forEach((circle, index) => {
  //     if (index <= step) {
  //       circle.classList.add('active');
  //     } else {
  //       circle.classList.remove('active');
  //     }
  //   });
  // }, []);

  useEffect(() => {
    console.log('circles', circles);
    circles.forEach((circle, index) => {
      console.log('vao day nua');
      if (index <= step) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
    setProgress((step / circles.length) * 100);
  }, [step]);

  return (
    <div className="progress__container">
      {/* <h1 className="progress-bar">Step</h1> */}
      <div className="progress-container">
        <div style={{ width: `${progress}%` }} className="progress"></div>
        <div className="progress-container__item">
          <div className="progress-text">Đăng nhập</div>
          <div className="circle active">1</div>
        </div>
        <div className="progress-container__item">
          <div className="progress-text">Địa chỉ giao hàng</div>
          <div className="circle active">2</div>
        </div>
        <div className="progress-container__item">
          <div className="progress-text">Thanh toán</div>
          <div className="circle">3</div>
        </div>
        {/* <div className="progress-container__item">
          <div className="progress-text">text 4</div>
          <div className="circle ">4</div>
        </div> */}
      </div>

      {/* <button
        className="btn-primary"
        onClick={() => {
          // console.log(circle);
          if (step < circles.length) {
            console.log(circles.length);
            setStep((preStep) => preStep + 1);
          }
        }}
      >
        Sau
      </button> */}
    </div>
  );
};

export default Progress;
