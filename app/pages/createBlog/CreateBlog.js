import React, { useCallback } from "react";

// formik
import { useFormik } from 'formik';

// material ui
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// components
import Editor from './editor';

import useAddBlog from './useAddBlog';
import useFormAlert from './useFormAlert';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    marginBottom: 0,
  }
}));

const INITIAL_STATE = {
  title: '',
  content: '',
};


function CreateBlog() {
  const theme = useTheme();
  const classes = useStyles();
  const { addBlog, loading, error, data } = useAddBlog();
  const { handleSubmit, values, handleChange, setValues } = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit: (values, { }) => addBlog({ ...values, createdOn: new Date().getTime() }),
  });
  const { alertType, alertMessage, shouldShowAlert, closeAlert } = useFormAlert({ error, data });

  const handleContentValueChange = useCallback(val => setValues({
    ...values,
    content: val,
  }), [values, setValues]);

  return (
    <Box display="flex" mt={4}>
      <Container maxWidth="md">
        <Box mb={2} display="flex" jsutifyContent="center" >
          <Typography variant="h5" component="h5">
            New Blog content
          </Typography>
        </Box>
        <Paper>
          <Grid container>
            <form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
              <Grid item xs={12}>
                <InputBase
                  required
                  fullWidth
                  id="standard-basic"
                  placeholder="Enter title here"
                  name="title"
                  variant="standard"
                  className={`${classes.form} ${classes.title}`}
                  value={values.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor onChange={handleContentValueChange} />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  className={classes.form}
                  variant="contained"
                  color="primary"
                  disabled={!!loading}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
        <Snackbar open={shouldShowAlert} autoHideDuration={3000} onClose={closeAlert}>
          <Alert elevation={6} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default CreateBlog;