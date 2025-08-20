import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// This would typically interface with your file storage service
// For this demo, we'll simulate file downloads
export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    // Validate filename format and security
    if (!filename || !/^[\w\-\.]+\.(csv|pdf|xlsx)$/.test(filename)) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify the file exists in your storage (S3, etc.)
    // 2. Check user permissions for the file
    // 3. Stream the file content

    // For demo purposes, we'll create sample content based on file extension
    const extension = filename.split('.').pop()?.toLowerCase();
    let content: string;
    let mimeType: string;

    switch (extension) {
      case 'csv':
        content = generateSampleCSV();
        mimeType = 'text/csv';
        break;
      case 'pdf':
        content = generateSamplePDF();
        mimeType = 'application/pdf';
        break;
      case 'xlsx':
        content = generateSampleExcel();
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported file type' },
          { status: 400 }
        );
    }

    // Create response with file content
    const response = new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': content.length.toString(),
        'Cache-Control': 'private, max-age=300' // Cache for 5 minutes
      }
    });

    return response;

  } catch (error) {
    console.error('File download error:', error);
    
    return NextResponse.json(
      { error: 'File download failed' },
      { status: 500 }
    );
  }
}

function generateSampleCSV(): string {
  return `Date,Revenue,Orders,Average Order Value
2024-01-01,2500.00,45,55.56
2024-01-02,3200.00,58,55.17
2024-01-03,2800.00,52,53.85
2024-01-04,3500.00,62,56.45
2024-01-05,4200.00,75,56.00`;
}

function generateSamplePDF(): string {
  // This would be actual PDF binary content in a real implementation
  // For demo, return a simple text representation
  return `%PDF-1.4
Sample Report Content
This would be the actual PDF binary content in a real implementation.
Generated at: ${new Date().toISOString()}`;
}

function generateSampleExcel(): string {
  // This would be actual Excel binary content in a real implementation
  // You'd typically use a library like ExcelJS
  return `Sample Excel Content - Binary data would go here`;
}

// HEAD method for checking file existence without downloading
export async function HEAD(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    if (!filename || !/^[\w\-\.]+\.(csv|pdf|xlsx)$/.test(filename)) {
      return new NextResponse(null, { status: 404 });
    }

    // In a real implementation, check if file exists in storage
    const fileExists = true; // Mock check
    
    if (!fileExists) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Length': '1024', // Mock file size
        'Last-Modified': new Date().toUTCString(),
        'Cache-Control': 'private, max-age=300'
      }
    });

  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}