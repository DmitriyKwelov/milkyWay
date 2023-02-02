import React, {FC, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import './scss/_normalize.scss'
import {RootState, useAppDispatch} from "./redux/store";
import {checkAuth, setIsLoading, Status} from "./redux/slices/userSlice";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Registration from "./page/Regitration";
import Home from "./page/Home";
import Login from "./page/Login";
import Profile from "./page/Profile";

const App:FC = () => {

    const {isLoading} = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')){
            dispatch(checkAuth())
        } else {
            dispatch(setIsLoading(false))
        }
    }, [])

    if(isLoading) {
        return <div></div>
    }

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    );
};

export default App;