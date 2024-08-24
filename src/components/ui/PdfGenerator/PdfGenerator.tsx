"use client"
import React, { ReactNode } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Button } from '../Button';
import { FaFilePdf } from 'react-icons/fa';
import JSZip from 'jszip';

interface PdfGeneratorProps {
    filename: string;
    id?: string;
    orientation?: 'portrait' | 'landscape';
    unit?: 'pt' | 'mm' | 'cm' | 'in';
    buttonLabel: string;
    format?: string | number[];
    children: ReactNode;
    margins?: { top: number; left: number; bottom: number; right: number };
    isZipFile?: boolean;
}
export const PdfGenerator: React.FC<PdfGeneratorProps> = ({
    filename,
    id = 'reportPDF',
    orientation = 'portrait',//'portrait' | 'landscape';
    unit = 'mm',
    format = 'a4',
    children,
    buttonLabel,
    margins = { top: 10, left: 10, bottom: 10, right: 10 },
    isZipFile = false
}) => {
    const generatePDF = async () => {
        const elementHtml = document.getElementById(id);
        if (elementHtml) {
            const canvas = await html2canvas(elementHtml, { scale: 2 });
            const imageData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: orientation,
                unit: unit,
                format: format,
            });

            const pdfWidth = pdf.internal.pageSize.getWidth() - margins.left - margins.right;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imageData, 'PNG', margins.left, margins.top, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output('blob');

            if (isZipFile) {
                const zip = new JSZip();
                zip.file(filename, pdfBlob);
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                saveAs(zipBlob, `${filename.split('.')[0]}.zip`);
            } else {
                saveAs(pdfBlob, filename);
            }
        }
    };

    return (
        <div className='row'>
            <div className='col-lg-12'>
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <Button
                            cssClass={`btn btn-danger mx-1 mt-1 mb-2`}
                            label={buttonLabel}
                            iconStart={<FaFilePdf />}
                            isReadOnly={false}
                            onClick={generatePDF} />
                    </div>
                </div>
                <div className='row'>
                    <div className={`col-lg-12 border border-secondary`}>
                        <div id={id} className={`mt-2 mb-4 pt-3 pb-3 ps-3 pe-3`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
