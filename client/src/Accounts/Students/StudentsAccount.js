import { Container, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridApi } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from './FormDialog';
import DetailFormDialog from './DetailFormDialog';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import DropzoneDialog from './DropzoneDialog';
import TokenService from '../../service/TokenService';
class StudentAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'id', headerName: 'Index', width: 70 },
                // { field: 'SID', headerName: 'SID', width: 110 },
                { field: 'FullName', headerName: 'Full Name', width: 280 },
                { field: 'Email', headerName: 'Email', width: 300 },
                {
                    field: 'StudentID',
                    headerName: 'Student ID',
                    width: 230,
                },
                {
                    field: 'detail',
                    headerName: 'Details',
                    sortable: false,
                    renderCell: (params) => {
                        const onClick = (e) => {
                            e.stopPropagation();

                            const id = params.id;
                            const api: GridApi = params.api;
                            const Email = api.getCellValue(params.id, 'Email');
                            ReactDOM.createRoot(document.getElementById('details-form')).render(
                                <DetailFormDialog
                                    student={this.state.dataAPI[id - 1]}
                                    Modify={this.Modify}
                                    id={id}
                                    Email={Email}
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
                            const studentId = api.getCellValue(params.id, 'StudentID');
                            const email = api.getCellValue(params.id, 'Email');
                            const response = await fetch(`http://localhost:5000/student/delete`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: TokenService.getLocalAccessToken(),
                                },
                                body: JSON.stringify({
                                    studentId: studentId,
                                }),
                            });
                            if (response['status'] === 200) {
                                this.setState((state) => ({
                                    rows: [...state.rows.slice(0, id - 1), ...state.rows.slice(id)].map((e, i) => ({
                                        id: i + 1,
                                        SID: e.SID,
                                        FullName: e.FullName,
                                        Email: e.Email,
                                        IdentityNumber: e.IdentityNumber,
                                    })),
                                    dataAPI: [...state.dataAPI.slice(0, id - 1), ...state.dataAPI.slice(id)],
                                }));
                                const user = await fetch(`http://localhost:5000/auth/delete/${email}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                                if (user) this.Notify('success', 'Delete Success');
                                else {
                                    this.Notify('error', 'Delete Error');
                                }
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
        this.Upload = this.Upload.bind(this);
    }

    componentDidMount() {
        // fetch('http://localhost:5000/student',{
        //   cache: 'no-cache'
        // })
        //   .then((res) => res.json())
        //   .then((data) =>
        //     this.setState(() => ({
        //       dataAPI: data.map((obj) => obj['_doc']),
        //       rows: data.map((obj, index) => ({
        //         id: index + 1,
        //         SID: obj['_doc'].SID,
        //         FullName: obj['_doc'].FullName,
        //         Email: obj['_doc'].Email,
        //         IdentityNumber: obj['_doc'].IdentityNumber,
        //       })),
        //     }))
        //   );
        fetch('http://localhost:5000/student/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: TokenService.getLocalAccessToken(),
            },
        })
            .then((response) => response.json())
            .then((data) =>
                this.setState(() => ({
                    dataAPI: data.data.map((obj) => obj),
                    rows: data.data.map((obj, index) => ({
                        id: index + 1,
                        FullName: obj?.studentName,
                        Email: obj?.username,
                        StudentID: obj?.studentId,
                    })),
                })),
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    Upload(dataAPI, rows) {
        this.setState(() => ({
            dataAPI: dataAPI,
            rows: rows,
        }));
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
                        <FormDialog savechange={this.saveChange} Notify={this.Notify} count={this.state.rows.length} />
                        <DropzoneDialog
                            savechange={this.saveChange}
                            Notify={this.Notify}
                            count={this.state.rows.length}
                            upload={this.Upload}
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

export default StudentAccount;
