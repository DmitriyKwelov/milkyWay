import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../models/IUser";
import AuthService from "../../services/AuthService";
import axios from "../../http";

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

export type IParams = {
    email: string;
    password: string;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    status: Status.LOADING,
}

export const registration = createAsyncThunk<UserState, IParams>('user/registration', async (params) => {
    try {
        const {email, password} = params
        const response = await axios.post('/registration', {email, password})
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
    }
})
export const login = createAsyncThunk<UserState, IParams>('user/login', async (params) => {
    try {
        const {email, password} = params
        const response = await axios.post('/login', {email, password})
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
    }
})
export const logout = createAsyncThunk<UserState>('user/login', async () => {
    try {
        const response = await axios.post('/logout',)
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