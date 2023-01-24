import React, {FC, useState} from 'react';
import AuthService from "../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {setAuth, setUser} from "../redux/slices/userSlice";
import axios from "axios";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const loginUser = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
        } catch (e) {
            console.log(e)
            // console.log(e.response?.data?.message)
        }
    }
    const registration = async (email: string, password: string) => {
        try {
            // const response = await AuthService.registration(email, password);
            const response = await axios.post('http://localhost:5000/api/registration', {email, password});
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
        } catch (e) {
            console.log(e)
            // console.log(e.response?.data?.message)
        }
    }
    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text"/>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"/>
            <button onClick={() => loginUser(email, password)}>Логин</button>
            <button onClick={() => registration(email, password)}>Регистрация</button>
        </div>
    );
};

export default LoginForm;