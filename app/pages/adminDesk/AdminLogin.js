import React, { useContext, useState, useCallback } from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// context
import { AuthContext, USER_TYPES } from '../../context/AuthContext';

function AdminLogin(props) {
  const { user, updateUser } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [passwordInput, setPasswordInput] = useState('');
  const onSubmit = useCallback(event => {
    updateUser(passwordInput)
      .then(msg => {
        setMessage(msg);
        setError();
      })
      .catch(err => {
        setMessage();
        setError(err);
      });
  }, [updateUser, passwordInput]);

  return (
    <Box mx={30} mt={5}>
      <Typography variant="h5">
        Welcome to this secret login page :)
      </Typography>
      <Typography>
        Since this is a secret page this will have a minimal css
      </Typography>
      <Box mt={10}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              error={!!error}
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          {error}
          {message}
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminLogin;