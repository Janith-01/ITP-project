// PdfComp component
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf'; // Import pdfjs from react-pdf

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; // Specify the worker source

function PdfComp(props) {
    const [numPages, setNumPages] = useState(null); // Initialize numPages as null

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            {props.pdfFile ? (
                <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            ) : (
                <p>Pdf File Not available</p>
            )}

            <p>
                Page {props.pdfFile ? 1 : 0} of {numPages || 0}
            </p>
        </div>
    );
}

export default PdfComp;
