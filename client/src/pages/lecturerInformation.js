import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import GmailService from '../service/GmailService';
import clsx from 'clsx';
import styles from './CSS/LecturerInformation.module.scss';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import UserInformation from '../components/userInformation';

function LecturerInformation() {
    const accessToken = TokenService.getLocalAccessToken();
    const role = RoleService.getLocalRole();
    const email = GmailService.getLocalGmail();
    const [user, setUser] = useState({});

    const handleUpdate = async (email, phone, password, avatarImg) => {
        axios
            .post('http://localhost:3001/lecturer/update-profile', {
                email: email,
                PhoneNumber: phone,
                password: password,
                avatarUrl: avatarImg,
            })
            .then((res) => {
                console.log(res.data);
                return res.data.message;
            })
            .catch((err) => {
                console.log(err);
                return err.message;
            });
    };

    // useEffect(() => {
    //     axios
    //         .post('http://localhost:3001/teacher/profile', { email: email })
    //         .then((res) => {
    //             console.log(res);
    //             const data = res.data.data;
    //             console.log(res.data.data);
    //             const lec = {
    //                 avatarImg: data.avatarUrl,
    //                 fullName: data.FullName,
    //                 email: data.Email,
    //                 gender: data.Sex,
    //                 born: data.Born,
    //                 identityNumber: data.IdentityNumber,
    //                 birthday: data.DateOfBirth,
    //                 phone: data.PhoneNumber,
    //             };
    //             setUser(lec);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    if (!accessToken) {
        return <Navigate to="/teacher/login" />;
    }
    if (role !== 'teacher') {
        return <Navigate to={`/${role}/home`} />;
    }

    return (
        <div>
            <Header />
            <div className={clsx(styles.pageContent)}>
                <UserInformation user={user} onUpdate={handleUpdate} />
            </div>
            <Footer />
        </div>
    );
}

export default LecturerInformation;
