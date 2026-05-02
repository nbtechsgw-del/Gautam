import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'
import Admin from './components/admindashboard'
import User from './components/userdashboard'
import AdminDashboard from './components/admindashboard'
import UserDashboard from './components/userdashboard'
import ManageQuestions from "./components/ManageQuestions";
import CreateExam from "./components/CreateExam";
import Results from "./components/Results";
import UserExams from './components/userexam'
import AttemptExam from './components/attemptexam'
import UserResults from './components/userresults'
import ResultPage from './components/resultpage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/admin/create-exam" element={<CreateExam />} />
        <Route path="/admin/results" element={<Results />} />
        <Route path="/user/exams" element={<UserExams />} />
        <Route path="/exam/:id" element={<AttemptExam />} />
        <Route path="/user/results" element={<UserResults/>} />
        <Route path="/user/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
