// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import './App.css';

// // Import the worker configuration file
// import './pdfWorkerConfig'; // Make sure this import is present

// function MyPDFComponent() {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     const onLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     const goToNextPage = () => {
//         if (pageNumber < numPages) setPageNumber(pageNumber + 1);
//     };

//     const goToPrevPage = () => {
//         if (pageNumber > 1) setPageNumber(pageNumber - 1);
//     };

//     return (
//         <div>
//             <Document
//                 file="your-pdf-file.pdf"
//                 onLoadSuccess={onLoadSuccess}
//             >
//                 <Page pageNumber={pageNumber} />
//             </Document>

//             <div>
//                 <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
//                     Previous Page
//                 </button>
//                 <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
//                     Next Page
//                 </button>
//             </div>
//             <p>
//                 Page {pageNumber} of {numPages}
//             </p>
//         </div>
//     );
// }

// export default MyPDFComponent;
