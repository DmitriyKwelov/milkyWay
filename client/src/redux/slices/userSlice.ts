import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../models/IUser";
import $api from "../../http";
import axios from "axios";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}


export interface UserState {
    user: IUser | null;
    isAuth: boolean;
    status: Status;
}

export type IParamsRegister = {
    username: string;
    email: string;
    password: string;
}
export type IParamsLogin = {
    email: string;
    password: string;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    status: Status.LOADING,
}

export const registration = createAsyncThunk<UserState, IParamsRegister>('user/registration', async (params) => {
    try {
        const {username, email, password} = params
        const response = await $api.post('/registration', {username, email, password})
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
    }
})
export const login = createAsyncThunk<UserState, IParamsLogin>('user/login', async (params) => {
    try {
        const {email, password} = params
        const response = await $api.post('/login', {email, password})
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
    }
})
export const logout = createAsyncThunk<UserState>('user/logout', async () => {
    try {
        const response = await $api.post('/logout',)
        return response.data;
    } catch (e) {
        console.log(e)
    }
})
export const checkAuth = createAsyncThunk<UserState>('user/checkAuth', async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/refresh', {withCredentials: true,})
        console.log(response.data)
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
            // регистрация
            .addCase(registration.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = null;
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
                state.user = null;
            })
            // авторизация
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
            // logout
            .addCase(logout.pending, (state) => {
                // @ts-ignore
                localStorage.removeItem('token');
                state.isAuth = false;
                state.user = null;
            })
            // refresh
            .addCase(checkAuth.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                // @ts-ignore
                localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = {} as IUser;
            })

    }
})

export const {setUser, setAuth} = userSlice.actions

export default userSlice.reducer