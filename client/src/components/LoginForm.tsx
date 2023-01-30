import React from 'react';

const LoginForm = () => {
    return (
        <div>
            fawefawef
        </div>
    );
};

export default LoginForm;
// import React, {FC, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {login, logout, registration, setAuth, setUser} from "../redux/slices/userSlice";
// import axios from "axios";
// import {RootState, useAppDispatch} from "../redux/store";
// import {IUser} from "../models/IUser";
// import $api from "../http";
//
// const LoginForm: FC = () => {
//
//     const [users, setUsers] = useState<IUser[]>([])
//     const [email, setEmail] = useState<string>('')
//     const [password, setPassword] = useState<string>('')
//     const dispatch = useAppDispatch();
//     const {status} = useSelector((state: RootState) => state.user)
//
//     const getUsers = async () => {
//         try {
//             const response = await $api.get('/users')
//             console.log(response)
//             setUsers(response.data)
//         }catch (e){
//             console.log(e)
//         }
//     }
//     console.log(users)
//     const loginUser = async (email: string, password: string) => {
//         dispatch(
//             login({
//                 email,
//                 password
//             })
//         )
//     }
//     const registrationUser = async (email: string, password: string) => {
//         dispatch(
//             registration({
//                 email,
//                 password
//             })
//         )
//     }
//     return (
//         <div>
//             <input onChange={(e) => setEmail(e.target.value)} value={email} type="text"/>
//             <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"/>
//             <button onClick={() => loginUser(email, password)}>Логин</button>
//             <button onClick={() => registrationUser(email, password)}>Регистрация</button>
//             <div>
//                 {status}
//             </div>
//             <button onClick={() => getUsers()}>пользователи</button>
//             <div>
//                 {users.map(us =>
//                     <div style={{color: '#000'}} key={us.email}>{us.email}</div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default LoginForm;