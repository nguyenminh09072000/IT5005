import { Container, AppBar, Toolbar, IconButton, Typography, Button, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid, GridApi } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SubjectDialog from './SubjectDialog';
import DetailSubjectDialog from './DetailSubjectDialog';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import TokenService from '../service/TokenService';
class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'id', headerName: 'Index', width: 70 },
                { field: 'SubID', headerName: 'SubID', width: 230 },
                { field: 'SubName', headerName: 'Sub Name', width: 380 },
                // { field: 'Department', headerName: 'Department', width: 320 },
                { field: 'Credit', headerName: 'Credit', width: 200 },
                {
                    field: 'detail',
                    headerName: 'Details',
                    sortable: false,
                    renderCell: (params) => {
                        const onClick = (e) => {
                            e.stopPropagation();

                            const id = params.id;
                            const api: GridApi = params.api;
                            const SubID = api.getCellValue(params.id, 'SubID');
                            const SubName = api.getCellValue(params.id, 'SubName');
                            ReactDOM.createRoot(document.getElementById('details-form')).render(
                                <DetailSubjectDialog
                                    subject={this.state.dataAPI[id - 1]}
                                    Modify={this.Modify}
                                    SubID={SubID}
                                    id={id}
                                    SubName={SubName}
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
                {
                    field: 'delete',
                    headerName: 'Delete',
                    sortable: false,
                    renderCell: (params) => {
                        const handleDelete = async (e) => {
                            e.stopPropagation(); // don't select this row after clicking

                            const api: GridApi = params.api;
                            const id = params.id;
                            const subjectId = api.getCellValue(params.id, 'SubID');
                            const response = await fetch(`http://localhost:5000/subject/delete`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: TokenService.getLocalAccessToken(),
                                },
                                body: JSON.stringify({
                                    subjectId: subjectId,
                                }),
                            });
                            if (response['status'] === 200) {
                                this.setState((state) => ({
                                    rows: [...state.rows.slice(0, id - 1), ...state.rows.slice(id)].map((e, i) => ({
                                        id: i + 1,
                                        SubID: e.SubID,
                                        SubName: e.SubName,
                                        Credit: e.Credit,
                                        Department: e.Department,
                                    })),
                                    dataAPI: [...state.dataAPI.slice(0, id - 1), ...state.dataAPI.slice(id)],
                                }));
                                this.Notify('success', 'Delete Success');
                            } else {
                                this.Notify('error', 'Delete Error');
                            }
                        };
                        return (
                            <Button onClick={handleDelete}>
                                <DeleteIcon />
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

    componentDidMount() {
        fetch('http://localhost:5000/subject/get-all', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
        })
            .then((response) => response.json())
            .then((data) =>
                this.setState(() => ({
                    dataAPI: data.map((obj) => obj),
                    rows: data.map((obj, index) => ({
                        id: index + 1,
                        SubID: obj?.subjectId,
                        SubName: obj?.subjectName,
                        Credit: obj?.credit,
                    })),
                })),
            )
            .catch((error) => {
                console.error('Error:', error);
            });
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
                    <div style={{ height: 630, width: '100%' }}>
                        <DataGrid
                            disableSelectionOnClick
                            rows={this.state.rows}
                            columns={this.state.columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                        <div id="details-form" />
                        <SubjectDialog
                            savechange={this.saveChange}
                            Notify={this.Notify}
                            count={this.state.rows.length}
                        />
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

export default Subject;
