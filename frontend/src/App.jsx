import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateReportingIncidentForm from './pages/ReportInsident';
import ReportedIncidentsTable from './pages/ViewReportedInsidents';
import CreateInsidentForm from './components/CreateInsidentForm';
import ViewInsidents from './pages/ViewInsidents';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reportinsident" element={<CreateReportingIncidentForm />} />
                <Route path="/viewreportinsident" element={<ReportedIncidentsTable />} />
                <Route path="/viewinsidents" element={<ViewInsidents />} />
                <Route path="/create-insident" element={<CreateInsidentForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
