import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/home';
import StudentAccount from './Accounts/Students/StudentsAccount';
import LecturerAccount from './Accounts/Lecturers/LecturerAccount';
import LecturerHome from './pages/lecturerHome';
import LecturerInformation from './pages/lecturerInformation';
// import StudentInformation from './pages/studentInformation';
import LecturerTimetable from './pages/lecturerTimetable';
import Subject from './Subject/SubjectList';
import Classs from './Class/ClassList';
// import Timetable from './pages/student/Timetable';
import SubList from './pages/lecturer/Sublist';
// import Result from './pages/student/Result';
// import RegisterClass from './pages/student/RegisterClass';
// import EduProgram from './pages/student/EduProgram';
import ImageSlider from './components/imageSlider';
//  a0b337e8c685cc41b686c2136b2a9b531e2bc5c7

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home role="">
                            <ImageSlider />
                        </Home>
                    }
                ></Route>
                <Route
                    path="/student/home"
                    element={
                        <Home role="student">
                            <ImageSlider />
                        </Home>
                    }
                ></Route>
                <Route path="/teacher/home" element={<LecturerHome />}></Route>
                {/* <Route path="/teacher/sub" element={<lecSub role="teacher" />}></Route> */}
                <Route
                    path="/admin/home"
                    element={
                        <Home role="admin">
                            <ImageSlider />
                        </Home>
                    }
                ></Route>
                <Route path="/student/login" element={<Login role="student" />}></Route>
                <Route path="/admin/login" element={<Login role="admin" />}></Route>
                <Route path="/teacher/login" element={<Login role="teacher" />}></Route>
                <Route path="/teacher/information" element={<LecturerInformation />}></Route>
                {/* <Route path="/student/information" element={<StudentInformation />}></Route> */}

                <Route path="/teacher/timetable" element={<LecturerTimetable />}></Route>

                <Route
                    path="/subjects"
                    element={
                        <Home role="admin">
                            <Subject></Subject>
                        </Home>
                    }
                ></Route>
                <Route
                    path="/classes"
                    element={
                        <Home role="admin">
                            <Classs></Classs>
                        </Home>
                    }
                ></Route>
                <Route
                    path="/accounts/students"
                    element={
                        <Home role="admin">
                            <StudentAccount></StudentAccount>
                        </Home>
                    }
                ></Route>
                <Route
                    path="/accounts/lecturers"
                    element={
                        <Home role="admin">
                            <LecturerAccount></LecturerAccount>
                        </Home>
                    }
                ></Route>
                {/* <Route
                    path="/student/timetable"
                    element={
                        <Home role="student">
                            <Timetable></Timetable>
                        </Home>
                    }
                ></Route> */}
                <Route
                    path="/teacher/sub"
                    element={
                        <Home role="teacher">
                            <SubList></SubList>
                        </Home>
                    }
                ></Route>
                {/* <Route
                    path="/student/result"
                    element={
                        <Home role="student">
                            <Result></Result>
                        </Home>
                    }
                ></Route>
                <Route
                    path="/student/registerclass"
                    element={
                        <Home role="student">
                            <RegisterClass></RegisterClass>
                        </Home>
                    }
                ></Route> */}
                {/* <Route
                    path="/student/eduprogram"
                    element={
                        <Home role="student">
                            <EduProgram></EduProgram>
                        </Home>
                    }
                ></Route> */}
            </Routes>
        </Router>
    );
}

export default App;
