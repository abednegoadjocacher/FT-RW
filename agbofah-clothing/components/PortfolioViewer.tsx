import { X, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { PortfolioViewerProps } from '@/interface';


export default function PortfolioViewer({ fileName, fileData, fileType, onClose }: PortfolioViewerProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isPDF = fileType === 'application/pdf';
  const isImage = fileType.startsWith('image/');
  const isDoc = fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              {isImage ? <ImageIcon className="w-5 h-5 text-neutral-600" /> : <FileText className="w-5 h-5 text-neutral-600" />}
            </div>
            <div>
              <h3 className="text-neutral-900">{fileName}</h3>
              <p className="text-neutral-500 text-xs">{fileType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-neutral-50">
          {isPDF && (
            <iframe
              src={fileData}
              className="w-full h-full rounded-lg bg-white"
              title="PDF Viewer"
            />
          )}

          {isImage && (
            <div className="flex items-center justify-center h-full">
              <img
                src={fileData}
                alt={fileName}
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              />
            </div>
          )}

          {isDoc && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FileText className="w-16 h-16 text-neutral-300 mb-4" />
              <h4 className="text-neutral-900 mb-2">Document Preview Not Available</h4>
              <p className="text-neutral-600 mb-6">
                Word documents cannot be previewed in the browser.
                <br />
                Please download the file to view its contents.
              </p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
