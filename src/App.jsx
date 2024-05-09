import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TaskOne from './features/taskone/components/TaskOne';
import TaskTwo from './features/tasktwo/components/TaskTwo';
import Header from './features/header/components/Header';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<TaskTwo />} />
        <Route path='/task-one' element={<TaskOne />} />
      </Routes>
    </Router>
  )
}
