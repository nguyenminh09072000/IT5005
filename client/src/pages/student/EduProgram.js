import * as React from 'react';
import { Container, Snackbar, Alert} from '@mui/material';
import TokenService from '../../service/TokenService';
import { DataGrid, GridApi } from '@mui/x-data-grid';

class EduProgram extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { field: 'id', headerName: 'Index', width: 100 },
                { field: 'SubID', headerName: 'Mã học phần', width: 300 },
                { field: 'SubName', headerName: 'Tên học phần', width: 380 },
                // { field: 'Department', headerName: 'Department', width: 320 },
                { field: 'Credit', headerName: 'TC', width: 250 },
            ],
            count: 0,
            rows: [],
            open: false,
            severity: '',
            dataAPI: [],
            message: '',
        };
        // this.saveChange = this.saveChange.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.Notify = this.Notify.bind(this);
        // this.Modify = this.Modify.bind(this);
        
    }

    async componentDidMount() {
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
    // saveChange(row, data) {
    //     this.setState((state) => ({
    //         rows: [...state.rows, row],
    //         dataAPI: [...state.dataAPI, data],
    //     }));
    // }

    // Modify(id, row, data) {
    //     this.setState((state) => ({
    //         rows: [...state.rows.slice(0, id - 1), row, ...state.rows.slice(id)],
    //         dataAPI: [...state.dataAPI.slice(0, id - 1), data, ...state.dataAPI.slice(id)],
    //     }));
    // }

    // handleClose() {
    //     this.setState(() => ({
    //         open: false,
    //         severity: '',
    //         message: '',
    //     }));
    // }
    // Notify(severity, message) {
    //     this.setState(() => ({
    //         open: true,
    //         severity: severity,
    //         message: message,
    //     }));
    // }
    render() {
        return (
            <Container maxWidth="lg">
                <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
                    <div style={{ height: 630, width: '94%' }}>
                        <DataGrid
                            disableSelectionOnClick
                            rows={this.state.rows}
                            columns={this.state.columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                        {/* <div id="details-form" />
                        <SubjectDialog
                            savechange={this.saveChange}
                            Notify={this.Notify}
                            count={this.state.rows.length}
                        />
                    </div> */}
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
// 
export default EduProgram;

