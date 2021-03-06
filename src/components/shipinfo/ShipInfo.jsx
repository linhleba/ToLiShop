import React, { useState, useEffect } from 'react';
import Controls from '../controls/Controls';
import { Grid, TextField } from '@material-ui/core';
import { useForm, Form } from '../useForm/useForm';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/ducks/snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import callAPI from '../../utils/apiCaller';
import Axios from 'axios';
import './shipinfo.css';
import * as ImageConfig from '../../constants/ImageConfig';

// const URL_UPLOAD_IMAGE =
//   'http://api.cloudinary.com/v1_1/dr6oretlc/image/upload';

// const NAME_UPLOAD_PRESET = 'avatarprofile';
const ShipInfo = ({ setInfo, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [initialFValues, setInitialFValues] = useState({
    username: '',
    name: '',

    phone: '',
    address: '',
  });
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('phone' in fieldValues) {
      if (!fieldValues.phone) {
        temp.phone = '';
      } else {
        temp.phone =
          fieldValues.phone.length > 8 ? '' : 'Số điện thoại không hợp lệ.';
      }
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        name: values.name,
        // email: values.email,
        telephone: values.phone,
        address: values.address,
        // photo: values.photo,
      };
      let profile = localStorage.getItem('profile');
      let access_jwt_token = JSON.parse(profile).access_jwt_token;
      await callAPI('api/account/update', 'put', payload, {
        authorization: access_jwt_token,
      }).then((res) => {
        if (res.status == 200) {
          dispatch(
            setSnackbar(true, 'success', 'Cập nhật thông tin thành công!'),
          );
          setInfo({
            name: values.name ? values.name : 'Chưa xác định',
            address: values.address ? values.address : 'Chưa xác định',
            phone: values.phone ? values.phone : 'Chưa xác định',
          });
          setOpenPopup(false);
        } else {
          dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra!'));
        }
      });
    }
  };
  //   const uploadImage = (file) => {
  //     const formData = new FormData();
  //     formData.append('file', file[0]);

  //     formData.append('upload_preset', ImageConfig.NAME_UPLOAD_PRESET);

  //     Axios.post(ImageConfig.URL_UPLOAD_IMAGE, formData).then((res) => {
  //       setValues({
  //         ...values,
  //         ['photo']: res.data.url,
  //       });
  //     });
  //   };

  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile).access_jwt_token;
    await callAPI('api/account/info', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      setValues({
        username: res.data.username,
        name: res.data.name ? res.data.name : '',
        email: res.data.email ? res.data.email : '',
        phone: res.data.telephone ? res.data.telephone : '',
        address: res.data.address ? res.data.address : '',
        photo: res.data.photo ? res.data.photo : null,
      });
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Thông tin giao hàng </h2>
      <Grid container>
        <Controls.Input
          disabled
          name="username"
          label="Tên tài khoản"
          value={values.username}
          // variant="filled"
        />
        <Controls.Input
          name="name"
          label="Họ tên"
          value={values.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <Controls.Input
          name="phone"
          type="tel"
          label="Số điện thoại"
          value={values.phone}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+84</InputAdornment>
            ),
          }}
          error={errors.phone}
        />
        <Controls.Input
          name="address"
          label="Địa chỉ"
          value={values.address}
          onChange={handleInputChange}
          error={errors.address}
        />
      </Grid>

      <Controls.Button type="submit" text="Lưu thay đổi" />
      {/* <Controls.Button
        text="Đặt lại"
        color="default"
        onClick={() => resetForm()}
      /> */}
    </Form>
  );
};

export default ShipInfo;
