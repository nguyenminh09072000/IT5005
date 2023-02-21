import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EditIcon from '@mui/icons-material/Edit';
import * as ReactDOM from 'react-dom/client';
import PointDetail from './PointDetail';

export default function DetailSubjectDialog(props) {
    // console.log(props.classs);
    const [open, setOpen] = React.useState(true);
    const ClassID = props.classs.classId;
    const SubID = props.classs.subjectId;
    const name = props.classs.teacherId;
    // const Day = props.classs.Day;
    const StartTime = props.classs.classBusyTime;
    // const EndTime = props.classs.EndTime;
    const Room = props.classs.locationName;
    const numSV = props.classs.maxSlot;
    const Student = props.classs.students;

    // const [studenId, studenId] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        // console.log('aaaaa'+Student);
    };
   
    const onClick = (e, studentId, studentName,midterm, final) => {
        e.stopPropagation();
        // console.log(a);
        ReactDOM.createRoot(document.getElementById('details-form')).render(
        <PointDetail 
        studentId={studentId} 
        studentName={studentName}
        midterm={midterm}
        final={final}
        classId={ClassID}
        />);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    Class Details
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
                                id="ClassID"
                                label="ClassID"
                                defaultValue={ClassID}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                required
                                id="SubID"
                                label="SubID"
                                defaultValue={SubID}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                required
                                id="LecID"
                                label="LecID"
                                defaultValue={name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                required
                                id="Room"
                                label="Room"
                                defaultValue={Room}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                required
                                id="StartTime"
                                label="StartTime"
                                defaultValue={StartTime}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <Divider sx={{ bgcolor: 'secondary.black' }} />
                            <ListItemText
                                primary={`Student List (` + numSV + ')'}
                                sx={{ paddingTop: 1, color: 'black', fontWeight: 'bold' }}
                            />

                            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                                {Student.map((student) => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
                                            primary={`${student.studentId}`}
                                            secondary={`${student.studentName}`}
                                        />
                                        <ListItemText
                                            sx={{ width: '100%', maxWidth: 150, bgcolor: 'background.paper' }}
                                            primary={'Giữa kỳ'}
                                            secondary={`${student.midterm}`}
                                        />
                                        <ListItemText
                                            sx={{ width: '100%', maxWidth: 150, bgcolor: 'background.paper' }}
                                            primary={'Cuối kỳ '}
                                            secondary={`${student.final}`}
                                        />
                                        <Button onClick={(e) => onClick(e, student.studentId,student.studentName, student.midterm,student.final)}>
                                            <EditIcon />
                                        </Button>
                                        {/* <Button onClick={onClick(sectionId.studentId,sectionId.studentName,sectionId.midterm,sectionId.final)}>
                                            <EditIcon />
                                        </Button> */}
                                        {/* <TextField
                                            required
                                            id="StartTime"
                                            label="Giữa kỳ"
                                            defaultValue={sectionId.midterm}
                                           
                                        />
                                        <TextField
                                            required
                                            id="StartTime"
                                            label="Cuối kỳ"
                                            defaultValue={sectionId.midterm}
                                           
                                        /> */}
                                        {/* <Button onClick={onClick1('true','b')} value="aaaa">
                                            <EditIcon />
                                        </Button> */}
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Box>
                    <Container maxWidth="lg">
                        <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
                            <div>
                                <div id="details-form" />
                            </div>
                        </Container>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>

                {/* <div style={{ height: 500, width: '90%' }}>
                    <div id="details-form" />
                </div> */}
            </Dialog>
        </div>
    );
}
