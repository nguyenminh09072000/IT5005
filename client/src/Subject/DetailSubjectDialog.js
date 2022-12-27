import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import TokenService from '../service/TokenService';
export default function DetailSubjectDialog(props) {
    const [open, setOpen] = React.useState(true);

    const [SubID, setSubID] = React.useState(props.subject.subjectId);
    const [SubName, setSubName] = React.useState(props.subject.subjectName);
    // const [Department, setDepartment] = React.useState(props.subject.Department);
    const [Credit, setCredit] = React.useState(props.subject.credit);

    const handleClose = () => {
        setOpen(false);
    };

    const handleModify = async () => {
        const response = await fetch('http://localhost:5000/subject/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                subjectId: SubID,
                subjectName: SubName,
                // "Department": Department,
                credit: Credit,
            }),
        });

        const data = await response.json();
        if (response['status'] === 200) {
            props.Modify(
                props.id,
                { id: props.id, SubID: SubID, SubName: SubName, Credit: Credit },
                {
                    SubID: SubID,
                    SubName: SubName,
                    Credit: Credit,
                    // "Department": Department,
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
                    Subject Details
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
                                id="SubID"
                                label="SubID"
                                defaultValue={SubID}
                                onChange={(event) => {
                                    setSubID(event.target.value);
                                }}
                            /> */}
                            <TextField
                                id="SubName"
                                label="SubName"
                                defaultValue={SubName}
                                onChange={(event) => {
                                    setSubName(event.target.value);
                                }}
                            />
                            {/* <TextField 
              required 
              id="Department" 
              label="Department"
              defaultValue={Department}
              onChange={(event)=>{
                setDepartment(event.target.value)
              }}
              /> */}
                            <TextField
                                required
                                id="Credit"
                                label="Credit"
                                defaultValue={Credit}
                                onChange={(event) => {
                                    setCredit(event.target.value);
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
