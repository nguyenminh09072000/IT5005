import * as React from 'react';
import { Box } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MenuItem, DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';

export default function DetailFormDialog(props) {
    console.log(props.lecturer);
    const [open, setOpen] = React.useState(true);
    const [FullName, setFullName] = React.useState(props.lecturer.teacherName);
    const [DateOfBirth, setDateOfBirth] = React.useState(new Date(props.lecturer.birthday));
    const [Sex, setSex] = React.useState(props.lecturer.gender);
    const [PhoneNumber, setPhoneNumber] = React.useState(props.lecturer.phone);
    const [TeacherId, setTeacherId] = React.useState(props.lecturer.teacherId);
    const [UserName, setUserName] = React.useState(props.lecturer.username);
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
        const response = await fetch('http://localhost:5000/lecturer/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: FullName,
                DateOfBirth: DateOfBirth,
                Sex: Sex,
                // Born: Born,
                // IdentityNumber: IdentityNumber,
                PhoneNumber: PhoneNumber,
            }),
        });

        const data = await response.json();
        if (data['success'] === true) {
            props.Modify(
                props.id,
                {
                    id: props.id,
                    FullName: FullName,
                    Email: props.Email,
                    // IdentityNumber: IdentityNumber,
                },
                {
                    FullName: FullName,
                    DateOfBirth: DateOfBirth,
                    Sex: Sex,
                    // Born: Born,
                    // IdentityNumber: IdentityNumber,
                    PhoneNumber: PhoneNumber,
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
                    Lecturer Details
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
                                id="TeacherId"
                                label="Teacher ID"
                                defaultValue={TeacherId}
                                onChange={(event) => {
                                    setTeacherId(event.target.value);
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
                                required
                                id="Born"
                                label="Home town"
                                defaultValue={Born}
                                onChange={(event) => {
                                    setBorn(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="IdentityNumber"
                                label="Identity Number"
                                defaultValue={IdentityNumber}
                                onChange={(event) => {
                                    setIdentityNumber(event.target.value);
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
