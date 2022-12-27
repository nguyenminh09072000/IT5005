import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import TokenService from '../service/TokenService';

export default function SubjectDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [SubID, setSubID] = React.useState('');
    const [SubName, setSubName] = React.useState('');
    // const [Department, setDepartment] = React.useState('');
    const [Credit, setCredit] = React.useState('');

    const handleClickOpen = () => {
        setSubID('');
        setSubName('');
        // setDepartment('');
        setCredit('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const response = await fetch('http://localhost:5000/subject/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                subjectId: SubID,
                subjectName: SubName,
                // Department: Department,
                credit: Credit,
            }),
        });

        const data = await response.json();
        if (response['status'] === 200) {
            props.savechange(
                {
                    id: props.count + 1,
                    SubID: SubID,
                    SubName: SubName,
                    // Department: data.Department,
                    Credit: Credit,
                },
                {
                    subjectId: SubID,
                    subjectName: SubName,
                    // Department: Department,
                    credit: Credit,
                },
            );
            props.Notify('success', 'Create Subject Error!!!');
        } else {
            props.Notify('error', 'Create Subject Error!!!');
        }
        setOpen(false);
    };

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen} style={{ float: 'right' }}>
                Add Subject
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }} sx={{ margin: 2, fontSize: 30 }}>
                    New Subject
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
                                id="SubID"
                                label="Subject ID"
                                onChange={(event) => {
                                    setSubID(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="SubName"
                                label="Subject Name"
                                onChange={(event) => {
                                    setSubName(event.target.value);
                                }}
                            />
                            {/* <TextField
                                required
                                id="Department"
                                label="Department"
                                onChange={(event) => {
                                    setDepartment(event.target.value);
                                }}
                            /> */}
                            <TextField
                                required
                                id="Credit"
                                label="Credit"
                                onChange={(event) => {
                                    setCredit(event.target.value);
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
