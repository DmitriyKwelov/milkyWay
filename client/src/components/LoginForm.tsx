import React, {FC, useState} from 'react';
import AuthService from "../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {login, registration, setAuth, setUser} from "../redux/slices/userSlice";
import axios from "axios";
import {RootState, useAppDispatch} from "../redux/store";

const LoginForm: FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch();
    const {status} = useSelector((state: RootState) => state.user)

    const loginUser = async (email: string, password: string) => {
        // try {
        //     const response = await AuthService.login(email, password);
        //     console.log(response)
        //     localStorage.setItem('token', response.data.accessToken);
        //     dispatch(setAuth(true))
        //     dispatch(setUser(response.data.user))
        // } catch (e) {
        //     console.log(e)
        //     // console.log(e.response?.data?.message)
        // }
        dispatch(
            login({
                email,
                password
            })
        )
    }
    const registrationUser = async (email: string, password: string) => {
        // try {
        //     // const response = await AuthService.registration(email, password);
        //     const response = await axios.post('http://localhost:5000/api/registration', {email, password});
        //     console.log(response)
        //     localStorage.setItem('token', response.data.accessToken);
        //     dispatch(setAuth(true))
        //     dispatch(setUser(response.data.user))
        // } catch (e) {
        //     console.log(e)
        //     // console.log(e.response?.data?.message)
        // }

        dispatch(
            // @ts-ignore
            registration({
                email,
                password
            })
        )
    }
    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text"/>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"/>
            <button onClick={() => loginUser(email, password)}>Логин</button>
            <button onClick={() => registrationUser(email, password)}>Регистрация</button>
            <div>
                {status}
            </div>
        </div>
    );
};

export default LoginForm;