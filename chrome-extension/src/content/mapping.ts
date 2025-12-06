// ============================================
// Carrier Mapping Configuration
// ============================================
// TODO: This will need serious edits and revisions as we learn the actual
// portal DOM structures. For now, these are placeholder mappings.
// Eventually move to database for in-app editing.

import { CarrierMapping, CarrierPlatform } from '../types/models';

export const CARRIER_MAPPINGS: Record<CarrierPlatform, CarrierMapping> = {
  // Test carrier for local file:// testing
  Test: {
    platform: 'Test',
    hostPattern: 'file://',
    pages: [
      {
        id: 'test_form_page1',
        urlPattern: 'test-form.html',
        fields: [
          {
            caseField: 'client.firstName',
            selectors: ["#firstName", "input[name='applicantFirstName']"],
          },
          {
            caseField: 'client.middleInitial',
            selectors: ["#middleInitial", "input[name='applicantMiddleInitial']"],
          },
          {
            caseField: 'client.lastName',
            selectors: ["#lastName", "input[name='applicantLastName']"],
          },
          {
            caseField: 'client.dateOfBirth',
            selectors: ["#dob", "input[name='applicantDOB']"],
            transform: 'date_mmddyyyy',
          },
          {
            caseField: 'client.ssnLast4',
            selectors: ["#ssn", "input[name='ssnLast4']"],
          },
          {
            caseField: 'client.address',
            selectors: ["#address", "input[name='streetAddress']"],
          },
          {
            caseField: 'client.city',
            selectors: ["#city", "input[name='city']"],
          },
          {
            caseField: 'client.state',
            selectors: ["#state", "select[name='state']"],
            inputType: 'select',
          },
          {
            caseField: 'client.zipCode',
            selectors: ["#zip", "input[name='zipCode']"],
          },
          {
            caseField: 'client.phone',
            selectors: ["#phone", "input[name='applicantPhone']"],
            transform: 'phone',
          },
          {
            caseField: 'client.email',
            selectors: ["#email", "input[name='applicantEmail']"],
          },
          {
            caseField: 'client.smokerStatus',
            selectors: ["input[name='tobaccoUse']"],
            inputType: 'radio',
          },
        ],
        nextButtonSelector: "#nextBtn, button[type='submit']",
      },
    ],
  },

  iPipeline: {
    platform: 'iPipeline',
    hostPattern: 'ipipeline.com',
    pages: [
      {
        id: 'applicant_basic_info',
        urlPattern: 'applicantInfo',
        fields: [
          {
            caseField: 'client.firstName',
            selectors: [
              "input[name='applicantFirstName']",
              "#firstName",
              "input[data-field='firstName']",
            ],
          },
          {
            caseField: 'client.middleInitial',
            selectors: [
              "input[name='applicantMiddleInitial']",
              "#middleInitial",
            ],
          },
          {
            caseField: 'client.lastName',
            selectors: [
              "input[name='applicantLastName']",
              "#lastName",
              "input[data-field='lastName']",
            ],
          },
          {
            caseField: 'client.dateOfBirth',
            selectors: [
              "input[name='applicantDOB']",
              "#dob",
              "input[data-field='dateOfBirth']",
            ],
            transform: 'date_mmddyyyy',
          },
          {
            caseField: 'client.phone',
            selectors: [
              "input[name='applicantPhone']",
              "#phone",
            ],
            transform: 'phone',
          },
          {
            caseField: 'client.email',
            selectors: [
              "input[name='applicantEmail']",
              "#email",
            ],
          },
        ],
        nextButtonSelector: "button[type='submit'], button.next-btn, #nextButton",
        mfaIndicators: [
          ".mfa-verification",
          "#otpInput",
          "[data-testid='mfa-code']",
        ],
      },
      {
        id: 'applicant_address',
        urlPattern: 'addressInfo',
        fields: [
          {
            caseField: 'client.address',
            selectors: [
              "input[name='streetAddress']",
              "#address",
            ],
          },
          {
            caseField: 'client.city',
            selectors: [
              "input[name='city']",
              "#city",
            ],
          },
          {
            caseField: 'client.state',
            selectors: [
              "select[name='state']",
              "#state",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.zipCode',
            selectors: [
              "input[name='zipCode']",
              "#zip",
            ],
          },
        ],
        nextButtonSelector: "button[type='submit'], button.next-btn",
      },
    ],
  },

  Americo: {
    platform: 'Americo',
    hostPattern: 'americo.com',
    pages: [
      {
        id: 'insured_info',
        urlPattern: 'insured',
        fields: [
          {
            caseField: 'client.firstName',
            selectors: [
              "#insuredFirstName",
              "input[name='insured.firstName']",
            ],
          },
          {
            caseField: 'client.lastName',
            selectors: [
              "#insuredLastName",
              "input[name='insured.lastName']",
            ],
          },
          {
            caseField: 'client.dateOfBirth',
            selectors: [
              "#insuredDOB",
              "input[name='insured.dob']",
            ],
            transform: 'date_mmddyyyy',
          },
          {
            caseField: 'client.smokerStatus',
            selectors: [
              "input[name='tobaccoUse']",
              "#smokerYes, #smokerNo",
            ],
            inputType: 'radio',
          },
        ],
        nextButtonSelector: ".continue-btn, button[type='submit']",
        mfaIndicators: [
          ".verification-code",
          "#verificationCode",
        ],
      },
      {
        id: 'contact_info',
        urlPattern: 'contact',
        fields: [
          {
            caseField: 'client.address',
            selectors: [
              "#streetAddress",
              "input[name='address.street']",
            ],
          },
          {
            caseField: 'client.city',
            selectors: [
              "#city",
              "input[name='address.city']",
            ],
          },
          {
            caseField: 'client.state',
            selectors: [
              "#state",
              "select[name='address.state']",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.zipCode',
            selectors: [
              "#zipCode",
              "input[name='address.zip']",
            ],
          },
          {
            caseField: 'client.phone',
            selectors: [
              "#phoneNumber",
              "input[name='phone']",
            ],
            transform: 'phone',
          },
          {
            caseField: 'client.email',
            selectors: [
              "#emailAddress",
              "input[name='email']",
            ],
          },
        ],
        nextButtonSelector: ".continue-btn, button[type='submit']",
      },
    ],
  },

  Transamerica: {
    platform: 'Transamerica',
    hostPattern: 'transamerica.com',
    pages: [
      {
        id: 'get_quote_page_1',
        urlPattern: 'lifepolicyexplorer/get-quote',
        domMarkers: [
          "input[data-drupal-selector='edit-your-coverage-amount-is-']",
          "select[data-drupal-selector='edit-your-plan-is-']",
        ],
        fields: [
          {
            // Coverage amount is at the Case level, not Client
            caseField: 'coverageAmount',
            selectors: [
              "#edit-your-coverage-amount-is-",
              "input[name='your_coverage_amount_is_']",
            ],
          },
          /* Note: Plan type dropdown - no matching field in our data model yet
           Would need to add this to the Case type if needed
           Not supre relevant here because it's just the productPlanType for this specific carrier - and it's pre-populated!
          {
             caseField: 'productPlanType',
             selectors: ["#edit-your-plan-is-", "select[name='your_plan_is_']"],
             inputType: 'select',
          },*/
        ],
        // Prefer explicit ID, then text match to avoid other submits
        nextButtonSelector: "#edit-actions-wizard-next, button:contains('Next')", 
      },
      {
        id: 'personal_info_page_2',
        urlPattern: 'lifepolicyexplorer', // Matches any page in the quote flow
        domMarkers: [
          "select[data-drupal-selector='edit-where-do-you-live-']",
          "input[data-drupal-selector='edit-zip-code']",
        ],
        fields: [
          {
            caseField: 'client.state',
            selectors: [
              "#edit-where-do-you-live-",
              "select[name='where_do_you_live_']",
              "select[data-drupal-selector='edit-where-do-you-live-']",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.zipCode',
            selectors: [
              "#edit-zip-code",
              "input[name='zip_code']",
              "input[data-drupal-selector='edit-zip-code']",
            ],
          },
          {
            caseField: 'client.gender',
            selectors: [
              "input[name='gender']",
              "input[data-drupal-selector^='edit-gender']",
            ],
            inputType: 'radio',
          },
          {
            caseField: 'client.dateOfBirth',
            selectors: [
              "#edit-date-of-birth",
              "input[name='date_of_birth']",
              "input[data-drupal-selector='edit-date-of-birth']",
            ],
            transform: 'date_yyyymmdd', // Date input expects YYYY-MM-DD
          },
          {
            caseField: 'client.weight',
            selectors: [
              "#edit-weight",
              "input[name='weight']",
              "input[data-drupal-selector='edit-weight']",
            ],
          },
          {
            caseField: 'client.heightFeet',
            selectors: [
              "#edit-height-items-0-item-feet",
              "select[name='height[items][0][_item_][feet]']",
              "select[data-drupal-selector='edit-height-items-0-item-feet']",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.heightInches',
            selectors: [
              "#edit-height-items-0-item-inches",
              "select[name='height[items][0][_item_][inches]']",
              "select[data-drupal-selector='edit-height-items-0-item-inches']",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.drivingRecord',
            selectors: [
              "#edit-driving-record",
              "select[name='driving_record']",
              "select[data-drupal-selector='edit-driving-record']",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.healthStatus',
            selectors: [
              "#edit-how-is-your-health-",
              "select[name='how_is_your_health_']",
              "select[data-drupal-selector='edit-how-is-your-health-']",
            ],
            inputType: 'select',
          },
          {
            caseField: 'client.tobaccoUse',
            selectors: [
              "#edit-tobacco-use",
              "select[name='tobacco_use']",
              "select[data-drupal-selector='edit-tobacco-use']",
            ],
            inputType: 'select',
          },
        ],
        nextButtonSelector: "#edit-actions-wizard-next-v-ds5vn9row, button:contains('Next')",
      },
    ],
  }
};

/**
 * Get carrier mapping by hostname or protocol
 */
export function getCarrierByHost(hostname: string): CarrierMapping | null {
  // Check if we're on a file:// URL (for testing)
  if (window.location.protocol === 'file:') {
    return CARRIER_MAPPINGS.Test;
  }
  
  for (const mapping of Object.values(CARRIER_MAPPINGS)) {
    if (mapping.platform !== 'Test' && hostname.includes(mapping.hostPattern)) {
      return mapping;
    }
  }
  return null;
}

/**
 * Identify which page we're on based on URL and DOM
 */
export function identifyPage(
  mapping: CarrierMapping,
  url: string
): typeof mapping.pages[0] | null {
  for (const page of mapping.pages) {
    const pattern = page.urlPattern;
    const matches =
      typeof pattern === 'string'
        ? url.includes(pattern)
        : pattern.test(url);

    if (matches) {
      // Optionally verify DOM markers
      if (page.domMarkers) {
        const markersFound = page.domMarkers.some((selector) =>
          document.querySelector(selector)
        );
        if (!markersFound) continue;
      }
      return page;
    }
  }
  return null;
}

