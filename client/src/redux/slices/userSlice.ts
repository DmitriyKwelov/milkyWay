import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../models/IUser";
import AuthService from "../../services/AuthService";
import axios from "axios";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}


export interface UserState {
    user: IUser;
    isAuth: boolean;
    status: Status;
}

export type UserSargseargtate = {
    email: string;
    password: string;
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    status: Status.LOADING,
}

export const registration = createAsyncThunk<UserState, UserSargseargtate>('user/registration', async (params) => {
    try {
        const {email, password} = params
        const response = await axios.post('http://localhost:5000/api/registration', {email, password})
        return response.data;
    } catch (e) {
        console.log(e)
    }
})
export const login = createAsyncThunk<UserState, UserSargseargtate>('user/login', async (params) => {
    try {
        const {email, password} = params
        const response = await axios.post('http://localhost:5000/api/login', {email, password})
        return response.data;
    } catch (e) {
        console.log(e)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                // @ts-ignore
                localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
            })
            .addCase(registration.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                // @ts-ignore
                localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = {} as IUser;
            })

    }
})

export const {setUser, setAuth} = userSlice.actions

export default userSlice.reducer