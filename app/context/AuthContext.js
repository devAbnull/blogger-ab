import React, { useState, useCallback } from 'react';
import $ from 'jquery';
// import request from 'superagent-bluebird-promise';

export const AuthContext = React.createContext({});

export const USER_TYPES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

function authenticateUser(password) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${window.location.href}/auth`,
      type: 'POST',
      data: {
        password,
      },
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

export function AuthProvider(props) {
  const [user, setUser] = useState(USER_TYPES.USER);
  const updateUser = useCallback(password => {
    // request with password if true setUser Admin
    return authenticateUser(password)
      .then(res => {
        console.log('========> res', res);
        setUser(res.isAdminAuthenticated ? USER_TYPES.ADMIN : USER_TYPES.USER);
        if (res.isAdminAuthenticated) {
          return 'Welcome Admin!'
        }

        throw 'Incorrect password, Please try again';
      })
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}