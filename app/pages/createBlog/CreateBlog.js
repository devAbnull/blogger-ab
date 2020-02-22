import React from "react";
import { Field, Form, Formik, FormikProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function CreateBlog() {
  return (<>
    <h2>CreateBlog</h2>
    <Formik initialValues={{ title: '', content: '' }} onSubmit={(values, {}) => console.log('====>values ', values)}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
        <TextField
          required
          id="standard-required"
          label="Title"
          name="title"
          value={props.values.title}
          onChange={props.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  </>);
}

export default CreateBlog;