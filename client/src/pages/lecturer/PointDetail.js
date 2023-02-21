import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import TokenService from '../../service/TokenService';
import { gridColumnsSelector } from '@mui/x-data-grid';

export default function PointDetail(props) {
    const [open, setOpen] = React.useState(true);
    const [classID, setClassID] = React.useState(props.classId);
    const [studentId, setStudentId] = React.useState(props.studentId);
    const [studentName, setStudentName] = React.useState(props.studentName);
    const [midterm, setMidterm] = React.useState(props.midterm);
    const [final, setFinal] = React.useState(props.final);
    // console.log(props);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        console.log(classID + studentId + midterm + final);
        // console.log(StartTime);
        const response = await fetch('http://localhost:5000/class/set-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                studentId: studentId,
                classId: classID,
                score: {
                    midterm: midterm,
                    final: final,
                },
            }),
        });

        const data = await response.json();
        // console.log(data.classId);
        // console.log(data.message + response['status']);
        if (response['status'] === 200) {
            console.log('aaaaaaaaaaaa');
            // props.savechange(
            //     {
            //         // id: props.count + 1,
            //         // SubID: SubID,
            //         // // ClassID: ClassID,
            //         // LecID: LecID,
            //         // Day: StartTime,
            //         // StartTime: StartTime,
            //         // Room: Room,
            //         // MaxSV: MaxSV,
            //     },
            //     {
            //         // subjectId: SubID,
            //         // // classId: ClassID,
            //         // teacherId: LecID,
            //         // // Day: Day,
            //         // locationName: Room,
            //         // classBusyTime: StartTime,
            //         // maxSlot: MaxSV,
            //     },
            // );
            setOpen(false);
            // props.notify('success', 'Create Class successfully!');
        } else {
            // props.Notify('error', 'Create Class Error!!!');
        }
    };

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen} style={{ float: 'right' }}>
                Add Class
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    Change Point
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
                                id="classId"
                                label="ClassId"
                                defaultValue={classID}
                                InputProps={{
                                    readOnly: true,
                                }}
                                onChange={(event) => {
                                    setClassID(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="studentId"
                                label="StudentId"
                                defaultValue={studentId}
                                InputProps={{
                                    readOnly: true,
                                }}
                                onChange={(event) => {
                                    setStudentId(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="studentName"
                                label="Student Name"
                                defaultValue={studentName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                onChange={(event) => {
                                    setStudentName(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="midPoint"
                                label="Giữa kỳ"
                                defaultValue={midterm}
                                type="number"
                                onChange={(event) => {
                                    setMidterm(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="ClassID"
                                label="Cuối kỳ"
                                defaultValue={final}
                                type="number"
                                onChange={(event) => {
                                    setFinal(event.target.value);
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
