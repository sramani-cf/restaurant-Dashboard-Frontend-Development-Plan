'use server';

import { format } from 'date-fns';
import {
  Report,
  SalesSummary,
  MenuEngineeringReport,
  LaborReport,
  InventoryReport,
  CustomerReport,
  ExportOptions,
  ExportResult
} from './types';

// CSV Export Functions
export class CSVExporter {
  private static escapeCSVField(field: any): string {
    if (field === null || field === undefined) return '';
    
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  private static arrayToCSV(data: any[], headers: string[]): string {
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.map(header => this.escapeCSVField(header)).join(','));
    
    // Add data rows
    data.forEach(row => {
      const values = headers.map(header => {
        const keys = header.split('.');
        let value = row;
        
        for (const key of keys) {
          value = value?.[key];
        }
        
        return this.escapeCSVField(value);
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  }

  static exportSalesReport(report: SalesSummary): string {
    const sections = [];
    
    // Summary section
    sections.push('=== SALES SUMMARY ===');
    sections.push('Metric,Current,Previous,Change,Change %');
    sections.push([
      'Total Revenue',
      report.data.totalRevenue.current,
      report.data.totalRevenue.previous || '',
      report.data.totalRevenue.change || '',
      report.data.totalRevenue.changePercent || ''
    ].map(field => CSVExporter.escapeCSVField(field)).join(','));
    
    sections.push([
      'Total Orders',
      report.data.totalOrders.current,
      report.data.totalOrders.previous || '',
      report.data.totalOrders.change || '',
      report.data.totalOrders.changePercent || ''
    ].map(field => CSVExporter.escapeCSVField(field)).join(','));
    
    sections.push([
      'Average Order Value',
      report.data.averageOrderValue.current,
      report.data.averageOrderValue.previous || '',
      report.data.averageOrderValue.change || '',
      report.data.averageOrderValue.changePercent || ''
    ].map(field => CSVExporter.escapeCSVField(field)).join(','));
    
    sections.push('');
    
    // Sales trend data
    sections.push('=== SALES TREND ===');
    const trendHeaders = ['Date', 'Revenue', 'Orders', 'Guests', 'Average Order Value'];
    sections.push(this.arrayToCSV(report.data.salesTrend, trendHeaders));
    
    sections.push('');
    
    // Channel breakdown
    sections.push('=== REVENUE BY CHANNEL ===');
    const channelHeaders = ['Channel', 'Revenue', 'Orders', 'Percentage'];
    sections.push(this.arrayToCSV(report.data.revenueByChannel, channelHeaders));
    
    sections.push('');
    
    // Hourly breakdown
    sections.push('=== REVENUE BY HOUR ===');
    const hourlyHeaders = ['Hour', 'Revenue', 'Orders', 'Average Order Value'];
    sections.push(this.arrayToCSV(report.data.revenueByHour, hourlyHeaders));
    
    return sections.join('\n');
  }

  static exportMenuEngineeringReport(report: MenuEngineeringReport): string {
    const sections = [];
    
    // Overview
    sections.push('=== MENU OVERVIEW ===');
    sections.push('Metric,Value');
    sections.push(`Total Items,${report.data.overview.totalItems}`);
    sections.push(`Active Items,${report.data.overview.activeItems}`);
    sections.push(`Average Price,${report.data.overview.averagePrice.toFixed(2)}`);
    sections.push(`Overall Margin,${report.data.overview.overallMargin.toFixed(2)}%`);
    sections.push(`Stars,${report.data.overview.classifications.stars}`);
    sections.push(`Plow Horses,${report.data.overview.classifications.plowHorses}`);
    sections.push(`Puzzles,${report.data.overview.classifications.puzzles}`);
    sections.push(`Dogs,${report.data.overview.classifications.dogs}`);
    
    sections.push('');
    
    // Menu items analysis
    sections.push('=== MENU ITEMS ANALYSIS ===');
    const itemHeaders = [
      'Name', 'Category', 'Classification', 
      'Quantity Sold', 'Revenue', 'Popularity %', 'Profitability %', 
      'Contribution %', 'Cost %', 'Price Point'
    ];
    
    const itemData = report.data.items.map(item => ({
      Name: item.name,
      Category: item.category,
      Classification: item.classification,
      'Quantity Sold': item.metrics.quantitySold,
      Revenue: item.metrics.revenue.toFixed(2),
      'Popularity %': item.metrics.popularity.toFixed(2),
      'Profitability %': item.metrics.profitability.toFixed(2),
      'Contribution %': item.metrics.contribution.toFixed(2),
      'Cost %': item.metrics.costPercent.toFixed(2),
      'Price Point': item.metrics.pricePoint.toFixed(2)
    }));
    
    sections.push(this.arrayToCSV(itemData, itemHeaders));
    
    sections.push('');
    
    // Category analysis
    sections.push('=== CATEGORY ANALYSIS ===');
    const categoryHeaders = [
      'Category', 'Item Count', 'Total Revenue', 'Avg Popularity', 'Avg Profitability',
      'Stars', 'Plow Horses', 'Puzzles', 'Dogs'
    ];
    sections.push(this.arrayToCSV(report.data.categories, categoryHeaders));
    
    sections.push('');
    
    // Recommendations
    sections.push('=== RECOMMENDATIONS ===');
    const recommendationHeaders = ['Item Name', 'Type', 'Reason', 'Expected Impact', 'Priority'];
    const recommendationData = report.data.recommendations.map(rec => ({
      'Item Name': rec.itemName,
      Type: rec.type,
      Reason: rec.reason,
      'Expected Impact': rec.expectedImpact,
      Priority: rec.priority
    }));
    sections.push(this.arrayToCSV(recommendationData, recommendationHeaders));
    
    return sections.join('\n');
  }

  static exportLaborReport(report: LaborReport): string {
    const sections = [];
    
    // Overview
    sections.push('=== LABOR OVERVIEW ===');
    sections.push('Metric,Value');
    sections.push(`Total Employees,${report.data.overview.totalEmployees}`);
    sections.push(`Total Hours,${report.data.overview.totalHours}`);
    sections.push(`Total Labor Cost,${report.data.overview.totalLaborCost.toFixed(2)}`);
    sections.push(`Labor Cost %,${report.data.overview.laborCostPercentage.toFixed(2)}%`);
    sections.push(`Average Hourly Wage,${report.data.overview.averageHourlyWage.toFixed(2)}`);
    sections.push(`Overtime %,${report.data.overview.overtimePercentage.toFixed(2)}%`);
    sections.push(`Productivity Index,${report.data.overview.productivityIndex.toFixed(2)}`);
    
    sections.push('');
    
    // Employee performance
    sections.push('=== EMPLOYEE PERFORMANCE ===');
    const empHeaders = [
      'Name', 'Role', 'Department', 'Hours Worked', 'Overtime Hours',
      'Sales Generated', 'Orders Processed', 'Avg Order Value', 'Efficiency',
      'Sales Per Hour', 'Orders Per Hour', 'Performance Rating'
    ];
    
    const empData = report.data.employeePerformance.map(emp => ({
      Name: emp.name,
      Role: emp.role,
      Department: emp.department,
      'Hours Worked': emp.metrics.hoursWorked,
      'Overtime Hours': emp.metrics.overtimeHours,
      'Sales Generated': emp.metrics.salesGenerated.toFixed(2),
      'Orders Processed': emp.metrics.ordersProcessed,
      'Avg Order Value': emp.metrics.avgOrderValue.toFixed(2),
      Efficiency: emp.metrics.efficiency,
      'Sales Per Hour': emp.performance.salesPerHour.toFixed(2),
      'Orders Per Hour': emp.performance.ordersPerHour.toFixed(2),
      'Performance Rating': emp.performance.efficiency
    }));
    
    sections.push(this.arrayToCSV(empData, empHeaders));
    
    sections.push('');
    
    // Department analysis
    sections.push('=== DEPARTMENT ANALYSIS ===');
    const deptHeaders = [
      'Department', 'Employee Count', 'Total Hours', 'Total Cost',
      'Average Wage', 'Productivity', 'Cost % of Sales'
    ];
    sections.push(this.arrayToCSV(report.data.departmentAnalysis, deptHeaders));
    
    return sections.join('\n');
  }

  static exportInventoryReport(report: InventoryReport): string {
    const sections = [];
    
    // Overview
    sections.push('=== INVENTORY OVERVIEW ===');
    sections.push('Metric,Value');
    sections.push(`Total Value,${report.data.overview.totalValue}`);
    sections.push(`Turnover Rate,${report.data.overview.turnoverRate}`);
    sections.push(`Days On Hand,${report.data.overview.daysOnHand}`);
    sections.push(`Stockout Events,${report.data.overview.stockoutEvents}`);
    sections.push(`Overstock Items,${report.data.overview.overStockItems}`);
    
    sections.push('');
    
    // Cost analysis
    sections.push('=== COST ANALYSIS ===');
    sections.push('Metric,Value');
    sections.push(`Actual Food Cost,${report.data.costAnalysis.actualFoodCost}`);
    sections.push(`Theoretical Food Cost,${report.data.costAnalysis.theoreticalFoodCost}`);
    sections.push(`Variance,${report.data.costAnalysis.variance}`);
    sections.push(`Variance %,${report.data.costAnalysis.variancePercent}%`);
    sections.push(`Cost % of Sales,${report.data.costAnalysis.costPercentOfSales}%`);
    
    return sections.join('\n');
  }

  static exportCustomerReport(report: CustomerReport): string {
    const sections = [];
    
    // Overview
    sections.push('=== CUSTOMER OVERVIEW ===');
    sections.push('Metric,Value');
    sections.push(`Total Customers,${report.data.overview.totalCustomers}`);
    sections.push(`New Customers,${report.data.overview.newCustomers}`);
    sections.push(`Returning Customers,${report.data.overview.returningCustomers}`);
    sections.push(`Average Order Value,${report.data.overview.averageOrderValue}`);
    sections.push(`Average Visit Frequency,${report.data.overview.averageVisitFrequency}`);
    sections.push(`Customer Lifetime Value,${report.data.overview.customerLifetimeValue}`);
    
    sections.push('');
    
    // Retention metrics
    sections.push('=== RETENTION METRICS ===');
    sections.push('Metric,Value');
    sections.push(`Retention Rate,${report.data.retention.retentionRate}%`);
    sections.push(`Churn Rate,${report.data.retention.churnRate}%`);
    sections.push(`Average Customer Lifespan,${report.data.retention.averageCustomerLifespan} months`);
    
    return sections.join('\n');
  }
}

// PDF Export Functions (simplified - would typically use a library like jsPDF)
export class PDFExporter {
  static async exportReport(report: Report, options: ExportOptions): Promise<string> {
    // This is a simplified implementation
    // In a real scenario, you'd use libraries like jsPDF, Puppeteer, or similar
    
    const htmlContent = this.generateReportHTML(report, options);
    
    // For now, return HTML that could be converted to PDF
    // In production, you'd convert this to actual PDF
    return htmlContent;
  }

  private static generateReportHTML(report: Report, options: ExportOptions): string {
    const reportDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const dateRange = `${format(report.dateRange.from, 'yyyy-MM-dd')} to ${format(report.dateRange.to, 'yyyy-MM-dd')}`;
    
    let content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${report.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .section { margin-bottom: 30px; }
          .metric { display: flex; justify-content: space-between; padding: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .chart-placeholder { height: 200px; background: #f8f9fa; border: 1px dashed #ccc; 
                              display: flex; align-items: center; justify-content: center; margin: 10px 0; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${report.name}</h1>
          <p><strong>Report Period:</strong> ${dateRange}</p>
          <p><strong>Generated:</strong> ${reportDate}</p>
          <p><strong>Description:</strong> ${report.description}</p>
        </div>
    `;

    switch (report.type) {
      case 'sales-summary':
        content += this.generateSalesReportHTML(report as SalesSummary, options);
        break;
      case 'menu-engineering':
        content += this.generateMenuReportHTML(report as MenuEngineeringReport, options);
        break;
      case 'labor-analysis':
        content += this.generateLaborReportHTML(report as LaborReport, options);
        break;
      case 'inventory-control':
        content += this.generateInventoryReportHTML(report as InventoryReport, options);
        break;
      case 'customer-analytics':
        content += this.generateCustomerReportHTML(report as CustomerReport, options);
        break;
    }

    content += `
      </body>
      </html>
    `;

    return content;
  }

  private static generateSalesReportHTML(report: SalesSummary, options: ExportOptions): string {
    const data = report.data;
    
    return `
      <div class="section">
        <h2>Sales Summary</h2>
        <div class="metric">
          <span><strong>Total Revenue:</strong></span>
          <span>$${data.totalRevenue.current.toLocaleString()} 
            ${data.totalRevenue.changePercent ? 
              `(${data.totalRevenue.changeType === 'increase' ? '+' : ''}${data.totalRevenue.changePercent.toFixed(1)}%)` : 
              ''}
          </span>
        </div>
        <div class="metric">
          <span><strong>Total Orders:</strong></span>
          <span>${data.totalOrders.current.toLocaleString()}</span>
        </div>
        <div class="metric">
          <span><strong>Average Order Value:</strong></span>
          <span>$${data.averageOrderValue.current.toFixed(2)}</span>
        </div>
      </div>

      ${options.includeCharts ? '<div class="chart-placeholder">Sales Trend Chart</div>' : ''}

      <div class="section">
        <h2>Revenue by Channel</h2>
        <table>
          <tr><th>Channel</th><th>Revenue</th><th>Orders</th><th>Percentage</th></tr>
          ${data.revenueByChannel.map(channel => `
            <tr>
              <td>${channel.channel}</td>
              <td>$${channel.revenue.toLocaleString()}</td>
              <td>${channel.orders}</td>
              <td>${channel.percentage.toFixed(1)}%</td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;
  }

  private static generateMenuReportHTML(report: MenuEngineeringReport, options: ExportOptions): string {
    // Similar structure for menu engineering report
    return `
      <div class="section">
        <h2>Menu Engineering Analysis</h2>
        <p>Detailed menu item performance analysis would go here...</p>
      </div>
    `;
  }

  private static generateLaborReportHTML(report: LaborReport, options: ExportOptions): string {
    // Similar structure for labor report
    return `
      <div class="section">
        <h2>Labor Analysis</h2>
        <p>Employee performance and labor cost analysis would go here...</p>
      </div>
    `;
  }

  private static generateInventoryReportHTML(report: InventoryReport, options: ExportOptions): string {
    // Similar structure for inventory report
    return `
      <div class="section">
        <h2>Inventory Control</h2>
        <p>Inventory management and cost control analysis would go here...</p>
      </div>
    `;
  }

  private static generateCustomerReportHTML(report: CustomerReport, options: ExportOptions): string {
    // Similar structure for customer report
    return `
      <div class="section">
        <h2>Customer Analytics</h2>
        <p>Customer behavior and retention analysis would go here...</p>
      </div>
    `;
  }
}

// Main export function
export async function exportReport(
  report: Report,
  options: ExportOptions
): Promise<ExportResult> {
  try {
    let content: string;
    let mimeType: string;
    let fileExtension: string;

    switch (options.format) {
      case 'csv':
        mimeType = 'text/csv';
        fileExtension = 'csv';
        
        switch (report.type) {
          case 'sales-summary':
            content = CSVExporter.exportSalesReport(report as SalesSummary);
            break;
          case 'menu-engineering':
            content = CSVExporter.exportMenuEngineeringReport(report as MenuEngineeringReport);
            break;
          case 'labor-analysis':
            content = CSVExporter.exportLaborReport(report as LaborReport);
            break;
          case 'inventory-control':
            content = CSVExporter.exportInventoryReport(report as InventoryReport);
            break;
          case 'customer-analytics':
            content = CSVExporter.exportCustomerReport(report as CustomerReport);
            break;
          default:
            throw new Error('Unsupported report type for CSV export');
        }
        break;

      case 'pdf':
        mimeType = 'application/pdf';
        fileExtension = 'pdf';
        content = await PDFExporter.exportReport(report, options);
        break;

      case 'excel':
        // Excel export would be implemented here
        throw new Error('Excel export not yet implemented');

      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    // In a real implementation, you'd upload this to a file storage service
    // and return a download URL. For now, we'll simulate this.
    const filename = `${report.type}-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.${fileExtension}`;
    const simulatedUrl = `/api/reports/download/${filename}`;
    
    // Calculate approximate file size (in bytes)
    const fileSize = new Blob([content]).size;

    return {
      success: true,
      downloadUrl: simulatedUrl,
      fileSize
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Export failed'
    };
  }
}

// Utility functions for export formatting
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toFixed(decimals);
}

// Batch export function for multiple reports
export async function exportMultipleReports(
  reports: Report[],
  options: ExportOptions
): Promise<ExportResult[]> {
  const results = await Promise.allSettled(
    reports.map(report => exportReport(report, options))
  );

  return results.map(result => 
    result.status === 'fulfilled' 
      ? result.value 
      : { success: false, error: 'Export failed' }
  );
}