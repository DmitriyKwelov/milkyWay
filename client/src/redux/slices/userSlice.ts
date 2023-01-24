import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IUser} from "../../models/IUser";
import AuthService from "../../services/AuthService";

export interface UserState {
    user: IUser;
    isAuth: boolean;
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setAuth(state, action: PayloadAction<boolean>){
            state.isAuth = action.payload
        },
        login(state, action){

        }
    },
})

export const { setUser, setAuth } = userSlice.actions

export default userSlice.reducer