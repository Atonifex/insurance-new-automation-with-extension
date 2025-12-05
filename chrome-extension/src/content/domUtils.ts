// ============================================
// DOM Utility Functions for Autofill
// ============================================

import { FieldMapping, CaseWithCarriers } from '../types/models';

/**
 * Get a nested value from an object using dot notation
 * e.g., getNestedValue(obj, 'client.firstName')
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Transform a value based on the specified transformation
 */
export function transformValue(value: unknown, transform?: string): string {
  if (value === null || value === undefined) return '';

  const strValue = String(value);

  switch (transform) {
    case 'uppercase':
      return strValue.toUpperCase();

    case 'lowercase':
      return strValue.toLowerCase();

    case 'phone':
      // Format as (XXX) XXX-XXXX
      const digits = strValue.replace(/\D/g, '');
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      return strValue;

    case 'date_mmddyyyy':
      // Convert YYYY-MM-DD to MM/DD/YYYY
      if (/^\d{4}-\d{2}-\d{2}$/.test(strValue)) {
        const [year, month, day] = strValue.split('-');
        return `${month}/${day}/${year}`;
      }
      return strValue;

    case 'date_yyyymmdd':
      // Keep as YYYY-MM-DD
      return strValue;

    default:
      return strValue;
  }
}

/**
 * Find an element using multiple selectors, returning the first match
 */
export function findElement(selectors: string[]): HTMLElement | null {
  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      return element;
    }
  }
  return null;
}

/**
 * Set value on an input element and dispatch necessary events
 */
export function setInputValue(element: HTMLElement, value: string): boolean {
  try {
    if (element instanceof HTMLInputElement) {
      const inputType = element.type.toLowerCase();

      if (inputType === 'checkbox') {
        const shouldBeChecked = value === 'true' || value === '1' || value === 'yes';
        if (element.checked !== shouldBeChecked) {
          element.checked = shouldBeChecked;
          dispatchEvents(element);
        }
        return true;
      }

      if (inputType === 'radio') {
        // For radio buttons, we need to find the right one by value
        const radioGroup = document.querySelectorAll<HTMLInputElement>(
          `input[name="${element.name}"]`
        );
        for (const radio of radioGroup) {
          if (radio.value.toLowerCase() === value.toLowerCase()) {
            radio.checked = true;
            dispatchEvents(radio);
            return true;
          }
        }
        return false;
      }

      // Text, email, date, etc.
      element.value = value;
      dispatchEvents(element);
      return true;
    }

    if (element instanceof HTMLSelectElement) {
      // Try to find option by value or text
      const options = Array.from(element.options);
      const option = options.find(
        (opt) =>
          opt.value.toLowerCase() === value.toLowerCase() ||
          opt.text.toLowerCase() === value.toLowerCase()
      );

      if (option) {
        element.value = option.value;
        dispatchEvents(element);
        return true;
      }
      return false;
    }

    if (element instanceof HTMLTextAreaElement) {
      element.value = value;
      dispatchEvents(element);
      return true;
    }

    return false;
  } catch (error) {
    console.error('[Autofill] Error setting value:', error);
    return false;
  }
}

/**
 * Dispatch input and change events to trigger framework reactivity
 */
function dispatchEvents(element: HTMLElement): void {
  // Input event (React uses this)
  element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));

  // Change event
  element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

  // Blur event (some validators trigger on blur)
  element.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));

  // For Angular and some other frameworks
  element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
}

/**
 * Fill a single field based on mapping
 */
export function fillField(
  mapping: FieldMapping,
  caseData: CaseWithCarriers
): { success: boolean; field: string; error?: string } {
  const rawValue = getNestedValue(caseData as unknown as Record<string, unknown>, mapping.caseField);
  const value = transformValue(rawValue, mapping.transform);

  if (!value) {
    return { success: true, field: mapping.caseField }; // Empty value is OK, just skip
  }

  const element = findElement(mapping.selectors);

  if (!element) {
    return {
      success: false,
      field: mapping.caseField,
      error: `No element found for selectors: ${mapping.selectors.join(', ')}`,
    };
  }

  const filled = setInputValue(element, value);

  if (!filled) {
    return {
      success: false,
      field: mapping.caseField,
      error: `Failed to set value on element`,
    };
  }

  console.log(`[Autofill] Filled ${mapping.caseField}: ${value}`);
  return { success: true, field: mapping.caseField };
}

/**
 * Check if MFA is being requested
 */
export function detectMFA(mfaIndicators?: string[]): boolean {
  if (!mfaIndicators || mfaIndicators.length === 0) return false;

  for (const selector of mfaIndicators) {
    if (document.querySelector(selector)) {
      console.log('[Autofill] MFA detected:', selector);
      return true;
    }
  }

  // Also check for common MFA text patterns
  const bodyText = document.body.innerText.toLowerCase();
  const mfaPhrases = [
    'enter the code',
    'verification code',
    'we sent a code',
    'enter your code',
    'two-factor',
    '2fa',
    'authenticate',
  ];

  for (const phrase of mfaPhrases) {
    if (bodyText.includes(phrase)) {
      console.log('[Autofill] MFA detected via text:', phrase);
      return true;
    }
  }

  return false;
}

/**
 * Click a button by selector or text content
 */
export function clickButton(selector: string): boolean {
  const selectors = selector.split(',').map((s) => s.trim());

  for (const sel of selectors) {
    // Handle text-based matching (e.g., "button:contains('Next')")
    if (sel.includes(':contains(')) {
      const match = sel.match(/^([^:]+):contains\(['"]([^'"]+)['"]\)$/);
      if (match) {
        const [, baseSelector, text] = match;
        const elements = document.querySelectorAll<HTMLElement>(baseSelector);
        for (const el of elements) {
          if (el.textContent?.includes(text) && !el.hasAttribute('disabled')) {
            el.click();
            console.log('[Autofill] Clicked button by text:', text);
            return true;
          }
        }
      }
      continue;
    }

    // Standard CSS selector
    const button = document.querySelector<HTMLElement>(sel);
    if (button && !button.hasAttribute('disabled')) {
      button.click();
      console.log('[Autofill] Clicked button:', sel);
      return true;
    }
  }

  console.log('[Autofill] No clickable button found for:', selector);
  return false;
}

/**
 * Check for validation errors on the page
 */
export function detectValidationErrors(): string[] {
  const errors: string[] = [];

  // Common error selectors
  const errorSelectors = [
    '.error',
    '.error-message',
    '.validation-error',
    '[role="alert"]',
    '.field-error',
    '.has-error',
    '.invalid-feedback',
  ];

  for (const selector of errorSelectors) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const text = (el as HTMLElement).innerText?.trim();
      if (text && text.length < 200) {
        errors.push(text);
      }
    });
  }

  return [...new Set(errors)]; // Remove duplicates
}

/**
 * Wait for a condition to be true
 */
export function waitFor(
  condition: () => boolean,
  timeout = 5000,
  interval = 100
): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const check = () => {
      if (condition()) {
        resolve(true);
        return;
      }

      if (Date.now() - startTime >= timeout) {
        resolve(false);
        return;
      }

      setTimeout(check, interval);
    };

    check();
  });
}

