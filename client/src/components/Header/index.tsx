import React, {FC} from 'react';
import styles from './Header.module.scss'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {logout} from "../../redux/slices/userSlice";
import {NavLink} from "react-router-dom";

const Header: FC = () => {

    const { user } = useSelector((state: any) => state.user)
    const {isAuth, } = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();

    const logoutUser = () => {
        dispatch(logout())
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <p>Milky way</p>
                        </NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Functional</a></li>
                            <li><a href="">Benefits</a></li>
                        </ul>
                    </nav>
                    <div className={styles.auth}>
                        {isAuth
                            ?
                            <>
                                <button onClick={logoutUser} className={styles.login}>Logout</button>
                                <NavLink className={styles.login} to="/profile">{user.username}</NavLink>
                            </>
                            :
                            <>
                                <NavLink className={styles.login} to="/login">Log in</NavLink>
                                <NavLink className={styles.signup} to="/registration">Sign up</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;