import * as React from 'react';
import { Box } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MenuItem, DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TokenService from '../../service/TokenService';
export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [FullName, setFullName] = React.useState('');
    const [DateOfBirth, setDateOfBirth] = React.useState(new Date());
    // const [SchoolYear, setSchoolYear] = React.useState(63);
    // const [Class, setClass] = React.useState('');
    const [Gender, setGender] = React.useState('');
    // const [Major, setMajor] = React.useState('');
    // const [Born, setBorn] = React.useState('');
    // const [IdentityNumber, setIdentityNumber] = React.useState('');
    const [PhoneNumber, setPhoneNumber] = React.useState('');
    const [StudentId, setStudentId] = React.useState('');
    const [UserName, setUserName] = React.useState('');
    const student = 'student';
    const password = '123456';
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

    const handleClickOpen = () => {
        setFullName('');
        setDateOfBirth(new Date());
        // setSchoolYear(63);
        // setClass('');
        setGender('');
        // setMajor('');
        // setBorn('');
        // setIdentityNumber('');
        setPhoneNumber('');
        setOpen(true);
        setStudentId('');
        setUserName('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const response = await fetch('http://localhost:5000/student/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                studentId: StudentId,
                studentName: FullName,
                username: UserName,
                birthday: DateOfBirth,
                gender: Gender,
                phone: PhoneNumber,
            }),
        });

        const dataJson = await response.json();
        const data = dataJson[0];
        const responseRegister = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                username: UserName,
                password: password,
                role: student,
            }),
        });
        if (response['status'] === 200 && responseRegister['status'] === 200) {
            props.savechange(
                {
                    id: props.count + 1,
                    FullName: data.studentName,
                    Email: data.username,
                    StudentID: data.studentId,
                },
                {
                    studentName: FullName,
                    gender: Gender,
                    birthday: DateOfBirth,
                    // Born: Born,
                    // IdentityNumber: IdentityNumber,
                    phone: PhoneNumber,
                    studentId: StudentId,
                    username: UserName,
                },
            );
            props.Notify('success', 'Create Lecturer Sucessfully!');
        } else {
            props.Notify('error', 'Create Lecturer Error!!!');
        }
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ float: 'right' }} sx={{ mt: 1 }}>
                Add <AddIcon fontSize="small" />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    New Student Account
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '37ch' }, display: 'flex', flexWrap: 'wrap' }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="FullName"
                                label="Full Name"
                                onChange={(event) => {
                                    setFullName(event.target.value);
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Birth"
                                    defaultValue={new Date().toDateString()}
                                    value={DateOfBirth.toDateString()}
                                    onChange={(date) => {
                                        setDateOfBirth(date);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="Sex"
                                select
                                label="Gender"
                                value={Gender}
                                onChange={(event) => {
                                    setGender(event.target.value);
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
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="StrudentId"
                                label="Student ID"
                                onChange={(event) => {
                                    setStudentId(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="PhoneNumber"
                                label="Phone Number"
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                            />
                            {/* <TextField
                                required
                                id="SchoolYear"
                                label="School Year  "
                                type="number"
                                defaultValue={63}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => {
                                    setSchoolYear(event.target.value);
                                }}
                            /> */}
                            {/* <TextField
                                required
                                id="Class"
                                label="Class"
                                onChange={(event) => {
                                    setClass(event.target.value);
                                }}
                            /> */}

                            {/* <TextField
                                required
                                id="Major"
                                label="Major"
                                onChange={(event) => {
                                    setMajor(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="Born"
                                label="Home town"
                                onChange={(event) => {
                                    setBorn(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="IdentityNumber"
                                label="Identity Number"
                                onChange={(event) => {
                                    setIdentityNumber(event.target.value);
                                }}
                            /> */}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
