import { useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GmailService from '../../service/GmailService';
import styles from '../CSS/RegisterClassCSS.module.scss';
import clsx from 'clsx';
import TokenService from '../../service/TokenService';

const weekdaysMap = {
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7,
    sunday: 'Chủ nhật',
};

function checkOverlap(arr, classs) {
    for (let i = 0; i < arr.length; i++) {
        if (
            arr[i]['Day'] === classs['Day'] &&
            ((arr[i]['StartTime'] <= classs['StartTime'] && classs['StartTime'] < arr[i]['EndTime']) ||
                (arr[i]['StartTime'] < classs['EndTime'] && classs['EndTime'] <= arr[i]['EndTime']) ||
                (classs['StartTime'] <= arr[i]['StartTime'] && classs['EndTime'] >= arr[i]['EndTime']))
        ) {
            return true;
        }
    }
    return false;
}

function RegisterClass() {
    const [hp, setHp] = useState('');
    const [hps, setHps] = useState([]);
    const [time, setTime] = useState([]);
    const [maHps, setMaHps] = useState([]);
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        if (hp === '') {
            setError('Chưa nhập mã lớp đăng kí');
        } else {
            if (hps.includes(hp)) {
                setError('Mã lớp trùng lặp');
            }
            if (hps.includes(hp)) {
                setError('Thời gian học bị trùng lặp');
            } else {
                const response = await fetch('http://localhost:5000/class/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: TokenService.getLocalAccessToken(),
                    },
                    body: JSON.stringify({
                        classId: hp,
                    }),
                });
                // console.log( response);
                if (response['status'] === 200) {
                    const data = await response.json();
                    console.log(data[0]);
                    // if (maHps.includes(data['classs'].subjectId)) {
                    //     setError('trùng mã học phần');
                    // } else if (checkOverlap(classes, data['classs']) === true) {
                    //     setError('trùng lịch');
                    // } else {
                    //     setHps((prev) => [...prev, hp]);
                    //     setMaHps((prev) => [...prev, data['classs'].SubID]);f
                    //     setClasses((prev) => [...prev, data['classs']]);
                    //     setError('1111111');
                    // }

                    setHps((prev) => [...prev, hp]);
                    setTime((prev) => [...prev, data[0].classBusyTime]);
                    setMaHps((prev) => [...prev, data[0].subjectId]);
                    setClasses((prev) => [...prev, data[0]]);
                    // setError('1111111');
                } else {
                    setError('Không tìm thấy mã lớp ' + hp);
                }
            }
        }

        setHp('');
    }

    function handleDelete(event, index) {
        event.preventDefault();
        setClasses(classes.filter((item, idx) => idx !== index));
        setHps(hps.filter((item, idx) => idx !== index));
        setMaHps(maHps.filter((item, idx) => idx !== index));
    }

    async function handleSubmitRegister(event) {
        event.preventDefault();
        const username = GmailService.getLocalGmail();
        const studentId = '';
        const response1 = await fetch(`http://localhost:5000/student/get-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                username: username,
            }),
        });

        if (response1['status'] === 200) {
            const data1 = await response1.json();
            console.log(hps.length);

            var flag = true;
            for (let i = 0; i < hps.length; i++) {
                const response = await fetch('http://localhost:5000/class/add-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: TokenService.getLocalAccessToken(),
                    },
                    body: JSON.stringify({
                        // classes: hps,
                        studentId: data1.studentId,
                        classId: hps[i],
                    }),
                });
                const data = await response.json();
                console.log(data.message);
                if (data.message === 'Successfully add student to class') {
                    flag = true;
                } else {
                    flag = false;
                }
            }
            if (flag) {
                setError('Gửi đăng kí thành công');
            } else {
                setError('Gửi đăng kí thất bại');
            }
        }
    }

    async function handleSubmitDelete(event) {
        event.preventDefault();
        const username = GmailService.getLocalGmail();
        const studentId = '';
        const response1 = await fetch(`http://localhost:5000/student/get-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                username: username,
            }),
        });

        if (response1['status'] === 200) {
            const data1 = await response1.json();
            console.log(hps.length);

            var flag = true;
            for (let i = 0; i < hps.length; i++) {
                const response = await fetch('http://localhost:5000/class/delete-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: TokenService.getLocalAccessToken(),
                    },
                    body: JSON.stringify({
                        // classes: hps,
                        studentId: data1.studentId,
                        classId: hps[i],
                    }),
                });
                const data = await response.json();
                console.log(data.message);
                if (data.message === 'Successfully delete student from class') {
                    flag = false;
                } else {
                    flag = true;
                }
            }
            if (flag) {
                setError('Hủy đăng kí thành công');
            } else {
                setError('Hủy đăng kí thất bại');
            }
        }
    }

    return (
        <div className={clsx(styles.pageContent)}>
            <h2 className={clsx(styles.pageTitle)}>Đăng ký học tập</h2>
            <div>
                <div className={clsx(styles.pageTop)}>
                    <div className={clsx(styles.inputClassID)}>
                        Mã lớp đăng kí
                        <input value={hp} onChange={(e) => setHp(e.target.value)} />
                        <button onClick={handleSubmit} className={clsx(styles.btn, styles.primary)}>
                            Đăng ký
                        </button>
                    </div>
                    {!error && <p className={clsx(styles.error)}>&nbsp;</p>}
                    {error && <p className={clsx(styles.error)}>{error}</p>}
                </div>
                <table className={clsx(styles.dataTable)}>
                    <thead>
                        <tr>
                            <th>Mã lớp</th>
                            <th>Mã học phần</th>
                            <th>Tên môn học</th>
                            <th>Giảng viên</th>
                            <th>Thời gian học</th>
                            {/* <th>Giờ bắt đầu</th>
                            <th>Giờ kết thúc</th> */}
                            <th>Phòng học</th>
                            <th>Số lượng sinh viên đăng ký</th>
                            <th>Số lượng sinh viên tối đa</th>
                            <td>
                                <div className={clsx(styles.addSpace)}>&nbsp;</div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classs, index) => (
                            <tr key={index}>
                                <td>{classs.classId}</td>
                                <td>{classs.subjectId}</td>
                                <td>{classs.subjectId}</td>
                                <td>{classs.teacherId}</td>
                                <td>{classs.classBusyTime}</td>
                                {/* <td>{classs.classBusyTime}</td>
                                <td>{classs.classBusyTime}</td> */}
                                <td>{classs.locationName}</td>
                                <td>{classs.students.length}</td>
                                <td>{classs.maxSlot}</td>
                                <td>
                                    <Button onClick={(event) => handleDelete(event, index)}>
                                        <DeleteIcon className={clsx(styles.icon)} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={clsx(styles.pageFooter)}>
                    <button className={clsx(styles.btn, styles.primary)} onClick={handleSubmitRegister}>
                        Gửi đăng ký
                    </button>
                    <button className={clsx(styles.btn, styles.primary)} onClick={handleSubmitDelete}>
                        Hủy đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterClass;
