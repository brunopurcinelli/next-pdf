import { PdfGenerator } from "@/components/ui/PdfGenerator";
import { ExamplePdf, ExamplePdfZip } from "@/components";

export default function Home() {
  return (
        <div className="d-flex text-center">
          <div className="row">
            <div className="col-lg-12">
              <PdfGenerator
                filename="Example.pdf"
                orientation="portrait"
                key='fluCertificatePdf'
                buttonLabel="Export to PDF">
                <ExamplePdf/>
              </PdfGenerator>
            </div>
            <div className="col-lg-12">
              <PdfGenerator
                filename="ExampleWithZip.pdf"
                orientation="landscape"
                isZipFile={true}
                key='fluCertificatePdf'
                buttonLabel="Export to PDF and ZIP File">
                <ExamplePdfZip/>
              </PdfGenerator>
            </div>
          </div>
        </div>
  );
}
