import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    visible: false,
    message: '',
    type: 'info' //default type
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';  // default to 'info' if no type is provided
    },
    hideSnackbar: state => {
      state.visible = false;
      state.message = '';
      state.type = 'info';
    },
  }
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;