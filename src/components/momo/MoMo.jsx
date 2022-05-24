import React, { useState, useEffect } from 'react';
import apiCaller from '../../utils/apiCaller';
const MoMo = () => {
  const [testData, setTestData] = useState(null);
  useEffect(() => {
    apiCaller('api/momo', 'post').then((res) => {
      window.location.href = res.data.url;
      setTestData(res.data.url);
      console.log('res is', res);
    });
  }, []);
  return <div>{testData}</div>;
};

export default MoMo;
