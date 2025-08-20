'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileImage, Check } from 'lucide-react';
import { ExportOptions } from '@/lib/analytics/types';

interface ExportButtonProps {
  onExport: (options: ExportOptions) => Promise<void>;
  disabled?: boolean;
  className?: string;
}

type ExportFormat = 'csv' | 'pdf' | 'excel';

const formatConfig = {
  csv: {
    icon: FileSpreadsheet,
    label: 'CSV',
    description: 'Spreadsheet format for data analysis'
  },
  pdf: {
    icon: FileText,
    label: 'PDF',
    description: 'Formatted report with charts'
  },
  excel: {
    icon: FileSpreadsheet,
    label: 'Excel',
    description: 'Excel workbook with multiple sheets'
  }
};

export function ExportButton({ onExport, disabled = false, className = '' }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<ExportFormat | null>(null);

  const handleExport = async (format: ExportFormat) => {
    if (disabled || isExporting) return;

    setIsExporting(true);
    setExportedFormat(format);

    try {
      const options: ExportOptions = {
        format,
        includeCharts: format === 'pdf',
        includeRawData: format === 'csv' || format === 'excel'
      };

      await onExport(options);
      
      // Show success state briefly
      setTimeout(() => {
        setExportedFormat(null);
        setIsOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Export failed:', error);
      setExportedFormat(null);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      {/* Main Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExporting}
        className={`
          inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md
          text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors
          ${className}
        `}
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </button>

      {/* Export Options Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Export Report
              </h3>

              <div className="space-y-2">
                {(Object.keys(formatConfig) as ExportFormat[]).map((format) => {
                  const config = formatConfig[format];
                  const Icon = config.icon;
                  const isCurrentlyExporting = isExporting && exportedFormat === format;
                  const hasExported = exportedFormat === format && !isExporting;

                  return (
                    <button
                      key={format}
                      onClick={() => handleExport(format)}
                      disabled={disabled || isExporting}
                      className={`
                        w-full flex items-start p-3 text-left rounded-md border transition-all
                        ${hasExported 
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : isCurrentlyExporting
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      <div className="flex-shrink-0 mr-3 mt-0.5">
                        {hasExported ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Icon className={`w-5 h-5 ${
                            isCurrentlyExporting ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {config.label}
                            {format === 'excel' && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-100 text-orange-700 rounded">
                                Coming Soon
                              </span>
                            )}
                          </p>

                          {isCurrentlyExporting && (
                            <div className="flex items-center text-xs text-blue-600">
                              <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent mr-1"></div>
                              Exporting...
                            </div>
                          )}

                          {hasExported && (
                            <span className="text-xs text-green-600 font-medium">
                              Downloaded
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          {config.description}
                        </p>

                        {/* Export Options Preview */}
                        {format === 'pdf' && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                              <FileImage className="w-3 h-3 mr-1" />
                              Charts included
                            </span>
                          </div>
                        )}

                        {format === 'csv' && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                              Raw data
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Export Notes */}
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <div className="flex">
                  <div className="ml-0">
                    <h4 className="text-xs font-medium text-blue-800">
                      Export includes:
                    </h4>
                    <ul className="text-xs text-blue-700 mt-1 space-y-0.5">
                      <li>• Current date range data</li>
                      <li>• Comparison period (if selected)</li>
                      <li>• All visible metrics and charts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Simplified export button for quick actions
export function QuickExportButton({ 
  format, 
  onExport, 
  disabled = false,
  className = ''
}: {
  format: ExportFormat;
  onExport: (options: ExportOptions) => Promise<void>;
  disabled?: boolean;
  className?: string;
}) {
  const [isExporting, setIsExporting] = useState(false);
  const config = formatConfig[format];
  const Icon = config.icon;

  const handleClick = async () => {
    if (disabled || isExporting) return;

    setIsExporting(true);

    try {
      const options: ExportOptions = {
        format,
        includeCharts: format === 'pdf',
        includeRawData: format === 'csv' || format === 'excel'
      };

      await onExport(options);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isExporting || format === 'excel'}
      className={`
        inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${format === 'excel'
          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      title={format === 'excel' ? 'Coming Soon' : `Export as ${config.label}`}
    >
      {isExporting ? (
        <div className="animate-spin rounded-full h-4 w-4 border border-gray-600 border-t-transparent mr-2"></div>
      ) : (
        <Icon className="w-4 h-4 mr-2" />
      )}
      {config.label}
      {format === 'excel' && (
        <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-100 text-orange-700 rounded">
          Soon
        </span>
      )}
    </button>
  );
}