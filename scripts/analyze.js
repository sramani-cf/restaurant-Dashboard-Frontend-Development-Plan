#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Bundle analyzer configuration
const ANALYSIS_CONFIG = {
  outputDir: '.next/analyze',
  reportFormats: ['html', 'json'],
  thresholds: {
    maxBundleSize: 500000, // 500KB
    maxChunkSize: 250000,  // 250KB
    maxAssetCount: 100,
  },
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Logging utilities
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// Ensure output directory exists
function ensureOutputDir() {
  if (!fs.existsSync(ANALYSIS_CONFIG.outputDir)) {
    fs.mkdirSync(ANALYSIS_CONFIG.outputDir, { recursive: true });
    log.info(`Created output directory: ${ANALYSIS_CONFIG.outputDir}`);
  }
}

// Run bundle analysis with different configurations
async function runBundleAnalysis() {
  log.header('🔍 Running Bundle Analysis');
  
  const analyses = [
    {
      name: 'client',
      env: { BUNDLE_ANALYZE: 'browser' },
      description: 'Client-side bundle analysis',
    },
    {
      name: 'server',
      env: { BUNDLE_ANALYZE: 'server' },
      description: 'Server-side bundle analysis',
    },
    {
      name: 'both',
      env: { BUNDLE_ANALYZE: 'both' },
      description: 'Complete bundle analysis',
    },
  ];
  
  for (const analysis of analyses) {
    try {
      log.info(`Running ${analysis.description}...`);
      
      const env = {
        ...process.env,
        ...analysis.env,
        NODE_ENV: 'production',
      };
      
      execSync('npm run build', {
        env,
        stdio: 'pipe',
        cwd: process.cwd(),
      });
      
      // Move generated reports to organized directory
      moveAnalysisReports(analysis.name);
      
      log.success(`${analysis.description} completed`);
    } catch (error) {
      log.error(`Failed to run ${analysis.description}: ${error.message}`);
    }
  }
}

// Move analysis reports to organized structure
function moveAnalysisReports(analysisType) {
  const reportFiles = [
    { 
      source: `.next/client-bundle-analyzer.html`,
      target: `${ANALYSIS_CONFIG.outputDir}/${analysisType}-client.html` 
    },
    { 
      source: `.next/server-bundle-analyzer.html`,
      target: `${ANALYSIS_CONFIG.outputDir}/${analysisType}-server.html` 
    },
  ];
  
  reportFiles.forEach(({ source, target }) => {
    if (fs.existsSync(source)) {
      fs.renameSync(source, target);
      log.info(`Report saved: ${target}`);
    }
  });
}

// Analyze bundle composition
function analyzeBundleComposition() {
  log.header('📊 Analyzing Bundle Composition');
  
  const buildManifestPath = '.next/build-manifest.json';
  const appBuildManifestPath = '.next/app-build-manifest.json';
  
  if (!fs.existsSync(buildManifestPath)) {
    log.warning('Build manifest not found. Run build first.');
    return;
  }
  
  try {
    const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));
    const stats = analyzeBuildManifest(buildManifest);
    
    generateCompositionReport(stats);
    checkBundleSizeThresholds(stats);
    
  } catch (error) {
    log.error(`Failed to analyze bundle composition: ${error.message}`);
  }
}

// Analyze build manifest for insights
function analyzeBuildManifest(manifest) {
  const stats = {
    pages: {},
    sharedChunks: [],
    totalPages: 0,
    totalChunks: 0,
    totalSize: 0,
    largestBundles: [],
    duplicateModules: {},
  };
  
  // Analyze pages
  for (const [pageName, chunks] of Object.entries(manifest.pages || {})) {
    stats.pages[pageName] = {
      chunks: chunks.length,
      files: chunks,
    };
    stats.totalPages++;
    stats.totalChunks += chunks.length;
  }
  
  // Analyze shared chunks
  const allChunks = Object.values(manifest.pages || {}).flat();
  const chunkCounts = {};
  
  allChunks.forEach(chunk => {
    chunkCounts[chunk] = (chunkCounts[chunk] || 0) + 1;
  });
  
  stats.sharedChunks = Object.entries(chunkCounts)
    .filter(([, count]) => count > 1)
    .map(([chunk, count]) => ({ chunk, sharedBy: count }))
    .sort((a, b) => b.sharedBy - a.sharedBy);
  
  return stats;
}

// Generate detailed composition report
function generateCompositionReport(stats) {
  const reportPath = path.join(ANALYSIS_CONFIG.outputDir, 'composition-report.json');
  const htmlReportPath = path.join(ANALYSIS_CONFIG.outputDir, 'composition-report.html');
  
  // Save JSON report
  fs.writeFileSync(reportPath, JSON.stringify(stats, null, 2));
  log.success(`Composition report saved: ${reportPath}`);
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(stats);
  fs.writeFileSync(htmlReportPath, htmlReport);
  log.success(`HTML report saved: ${htmlReportPath}`);
  
  // Console summary
  printConsoleSummary(stats);
}

// Generate HTML report
function generateHTMLReport(stats) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bundle Analysis Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1, h2, h3 { color: #333; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .stat-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
    }
    .stat-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .table th,
    .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .table th {
      background: #f8f9fa;
      font-weight: 600;
    }
    .warning { color: #f59e0b; }
    .error { color: #dc2626; }
    .success { color: #059669; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Bundle Analysis Report</h1>
    <p>Generated: ${new Date().toISOString()}</p>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${stats.totalPages}</div>
        <div class="stat-label">Total Pages</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.totalChunks}</div>
        <div class="stat-label">Total Chunks</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.sharedChunks.length}</div>
        <div class="stat-label">Shared Chunks</div>
      </div>
    </div>
    
    <h2>Top Shared Chunks</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Chunk</th>
          <th>Shared By</th>
        </tr>
      </thead>
      <tbody>
        ${stats.sharedChunks.slice(0, 10).map(item => `
          <tr>
            <td>${item.chunk}</td>
            <td>${item.sharedBy} pages</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <h2>Page Analysis</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Page</th>
          <th>Chunks</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(stats.pages).map(([page, data]) => `
          <tr>
            <td>${page}</td>
            <td>${data.chunks}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
  `;
}

// Print console summary
function printConsoleSummary(stats) {
  console.log(`\n${colors.bright}Bundle Analysis Summary${colors.reset}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📄 Total Pages: ${colors.cyan}${stats.totalPages}${colors.reset}`);
  console.log(`📦 Total Chunks: ${colors.cyan}${stats.totalChunks}${colors.reset}`);
  console.log(`🔄 Shared Chunks: ${colors.cyan}${stats.sharedChunks.length}${colors.reset}`);
  
  if (stats.sharedChunks.length > 0) {
    console.log(`\n${colors.bright}Top Shared Chunks:${colors.reset}`);
    stats.sharedChunks.slice(0, 5).forEach(item => {
      console.log(`  • ${item.chunk} (shared by ${colors.green}${item.sharedBy}${colors.reset} pages)`);
    });
  }
}

// Check bundle size thresholds
function checkBundleSizeThresholds(stats) {
  log.header('🎯 Bundle Size Analysis');
  
  const staticDir = '.next/static';
  if (!fs.existsSync(staticDir)) {
    log.warning('Static directory not found. Skipping size analysis.');
    return;
  }
  
  const bundleFiles = getAllJSFiles(staticDir);
  const bundleSizes = bundleFiles.map(file => ({
    file: path.relative(process.cwd(), file),
    size: fs.statSync(file).size,
  }));
  
  // Sort by size
  bundleSizes.sort((a, b) => b.size - a.size);
  
  // Check thresholds
  const warnings = [];
  const errors = [];
  
  bundleSizes.forEach(bundle => {
    if (bundle.size > ANALYSIS_CONFIG.thresholds.maxBundleSize) {
      errors.push(`${bundle.file}: ${formatBytes(bundle.size)} (exceeds ${formatBytes(ANALYSIS_CONFIG.thresholds.maxBundleSize)})`);
    } else if (bundle.size > ANALYSIS_CONFIG.thresholds.maxChunkSize) {
      warnings.push(`${bundle.file}: ${formatBytes(bundle.size)} (exceeds ${formatBytes(ANALYSIS_CONFIG.thresholds.maxChunkSize)})`);
    }
  });
  
  // Display results
  if (errors.length > 0) {
    log.error('Bundle size errors:');
    errors.forEach(error => console.log(`  ${colors.red}•${colors.reset} ${error}`));
  }
  
  if (warnings.length > 0) {
    log.warning('Bundle size warnings:');
    warnings.forEach(warning => console.log(`  ${colors.yellow}•${colors.reset} ${warning}`));
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    log.success('All bundles are within size thresholds');
  }
  
  // Show top 10 largest bundles
  console.log(`\n${colors.bright}Largest Bundles:${colors.reset}`);
  bundleSizes.slice(0, 10).forEach((bundle, index) => {
    const sizeColor = bundle.size > ANALYSIS_CONFIG.thresholds.maxBundleSize ? colors.red :
                     bundle.size > ANALYSIS_CONFIG.thresholds.maxChunkSize ? colors.yellow : colors.green;
    console.log(`  ${index + 1}. ${bundle.file}: ${sizeColor}${formatBytes(bundle.size)}${colors.reset}`);
  });
}

// Get all JavaScript files recursively
function getAllJSFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllJSFiles(fullPath));
    } else if (item.endsWith('.js')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate optimization recommendations
function generateOptimizationRecommendations() {
  log.header('💡 Optimization Recommendations');
  
  const recommendations = [
    '🔧 Use dynamic imports for large components that are not immediately needed',
    '📦 Implement code splitting at route level using Next.js dynamic imports',
    '🗜️ Enable compression (gzip/brotli) in your production server',
    '🎯 Use tree shaking to eliminate unused code',
    '📸 Optimize images with next/image and WebP/AVIF formats',
    '⚡ Implement service worker for caching static assets',
    '🔄 Use React.memo() for expensive component renders',
    '💾 Implement proper caching strategies for API responses',
  ];
  
  recommendations.forEach((rec, index) => {
    console.log(`  ${index + 1}. ${rec}`);
  });
}

// Main execution
async function main() {
  try {
    log.header('🚀 Restaurant Dashboard Bundle Analysis');
    
    ensureOutputDir();
    
    // Run different types of analysis
    await runBundleAnalysis();
    analyzeBundleComposition();
    generateOptimizationRecommendations();
    
    log.header('✨ Analysis Complete');
    log.success(`Reports saved to: ${ANALYSIS_CONFIG.outputDir}`);
    console.log(`\nOpen the following files to view detailed reports:`);
    console.log(`  • ${colors.cyan}${ANALYSIS_CONFIG.outputDir}/composition-report.html${colors.reset}`);
    console.log(`  • ${colors.cyan}${ANALYSIS_CONFIG.outputDir}/client-client.html${colors.reset}`);
    console.log(`  • ${colors.cyan}${ANALYSIS_CONFIG.outputDir}/server-server.html${colors.reset}`);
    
  } catch (error) {
    log.error(`Analysis failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle command line arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
${colors.bright}Restaurant Dashboard Bundle Analyzer${colors.reset}

Usage: node scripts/analyze.js [options]

Options:
  --help, -h     Show this help message
  --client       Analyze client bundles only
  --server       Analyze server bundles only
  --composition  Analyze bundle composition only
  --thresholds   Show size thresholds

Examples:
  node scripts/analyze.js
  node scripts/analyze.js --client
  npm run analyze
    `);
    process.exit(0);
  }
  
  if (args.includes('--thresholds')) {
    console.log(`
${colors.bright}Bundle Size Thresholds:${colors.reset}
  • Max Bundle Size: ${colors.yellow}${formatBytes(ANALYSIS_CONFIG.thresholds.maxBundleSize)}${colors.reset}
  • Max Chunk Size: ${colors.yellow}${formatBytes(ANALYSIS_CONFIG.thresholds.maxChunkSize)}${colors.reset}
  • Max Asset Count: ${colors.yellow}${ANALYSIS_CONFIG.thresholds.maxAssetCount}${colors.reset}
    `);
    process.exit(0);
  }
  
  main();
}

module.exports = {
  analyzeBundleComposition,
  checkBundleSizeThresholds,
  generateOptimizationRecommendations,
};