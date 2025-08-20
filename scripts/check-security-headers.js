#!/usr/bin/env node

/**
 * Security Headers Checker Script
 * Tests security headers compliance for the restaurant dashboard application
 */

const http = require('http');
const https = require('https');
const url = require('url');

// Security headers to check
const SECURITY_HEADERS = {
  required: {
    'x-frame-options': {
      name: 'X-Frame-Options',
      values: ['DENY', 'SAMEORIGIN'],
      score: 10
    },
    'x-content-type-options': {
      name: 'X-Content-Type-Options',
      values: ['nosniff'],
      score: 10
    },
    'content-security-policy': {
      name: 'Content-Security-Policy',
      values: null, // Any CSP is better than none
      score: 25
    },
    'referrer-policy': {
      name: 'Referrer-Policy',
      values: [
        'strict-origin-when-cross-origin',
        'strict-origin',
        'no-referrer',
        'origin-when-cross-origin'
      ],
      score: 10
    }
  },
  recommended: {
    'strict-transport-security': {
      name: 'Strict-Transport-Security',
      values: null, // Any HSTS is good
      score: 20
    },
    'x-xss-protection': {
      name: 'X-XSS-Protection',
      values: ['1; mode=block', '0'],
      score: 5
    },
    'permissions-policy': {
      name: 'Permissions-Policy',
      values: null,
      score: 10
    },
    'cross-origin-opener-policy': {
      name: 'Cross-Origin-Opener-Policy',
      values: ['same-origin', 'same-origin-allow-popups'],
      score: 5
    },
    'cross-origin-embedder-policy': {
      name: 'Cross-Origin-Embedder-Policy',
      values: ['require-corp'],
      score: 5
    }
  }
};

/**
 * Check security headers for a given URL
 */
async function checkSecurityHeaders(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(targetUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.path || '/',
      method: 'HEAD',
      timeout: 10000
    };
    
    const req = client.request(options, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
    req.setTimeout(10000);
    req.end();
  });
}

/**
 * Analyze security headers
 */
function analyzeSecurityHeaders(headers) {
  const results = {
    score: 0,
    maxScore: 0,
    passed: [],
    failed: [],
    warnings: [],
    recommendations: []
  };
  
  // Check required headers
  for (const [key, config] of Object.entries(SECURITY_HEADERS.required)) {
    results.maxScore += config.score;
    const headerValue = headers[key.toLowerCase()];
    
    if (headerValue) {
      if (!config.values || config.values.some(val => headerValue.includes(val))) {
        results.passed.push({
          header: config.name,
          value: headerValue,
          score: config.score,
          type: 'required'
        });
        results.score += config.score;
      } else {
        results.failed.push({
          header: config.name,
          value: headerValue,
          expected: config.values,
          type: 'required',
          reason: 'Invalid value'
        });
      }
    } else {
      results.failed.push({
        header: config.name,
        value: null,
        expected: config.values,
        type: 'required',
        reason: 'Missing header'
      });
    }
  }
  
  // Check recommended headers
  for (const [key, config] of Object.entries(SECURITY_HEADERS.recommended)) {
    results.maxScore += config.score;
    const headerValue = headers[key.toLowerCase()];
    
    if (headerValue) {
      if (!config.values || config.values.some(val => headerValue.includes(val))) {
        results.passed.push({
          header: config.name,
          value: headerValue,
          score: config.score,
          type: 'recommended'
        });
        results.score += config.score;
      } else {
        results.warnings.push({
          header: config.name,
          value: headerValue,
          expected: config.values,
          type: 'recommended',
          reason: 'Suboptimal value'
        });
        results.score += Math.floor(config.score / 2); // Partial credit
      }
    } else {
      results.warnings.push({
        header: config.name,
        value: null,
        expected: config.values,
        type: 'recommended',
        reason: 'Missing recommended header'
      });
    }
  }
  
  // Calculate grade
  const percentage = Math.round((results.score / results.maxScore) * 100);
  let grade;
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  else grade = 'F';
  
  results.percentage = percentage;
  results.grade = grade;
  
  return results;
}

/**
 * Generate recommendations
 */
function generateRecommendations(results) {
  const recommendations = [];
  
  // Failed required headers
  results.failed.forEach(fail => {
    if (fail.reason === 'Missing header') {
      recommendations.push({
        priority: 'HIGH',
        type: 'missing_header',
        message: `Add ${fail.header} header`,
        example: getHeaderExample(fail.header)
      });
    } else if (fail.reason === 'Invalid value') {
      recommendations.push({
        priority: 'HIGH',
        type: 'invalid_value',
        message: `Fix ${fail.header} header value`,
        current: fail.value,
        expected: fail.expected,
        example: getHeaderExample(fail.header)
      });
    }
  });
  
  // Missing recommended headers
  results.warnings.forEach(warning => {
    if (warning.reason === 'Missing recommended header') {
      recommendations.push({
        priority: 'MEDIUM',
        type: 'missing_recommended',
        message: `Consider adding ${warning.header} header for better security`,
        example: getHeaderExample(warning.header)
      });
    }
  });
  
  return recommendations;
}

/**
 * Get example header configuration
 */
function getHeaderExample(headerName) {
  const examples = {
    'X-Frame-Options': 'X-Frame-Options: DENY',
    'X-Content-Type-Options': 'X-Content-Type-Options: nosniff',
    'Content-Security-Policy': 'Content-Security-Policy: default-src \'self\'; script-src \'self\' \'unsafe-inline\'',
    'Referrer-Policy': 'Referrer-Policy: strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
    'X-XSS-Protection': 'X-XSS-Protection: 1; mode=block',
    'Permissions-Policy': 'Permissions-Policy: geolocation=(), camera=(), microphone=()',
    'Cross-Origin-Opener-Policy': 'Cross-Origin-Opener-Policy: same-origin',
    'Cross-Origin-Embedder-Policy': 'Cross-Origin-Embedder-Policy: require-corp'
  };
  
  return examples[headerName] || `${headerName}: <value>`;
}

/**
 * Main execution
 */
async function main() {
  const targetUrl = process.argv[2] || 'http://localhost:3000';
  
  console.error(`Checking security headers for: ${targetUrl}`);
  
  try {
    const response = await checkSecurityHeaders(targetUrl);
    
    if (response.statusCode >= 400) {
      throw new Error(`HTTP ${response.statusCode} error`);
    }
    
    const analysis = analyzeSecurityHeaders(response.headers);
    const recommendations = generateRecommendations(analysis);
    
    const report = {
      url: targetUrl,
      timestamp: new Date().toISOString(),
      score: {
        total: analysis.score,
        maxPossible: analysis.maxScore,
        percentage: analysis.percentage,
        grade: analysis.grade
      },
      headers: {
        passed: analysis.passed,
        failed: analysis.failed,
        warnings: analysis.warnings
      },
      recommendations,
      summary: {
        totalHeaders: analysis.passed.length + analysis.failed.length + analysis.warnings.length,
        passedHeaders: analysis.passed.length,
        failedHeaders: analysis.failed.length,
        warningHeaders: analysis.warnings.length,
        securityLevel: analysis.grade === 'F' ? 'Poor' : 
                      analysis.grade === 'D' ? 'Weak' :
                      analysis.grade === 'C' ? 'Fair' :
                      analysis.grade === 'B' ? 'Good' :
                      analysis.grade === 'A' ? 'Strong' : 'Excellent'
      }
    };
    
    // Output JSON report
    console.log(JSON.stringify(report, null, 2));
    
    // Exit with error code if security is poor
    if (analysis.failed.length > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Error checking security headers:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkSecurityHeaders,
  analyzeSecurityHeaders,
  generateRecommendations
};