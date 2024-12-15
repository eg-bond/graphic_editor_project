import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// some prototype slice for further usage
const initialState = { someField: 'someField' };

export const prototypeSlice = createSlice({
  name: 'proto',
  initialState,
  reducers: {
    logProto(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.someField = action.payload;
    },
  },
});
