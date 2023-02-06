import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function DetailSubjectDialog(props) {
    console.log(props.classs);
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

    const handleClose = () => {
        setOpen(false);
        // console.log('aaaaa'+Student);
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
                            {/* <TextField 
              required 
              id="Day" 
              label="Day"
              defaultValue={Day}
              InputProps={{
                readOnly: true,
              }}
              /> */}
                            <TextField
                                required
                                id="StartTime"
                                label="StartTime"
                                defaultValue={StartTime}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* <TextField 
              required 
              id="EndTime" 
              label="EndTime"
              defaultValue={EndTime}
              InputProps={{
                readOnly: true,
              }}
              /> */}

                            <Divider sx={{ bgcolor: 'secondary.black' }} />
                            <ListItemText
                                primary={`Student List (` + numSV + ')'}
                                sx={{ paddingTop: 1, color: 'black', fontWeight: 'bold' }}
                            />
                            <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                                {Student.map((sectionId) => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${sectionId.studentId}`} secondary={`${sectionId.studentName}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
