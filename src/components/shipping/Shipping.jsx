import React, { useState, useEffect } from 'react';
import './shipping.css';
import apiCaller from '../../utils/apiCaller';
import PopUp from '../popup/PopUp';
import ShipInfo from '../shipinfo/ShipInfo';
import { useHistory } from 'react-router-dom';

const Shipping = ({ setStep }) => {
  const history = useHistory();
  const [openPopup, setOpenPopup] = useState(false);
  const [info, setInfo] = useState([]);
  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile)?.access_jwt_token;
    // console.log('access_token is', access_jwt_token);
    await apiCaller('api/account/info', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      // console.log('ket qua tra ve hien tai', res);
      setInfo({
        username: res?.data?.username ? res.data.username : history.push('/'),
        name: res?.data?.name ? res.data.name : 'Chưa xác định',
        address: res?.data?.address ? res.data.address : 'Chưa xác định',
        phone: res?.data?.telephone ? res.data.telephone : 'Chưa xác định',
      });
    });
    // console.log('info is', info);
  }, []);
  const handleEdit = () => {
    setOpenPopup(true);
  };
  return (
    <div className="shipping-container">
      <h2 className="shipping-container__tittle">Địa chỉ giao hàng</h2>
      <h4 className="shipping-container__options">Chọn địa chỉ giao hàng</h4>
      <div className="address-list ">
        <p className="shipping__name">{info.name}</p>
        <p className="shipping__address">Địa chỉ: {info.address}</p>
        <p className="shipping__phone">Số điện thoại: +84{info.phone}</p>
        <div className="shipping__action">
          <button
            type="submit"
            class="btn saving-address bg-main"
            onClick={() => {
              setStep((preStep) => preStep + 1);
            }}
          >
            Xác nhận
          </button>
          <button
            type="button"
            class="edit-address bg-main"
            onClick={handleEdit}
          >
            Sửa
          </button>
        </div>
      </div>
      <PopUp
        // title="Đăng nhập"
        isTitle="false"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ShipInfo setInfo={setInfo} setOpenPopup={setOpenPopup} />
      </PopUp>
    </div>
  );
};

export default Shipping;
