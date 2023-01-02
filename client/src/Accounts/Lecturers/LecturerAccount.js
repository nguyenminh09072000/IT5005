import { Container, Button, Snackbar, Alert } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid, GridApi } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from './FormDialog';
import DetailFormDialog from './DetailFormDialog';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import DropzoneDialog from './DropzoneDialog';
import TokenService from '../../service/TokenService';

class LecturerAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'id', headerName: 'Index', width: 70 },
                { field: 'TeacherID', headerName: 'Teacher ID', width: 230 },
                { field: 'FullName', headerName: 'Full Name', width: 280 },
                { field: 'Email', headerName: 'Email', width: 300 },
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
                                    lecturer={this.state.dataAPI[id - 1]}
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
                            const TeacherId = api.getCellValue(params.id, 'TeacherID');
                            const email = api.getCellValue(params.id, 'Email');
                            // console.log(id + TeacherId + email);
                            const response = await fetch(`http://localhost:5000/teacher/delete`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: TokenService.getLocalAccessToken(),
                                },
                                body: JSON.stringify({
                                    teacherId: TeacherId,
                                }),
                            });
                            // console.log(response['status']);
                            if (response['status'] === 200) {
                                this.setState((state) => ({
                                    rows: [...state.rows.slice(0, id - 1), ...state.rows.slice(id)].map((e, i) => ({
                                        id: i + 1,
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
        // alert('data');
        // const response = await fetch('http://localhost:5000/teacher/get', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         authorization: TokenService.getLocalAccessToken(),
        //     },
        //     body: JSON.stringify({
        //         teacherId: '0001',
        //     }),
        // });
        // const data = await response.json();
        // alert(data);

        // const response = await fetch('http://localhost:5000/teacher/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         authorization: TokenService.getLocalAccessToken(),
        //     },
        //     body: JSON.stringify({
        //         teacherId: '0006',
        //         teacherName: 'Nguyen Van A',
        //         username: 'teacher6@gmail.com',
        //     }),
        // });
        // const data = await response.json();
        // alert(data);

        // alert(data);

        // await axios
        //     .post(
        //         'http://localhost:5000/teacher/get',
        //         {
        //             teacherId: '0001',
        //         },
        //         {
        //             headers: {
        //                 authorization: TokenService.getLocalAccessToken(),
        //             },
        //         },
        //     )
        //     .then((res) => {
        //         console.log(res.data);
        //         // alert(res.data.teacherId);
        //         return res.data.message;
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         return err.message;
        //     });

        // const response = await fetch('http://localhost:5000/teacher/get-all', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         authorization: TokenService.getLocalAccessToken(),
        //     },
        // });
        // const data = await response.json();
        // console.log(data);

        fetch('http://localhost:5000/teacher/get-all', {
            method: 'GET', // or 'PUT'
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
                        FullName: obj?.teacherName,
                        Email: obj?.username,
                        TeacherID: obj?.teacherId,
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

export default LecturerAccount;
