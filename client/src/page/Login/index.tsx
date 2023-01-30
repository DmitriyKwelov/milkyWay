import React, {FC, useState} from 'react';
import styles from './registration.module.scss'
import {login} from "../../redux/slices/userSlice";
import {useAppDispatch} from "../../redux/store";

const Registration: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const loginUser = async (email: string, password: string) => {
        dispatch(
            login({
                email,
                password
            })
        )
    }

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <div className={styles.container}>
                    <h2>login</h2>
                    <label>
                        <span>Email</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
                    </label>
                    <label>
                        <span>Password</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                    </label>
                    <button onClick={() => loginUser(email, password)}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;