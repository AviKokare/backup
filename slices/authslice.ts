import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAuthState {
    isLoggedIn: boolean;
    userData: any;
    error: string;
}
  
const initialState: IAuthState = {
    isLoggedIn: false,
    error: '',
    userData: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setLoggedIn: (state, action: PayloadAction<IAuthState>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userData = action.payload.userData;
        state.error = action.payload.error;;
      },
      setLoggedOut: (state, action: PayloadAction<boolean>) => {
        state.isLoggedIn = action.payload;
      },
      setAuthError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    }
});

export const { setLoggedIn, setLoggedOut, setAuthError } = authSlice.actions

export default authSlice.reducer;