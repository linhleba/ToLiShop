import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import FormatPrice from '../../utils/formatPrice/formatPrice';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    // validate while changing input
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const handleInputPrice = (e) => {
    const { name, value } = e.target;
    // console.log('value price', value);
    const n = parseInt(value.replace(/\D/g, ''), 10);
    const formatValue = !n ? 0 : n.toLocaleString();
    setValues({
      ...values,
      [name]: formatValue,
      // validate while changing input
      if(validateOnChange) {
        validate({ [name]: formatValue });
      },
    });
  };

  const handleAutoCompleteChange = (e, vals) => {
    const id = e.target.id.split('-');
    // format id: categories-option-0 => get the first value
    const name = id[0];
    setValues({
      ...values,
      [name]: vals,
    });
    // validate while changing input
    // if (validateOnChange) validate({ [name]: vals });
  };

  const handleCreatableInput = (field, value) => {
    // const id = e.target.id.split('-');
    // format id: categories-option-0 => get the first value
    const name = value.name;
    setValues({
      ...values,
      [name]: field,
    });
    // validate while changing input
    // if (validateOnChange) validate({ [name]: vals });
  };

  const resetForm = () => {
    // set the initial values and no errors
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleAutoCompleteChange,
    handleCreatableInput,
    resetForm,
    handleInputPrice,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
