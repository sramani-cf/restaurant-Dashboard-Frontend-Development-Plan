import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  generateSalesReport,
  generateMenuEngineeringReport,
  generateLaborReport,
  generateInventoryReport,
  generateCustomerReport
} from '@/lib/analytics/data';
import { exportReport } from '@/lib/analytics/export';
import { 
  ReportType,
  ReportConfig,
  ExportOptions
} from '@/lib/analytics/types';
import { AnalyticsCache, CacheMetrics } from '@/lib/analytics/cache';

// Request validation schemas
const DateRangeSchema = z.object({
  from: z.string().transform(str => new Date(str)),
  to: z.string().transform(str => new Date(str))
});

const ReportConfigSchema = z.object({
  dateRange: DateRangeSchema,
  comparisonPeriod: DateRangeSchema.optional(),
  timezone: z.string().optional().default('UTC'),
  includeProjections: z.boolean().optional().default(false)
});

const ExportOptionsSchema = z.object({
  format: z.enum(['csv', 'pdf', 'excel']),
  includeCharts: z.boolean().optional().default(false),
  includeRawData: z.boolean().optional().default(false),
  customFields: z.array(z.string()).optional()
});

const QueryParamsSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  compareFrom: z.string().optional(),
  compareTo: z.string().optional(),
  timezone: z.string().optional(),
  includeProjections: z.string().optional().transform(val => val === 'true'),
  export: z.enum(['csv', 'pdf', 'excel']).optional(),
  includeCharts: z.string().optional().transform(val => val === 'true'),
  includeRawData: z.string().optional().transform(val => val === 'true')
});

// Valid report types
const VALID_REPORT_TYPES: ReportType[] = [
  'sales-summary',
  'menu-engineering', 
  'labor-analysis',
  'inventory-control',
  'customer-analytics'
];

// Report generators mapping
const REPORT_GENERATORS = {
  'sales-summary': generateSalesReport,
  'menu-engineering': generateMenuEngineeringReport,
  'labor-analysis': generateLaborReport,
  'inventory-control': generateInventoryReport,
  'customer-analytics': generateCustomerReport
} as const;

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const startTime = Date.now();

  try {
    // Validate report type
    const reportType = params.type as ReportType;
    if (!VALID_REPORT_TYPES.includes(reportType)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid report type',
          validTypes: VALID_REPORT_TYPES
        },
        { status: 400 }
      );
    }

    // Parse and validate query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryParams = {
      dateFrom: searchParams.get('dateFrom'),
      dateTo: searchParams.get('dateTo'),
      compareFrom: searchParams.get('compareFrom'),
      compareTo: searchParams.get('compareTo'),
      timezone: searchParams.get('timezone'),
      includeProjections: searchParams.get('includeProjections'),
      export: searchParams.get('export'),
      includeCharts: searchParams.get('includeCharts'),
      includeRawData: searchParams.get('includeRawData')
    };

    const validatedParams = QueryParamsSchema.parse(queryParams);

    // Build report configuration
    const config: ReportConfig = {
      dateRange: {
        from: new Date(validatedParams.dateFrom),
        to: new Date(validatedParams.dateTo)
      },
      timezone: validatedParams.timezone || 'UTC',
      includeProjections: validatedParams.includeProjections || false
    };

    // Add comparison period if provided
    if (validatedParams.compareFrom && validatedParams.compareTo) {
      config.comparisonPeriod = {
        from: new Date(validatedParams.compareFrom),
        to: new Date(validatedParams.compareTo)
      };
    }

    // Validate date range
    if (config.dateRange.from >= config.dateRange.to) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid date range: from date must be before to date' 
        },
        { status: 400 }
      );
    }

    // Generate the report
    const generator = REPORT_GENERATORS[reportType];
    const report = await generator(config);

    // Record generation time
    const generationTime = Date.now() - startTime;
    await CacheMetrics.recordGenerationTime(reportType, generationTime);

    // Handle export request
    if (validatedParams.export) {
      const exportOptions: ExportOptions = {
        format: validatedParams.export,
        includeCharts: validatedParams.includeCharts || false,
        includeRawData: validatedParams.includeRawData || false
      };

      try {
        const exportResult = await exportReport(report, exportOptions);
        
        if (!exportResult.success) {
          return NextResponse.json(
            { 
              success: false, 
              error: `Export failed: ${exportResult.error}` 
            },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          data: report,
          export: exportResult,
          generationTime,
          timestamp: new Date().toISOString()
        });

      } catch (exportError) {
        console.error('Export error:', exportError);
        
        // Return the report even if export fails
        return NextResponse.json({
          success: true,
          data: report,
          export: {
            success: false,
            error: 'Export failed but report generated successfully'
          },
          generationTime,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Return the report data
    return NextResponse.json({
      success: true,
      data: report,
      generationTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`Report generation error for ${params.type}:`, error);
    
    const generationTime = Date.now() - startTime;
    
    // Return detailed error for development, generic for production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error instanceof Error ? error.message : 'Unknown error'
      : 'Report generation failed';

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        generationTime,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const startTime = Date.now();

  try {
    // Validate report type
    const reportType = params.type as ReportType;
    if (!VALID_REPORT_TYPES.includes(reportType)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid report type',
          validTypes: VALID_REPORT_TYPES
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate request body
    const config = ReportConfigSchema.parse(body.config || {});
    const exportOptions = body.export ? ExportOptionsSchema.parse(body.export) : undefined;

    // Validate date range
    if (config.dateRange.from >= config.dateRange.to) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid date range: from date must be before to date' 
        },
        { status: 400 }
      );
    }

    // Generate the report
    const generator = REPORT_GENERATORS[reportType];
    const report = await generator(config);

    // Record generation time
    const generationTime = Date.now() - startTime;
    await CacheMetrics.recordGenerationTime(reportType, generationTime);

    // Handle export if requested
    if (exportOptions) {
      try {
        const exportResult = await exportReport(report, exportOptions);
        
        return NextResponse.json({
          success: true,
          data: report,
          export: exportResult,
          generationTime,
          timestamp: new Date().toISOString()
        });

      } catch (exportError) {
        console.error('Export error:', exportError);
        
        return NextResponse.json({
          success: true,
          data: report,
          export: {
            success: false,
            error: 'Export failed but report generated successfully'
          },
          generationTime,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Return the report data
    return NextResponse.json({
      success: true,
      data: report,
      generationTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`Report generation error for ${params.type}:`, error);
    
    const generationTime = Date.now() - startTime;
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request parameters',
          details: error.errors,
          generationTime,
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error instanceof Error ? error.message : 'Unknown error'
      : 'Report generation failed';

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        generationTime,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    }
  );
}