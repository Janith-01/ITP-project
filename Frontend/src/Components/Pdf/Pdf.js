import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PdfComp from './PdfComp';
import './Pdf.css'; 
import EmpNav from "../EmpNav/EmpNav";

function Pdf() {
    const [title, setTitle] = useState('');
    const [file, saveFile] = useState(null);
    const [allPdf, setAllPdf] = useState([]);
    const [pdfFile, setPDFFile] = useState(null);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        getpdf();
    }, []);

    const getpdf = async () => {
        try {
            const result = await axios.get('http://localhost:5000/getFile');
            setAllPdf(result.data.data || []);
        } catch (error) {
            console.error('Error fetching PDF files:', error);
        }
    };

    const submitPdf = async (e) => {
        e.preventDefault();

        if (!title || !file) {
            setFormError('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            const result = await axios.post('http://localhost:5000/uplodefile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (result.data.status === 200) {
                alert('Upload Success');
                getpdf();
            } else {
                alert('Upload Error');
            }
        } catch (error) {
            console.error('Error Uploading:', error.message);
            alert('Error Uploading: ' + error.message);
        }
    };

    const showPdf = (pdf) => {
        const pdfUrl = `http://localhost:5000/files/${pdf}`;
        window.open(pdfUrl, '_blank');
    };

    const deletePdf = async (pdfId) => {
        try {
            const result = await axios.delete(`http://localhost:5000/deletePdf/${pdfId}`);
            if (result.data.status === 200) {
                alert('Report deleted successfully');
                getpdf();
            } else {
                alert('Error deleting report');
            }
        } catch (error) {
            console.error('Error deleting report:', error.message);
            alert('Error deleting report: ' + error.message);
        }
    };

    return (
        <div className="container17">
            <EmpNav/>
            <br /><br />
            <div className="pdf-container">
                <h1 className="pdf-title">Monthly Report</h1><br />
                <form onSubmit={submitPdf} className="pdf-form" >
                    <label>Pdf Title</label>
                    <br />
                    <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    <label>Select Pdf File</label>
                    <input type='file' accept='application/pdf' required onChange={(e) => saveFile(e.target.files[0])} />
                    <br /><br /><br />
                    <button type="submit" className="pdf-btn">Submit</button>
                </form>

                {formError && <div className="error-message">{formError}</div>}

                <div>
                    <h4 className="pdf-h4" >Pdf Details</h4>
                    {allPdf.map((data) => (
                        <div key={data._id}>
                            <h1 className="pdf-h1">{data.title}</h1>
                            <button onClick={() => showPdf(data.pdf)} className="pdf-btn">Show Pdf</button>
                            <button onClick={() => deletePdf(data._id)} className="pdf-btn">Delete</button>
                        </div>
                    ))}
                </div>
                {pdfFile && <PdfComp pdfFile={pdfFile} className="pdfFile"/>}
            </div>
        </div>
    );
}

export default Pdf;
