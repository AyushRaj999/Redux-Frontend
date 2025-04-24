import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  mobile :'',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
      
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
