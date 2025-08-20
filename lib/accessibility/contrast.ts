/**
 * Color Contrast Validation
 * 
 * Provides comprehensive color contrast validation for WCAG 2.1 AA/AAA compliance
 * including contrast ratio calculations and automatic color adjustments.
 */

/**
 * WCAG contrast ratio requirements
 */
export const WCAG_CONTRAST_REQUIREMENTS = {
  AA: {
    normal: 4.5,      // Normal text
    large: 3.0,       // Large text (18pt+ or 14pt+ bold)
    nonText: 3.0,     // Non-text elements (UI components, graphics)
  },
  AAA: {
    normal: 7.0,      // Normal text
    large: 4.5,       // Large text
    nonText: 3.0,     // Non-text elements
  },
} as const;

/**
 * Color representation interfaces
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ContrastResult {
  ratio: number;
  passes: {
    AA: {
      normal: boolean;
      large: boolean;
      nonText: boolean;
    };
    AAA: {
      normal: boolean;
      large: boolean;
      nonText: boolean;
    };
  };
  level: 'AA' | 'AAA' | 'fail';
}

export interface ColorAdjustment {
  original: string;
  adjusted: string;
  ratio: number;
  method: 'lighten' | 'darken' | 'hue-shift' | 'saturation';
}

export interface ContrastIssue {
  element: HTMLElement;
  foreground: string;
  background: string;
  ratio: number;
  required: number;
  message: string;
  suggestions: ColorAdjustment[];
}

/**
 * Color Contrast Validator
 */
export class ColorContrastValidator {
  private complianceLevel: 'AA' | 'AAA';
  private cache: Map<string, ContrastResult> = new Map();

  constructor(complianceLevel: 'AA' | 'AAA' = 'AA') {
    this.complianceLevel = complianceLevel;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  calculateContrastRatio(color1: string, color2: string): number {
    const cacheKey = `${color1}-${color2}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!.ratio;
    }

    const rgb1 = this.parseColor(color1);
    const rgb2 = this.parseColor(color2);

    if (!rgb1 || !rgb2) {
      return 1; // Return minimum ratio if colors can't be parsed
    }

    const luminance1 = this.calculateLuminance(rgb1);
    const luminance2 = this.calculateLuminance(rgb2);

    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);

    const ratio = (lighter + 0.05) / (darker + 0.05);

    // Cache the result
    const result = this.createContrastResult(ratio);
    this.cache.set(cacheKey, result);

    return ratio;
  }

  /**
   * Check if contrast meets WCAG requirements
   */
  checkContrast(
    foreground: string,
    background: string,
    textSize: 'normal' | 'large' = 'normal',
    isText = true
  ): ContrastResult {
    const ratio = this.calculateContrastRatio(foreground, background);
    const result = this.createContrastResult(ratio);

    // Determine if it passes based on context
    const requirements = WCAG_CONTRAST_REQUIREMENTS[this.complianceLevel];
    const requiredRatio = isText 
      ? (textSize === 'large' ? requirements.large : requirements.normal)
      : requirements.nonText;

    result.level = ratio >= requiredRatio ? this.complianceLevel : 'fail';

    return result;
  }

  /**
   * Validate element's color contrast
   */
  async validateElement(element: HTMLElement): Promise<ContrastIssue[]> {
    const issues: ContrastIssue[] = [];
    const computedStyle = window.getComputedStyle(element);

    // Get foreground and background colors
    const foreground = computedStyle.color;
    const background = await this.getEffectiveBackgroundColor(element);

    if (!foreground || !background) {
      return issues;
    }

    // Determine if it's large text
    const isLargeText = this.isLargeText(computedStyle);
    const isText = this.isTextContent(element);

    // Check contrast
    const result = this.checkContrast(foreground, background, isLargeText ? 'large' : 'normal', isText);

    if (result.level === 'fail') {
      const requirements = WCAG_CONTRAST_REQUIREMENTS[this.complianceLevel];
      const requiredRatio = isText 
        ? (isLargeText ? requirements.large : requirements.normal)
        : requirements.nonText;

      const suggestions = this.suggestColorAdjustments(foreground, background, requiredRatio);

      issues.push({
        element,
        foreground,
        background,
        ratio: result.ratio,
        required: requiredRatio,
        message: `Contrast ratio ${result.ratio.toFixed(2)} is below required ${requiredRatio} for ${this.complianceLevel} compliance`,
        suggestions,
      });
    }

    return issues;
  }

  /**
   * Validate all elements in container
   */
  async validateContainer(container: HTMLElement = document.body): Promise<ContrastIssue[]> {
    const issues: ContrastIssue[] = [];
    const elements = container.querySelectorAll('*');

    for (const element of Array.from(elements)) {
      if (element instanceof HTMLElement && this.shouldValidateElement(element)) {
        const elementIssues = await this.validateElement(element);
        issues.push(...elementIssues);
      }
    }

    return issues;
  }

  /**
   * Suggest color adjustments to meet contrast requirements
   */
  suggestColorAdjustments(
    foreground: string,
    background: string,
    targetRatio: number
  ): ColorAdjustment[] {
    const suggestions: ColorAdjustment[] = [];
    
    // Try adjusting foreground color
    const foregroundAdjustments = this.adjustColorForContrast(
      foreground,
      background,
      targetRatio,
      'foreground'
    );
    suggestions.push(...foregroundAdjustments);

    // Try adjusting background color
    const backgroundAdjustments = this.adjustColorForContrast(
      background,
      foreground,
      targetRatio,
      'background'
    );
    suggestions.push(...backgroundAdjustments);

    // Sort by how close they get to the target ratio
    return suggestions
      .filter(suggestion => suggestion.ratio >= targetRatio)
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 5); // Return top 5 suggestions
  }

  /**
   * Automatically fix contrast issues
   */
  async autoFixContrast(element: HTMLElement): Promise<boolean> {
    const issues = await this.validateElement(element);
    
    if (issues.length === 0) {
      return true; // No issues to fix
    }

    const issue = issues[0]; // Fix the first issue
    if (issue.suggestions.length === 0) {
      return false; // No suggestions available
    }

    const bestSuggestion = issue.suggestions[0];
    
    // Apply the suggested color
    if (bestSuggestion.method === 'background') {
      element.style.backgroundColor = bestSuggestion.adjusted;
    } else {
      element.style.color = bestSuggestion.adjusted;
    }

    return true;
  }

  /**
   * Parse color string to RGB
   */
  private parseColor(color: string): RGBColor | null {
    // Handle named colors by creating a temporary element
    if (!color.startsWith('#') && !color.startsWith('rgb') && !color.startsWith('hsl')) {
      const tempElement = document.createElement('div');
      tempElement.style.color = color;
      document.body.appendChild(tempElement);
      const computedColor = window.getComputedStyle(tempElement).color;
      document.body.removeChild(tempElement);
      color = computedColor;
    }

    // Parse RGB/RGBA
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10),
      };
    }

    // Parse hex colors
    const hexMatch = color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/);
    if (hexMatch) {
      const hex = hexMatch[1];
      if (hex.length === 3) {
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
        };
      } else {
        return {
          r: parseInt(hex.substring(0, 2), 16),
          g: parseInt(hex.substring(2, 4), 16),
          b: parseInt(hex.substring(4, 6), 16),
        };
      }
    }

    // Parse HSL
    const hslMatch = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)/);
    if (hslMatch) {
      const h = parseInt(hslMatch[1], 10);
      const s = parseInt(hslMatch[2], 10) / 100;
      const l = parseInt(hslMatch[3], 10) / 100;
      return this.hslToRgb({ h, s, l });
    }

    return null;
  }

  /**
   * Calculate relative luminance
   */
  private calculateLuminance(rgb: RGBColor): number {
    const { r, g, b } = rgb;

    // Convert to 0-1 range
    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;

    // Apply gamma correction
    const rLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    const gLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    const bLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  }

  /**
   * Get effective background color (considering parent backgrounds)
   */
  private async getEffectiveBackgroundColor(element: HTMLElement): Promise<string> {
    let currentElement: HTMLElement | null = element;
    const backgrounds: string[] = [];

    while (currentElement && currentElement !== document.body) {
      const computedStyle = window.getComputedStyle(currentElement);
      const backgroundColor = computedStyle.backgroundColor;

      if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
        backgrounds.push(backgroundColor);
      }

      currentElement = currentElement.parentElement;
    }

    // Add body background as fallback
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyBackground = bodyStyle.backgroundColor;
    if (bodyBackground && bodyBackground !== 'rgba(0, 0, 0, 0)') {
      backgrounds.push(bodyBackground);
    } else {
      backgrounds.push('#ffffff'); // Default to white
    }

    // If only one background, return it
    if (backgrounds.length <= 1) {
      return backgrounds[0] || '#ffffff';
    }

    // Blend multiple backgrounds (simplified - assumes no alpha)
    return backgrounds[0];
  }

  /**
   * Check if text is considered large
   */
  private isLargeText(computedStyle: CSSStyleDeclaration): boolean {
    const fontSize = parseFloat(computedStyle.fontSize);
    const fontWeight = computedStyle.fontWeight;

    // 18pt = 24px at 96 DPI
    if (fontSize >= 24) {
      return true;
    }

    // 14pt = ~18.67px at 96 DPI, bold
    if (fontSize >= 18.67 && (fontWeight === 'bold' || parseInt(fontWeight, 10) >= 700)) {
      return true;
    }

    return false;
  }

  /**
   * Check if element contains text content
   */
  private isTextContent(element: HTMLElement): boolean {
    const textContent = element.textContent?.trim();
    if (!textContent) return false;

    // Check if element is primarily for text display
    const role = element.getAttribute('role');
    const textRoles = ['text', 'heading', 'paragraph'];
    const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'A', 'BUTTON', 'LABEL'];

    return (
      textTags.includes(element.tagName) ||
      (role && textRoles.includes(role)) ||
      element.matches('p, h1, h2, h3, h4, h5, h6, span:not([class*="icon"]), a, button, label')
    );
  }

  /**
   * Check if element should be validated
   */
  private shouldValidateElement(element: HTMLElement): boolean {
    // Skip elements that are hidden
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
      return false;
    }

    // Skip elements without text content and non-interactive elements
    const hasTextContent = element.textContent?.trim();
    const isInteractive = this.isInteractiveElement(element);

    return !!(hasTextContent || isInteractive);
  }

  /**
   * Check if element is interactive
   */
  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
    const interactiveRoles = ['button', 'link', 'checkbox', 'radio', 'menuitem', 'tab'];

    return (
      interactiveTags.includes(element.tagName) ||
      interactiveRoles.includes(element.getAttribute('role') || '') ||
      element.hasAttribute('onclick') ||
      element.tabIndex >= 0
    );
  }

  /**
   * Create contrast result object
   */
  private createContrastResult(ratio: number): ContrastResult {
    const requirements = WCAG_CONTRAST_REQUIREMENTS;

    return {
      ratio,
      passes: {
        AA: {
          normal: ratio >= requirements.AA.normal,
          large: ratio >= requirements.AA.large,
          nonText: ratio >= requirements.AA.nonText,
        },
        AAA: {
          normal: ratio >= requirements.AAA.normal,
          large: ratio >= requirements.AAA.large,
          nonText: ratio >= requirements.AAA.nonText,
        },
      },
      level: ratio >= requirements.AAA.normal ? 'AAA' : 
             ratio >= requirements.AA.normal ? 'AA' : 'fail',
    };
  }

  /**
   * Adjust color to meet contrast requirements
   */
  private adjustColorForContrast(
    colorToAdjust: string,
    otherColor: string,
    targetRatio: number,
    adjustmentType: 'foreground' | 'background'
  ): ColorAdjustment[] {
    const adjustments: ColorAdjustment[] = [];
    const rgb = this.parseColor(colorToAdjust);
    const otherRgb = this.parseColor(otherColor);

    if (!rgb || !otherRgb) return adjustments;

    const hsl = this.rgbToHsl(rgb);

    // Try lightening/darkening
    const lightnessAdjustments = this.adjustLightness(hsl, otherColor, targetRatio);
    adjustments.push(...lightnessAdjustments.map(adj => ({
      ...adj,
      original: colorToAdjust,
      method: adj.ratio > this.calculateContrastRatio(colorToAdjust, otherColor) ? 
        (hsl.l < 0.5 ? 'lighten' : 'darken') as 'lighten' | 'darken' :
        (hsl.l >= 0.5 ? 'lighten' : 'darken') as 'lighten' | 'darken'
    })));

    // Try adjusting saturation
    const saturationAdjustments = this.adjustSaturation(hsl, otherColor, targetRatio);
    adjustments.push(...saturationAdjustments.map(adj => ({
      ...adj,
      original: colorToAdjust,
      method: 'saturation' as const
    })));

    return adjustments;
  }

  /**
   * Adjust lightness to meet contrast
   */
  private adjustLightness(hsl: HSLColor, otherColor: string, targetRatio: number): Omit<ColorAdjustment, 'original' | 'method'>[] {
    const adjustments: Omit<ColorAdjustment, 'original' | 'method'>[] = [];
    
    // Try lightening
    for (let l = hsl.l + 0.1; l <= 1; l += 0.1) {
      const adjustedColor = this.hslToHex({ ...hsl, l });
      const ratio = this.calculateContrastRatio(adjustedColor, otherColor);
      
      if (ratio >= targetRatio) {
        adjustments.push({
          adjusted: adjustedColor,
          ratio,
        });
        break;
      }
    }

    // Try darkening
    for (let l = hsl.l - 0.1; l >= 0; l -= 0.1) {
      const adjustedColor = this.hslToHex({ ...hsl, l });
      const ratio = this.calculateContrastRatio(adjustedColor, otherColor);
      
      if (ratio >= targetRatio) {
        adjustments.push({
          adjusted: adjustedColor,
          ratio,
        });
        break;
      }
    }

    return adjustments;
  }

  /**
   * Adjust saturation to meet contrast
   */
  private adjustSaturation(hsl: HSLColor, otherColor: string, targetRatio: number): Omit<ColorAdjustment, 'original' | 'method'>[] {
    const adjustments: Omit<ColorAdjustment, 'original' | 'method'>[] = [];
    
    // Try reducing saturation
    for (let s = hsl.s - 0.1; s >= 0; s -= 0.1) {
      const adjustedColor = this.hslToHex({ ...hsl, s });
      const ratio = this.calculateContrastRatio(adjustedColor, otherColor);
      
      if (ratio >= targetRatio) {
        adjustments.push({
          adjusted: adjustedColor,
          ratio,
        });
        break;
      }
    }

    return adjustments;
  }

  /**
   * Convert RGB to HSL
   */
  private rgbToHsl(rgb: RGBColor): HSLColor {
    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

      switch (max) {
        case rNorm:
          h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
          break;
        case gNorm:
          h = ((bNorm - rNorm) / diff + 2) / 6;
          break;
        case bNorm:
          h = ((rNorm - gNorm) / diff + 4) / 6;
          break;
      }
    }

    return { h: h * 360, s, l };
  }

  /**
   * Convert HSL to RGB
   */
  private hslToRgb(hsl: HSLColor): RGBColor {
    const { h, s, l } = hsl;
    const hNorm = h / 360;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hNorm * 6) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= hNorm && hNorm < 1/6) {
      r = c; g = x; b = 0;
    } else if (1/6 <= hNorm && hNorm < 1/3) {
      r = x; g = c; b = 0;
    } else if (1/3 <= hNorm && hNorm < 1/2) {
      r = 0; g = c; b = x;
    } else if (1/2 <= hNorm && hNorm < 2/3) {
      r = 0; g = x; b = c;
    } else if (2/3 <= hNorm && hNorm < 5/6) {
      r = x; g = 0; b = c;
    } else if (5/6 <= hNorm && hNorm < 1) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  /**
   * Convert HSL to hex color
   */
  private hslToHex(hsl: HSLColor): string {
    const rgb = this.hslToRgb(hsl);
    const toHex = (n: number) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Set compliance level
   */
  setComplianceLevel(level: 'AA' | 'AAA'): void {
    this.complianceLevel = level;
    this.clearCache(); // Clear cache since requirements changed
  }
}

/**
 * Utility functions
 */

/**
 * Quick contrast check for two colors
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): ContrastResult {
  const validator = new ColorContrastValidator(level);
  return validator.checkContrast(foreground, background);
}

/**
 * Get contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const validator = new ColorContrastValidator();
  return validator.calculateContrastRatio(color1, color2);
}

/**
 * Check if colors meet WCAG requirements
 */
export function meetsWCAG(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  textSize: 'normal' | 'large' = 'normal'
): boolean {
  const result = checkColorContrast(foreground, background, level);
  const requirements = WCAG_CONTRAST_REQUIREMENTS[level];
  const requiredRatio = textSize === 'large' ? requirements.large : requirements.normal;
  
  return result.ratio >= requiredRatio;
}

/**
 * Find accessible color variations
 */
export function findAccessibleColors(
  baseColor: string,
  backgroundColors: string[],
  level: 'AA' | 'AAA' = 'AA'
): { background: string; contrast: number; passes: boolean }[] {
  const validator = new ColorContrastValidator(level);
  
  return backgroundColors.map(bg => {
    const contrast = validator.calculateContrastRatio(baseColor, bg);
    const result = validator.checkContrast(baseColor, bg);
    
    return {
      background: bg,
      contrast,
      passes: result.level !== 'fail',
    };
  }).sort((a, b) => b.contrast - a.contrast);
}