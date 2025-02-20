import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaFileDownload } from 'react-icons/fa';
import InvoicePDF from './Invoice';

const DownloadInvoice = ({ order }) => {
    return (
        <PDFDownloadLink
            document={<InvoicePDF order={order} />}
            fileName={`invoice-${order._id}.pdf`}
        >
            {({ blob, url, loading, error }) => (
                <button
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
                             transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaFileDownload className="w-4 h-4" />
                    {loading ? 'Generating Invoice...' : 'Download Invoice'}
                </button>
            )}
        </PDFDownloadLink>
    );
};

export default DownloadInvoice; 