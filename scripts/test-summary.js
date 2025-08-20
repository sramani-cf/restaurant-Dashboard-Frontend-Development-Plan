#!/usr/bin/env node

/**
 * Generate a comprehensive test summary report
 */

const fs = require('fs')
const path = require('path')

class TestSummaryGenerator {
  constructor() {
    this.testResults = {
      unit: null,
      integration: null,
      e2e: null,
      coverage: null,
      accessibility: null,
      performance: null,
    }
  }

  async generateReport() {
    console.log('🔍 Generating test summary report...')
    
    await this.loadTestResults()
    await this.generateMarkdownReport()
    await this.generateJSONReport()
    await this.generateHTMLReport()
    
    console.log('✅ Test summary report generated successfully!')
  }

  async loadTestResults() {
    // Load Jest coverage report
    try {
      const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json')
      if (fs.existsSync(coveragePath)) {
        this.testResults.coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
      }
    } catch (error) {
      console.warn('⚠️  Could not load coverage data:', error.message)
    }

    // Load Playwright test results
    try {
      const playwrightPath = path.join(process.cwd(), 'test-results', 'playwright-results.json')
      if (fs.existsSync(playwrightPath)) {
        const playwrightResults = JSON.parse(fs.readFileSync(playwrightPath, 'utf8'))
        this.testResults.e2e = this.parsePlaywrightResults(playwrightResults)
      }
    } catch (error) {
      console.warn('⚠️  Could not load E2E test results:', error.message)
    }

    // Load accessibility results
    try {
      const axePath = path.join(process.cwd(), 'accessibility-report.json')
      if (fs.existsSync(axePath)) {
        this.testResults.accessibility = JSON.parse(fs.readFileSync(axePath, 'utf8'))
      }
    } catch (error) {
      console.warn('⚠️  Could not load accessibility results:', error.message)
    }

    // Load Lighthouse results
    try {
      const lighthousePath = path.join(process.cwd(), '.lighthouseci')
      if (fs.existsSync(lighthousePath)) {
        this.testResults.performance = this.loadLighthouseResults(lighthousePath)
      }
    } catch (error) {
      console.warn('⚠️  Could not load performance results:', error.message)
    }
  }

  parsePlaywrightResults(results) {
    const stats = results.stats || {}
    return {
      total: stats.expected || 0,
      passed: stats.expected - (stats.unexpected || 0) - (stats.flaky || 0),
      failed: stats.unexpected || 0,
      flaky: stats.flaky || 0,
      skipped: stats.skipped || 0,
      duration: results.duration || 0,
    }
  }

  loadLighthouseResults(lighthousePath) {
    try {
      const manifestPath = path.join(lighthousePath, 'manifest.json')
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
        return this.parseLighthouseManifest(manifest)
      }
    } catch (error) {
      console.warn('⚠️  Could not parse Lighthouse results:', error.message)
    }
    return null
  }

  parseLighthouseManifest(manifest) {
    const urls = manifest.map(entry => ({
      url: entry.url,
      summary: entry.summary,
      performance: entry.summary?.performance,
      accessibility: entry.summary?.accessibility,
      'best-practices': entry.summary?.['best-practices'],
      seo: entry.summary?.seo,
    }))

    return {
      urls,
      averages: this.calculateLighthouseAverages(urls),
    }
  }

  calculateLighthouseAverages(urls) {
    if (urls.length === 0) return {}

    const totals = urls.reduce((acc, url) => {
      acc.performance += url.performance || 0
      acc.accessibility += url.accessibility || 0
      acc.bestPractices += url['best-practices'] || 0
      acc.seo += url.seo || 0
      return acc
    }, { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 })

    return {
      performance: Math.round(totals.performance / urls.length),
      accessibility: Math.round(totals.accessibility / urls.length),
      bestPractices: Math.round(totals.bestPractices / urls.length),
      seo: Math.round(totals.seo / urls.length),
    }
  }

  async generateMarkdownReport() {
    const reportPath = path.join(process.cwd(), 'test-results', 'test-summary.md')
    const report = this.buildMarkdownReport()
    
    // Ensure directory exists
    const dir = path.dirname(reportPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(reportPath, report)
    console.log('📄 Markdown report saved to:', reportPath)
  }

  buildMarkdownReport() {
    const timestamp = new Date().toISOString()
    
    let report = `# Test Summary Report\n\n`
    report += `Generated at: ${timestamp}\n\n`

    // Coverage section
    if (this.testResults.coverage) {
      report += `## 📊 Code Coverage\n\n`
      const total = this.testResults.coverage.total
      report += `| Metric | Percentage | Covered | Total |\n`
      report += `|--------|------------|---------|-------|\n`
      report += `| Lines | ${total.lines.pct}% | ${total.lines.covered} | ${total.lines.total} |\n`
      report += `| Functions | ${total.functions.pct}% | ${total.functions.covered} | ${total.functions.total} |\n`
      report += `| Branches | ${total.branches.pct}% | ${total.branches.covered} | ${total.branches.total} |\n`
      report += `| Statements | ${total.statements.pct}% | ${total.statements.covered} | ${total.statements.total} |\n\n`
      
      report += this.getCoverageEmoji(total.lines.pct) + ` **Overall Coverage: ${total.lines.pct}%**\n\n`
    }

    // E2E tests section
    if (this.testResults.e2e) {
      report += `## 🎭 End-to-End Tests\n\n`
      const e2e = this.testResults.e2e
      report += `- **Total Tests:** ${e2e.total}\n`
      report += `- **Passed:** ${e2e.passed} ${this.getStatusEmoji(e2e.passed, e2e.total)}\n`
      report += `- **Failed:** ${e2e.failed} ${e2e.failed > 0 ? '❌' : '✅'}\n`
      report += `- **Flaky:** ${e2e.flaky} ${e2e.flaky > 0 ? '⚠️' : '✅'}\n`
      report += `- **Duration:** ${Math.round(e2e.duration / 1000)}s\n\n`
    }

    // Performance section
    if (this.testResults.performance) {
      report += `## ⚡ Performance Metrics\n\n`
      const perf = this.testResults.performance.averages
      report += `| Metric | Score | Status |\n`
      report += `|--------|-------|--------|\n`
      report += `| Performance | ${perf.performance} | ${this.getPerformanceEmoji(perf.performance)} |\n`
      report += `| Accessibility | ${perf.accessibility} | ${this.getPerformanceEmoji(perf.accessibility)} |\n`
      report += `| Best Practices | ${perf.bestPractices} | ${this.getPerformanceEmoji(perf.bestPractices)} |\n`
      report += `| SEO | ${perf.seo} | ${this.getPerformanceEmoji(perf.seo)} |\n\n`
    }

    // Accessibility section
    if (this.testResults.accessibility) {
      const violations = this.testResults.accessibility.violations || []
      report += `## ♿ Accessibility\n\n`
      if (violations.length === 0) {
        report += `✅ **No accessibility violations found!**\n\n`
      } else {
        report += `❌ **${violations.length} accessibility violations found**\n\n`
        violations.forEach(violation => {
          report += `- **${violation.id}:** ${violation.description}\n`
        })
        report += '\n'
      }
    }

    // Summary section
    report += `## 📈 Summary\n\n`
    report += this.buildSummarySection()

    return report
  }

  buildSummarySection() {
    let summary = ''
    const issues = []
    const successes = []

    // Check coverage
    if (this.testResults.coverage) {
      const coverage = this.testResults.coverage.total.lines.pct
      if (coverage >= 80) {
        successes.push(`Code coverage is excellent (${coverage}%)`)
      } else if (coverage >= 70) {
        issues.push(`Code coverage needs improvement (${coverage}% - target: 80%)`)
      } else {
        issues.push(`Code coverage is too low (${coverage}% - target: 80%)`)
      }
    }

    // Check E2E tests
    if (this.testResults.e2e) {
      const e2e = this.testResults.e2e
      if (e2e.failed === 0 && e2e.flaky === 0) {
        successes.push('All E2E tests are passing')
      } else {
        if (e2e.failed > 0) {
          issues.push(`${e2e.failed} E2E tests are failing`)
        }
        if (e2e.flaky > 0) {
          issues.push(`${e2e.flaky} E2E tests are flaky`)
        }
      }
    }

    // Check performance
    if (this.testResults.performance) {
      const perf = this.testResults.performance.averages
      if (perf.performance >= 90) {
        successes.push('Performance scores are excellent')
      } else if (perf.performance >= 70) {
        issues.push('Performance scores need improvement')
      } else {
        issues.push('Performance scores are below acceptable thresholds')
      }
    }

    if (successes.length > 0) {
      summary += '### ✅ Successes\n\n'
      successes.forEach(success => {
        summary += `- ${success}\n`
      })
      summary += '\n'
    }

    if (issues.length > 0) {
      summary += '### ⚠️ Issues to Address\n\n'
      issues.forEach(issue => {
        summary += `- ${issue}\n`
      })
      summary += '\n'
    }

    if (issues.length === 0) {
      summary += '🎉 **All quality gates are passing!**\n'
    }

    return summary
  }

  async generateJSONReport() {
    const reportPath = path.join(process.cwd(), 'test-results', 'test-summary.json')
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        status: this.getOverallStatus(),
        coverage: this.testResults.coverage?.total,
        e2e: this.testResults.e2e,
        performance: this.testResults.performance?.averages,
        accessibility: this.testResults.accessibility,
      },
      details: this.testResults,
    }
    
    const dir = path.dirname(reportPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log('📊 JSON report saved to:', reportPath)
  }

  async generateHTMLReport() {
    // This would generate a more detailed HTML report
    // For now, we'll create a simple HTML version
    const reportPath = path.join(process.cwd(), 'test-results', 'test-summary.html')
    const html = this.buildHTMLReport()
    
    const dir = path.dirname(reportPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(reportPath, html)
    console.log('🌐 HTML report saved to:', reportPath)
  }

  buildHTMLReport() {
    const markdown = this.buildMarkdownReport()
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Test Summary Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .success { color: green; }
        .warning { color: orange; }
        .error { color: red; }
    </style>
</head>
<body>
    <pre>${markdown}</pre>
</body>
</html>
    `.trim()
  }

  getOverallStatus() {
    const issues = []
    
    if (this.testResults.coverage) {
      const coverage = this.testResults.coverage.total.lines.pct
      if (coverage < 80) issues.push('low_coverage')
    }

    if (this.testResults.e2e) {
      const e2e = this.testResults.e2e
      if (e2e.failed > 0) issues.push('e2e_failures')
      if (e2e.flaky > 0) issues.push('flaky_tests')
    }

    if (this.testResults.accessibility) {
      const violations = this.testResults.accessibility.violations || []
      if (violations.length > 0) issues.push('accessibility_violations')
    }

    if (this.testResults.performance) {
      const perf = this.testResults.performance.averages
      if (perf.performance < 70) issues.push('poor_performance')
    }

    return issues.length === 0 ? 'passing' : 'failing'
  }

  getCoverageEmoji(percentage) {
    if (percentage >= 90) return '🟢'
    if (percentage >= 80) return '🟡'
    if (percentage >= 70) return '🟠'
    return '🔴'
  }

  getStatusEmoji(passed, total) {
    const percentage = (passed / total) * 100
    if (percentage === 100) return '✅'
    if (percentage >= 95) return '🟢'
    if (percentage >= 80) return '🟡'
    return '🔴'
  }

  getPerformanceEmoji(score) {
    if (score >= 90) return '🟢'
    if (score >= 70) return '🟡'
    if (score >= 50) return '🟠'
    return '🔴'
  }
}

// Run the report generator
if (require.main === module) {
  const generator = new TestSummaryGenerator()
  generator.generateReport().catch(error => {
    console.error('❌ Failed to generate test summary:', error)
    process.exit(1)
  })
}

module.exports = TestSummaryGenerator