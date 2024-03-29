import React from 'react';
import { Navigate } from 'react-router-dom';

import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

import clsx from 'clsx';
import styles from './CSS/LecturerHomeCSS.module.scss';

import Header from '../components/header';
import Footer from '../components/footer';
import HomeCard from '../components/homeCard';

function LecturerHome() {
    const accessToken = TokenService.getLocalAccessToken();
    const role = RoleService.getLocalRole();

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
                <HomeCard link="/" title="Tin tức" icon="news" description="Tin tức, thông báo gần đây..."></HomeCard>
                <HomeCard
                    link="/teacher/information"
                    title="Hồ sơ giảng viên"
                    icon="profile"
                    description="Các thông tin cá nhân, địa chỉ, số điện thoại liên lạc của giảng viên"
                ></HomeCard>

                <HomeCard
                    link="/teacher/sub"
                    title="Lớp học giảng dạy"
                    icon="classes"
                    description="Danh sách lớp giảng dạy và danh sách sinh viên trong từng lớp"
                ></HomeCard>

                <HomeCard
                    link="/teacher/timetable"
                    title="Lịch giảng dạy"
                    icon="calender"
                    description="Lịch giảng dạy trong tuần, trong tháng"
                ></HomeCard>
            </div>

            <Footer />
        </div>
    );
}

export default LecturerHome;
