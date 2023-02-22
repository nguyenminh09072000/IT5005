import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Snackbar, Alert} from '@mui/material';
import { useState, useEffect } from 'react';
import TokenService from '../../service/TokenService';
import GmailService from '../../service/GmailService';
class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { field: 'id', headerName: 'Index', width: 100 },
                { field: 'SubID', headerName: 'Mã học phần', width: 150 },
                { field: 'SubName', headerName: 'Tên học phần', width: 250 },
                { field: 'credit', headerName: 'TC', width: 100 },
                { field: 'Midterm', headerName: 'Điểm giữa kỳ', width: 100 },
                { field: 'Finalterm', headerName: 'Điểm cuối kỳ', width: 100 },
            ],
            count: 0,
            rows: [],
            open: false,
            severity: '',
            dataAPI: [],
            message: '',
        }
    }
    async componentDidMount() {
        const username = GmailService.getLocalGmail();
            const response1 = await fetch(`http://localhost:5000/student/get-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: TokenService.getLocalAccessToken(),
                },
                body: JSON.stringify({
                    username: username,
                }),
            }); 
            if (response1['status'] === 200) {
                const data1 = await response1.json();
                console.log(data1.studentId);
                await fetch('http://localhost:5000/student/get-class-list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: TokenService.getLocalAccessToken(),
                    },
                    body: JSON.stringify({
                        studentId: data1.studentId,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) =>
                        this.setState(() => ({
                            dataAPI: data.map((obj) => obj),
                            rows: data.map((obj, index) => ({
                                id: index + 1,
                                SubID: obj?.subjectId,
                                SubName: obj?.subjectName,
                                credit: obj?.term,
                                Midterm: obj?.midterm,
                                Finalterm: obj?.final,
                                //locationName: obj?.locationName,
                                
                            })),
                        })),
                    )
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
            
    }

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

export default Result;