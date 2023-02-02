import React, {FC} from 'react';
import {useSelector} from "react-redux";

const Profile: FC = () => {

    const {user} = useSelector((state: any) => state.user)

    return (
        <div>
            <div>
                {user.email}
            </div>
            <div>
                {user.username}
            </div>
            <div>
                {user.id}
            </div>
        </div>
    );
};

export default Profile;