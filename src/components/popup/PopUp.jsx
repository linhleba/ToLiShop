import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Controls from '../controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
}));

const PopUp = (props) => {
  const { title, children, openPopup, setOpenPopup, isTitle } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      {isTitle ? (
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Controls.ActionButton
              color="main"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <CloseIcon />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
      ) : null}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopUp;
