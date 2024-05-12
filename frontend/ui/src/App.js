import React from 'react';
import IncomeTable from './components/Income/IncomeTable';
import ExpenseForm from './components/Expenses/ExpenseForm';
import ExpenseTable from './components/Expenses/ExpenseTable';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Overview from './components/Overview/Overview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ExpenseForm' element={<ExpenseForm/>}/>
        <Route path="/addexpense" element={<ExpenseForm />} />
        <Route path="/viewincomes" element={<IncomeTable />} />
        <Route path="/viewexpenses" element={<ExpenseTable />} />
        <Route path='/' element={<Overview/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
