import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import TokenService from '../service/TokenService';
export default function DetailSubjectDialog(props) {
    const [open, setOpen] = React.useState(true);

    const [ClassID, setClassID] = React.useState(props.classs.classId);
    const [SubID, setSubID] = React.useState(props.classs.subjectId);
    const [LecID, setLecID] = React.useState(props.classs.teacherId);
    const [Day, setDay] = React.useState(props.classs.classBusyTime);
    const [StartTime, setStartTime] = React.useState(props.classs.classBusyTime);
    // const [EndTime, setEndTime] = React.useState(props.classs.EndTime);
    const [Room, setRoom] = React.useState(props.classs.locationName);
    const [MaxSV, setMaxSV] = React.useState(props.classs.maxSlot);
    const [Student, setStudent] = React.useState(props.classs.students);
    const [flex, setFlex] = React.useState(false);
    const StudentName = [];

    console.log(typeof StartTime);
    // const getStudentName = async (e) => {
    //     // don't select this row after clicking

    //     const response = await fetch(`http://localhost:3001/subject/getStudent/${e}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     if (response['status'] === 200) {
    //         const data = await response.json();

    //         StudentName.push(data[0]['FullName']);
    //     } else {
    //         this.Notify('error', 'Delete Error');
    //         console.log('ko xoa dc');
    //     }
    // };

    const handleClose = () => {
        // console.log(Student);
        setOpen(false);
    };
    // const getStuName = () => {
    //     Student.forEach((element) => {
    //         console.log(getStudentName(element));
    //     });
    // };

    const handleModify = async () => {
        console.log(StartTime);
        let response;
        if (flex) {
            let arr = StartTime.split(',');
            console.log(arr);
            console.log(flex);
            response = await fetch('http://localhost:5000/class/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: TokenService.getLocalAccessToken(),
                },
                body: JSON.stringify({
                    classId: ClassID,
                    updateInfo: {
                        teacherId: LecID,
                        subjectId: SubID,
                        // Day: Day,
                        locationName: Room,
                        classBusyTime: arr,
                        // "EndTime": EndTime,
                        maxSlot: MaxSV,
                        // Student: Student,
                    },
                }),
            });
        } else {
            response = await fetch('http://localhost:5000/class/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: TokenService.getLocalAccessToken(),
                },
                body: JSON.stringify({
                    classId: ClassID,
                    updateInfo: {
                        teacherId: LecID,
                        subjectId: SubID,
                        // Day: Day,
                        locationName: Room,
                        // classBusyTime: arr,
                        // "EndTime": EndTime,
                        maxSlot: MaxSV,
                        // Student: Student,
                    },
                }),
            });
        }

        const data = await response.json();
        if (response['status'] === 200) {
            props.Modify(
                props.id,
                {
                    id: props.id,
                    ClassID: ClassID,
                    SubID: SubID,
                    LecID: LecID,
                    Day: StartTime,
                    Room: Room,
                    StartTime: StartTime,
                    MaxSV: MaxSV,
                    Student: Student,
                },
                {
                    classId: ClassID,
                    subjectId: SubID,
                    teacherId: LecID,
                    // Day: Day,
                    locationName: Room,
                    classBusyTime: StartTime,
                    // "EndTime": EndTime,
                    maxSlot: MaxSV,
                    // Student: Student,
                },
            );
            props.notify('success', 'Modify successfully!');
            setOpen(false);
        } else {
            props.notify('error', ' error!!!');
        }
    };
    // getStudentName()
    return (
        <div>
            {/* {getStudentName()} */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    Class Details
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' }, display: 'flex', flexWrap: 'wrap' }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            {/* <TextField
                                required
                                id="ClassID"
                                label="Class ID"
                                defaultValue={ClassID}
                                onChange={(event) => {
                                    setClassID(event.target.value);
                                }}
                            /> */}
                            <TextField
                                required
                                id="SubID"
                                label="SubID"
                                defaultValue={SubID}
                                onChange={(event) => {
                                    setSubID(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="LecID"
                                label="Teacher ID"
                                defaultValue={LecID}
                                onChange={(event) => {
                                    setLecID(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="Room"
                                label="Room"
                                defaultValue={Room}
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                            />
                            {/* <TextField
                                required
                                id="Day"
                                label="Day"
                                defaultValue={Day}
                                onChange={(event) => {
                                    setDay(event.target.value);
                                }}
                            /> */}
                            <TextField
                                required
                                id="StartTime"
                                label="StartTime"
                                defaultValue={StartTime}
                                onChange={(event) => {
                                    setStartTime(event.target.value);
                                    setFlex(true);
                                }}
                            />
                            {/* <TextField 
              required 
              id="EndTime" 
              label="EndTime"
              defaultValue={EndTime}
              onChange={(event)=>{
                setEndTime(event.target.value)
              }}
              /> */}
                            <TextField
                                required
                                id="MaxSV"
                                label="MaxSV"
                                type="number"
                                defaultValue={MaxSV}
                                onChange={(event) => {
                                    setMaxSV(event.target.value);
                                }}
                            />
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
