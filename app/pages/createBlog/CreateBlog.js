import React from "react";

// formik
import { Field, Form, Formik, FormikProps } from 'formik';

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

// components
import Editor from './editor';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    marginBottom: 0,
  }
}));

function CreateBlog() {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box display="flex" mt={3}>
      <Container maxWidth="md">
        <Box ml={2} mb={2}>
          <Typography variant="h5" component="h5">
            creating new blog a simpler way
          </Typography>
        </Box>
        <Paper>
          <Grid container>
            <Formik initialValues={{ title: '', content: '' }} onSubmit={(values, { }) => console.log('====>values ', values)}>
              {(props) => (
                <form onSubmit={props.handleSubmit} autoComplete="off" style={{ width: '80%' }}>
                  <Grid item xs={12}>
                    <InputBase
                      required
                      fullWidth
                      id="standard-basic"
                      placeholder="Enter title here"
                      name="title"
                      variant="standard"
                      className={`${classes.form} ${classes.title}`}
                      value={props.values.title}
                      onChange={props.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Editor />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      className={classes.form}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreateBlog;