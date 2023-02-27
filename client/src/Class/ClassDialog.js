import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import TokenService from '../service/TokenService';
import { CompressOutlined } from '@mui/icons-material';
export default function SubjectDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [SubID, setSubID] = React.useState('');
    const [ClassID, setClassID] = React.useState('');
    const [LecID, setLecID] = React.useState('');
    const [Day, setDay] = React.useState('');
    const [Room, setRoom] = React.useState('');
    const [StartTime, setStartTime] = React.useState('');
    const [EndTime, setEndTime] = React.useState('');
    const [MaxSV, setMaxSV] = React.useState('');

    const handleClickOpen = () => {
        setSubID('');
        setLecID('');
        setClassID('');
        setDay(63);
        setRoom('');
        setStartTime('');
        setEndTime('');
        setMaxSV('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        // console.log(StartTime);
        let arr = StartTime.split(',');
        const response = await fetch('http://localhost:5000/class/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                classId: ClassID,
                subjectId: SubID,
                teacherId: LecID,
                // Day: Day,
                locationName: Room,
                classBusyTime: arr,
                maxSlot: MaxSV,
            }),
        });

        const data = await response.json();
        // console.log(data.classId);
        // console.log(data.message + response['status']);
        if (response['status'] === 200) {
            props.savechange(
                {
                    id: props.count + 1,
                    SubID: SubID,
                    ClassID: ClassID,
                    LecID: LecID,
                    Day: StartTime,
                    StartTime: StartTime,
                    Room: Room,
                    MaxSV: MaxSV,
                },
                {
                    subjectId: SubID,
                    classId: ClassID,
                    teacherId: LecID,
                    // Day: Day,
                    locationName: Room,
                    classBusyTime: StartTime,
                    maxSlot: MaxSV,
                },
            );
            setOpen(false);
            props.notify('success', 'Create Class successfully!');
        } else {
            props.Notify('error', 'Create Class Error!!!');
        }
    };

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen} style={{ float: 'right' }}>
                Add Class
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    New Class
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' }, display: 'flex', flexWrap: 'wrap' }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="ClassID"
                                label="Class ID"
                                onChange={(event) => {
                                    setClassID(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="SubID"
                                label="Subject ID"
                                onChange={(event) => {
                                    setSubID(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="LecID"
                                label="Teacher ID"
                                onChange={(event) => {
                                    setLecID(event.target.value);
                                }}
                            />
                            {/* <TextField
                                required
                                id="Day"
                                label="Day"
                                onChange={(event) => {
                                    setDay(event.target.value);
                                }}
                            /> */}
                            <TextField
                                required
                                id="Room"
                                label="Room"
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                            />
                            <TextField
                                id="StartTime"
                                label="StartTime"
                                onChange={(event) => {
                                    setStartTime(event.target.value);
                                }}
                            ></TextField>

                            <TextField
                                required
                                id="MaxSV"
                                label="MaxSV"
                                type="number"
                                onChange={(event) => {
                                    setMaxSV(event.target.value);
                                }}
                            />
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
