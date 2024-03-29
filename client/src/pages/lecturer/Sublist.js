import { Container, AppBar, Toolbar, IconButton, Typography, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridApi } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import SubDetail from './SubDetail';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import GmailService from '../../service/GmailService';
import TokenService from '../../service/TokenService';
class SubList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'id', headerName: 'Index', width: 90 },
                { field: 'ClassID', headerName: 'ClassID', width: 200 },
                { field: 'SubID', headerName: 'SubID', width: 200 },
                // { field: 'name', headerName: 'Subject Name', width: 330 },
                { field: 'Room', headerName: 'Class Room', width: 330 },
                { field: 'numSV', headerName: 'numSV', width: 130 },
                {
                    field: 'detail',
                    headerName: 'Details',
                    width: 80,
                    sortable: false,
                    renderCell: (params) => {
                        const onClick = (e) => {
                            e.stopPropagation();

                            const id = params.id;
                            const api: GridApi = params.api;
                            const ClassID = api.getCellValue(params.id, 'ClassID');
                            ReactDOM.createRoot(document.getElementById('details-form')).render(
                                <SubDetail
                                    classs={this.state.dataAPI[id - 1]}
                                    Modify={this.Modify}
                                    ClassID={ClassID}
                                    id={id}
                                    notify={this.Notify}
                                />,
                            );
                        };

                        return (
                            <Button onClick={onClick}>
                                <EditIcon />
                            </Button>
                        );
                    },
                },
            ],
            count: 0,
            rows: [],
            open: false,
            severity: '',
            dataAPI: [],
            message: '',
        };
        this.saveChange = this.saveChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.Notify = this.Notify.bind(this);
        this.Modify = this.Modify.bind(this);
    }

    async componentDidMount() {
        const username = GmailService.getLocalGmail();
        const response = await fetch(`http://localhost:5000/teacher/get-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
            body: JSON.stringify({
                username: username,
            }),
        });

        if (response['status'] === 200) {
            const data = await response.json();
            const teacherId = data.teacherId;
            const teacherName = data.teacherName;
            fetch('http://localhost:5000/teacher/get-class-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: TokenService.getLocalAccessToken(),
                },
                body: JSON.stringify({
                    teacherId: teacherId,
                }),
            })
                .then((res) => res.json())
                .then((data) =>
                    this.setState(() => ({
                        dataAPI: data.map((obj) => obj),
                        rows: data.map((obj, index) => ({
                            id: index + 1,
                            ClassID: obj.classId,
                            SubID: obj.subjectId,
                            name: teacherName,
                            // Day: obj.Day,
                            StartTime: obj.classBusyTime,
                            EndTime: obj.classBusyTime,
                            Room: obj.locationName,
                            numSV: obj.maxSlot,
                            Student: obj.students,
                        })),
                    })),
                );
        } else {
            // this.Notify('error', 'Delete Error');
        }
    }
    saveChange(row, data) {
        this.setState((state) => ({
            rows: [...state.rows, row],
            dataAPI: [...state.dataAPI, data],
        }));
    }

    Modify(id, row, data) {
        this.setState((state) => ({
            rows: [...state.rows.slice(0, id - 1), row, ...state.rows.slice(id)],
            dataAPI: [...state.dataAPI.slice(0, id - 1), data, ...state.dataAPI.slice(id)],
        }));
    }

    handleClose() {
        this.setState(() => ({
            open: false,
            severity: '',
            message: '',
        }));
    }
    Notify(severity, message) {
        this.setState(() => ({
            open: true,
            severity: severity,
            message: message,
        }));
    }

    render() {
        return (
            <Container maxWidth="lg">
                <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
                    <div style={{ height: 600, width: '94%' }}>
                        <DataGrid
                            disableSelectionOnClick
                            rows={this.state.rows}
                            columns={this.state.columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                        <div id="details-form" />
                    </div>
                </Container>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.severity} sx={{ width: '100%' }}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

export default SubList;
