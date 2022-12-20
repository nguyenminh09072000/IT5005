import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/home';
import ImageSlider from './components/imageSlider';

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
                <Route path="/lecturer/login" element={<Login role="lecturer" />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
