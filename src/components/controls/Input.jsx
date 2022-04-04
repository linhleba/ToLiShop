import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export default function Input(props) {
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
    props,
    ref,
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="đ"
      />
    );
  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    variant = 'outlined',
    InputProps,
    type,
    ...other
  } = props;
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={InputProps}
      type={type}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
