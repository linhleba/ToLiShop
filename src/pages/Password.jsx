import React from 'react';
import Controls from '../components/controls/Controls';
import { Grid, TextField } from '@material-ui/core';
import { useForm, Form } from '../components/useForm/useForm';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../components/redux/ducks/snackbar';
import callAPI from '../utils/apiCaller';

const Password = () => {
  const dispatch = useDispatch();
  const initialFValues = {
    oldPass: '',
    newPass: '',
    reconfirmNewPass: '',
  };

  //   const { handleInfo } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('oldPass' in fieldValues)
      temp.oldPass = fieldValues.oldPass
        ? ''
        : 'Trường này không được để trống.';
    if ('newPass' in fieldValues)
      temp.newPass = fieldValues.newPass
        ? ''
        : 'Trường này không được để trống.';
    if ('reconfirmNewPass' in fieldValues)
      temp.reconfirmNewPass = fieldValues.reconfirmNewPass
        ? ''
        : 'Trường này không được để trống.';

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
      // Check newPassword is matched or not
      if (values.newPass != values.reconfirmNewPass) {
        dispatch(setSnackbar(true, 'error', 'Mật khẩu mới không khớp!'));
      } else {
        let profile = localStorage.getItem('profile');
        let access_jwt_token = JSON.parse(profile).access_jwt_token;
        await callAPI(
          'api/account/changepassword',
          'put',
          {
            password: values.oldPass,
            newPassword: values.newPass,
          },
          {
            authorization: access_jwt_token,
          },
        ).then((res) => {
          if (res.data.data) {
            // console.log(res);
            dispatch(
              setSnackbar(true, 'success', 'Thay đổi mật khẩu thành công!'),
            );
            resetForm();
          } else {
            // console.log(res);
            dispatch(setSnackbar(true, 'error', 'Mật khẩu cũ không đúng!'));
          }
        });
      }

      // addOrEdit(values, resetForm);
      // handle posts
      //   handleInfo(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2> Đổi mật khẩu </h2>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="oldPass"
            label="Mật khẩu hiện tại"
            value={values.oldPass}
            type="password"
            onChange={handleInputChange}
            error={errors.oldPass}
          />
          <Controls.Input
            name="newPass"
            label="Mật khẩu mới"
            value={values.newPass}
            type="password"
            onChange={handleInputChange}
            error={errors.newPass}
          />
          <Controls.Input
            name="reconfirmNewPass"
            label="Xác nhận mật khẩu mới"
            value={values.reconfirmNewPass}
            type="password"
            onChange={handleInputChange}
            error={errors.reconfirmNewPass}
          />
        </Grid>
      </Grid>
      <Controls.Button type="submit" text="Lưu thay đổi" />
      <Controls.Button
        text="Đặt lại"
        color="default"
        onClick={() => resetForm()}
      />
    </Form>
  );
};

export default Password;
