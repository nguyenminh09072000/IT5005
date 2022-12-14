import * as React from 'react';
import { Box } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MenuItem, DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import TokenService from '../../service/TokenService';
export default function DetailFormDialog(props) {
    const [open, setOpen] = React.useState(true);
    const [FullName, setFullName] = React.useState(props.student.studentName);
    const [DateOfBirth, setDateOfBirth] = React.useState(new Date(props.student.birthday));
    // const [SchoolYear, setSchoolYear] = React.useState(props.student.SchoolYear);
    // const [Class, setClass] = React.useState(props.student.Class);
    const [Sex, setSex] = React.useState(props.student.gender);
    // const [Major, setMajor] = React.useState(props.student.Major);
    // const [Born, setBorn] = React.useState(props.student.Born);
    // const [IdentityNumber, setIdentityNumber] = React.useState(props.student.IdentityNumber);
    const [PhoneNumber, setPhoneNumber] = React.useState(props.student.phone);
    const [StudentId, setStudentId] = React.useState(props.student.studentId);
    const [UserName, setUserName] = React.useState(props.student.username);
    const options = [
        {
            value: 'Male',
            label: 'Male',
        },
        {
            value: 'Female',
            label: 'Female',
        },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handleModify = async () => {
        const response = await fetch('http://localhost:5000/student/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                studentId: StudentId,
                studentName: FullName,
                birthday: DateOfBirth,
                // SchoolYear: SchoolYear,
                // Class: Class,
                gender: Sex,
                // Major: Major,
                // Born: Born,
                // IdentityNumber: IdentityNumber,
                phone: PhoneNumber,
            }),
        });

        const data = await response.json();
        if (response['status'] === 200) {
            props.Modify(
                props.id,
                {
                    id: props.id,
                    // SID: props.SID,
                    FullName: FullName,
                    Email: UserName,
                    StudentID: StudentId,
                    // IdentityNumber: IdentityNumber,
                },
                {
                    studentId: StudentId,
                    studentName: FullName,
                    birthday: DateOfBirth,
                    // SchoolYear: SchoolYear,
                    // Class: Class,
                    username: UserName,
                    gender: Sex,
                    // Major: Major,
                    // Born: Born,
                    // IdentityNumber: IdentityNumber,
                    phone: PhoneNumber,
                },
            );
            props.notify('success', 'Modify successfully!');
        } else {
            props.notify('error', ' error!!!');
        }
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    Student Details
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '37ch' }, display: 'flex', flexWrap: 'wrap' }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            {/* <TextField
                                required
                                id="StudentId"
                                label="Student ID"
                                defaultValue={StudentId}
                                onChange={(event) => {
                                    setStudentId(event.target.value);
                                }}
                            /> */}
                            <TextField
                                required
                                id="FullName"
                                label="Full Name"
                                defaultValue={FullName}
                                onChange={(event) => {
                                    setFullName(event.target.value);
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Birth"
                                    defaultValue={DateOfBirth}
                                    value={DateOfBirth.toDateString()}
                                    onChange={(date) => {
                                        setDateOfBirth(date);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="Gender"
                                select
                                label="Gender"
                                defaultValue={Sex}
                                onChange={(event) => {
                                    setSex(event.target.value);
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                id="User name"
                                label="User name"
                                defaultValue={UserName}
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                            />

                            <TextField
                                required
                                id="PhoneNumber"
                                label="Phone Number"
                                defaultValue={PhoneNumber}
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                            />
                            {/* <TextField
                                id="SchoolYear"
                                label="School Year  "
                                type="number"
                                defaultValue={SchoolYear}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            /> */}
                            {/* <TextField
                                required
                                id="Class"
                                label="Class"
                                defaultValue={Class}
                                onChange={(event) => {
                                    setClass(event.target.value);
                                }}
                            /> */}

                            {/* <TextField
                                required
                                id="Major"
                                label="Major"
                                defaultValue={Major}
                                onChange={(event) => {
                                    setMajor(event.target.value);
                                }}
                            /> */}
                            {/* <TextField
                                required
                                id="Born"
                                label="Home town"
                                defaultValue={Born}
                                onChange={(event) => {
                                    setBorn(event.target.value);
                                }}
                            /> */}
                            {/* <TextField
                                required
                                id="IdentityNumber"
                                label="Identity Number"
                                defaultValue={IdentityNumber}
                                onChange={(event) => {
                                    setIdentityNumber(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="PhoneNumber"
                                label="Phone Number"
                                defaultValue={PhoneNumber}
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                            /> */}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleModify}>Modify</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
