// components/MySnackbarComponent.js
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import { hideSnackbar } from '../../ducks/snackbar';

const MySnackbarComponent = () => {
  const { visible, message, type } = useSelector((state: any) => state.snackbar);
  const dispatch = useDispatch();

  const onDismissSnackBar = () => {
    dispatch(hideSnackbar());
  };

  const getSnackbarStyle = (type: string) => {
    let baseStyle = {
      backgroundColor: 'grey', // default background color
      textAlign: 'center', // center text
      borderRadius: 20,
      color: 'white' // rounded corners,
    };
    switch (type) {
      case 'error':
        return { ...baseStyle, backgroundColor: 'red' };
      case 'success':
        return { ...baseStyle, backgroundColor: 'green'};
      case 'info':
        return { ...baseStyle, backgroundColor: 'grey' };
      default:
        return { ...baseStyle, backgroundColor: 'grey' };  // default style
    }
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={2000}
      style={getSnackbarStyle(type)}
      wrapperStyle={{ top: 30 }}
    >
      {message}
    </Snackbar>
  );
};

export default MySnackbarComponent;
