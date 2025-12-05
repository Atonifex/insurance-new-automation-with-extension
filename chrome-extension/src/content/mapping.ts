// ============================================
// Carrier Mapping Configuration
// ============================================
// TODO: This will need serious edits and revisions as we learn the actual
// portal DOM structures. For now, these are placeholder mappings.
// Eventually move to database for in-app editing.

import { CarrierMapping, CarrierPlatform } from '../types/models';

export const CARRIER_MAPPINGS: Record<CarrierPlatform, CarrierMapping> = {
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
};

/**
 * Get carrier mapping by hostname
 */
export function getCarrierByHost(hostname: string): CarrierMapping | null {
  for (const mapping of Object.values(CARRIER_MAPPINGS)) {
    if (hostname.includes(mapping.hostPattern)) {
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

