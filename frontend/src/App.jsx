import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ParentRegisterPage from './pages/parent/ParentRegisterPage';
import ChooseUser from './pages/ChooseUser';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const { currentRole, status, loading: userLoading } = useSelector(state => state.user);
  const { loading: studentLoading } = useSelector(state => state.student);
  const { loading: teacherLoading } = useSelector(state => state.teacher);
  const { loading: sclassLoading } = useSelector(state => state.sclass);
  const { loading: noticeLoading } = useSelector(state => state.notice);
  const { loading: complainLoading } = useSelector(state => state.complain);

  const isGlobalLoading = status === 'loading' || userLoading || studentLoading || teacherLoading || sclassLoading || noticeLoading || complainLoading;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={Boolean(isGlobalLoading)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />
          <Route path="/Parentlogin" element={<LoginPage role="Parent" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />
          <Route path="/Parentregister" element={<ParentRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }

      {currentRole === "Parent" &&
        <>
          <ParentDashboard />
        </>
      }
    </Router>
  )
}

export default App
