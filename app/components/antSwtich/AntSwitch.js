/**
 * AntSwitch is a Customized material-ui switch
 * source: https://codesandbox.io/s/fnbym
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles(theme => ({
  root: {
    width: 36,
    height: 20,
    padding: 0,
    marginRight: 8,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.white,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 16,
    height: 16,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.grey[500],
  },
  checked: {},
}))(Switch);

export default AntSwitch;