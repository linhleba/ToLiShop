import React, { useState, useEffect } from 'react';
import Progress from '../components/progress/Progress';
import Payment from '../components/Payment/Payment';
import Shipping from '../components/shipping/Shipping';

const Order = () => {
  const [step, setStep] = useState(2);
  return (
    <div>
      <Progress step={step} />
      {step == 2 ? <Shipping setStep={setStep} /> : <Payment />}
    </div>
  );
};

export default Order;
