import React, {FC, useState} from 'react';
import styles from './registration.module.scss'
import {registration} from "../../redux/slices/userSlice";
import {useAppDispatch} from "../../redux/store";

const Registration: FC = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const registrationUser = async (username: string, email: string, password: string) => {
        dispatch(
            registration({
                username,
                email,
                password
            })
        )
    }

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <div className={styles.container}>
                    <h2>Registration</h2>
                    <label>
                        <span>Username</span>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
                    </label>
                    <label>
                        <span>Email</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
                    </label>
                    <label>
                        <span>Password</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                    </label>
                    <button onClick={() => registrationUser(username, email, password)}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;