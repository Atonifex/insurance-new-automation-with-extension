"use strict";
(() => {
  // src/content/mapping.ts
  var CARRIER_MAPPINGS = {
    // Test carrier for local file:// testing
    Test: {
      platform: "Test",
      hostPattern: "file://",
      pages: [
        {
          id: "test_form_page1",
          urlPattern: "test-form.html",
          fields: [
            {
              caseField: "client.firstName",
              selectors: ["#firstName", "input[name='applicantFirstName']"]
            },
            {
              caseField: "client.middleInitial",
              selectors: ["#middleInitial", "input[name='applicantMiddleInitial']"]
            },
            {
              caseField: "client.lastName",
              selectors: ["#lastName", "input[name='applicantLastName']"]
            },
            {
              caseField: "client.dateOfBirth",
              selectors: ["#dob", "input[name='applicantDOB']"],
              transform: "date_mmddyyyy"
            },
            {
              caseField: "client.ssnLast4",
              selectors: ["#ssn", "input[name='ssnLast4']"]
            },
            {
              caseField: "client.address",
              selectors: ["#address", "input[name='streetAddress']"]
            },
            {
              caseField: "client.city",
              selectors: ["#city", "input[name='city']"]
            },
            {
              caseField: "client.state",
              selectors: ["#state", "select[name='state']"],
              inputType: "select"
            },
            {
              caseField: "client.zipCode",
              selectors: ["#zip", "input[name='zipCode']"]
            },
            {
              caseField: "client.phone",
              selectors: ["#phone", "input[name='applicantPhone']"],
              transform: "phone"
            },
            {
              caseField: "client.email",
              selectors: ["#email", "input[name='applicantEmail']"]
            },
            {
              caseField: "client.smokerStatus",
              selectors: ["input[name='tobaccoUse']"],
              inputType: "radio"
            }
          ],
          nextButtonSelector: "#nextBtn, button[type='submit']"
        }
      ]
    },
    iPipeline: {
      platform: "iPipeline",
      hostPattern: "ipipeline.com",
      pages: [
        {
          id: "applicant_basic_info",
          urlPattern: "applicantInfo",
          fields: [
            {
              caseField: "client.firstName",
              selectors: [
                "input[name='applicantFirstName']",
                "#firstName",
                "input[data-field='firstName']"
              ]
            },
            {
              caseField: "client.middleInitial",
              selectors: [
                "input[name='applicantMiddleInitial']",
                "#middleInitial"
              ]
            },
            {
              caseField: "client.lastName",
              selectors: [
                "input[name='applicantLastName']",
                "#lastName",
                "input[data-field='lastName']"
              ]
            },
            {
              caseField: "client.dateOfBirth",
              selectors: [
                "input[name='applicantDOB']",
                "#dob",
                "input[data-field='dateOfBirth']"
              ],
              transform: "date_mmddyyyy"
            },
            {
              caseField: "client.phone",
              selectors: [
                "input[name='applicantPhone']",
                "#phone"
              ],
              transform: "phone"
            },
            {
              caseField: "client.email",
              selectors: [
                "input[name='applicantEmail']",
                "#email"
              ]
            }
          ],
          nextButtonSelector: "button[type='submit'], button.next-btn, #nextButton",
          mfaIndicators: [
            ".mfa-verification",
            "#otpInput",
            "[data-testid='mfa-code']"
          ]
        },
        {
          id: "applicant_address",
          urlPattern: "addressInfo",
          fields: [
            {
              caseField: "client.address",
              selectors: [
                "input[name='streetAddress']",
                "#address"
              ]
            },
            {
              caseField: "client.city",
              selectors: [
                "input[name='city']",
                "#city"
              ]
            },
            {
              caseField: "client.state",
              selectors: [
                "select[name='state']",
                "#state"
              ],
              inputType: "select"
            },
            {
              caseField: "client.zipCode",
              selectors: [
                "input[name='zipCode']",
                "#zip"
              ]
            }
          ],
          nextButtonSelector: "button[type='submit'], button.next-btn"
        }
      ]
    },
    Americo: {
      platform: "Americo",
      hostPattern: "americo.com",
      pages: [
        {
          id: "insured_info",
          urlPattern: "insured",
          fields: [
            {
              caseField: "client.firstName",
              selectors: [
                "#insuredFirstName",
                "input[name='insured.firstName']"
              ]
            },
            {
              caseField: "client.lastName",
              selectors: [
                "#insuredLastName",
                "input[name='insured.lastName']"
              ]
            },
            {
              caseField: "client.dateOfBirth",
              selectors: [
                "#insuredDOB",
                "input[name='insured.dob']"
              ],
              transform: "date_mmddyyyy"
            },
            {
              caseField: "client.smokerStatus",
              selectors: [
                "input[name='tobaccoUse']",
                "#smokerYes, #smokerNo"
              ],
              inputType: "radio"
            }
          ],
          nextButtonSelector: ".continue-btn, button[type='submit']",
          mfaIndicators: [
            ".verification-code",
            "#verificationCode"
          ]
        },
        {
          id: "contact_info",
          urlPattern: "contact",
          fields: [
            {
              caseField: "client.address",
              selectors: [
                "#streetAddress",
                "input[name='address.street']"
              ]
            },
            {
              caseField: "client.city",
              selectors: [
                "#city",
                "input[name='address.city']"
              ]
            },
            {
              caseField: "client.state",
              selectors: [
                "#state",
                "select[name='address.state']"
              ],
              inputType: "select"
            },
            {
              caseField: "client.zipCode",
              selectors: [
                "#zipCode",
                "input[name='address.zip']"
              ]
            },
            {
              caseField: "client.phone",
              selectors: [
                "#phoneNumber",
                "input[name='phone']"
              ],
              transform: "phone"
            },
            {
              caseField: "client.email",
              selectors: [
                "#emailAddress",
                "input[name='email']"
              ]
            }
          ],
          nextButtonSelector: ".continue-btn, button[type='submit']"
        }
      ]
    },
    Transamerica: {
      platform: "Transamerica",
      hostPattern: "transamerica.com",
      pages: [
        {
          id: "get_quote_page",
          urlPattern: "lifepolicyexplorer/get-quote",
          fields: [
            {
              // Coverage amount is at the Case level, not Client
              caseField: "coverageAmount",
              selectors: [
                "#edit-your-coverage-amount-is-",
                "input[name='your_coverage_amount_is_']"
              ]
            }
            /* Note: Plan type dropdown - no matching field in our data model yet
             Would need to add this to the Case type if needed
             Not supre relevant here because it's just the productPlanType for this specific carrier - and it's pre-populated!
            {
               caseField: 'productPlanType',
               selectors: ["#edit-your-plan-is-", "select[name='your_plan_is_']"],
               inputType: 'select',
            },*/
          ],
          nextButtonSelector: "button[type='submit'], input[type='submit'], button:contains('Next')"
        }
        // TODO: Add more pages as we discover the form flow
        // The quote flow likely continues with personal info pages
      ]
    }
  };
  function getCarrierByHost(hostname) {
    if (window.location.protocol === "file:") {
      return CARRIER_MAPPINGS.Test;
    }
    for (const mapping of Object.values(CARRIER_MAPPINGS)) {
      if (mapping.platform !== "Test" && hostname.includes(mapping.hostPattern)) {
        return mapping;
      }
    }
    return null;
  }
  function identifyPage(mapping, url) {
    for (const page of mapping.pages) {
      const pattern = page.urlPattern;
      const matches = typeof pattern === "string" ? url.includes(pattern) : pattern.test(url);
      if (matches) {
        if (page.domMarkers) {
          const markersFound = page.domMarkers.some(
            (selector) => document.querySelector(selector)
          );
          if (!markersFound)
            continue;
        }
        return page;
      }
    }
    return null;
  }

  // src/content/domUtils.ts
  function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return current[key];
      }
      return void 0;
    }, obj);
  }
  function transformValue(value, transform) {
    if (value === null || value === void 0)
      return "";
    const strValue = String(value);
    switch (transform) {
      case "uppercase":
        return strValue.toUpperCase();
      case "lowercase":
        return strValue.toLowerCase();
      case "phone":
        const digits = strValue.replace(/\D/g, "");
        if (digits.length === 10) {
          return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        return strValue;
      case "date_mmddyyyy":
        if (/^\d{4}-\d{2}-\d{2}$/.test(strValue)) {
          const [year, month, day] = strValue.split("-");
          return `${month}/${day}/${year}`;
        }
        return strValue;
      case "date_yyyymmdd":
        return strValue;
      default:
        return strValue;
    }
  }
  function findElement(selectors) {
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    }
    return null;
  }
  function setInputValue(element, value) {
    try {
      if (element instanceof HTMLInputElement) {
        const inputType = element.type.toLowerCase();
        if (inputType === "checkbox") {
          const shouldBeChecked = value === "true" || value === "1" || value === "yes";
          if (element.checked !== shouldBeChecked) {
            element.checked = shouldBeChecked;
            dispatchEvents(element);
          }
          return true;
        }
        if (inputType === "radio") {
          const radioGroup = document.querySelectorAll(
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
        element.value = value;
        dispatchEvents(element);
        return true;
      }
      if (element instanceof HTMLSelectElement) {
        const options = Array.from(element.options);
        const option = options.find(
          (opt) => opt.value.toLowerCase() === value.toLowerCase() || opt.text.toLowerCase() === value.toLowerCase()
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
      console.error("[Autofill] Error setting value:", error);
      return false;
    }
  }
  function dispatchEvents(element) {
    element.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new Event("blur", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
  }
  function fillField(mapping, caseData) {
    const rawValue = getNestedValue(caseData, mapping.caseField);
    const value = transformValue(rawValue, mapping.transform);
    if (!value) {
      return { success: true, field: mapping.caseField };
    }
    const element = findElement(mapping.selectors);
    if (!element) {
      return {
        success: false,
        field: mapping.caseField,
        error: `No element found for selectors: ${mapping.selectors.join(", ")}`
      };
    }
    const filled = setInputValue(element, value);
    if (!filled) {
      return {
        success: false,
        field: mapping.caseField,
        error: `Failed to set value on element`
      };
    }
    console.log(`[Autofill] Filled ${mapping.caseField}: ${value}`);
    return { success: true, field: mapping.caseField };
  }
  function detectMFA(mfaIndicators) {
    if (!mfaIndicators || mfaIndicators.length === 0)
      return false;
    for (const selector of mfaIndicators) {
      if (document.querySelector(selector)) {
        console.log("[Autofill] MFA detected:", selector);
        return true;
      }
    }
    const bodyText = document.body.innerText.toLowerCase();
    const mfaPhrases = [
      "enter the code",
      "verification code",
      "we sent a code",
      "enter your code",
      "two-factor",
      "2fa",
      "authenticate"
    ];
    for (const phrase of mfaPhrases) {
      if (bodyText.includes(phrase)) {
        console.log("[Autofill] MFA detected via text:", phrase);
        return true;
      }
    }
    return false;
  }
  function clickButton(selector) {
    var _a;
    const selectors = selector.split(",").map((s) => s.trim());
    for (const sel of selectors) {
      if (sel.includes(":contains(")) {
        const match = sel.match(/^([^:]+):contains\(['"]([^'"]+)['"]\)$/);
        if (match) {
          const [, baseSelector, text] = match;
          const elements = document.querySelectorAll(baseSelector);
          for (const el of elements) {
            if (((_a = el.textContent) == null ? void 0 : _a.includes(text)) && !el.hasAttribute("disabled")) {
              el.click();
              console.log("[Autofill] Clicked button by text:", text);
              return true;
            }
          }
        }
        continue;
      }
      const button = document.querySelector(sel);
      if (button && !button.hasAttribute("disabled")) {
        button.click();
        console.log("[Autofill] Clicked button:", sel);
        return true;
      }
    }
    console.log("[Autofill] No clickable button found for:", selector);
    return false;
  }
  function detectValidationErrors() {
    const errors = [];
    const errorSelectors = [
      ".error",
      ".error-message",
      ".validation-error",
      '[role="alert"]',
      ".field-error",
      ".has-error",
      ".invalid-feedback"
    ];
    for (const selector of errorSelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        var _a;
        const text = (_a = el.innerText) == null ? void 0 : _a.trim();
        if (text && text.length < 200) {
          errors.push(text);
        }
      });
    }
    return [...new Set(errors)];
  }
  function waitFor(condition, timeout = 5e3, interval = 100) {
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

  // src/api/client.ts
  var API_BASE_URL = "http://localhost:3000";
  async function apiRequest(endpoint, options = {}) {
    try {
      if (typeof chrome !== "undefined" && chrome.runtime) {
        try {
          const response2 = await chrome.runtime.sendMessage({
            type: "API_REQUEST",
            payload: {
              url: `${API_BASE_URL}${endpoint}`,
              options: {
                method: options.method || "GET",
                headers: {
                  "Content-Type": "application/json",
                  ...options.headers
                },
                body: options.body
              }
            }
          });
          if (response2.error) {
            return { error: response2.error };
          }
          return { data: response2.data };
        } catch (msgError) {
          console.warn("[API] Background script unavailable, using direct fetch");
        }
      }
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        // Include cookies for auth
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        }
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.error || `HTTP ${response.status}` };
      }
      return { data };
    } catch (error) {
      console.error("[API] Request failed:", error);
      return { error: error instanceof Error ? error.message : "Network error" };
    }
  }
  async function updateStatus(caseId, carrierPlatform, status, pageIdentifier, message) {
    return apiRequest("/api/app-status", {
      method: "POST",
      body: JSON.stringify({
        caseId,
        carrierPlatform,
        status,
        pageIdentifier,
        message
      })
    });
  }

  // src/content/content.ts
  var currentState = "idle";
  var currentCaseData = null;
  var detectedCarrier = null;
  console.log("[Autofill] Content script loaded on:", window.location.hostname);
  var carrierMapping = getCarrierByHost(window.location.hostname);
  if (carrierMapping) {
    detectedCarrier = carrierMapping.platform;
    console.log("[Autofill] Detected carrier:", detectedCarrier);
  }
  chrome.runtime.onMessage.addListener(
    (message, _sender, sendResponse) => {
      console.log("[Autofill] Received message:", message.type);
      switch (message.type) {
        case "START_AUTOFILL":
          handleStartAutofill(message.payload);
          sendResponse({ success: true });
          break;
        case "PAUSE_AUTOFILL":
          currentState = "paused";
          sendResponse({ success: true });
          break;
        case "RESUME_AUTOFILL":
          if (currentState === "paused" && currentCaseData) {
            currentState = "running";
            runAutofillLoop();
          }
          sendResponse({ success: true });
          break;
        case "GET_STATE":
          sendResponse({
            state: currentState,
            carrier: detectedCarrier,
            caseId: (currentCaseData == null ? void 0 : currentCaseData.id) || null
          });
          break;
        default:
          sendResponse({ error: "Unknown message type" });
      }
      return true;
    }
  );
  async function handleStartAutofill(payload) {
    currentCaseData = payload.caseData;
    currentState = "running";
    console.log("[Autofill] Starting with case:", currentCaseData.id);
    if (detectedCarrier) {
      await updateStatus(
        currentCaseData.id,
        detectedCarrier,
        "in_progress",
        void 0,
        "Autofill started"
      );
    }
    runAutofillLoop();
  }
  async function runAutofillLoop() {
    if (!currentCaseData || !carrierMapping) {
      console.log("[Autofill] No case data or carrier mapping");
      return;
    }
    while (currentState === "running") {
      const currentPage = identifyPage(carrierMapping, window.location.href);
      if (currentPage && detectMFA(currentPage.mfaIndicators)) {
        currentState = "paused";
        await updateStatus(
          currentCaseData.id,
          carrierMapping.platform,
          "waiting_mfa",
          currentPage.id,
          "MFA verification required"
        );
        chrome.runtime.sendMessage({
          type: "MFA_DETECTED",
          payload: { pageId: currentPage.id }
        });
        return;
      }
      if (!currentPage) {
        console.log("[Autofill] Unknown page, waiting for navigation...");
        await sleep(1e3);
        continue;
      }
      console.log("[Autofill] Processing page:", currentPage.id);
      const errors = [];
      for (const fieldMapping of currentPage.fields) {
        const result = fillField(fieldMapping, currentCaseData);
        if (!result.success && result.error) {
          errors.push(`${result.field}: ${result.error}`);
        }
      }
      await sleep(500);
      const validationErrors = detectValidationErrors();
      if (validationErrors.length > 0) {
        console.log("[Autofill] Validation errors:", validationErrors);
        currentState = "paused";
        await updateStatus(
          currentCaseData.id,
          carrierMapping.platform,
          "error",
          currentPage.id,
          `Validation errors: ${validationErrors.join("; ")}`
        );
        chrome.runtime.sendMessage({
          type: "AUTOFILL_ERROR",
          payload: {
            message: validationErrors.join("; "),
            pageIdentifier: currentPage.id
          }
        });
        return;
      }
      await updateStatus(
        currentCaseData.id,
        carrierMapping.platform,
        "in_progress",
        currentPage.id,
        "Page filled successfully"
      );
      chrome.runtime.sendMessage({
        type: "PAGE_COMPLETED",
        payload: { pageId: currentPage.id }
      });
      if (currentPage.nextButtonSelector) {
        await sleep(300);
        const clicked = clickButton(currentPage.nextButtonSelector);
        if (clicked) {
          console.log("[Autofill] Clicked next, waiting for page change...");
          await waitForPageChange();
        } else {
          console.log("[Autofill] Could not click next button, pausing");
          currentState = "paused";
          await updateStatus(
            currentCaseData.id,
            carrierMapping.platform,
            "error",
            currentPage.id,
            "Could not find next button"
          );
          return;
        }
      } else {
        console.log("[Autofill] No next button defined for page");
        currentState = "paused";
        return;
      }
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function waitForPageChange() {
    const currentUrl = window.location.href;
    const changed = await waitFor(() => {
      return window.location.href !== currentUrl || document.readyState !== "complete";
    }, 1e4);
    if (changed) {
      await waitFor(() => document.readyState === "complete", 5e3);
      await sleep(500);
    }
  }
  window.__testAutofill = (caseData) => {
    handleStartAutofill({ caseData });
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbnRlbnQvbWFwcGluZy50cyIsICIuLi8uLi9zcmMvY29udGVudC9kb21VdGlscy50cyIsICIuLi8uLi9zcmMvYXBpL2NsaWVudC50cyIsICIuLi8uLi9zcmMvY29udGVudC9jb250ZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDYXJyaWVyIE1hcHBpbmcgQ29uZmlndXJhdGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUT0RPOiBUaGlzIHdpbGwgbmVlZCBzZXJpb3VzIGVkaXRzIGFuZCByZXZpc2lvbnMgYXMgd2UgbGVhcm4gdGhlIGFjdHVhbFxyXG4vLyBwb3J0YWwgRE9NIHN0cnVjdHVyZXMuIEZvciBub3csIHRoZXNlIGFyZSBwbGFjZWhvbGRlciBtYXBwaW5ncy5cclxuLy8gRXZlbnR1YWxseSBtb3ZlIHRvIGRhdGFiYXNlIGZvciBpbi1hcHAgZWRpdGluZy5cclxuXHJcbmltcG9ydCB7IENhcnJpZXJNYXBwaW5nLCBDYXJyaWVyUGxhdGZvcm0gfSBmcm9tICcuLi90eXBlcy9tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IENBUlJJRVJfTUFQUElOR1M6IFJlY29yZDxDYXJyaWVyUGxhdGZvcm0sIENhcnJpZXJNYXBwaW5nPiA9IHtcclxuICAvLyBUZXN0IGNhcnJpZXIgZm9yIGxvY2FsIGZpbGU6Ly8gdGVzdGluZ1xyXG4gIFRlc3Q6IHtcclxuICAgIHBsYXRmb3JtOiAnVGVzdCcsXHJcbiAgICBob3N0UGF0dGVybjogJ2ZpbGU6Ly8nLFxyXG4gICAgcGFnZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAndGVzdF9mb3JtX3BhZ2UxJyxcclxuICAgICAgICB1cmxQYXR0ZXJuOiAndGVzdC1mb3JtLmh0bWwnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuZmlyc3ROYW1lJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXCIjZmlyc3ROYW1lXCIsIFwiaW5wdXRbbmFtZT0nYXBwbGljYW50Rmlyc3ROYW1lJ11cIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQubWlkZGxlSW5pdGlhbCcsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1wiI21pZGRsZUluaXRpYWxcIiwgXCJpbnB1dFtuYW1lPSdhcHBsaWNhbnRNaWRkbGVJbml0aWFsJ11cIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQubGFzdE5hbWUnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcIiNsYXN0TmFtZVwiLCBcImlucHV0W25hbWU9J2FwcGxpY2FudExhc3ROYW1lJ11cIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuZGF0ZU9mQmlydGgnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcIiNkb2JcIiwgXCJpbnB1dFtuYW1lPSdhcHBsaWNhbnRET0InXVwiXSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnZGF0ZV9tbWRkeXl5eScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuc3NuTGFzdDQnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcIiNzc25cIiwgXCJpbnB1dFtuYW1lPSdzc25MYXN0NCddXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LmFkZHJlc3MnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcIiNhZGRyZXNzXCIsIFwiaW5wdXRbbmFtZT0nc3RyZWV0QWRkcmVzcyddXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LmNpdHknLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcIiNjaXR5XCIsIFwiaW5wdXRbbmFtZT0nY2l0eSddXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LnN0YXRlJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXCIjc3RhdGVcIiwgXCJzZWxlY3RbbmFtZT0nc3RhdGUnXVwiXSxcclxuICAgICAgICAgICAgaW5wdXRUeXBlOiAnc2VsZWN0JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC56aXBDb2RlJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXCIjemlwXCIsIFwiaW5wdXRbbmFtZT0nemlwQ29kZSddXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LnBob25lJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXCIjcGhvbmVcIiwgXCJpbnB1dFtuYW1lPSdhcHBsaWNhbnRQaG9uZSddXCJdLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdwaG9uZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuZW1haWwnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcIiNlbWFpbFwiLCBcImlucHV0W25hbWU9J2FwcGxpY2FudEVtYWlsJ11cIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuc21va2VyU3RhdHVzJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXCJpbnB1dFtuYW1lPSd0b2JhY2NvVXNlJ11cIl0sXHJcbiAgICAgICAgICAgIGlucHV0VHlwZTogJ3JhZGlvJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuZXh0QnV0dG9uU2VsZWN0b3I6IFwiI25leHRCdG4sIGJ1dHRvblt0eXBlPSdzdWJtaXQnXVwiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5cclxuICBpUGlwZWxpbmU6IHtcclxuICAgIHBsYXRmb3JtOiAnaVBpcGVsaW5lJyxcclxuICAgIGhvc3RQYXR0ZXJuOiAnaXBpcGVsaW5lLmNvbScsXHJcbiAgICBwYWdlczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdhcHBsaWNhbnRfYmFzaWNfaW5mbycsXHJcbiAgICAgICAgdXJsUGF0dGVybjogJ2FwcGxpY2FudEluZm8nLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuZmlyc3ROYW1lJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXHJcbiAgICAgICAgICAgICAgXCJpbnB1dFtuYW1lPSdhcHBsaWNhbnRGaXJzdE5hbWUnXVwiLFxyXG4gICAgICAgICAgICAgIFwiI2ZpcnN0TmFtZVwiLFxyXG4gICAgICAgICAgICAgIFwiaW5wdXRbZGF0YS1maWVsZD0nZmlyc3ROYW1lJ11cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5taWRkbGVJbml0aWFsJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXHJcbiAgICAgICAgICAgICAgXCJpbnB1dFtuYW1lPSdhcHBsaWNhbnRNaWRkbGVJbml0aWFsJ11cIixcclxuICAgICAgICAgICAgICBcIiNtaWRkbGVJbml0aWFsXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQubGFzdE5hbWUnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J2FwcGxpY2FudExhc3ROYW1lJ11cIixcclxuICAgICAgICAgICAgICBcIiNsYXN0TmFtZVwiLFxyXG4gICAgICAgICAgICAgIFwiaW5wdXRbZGF0YS1maWVsZD0nbGFzdE5hbWUnXVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LmRhdGVPZkJpcnRoJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXHJcbiAgICAgICAgICAgICAgXCJpbnB1dFtuYW1lPSdhcHBsaWNhbnRET0InXVwiLFxyXG4gICAgICAgICAgICAgIFwiI2RvYlwiLFxyXG4gICAgICAgICAgICAgIFwiaW5wdXRbZGF0YS1maWVsZD0nZGF0ZU9mQmlydGgnXVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdkYXRlX21tZGR5eXl5JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5waG9uZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0nYXBwbGljYW50UGhvbmUnXVwiLFxyXG4gICAgICAgICAgICAgIFwiI3Bob25lXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3Bob25lJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5lbWFpbCcsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0nYXBwbGljYW50RW1haWwnXVwiLFxyXG4gICAgICAgICAgICAgIFwiI2VtYWlsXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmV4dEJ1dHRvblNlbGVjdG9yOiBcImJ1dHRvblt0eXBlPSdzdWJtaXQnXSwgYnV0dG9uLm5leHQtYnRuLCAjbmV4dEJ1dHRvblwiLFxyXG4gICAgICAgIG1mYUluZGljYXRvcnM6IFtcclxuICAgICAgICAgIFwiLm1mYS12ZXJpZmljYXRpb25cIixcclxuICAgICAgICAgIFwiI290cElucHV0XCIsXHJcbiAgICAgICAgICBcIltkYXRhLXRlc3RpZD0nbWZhLWNvZGUnXVwiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2FwcGxpY2FudF9hZGRyZXNzJyxcclxuICAgICAgICB1cmxQYXR0ZXJuOiAnYWRkcmVzc0luZm8nLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuYWRkcmVzcycsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0nc3RyZWV0QWRkcmVzcyddXCIsXHJcbiAgICAgICAgICAgICAgXCIjYWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LmNpdHknLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J2NpdHknXVwiLFxyXG4gICAgICAgICAgICAgIFwiI2NpdHlcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5zdGF0ZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwic2VsZWN0W25hbWU9J3N0YXRlJ11cIixcclxuICAgICAgICAgICAgICBcIiNzdGF0ZVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBpbnB1dFR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LnppcENvZGUnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J3ppcENvZGUnXVwiLFxyXG4gICAgICAgICAgICAgIFwiI3ppcFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5leHRCdXR0b25TZWxlY3RvcjogXCJidXR0b25bdHlwZT0nc3VibWl0J10sIGJ1dHRvbi5uZXh0LWJ0blwiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5cclxuICBBbWVyaWNvOiB7XHJcbiAgICBwbGF0Zm9ybTogJ0FtZXJpY28nLFxyXG4gICAgaG9zdFBhdHRlcm46ICdhbWVyaWNvLmNvbScsXHJcbiAgICBwYWdlczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdpbnN1cmVkX2luZm8nLFxyXG4gICAgICAgIHVybFBhdHRlcm46ICdpbnN1cmVkJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LmZpcnN0TmFtZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI2luc3VyZWRGaXJzdE5hbWVcIixcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J2luc3VyZWQuZmlyc3ROYW1lJ11cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5sYXN0TmFtZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI2luc3VyZWRMYXN0TmFtZVwiLFxyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0naW5zdXJlZC5sYXN0TmFtZSddXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuZGF0ZU9mQmlydGgnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IFtcclxuICAgICAgICAgICAgICBcIiNpbnN1cmVkRE9CXCIsXHJcbiAgICAgICAgICAgICAgXCJpbnB1dFtuYW1lPSdpbnN1cmVkLmRvYiddXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ2RhdGVfbW1kZHl5eXknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZUZpZWxkOiAnY2xpZW50LnNtb2tlclN0YXR1cycsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0ndG9iYWNjb1VzZSddXCIsXHJcbiAgICAgICAgICAgICAgXCIjc21va2VyWWVzLCAjc21va2VyTm9cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaW5wdXRUeXBlOiAncmFkaW8nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5leHRCdXR0b25TZWxlY3RvcjogXCIuY29udGludWUtYnRuLCBidXR0b25bdHlwZT0nc3VibWl0J11cIixcclxuICAgICAgICBtZmFJbmRpY2F0b3JzOiBbXHJcbiAgICAgICAgICBcIi52ZXJpZmljYXRpb24tY29kZVwiLFxyXG4gICAgICAgICAgXCIjdmVyaWZpY2F0aW9uQ29kZVwiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2NvbnRhY3RfaW5mbycsXHJcbiAgICAgICAgdXJsUGF0dGVybjogJ2NvbnRhY3QnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuYWRkcmVzcycsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI3N0cmVldEFkZHJlc3NcIixcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J2FkZHJlc3Muc3RyZWV0J11cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5jaXR5JyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXHJcbiAgICAgICAgICAgICAgXCIjY2l0eVwiLFxyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0nYWRkcmVzcy5jaXR5J11cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5zdGF0ZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI3N0YXRlXCIsXHJcbiAgICAgICAgICAgICAgXCJzZWxlY3RbbmFtZT0nYWRkcmVzcy5zdGF0ZSddXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGlucHV0VHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlRmllbGQ6ICdjbGllbnQuemlwQ29kZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI3ppcENvZGVcIixcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J2FkZHJlc3MuemlwJ11cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5waG9uZScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI3Bob25lTnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgXCJpbnB1dFtuYW1lPSdwaG9uZSddXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3Bob25lJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NsaWVudC5lbWFpbCcsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xyXG4gICAgICAgICAgICAgIFwiI2VtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICAgIFwiaW5wdXRbbmFtZT0nZW1haWwnXVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5leHRCdXR0b25TZWxlY3RvcjogXCIuY29udGludWUtYnRuLCBidXR0b25bdHlwZT0nc3VibWl0J11cIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuXHJcbiAgVHJhbnNhbWVyaWNhOiB7XHJcbiAgICBwbGF0Zm9ybTogJ1RyYW5zYW1lcmljYScsXHJcbiAgICBob3N0UGF0dGVybjogJ3RyYW5zYW1lcmljYS5jb20nLFxyXG4gICAgcGFnZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnZ2V0X3F1b3RlX3BhZ2UnLFxyXG4gICAgICAgIHVybFBhdHRlcm46ICdsaWZlcG9saWN5ZXhwbG9yZXIvZ2V0LXF1b3RlJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ292ZXJhZ2UgYW1vdW50IGlzIGF0IHRoZSBDYXNlIGxldmVsLCBub3QgQ2xpZW50XHJcbiAgICAgICAgICAgIGNhc2VGaWVsZDogJ2NvdmVyYWdlQW1vdW50JyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBbXHJcbiAgICAgICAgICAgICAgXCIjZWRpdC15b3VyLWNvdmVyYWdlLWFtb3VudC1pcy1cIixcclxuICAgICAgICAgICAgICBcImlucHV0W25hbWU9J3lvdXJfY292ZXJhZ2VfYW1vdW50X2lzXyddXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLyogTm90ZTogUGxhbiB0eXBlIGRyb3Bkb3duIC0gbm8gbWF0Y2hpbmcgZmllbGQgaW4gb3VyIGRhdGEgbW9kZWwgeWV0XHJcbiAgICAgICAgICAgV291bGQgbmVlZCB0byBhZGQgdGhpcyB0byB0aGUgQ2FzZSB0eXBlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgIE5vdCBzdXByZSByZWxldmFudCBoZXJlIGJlY2F1c2UgaXQncyBqdXN0IHRoZSBwcm9kdWN0UGxhblR5cGUgZm9yIHRoaXMgc3BlY2lmaWMgY2FycmllciAtIGFuZCBpdCdzIHByZS1wb3B1bGF0ZWQhXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBjYXNlRmllbGQ6ICdwcm9kdWN0UGxhblR5cGUnLFxyXG4gICAgICAgICAgICAgc2VsZWN0b3JzOiBbXCIjZWRpdC15b3VyLXBsYW4taXMtXCIsIFwic2VsZWN0W25hbWU9J3lvdXJfcGxhbl9pc18nXVwiXSxcclxuICAgICAgICAgICAgIGlucHV0VHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgICAgICB9LCovXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuZXh0QnV0dG9uU2VsZWN0b3I6IFwiYnV0dG9uW3R5cGU9J3N1Ym1pdCddLCBpbnB1dFt0eXBlPSdzdWJtaXQnXSwgYnV0dG9uOmNvbnRhaW5zKCdOZXh0JylcIixcclxuICAgICAgfSxcclxuICAgICAgLy8gVE9ETzogQWRkIG1vcmUgcGFnZXMgYXMgd2UgZGlzY292ZXIgdGhlIGZvcm0gZmxvd1xyXG4gICAgICAvLyBUaGUgcXVvdGUgZmxvdyBsaWtlbHkgY29udGludWVzIHdpdGggcGVyc29uYWwgaW5mbyBwYWdlc1xyXG4gICAgXSxcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGNhcnJpZXIgbWFwcGluZyBieSBob3N0bmFtZSBvciBwcm90b2NvbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcnJpZXJCeUhvc3QoaG9zdG5hbWU6IHN0cmluZyk6IENhcnJpZXJNYXBwaW5nIHwgbnVsbCB7XHJcbiAgLy8gQ2hlY2sgaWYgd2UncmUgb24gYSBmaWxlOi8vIFVSTCAoZm9yIHRlc3RpbmcpXHJcbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2ZpbGU6Jykge1xyXG4gICAgcmV0dXJuIENBUlJJRVJfTUFQUElOR1MuVGVzdDtcclxuICB9XHJcbiAgXHJcbiAgZm9yIChjb25zdCBtYXBwaW5nIG9mIE9iamVjdC52YWx1ZXMoQ0FSUklFUl9NQVBQSU5HUykpIHtcclxuICAgIGlmIChtYXBwaW5nLnBsYXRmb3JtICE9PSAnVGVzdCcgJiYgaG9zdG5hbWUuaW5jbHVkZXMobWFwcGluZy5ob3N0UGF0dGVybikpIHtcclxuICAgICAgcmV0dXJuIG1hcHBpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogSWRlbnRpZnkgd2hpY2ggcGFnZSB3ZSdyZSBvbiBiYXNlZCBvbiBVUkwgYW5kIERPTVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5UGFnZShcclxuICBtYXBwaW5nOiBDYXJyaWVyTWFwcGluZyxcclxuICB1cmw6IHN0cmluZ1xyXG4pOiB0eXBlb2YgbWFwcGluZy5wYWdlc1swXSB8IG51bGwge1xyXG4gIGZvciAoY29uc3QgcGFnZSBvZiBtYXBwaW5nLnBhZ2VzKSB7XHJcbiAgICBjb25zdCBwYXR0ZXJuID0gcGFnZS51cmxQYXR0ZXJuO1xyXG4gICAgY29uc3QgbWF0Y2hlcyA9XHJcbiAgICAgIHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJ1xyXG4gICAgICAgID8gdXJsLmluY2x1ZGVzKHBhdHRlcm4pXHJcbiAgICAgICAgOiBwYXR0ZXJuLnRlc3QodXJsKTtcclxuXHJcbiAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAvLyBPcHRpb25hbGx5IHZlcmlmeSBET00gbWFya2Vyc1xyXG4gICAgICBpZiAocGFnZS5kb21NYXJrZXJzKSB7XHJcbiAgICAgICAgY29uc3QgbWFya2Vyc0ZvdW5kID0gcGFnZS5kb21NYXJrZXJzLnNvbWUoKHNlbGVjdG9yKSA9PlxyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICghbWFya2Vyc0ZvdW5kKSBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFnZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbiIsICIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBET00gVXRpbGl0eSBGdW5jdGlvbnMgZm9yIEF1dG9maWxsXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgeyBGaWVsZE1hcHBpbmcsIENhc2VXaXRoQ2FycmllcnMgfSBmcm9tICcuLi90eXBlcy9tb2RlbHMnO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhIG5lc3RlZCB2YWx1ZSBmcm9tIGFuIG9iamVjdCB1c2luZyBkb3Qgbm90YXRpb25cclxuICogZS5nLiwgZ2V0TmVzdGVkVmFsdWUob2JqLCAnY2xpZW50LmZpcnN0TmFtZScpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkVmFsdWUob2JqOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgcGF0aDogc3RyaW5nKTogdW5rbm93biB7XHJcbiAgcmV0dXJuIHBhdGguc3BsaXQoJy4nKS5yZWR1Y2UoKGN1cnJlbnQ6IHVua25vd24sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoY3VycmVudCAmJiB0eXBlb2YgY3VycmVudCA9PT0gJ29iamVjdCcgJiYga2V5IGluIGN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIChjdXJyZW50IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9LCBvYmopO1xyXG59XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtIGEgdmFsdWUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCB0cmFuc2Zvcm1hdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVZhbHVlKHZhbHVlOiB1bmtub3duLCB0cmFuc2Zvcm0/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJyc7XHJcblxyXG4gIGNvbnN0IHN0clZhbHVlID0gU3RyaW5nKHZhbHVlKTtcclxuXHJcbiAgc3dpdGNoICh0cmFuc2Zvcm0pIHtcclxuICAgIGNhc2UgJ3VwcGVyY2FzZSc6XHJcbiAgICAgIHJldHVybiBzdHJWYWx1ZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgIGNhc2UgJ2xvd2VyY2FzZSc6XHJcbiAgICAgIHJldHVybiBzdHJWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGNhc2UgJ3Bob25lJzpcclxuICAgICAgLy8gRm9ybWF0IGFzIChYWFgpIFhYWC1YWFhYXHJcbiAgICAgIGNvbnN0IGRpZ2l0cyA9IHN0clZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XHJcbiAgICAgIGlmIChkaWdpdHMubGVuZ3RoID09PSAxMCkge1xyXG4gICAgICAgIHJldHVybiBgKCR7ZGlnaXRzLnNsaWNlKDAsIDMpfSkgJHtkaWdpdHMuc2xpY2UoMywgNil9LSR7ZGlnaXRzLnNsaWNlKDYpfWA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0clZhbHVlO1xyXG5cclxuICAgIGNhc2UgJ2RhdGVfbW1kZHl5eXknOlxyXG4gICAgICAvLyBDb252ZXJ0IFlZWVktTU0tREQgdG8gTU0vREQvWVlZWVxyXG4gICAgICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3Qoc3RyVmFsdWUpKSB7XHJcbiAgICAgICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gc3RyVmFsdWUuc3BsaXQoJy0nKTtcclxuICAgICAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyVmFsdWU7XHJcblxyXG4gICAgY2FzZSAnZGF0ZV95eXl5bW1kZCc6XHJcbiAgICAgIC8vIEtlZXAgYXMgWVlZWS1NTS1ERFxyXG4gICAgICByZXR1cm4gc3RyVmFsdWU7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0clZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW4gZWxlbWVudCB1c2luZyBtdWx0aXBsZSBzZWxlY3RvcnMsIHJldHVybmluZyB0aGUgZmlyc3QgbWF0Y2hcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kRWxlbWVudChzZWxlY3RvcnM6IHN0cmluZ1tdKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KHNlbGVjdG9yKTtcclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB2YWx1ZSBvbiBhbiBpbnB1dCBlbGVtZW50IGFuZCBkaXNwYXRjaCBuZWNlc3NhcnkgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZShlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgaW5wdXRUeXBlID0gZWxlbWVudC50eXBlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICBpZiAoaW5wdXRUeXBlID09PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgY29uc3Qgc2hvdWxkQmVDaGVja2VkID0gdmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJzEnIHx8IHZhbHVlID09PSAneWVzJztcclxuICAgICAgICBpZiAoZWxlbWVudC5jaGVja2VkICE9PSBzaG91bGRCZUNoZWNrZWQpIHtcclxuICAgICAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IHNob3VsZEJlQ2hlY2tlZDtcclxuICAgICAgICAgIGRpc3BhdGNoRXZlbnRzKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ3JhZGlvJykge1xyXG4gICAgICAgIC8vIEZvciByYWRpbyBidXR0b25zLCB3ZSBuZWVkIHRvIGZpbmQgdGhlIHJpZ2h0IG9uZSBieSB2YWx1ZVxyXG4gICAgICAgIGNvbnN0IHJhZGlvR3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KFxyXG4gICAgICAgICAgYGlucHV0W25hbWU9XCIke2VsZW1lbnQubmFtZX1cIl1gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHJhZGlvIG9mIHJhZGlvR3JvdXApIHtcclxuICAgICAgICAgIGlmIChyYWRpby52YWx1ZS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIHJhZGlvLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50cyhyYWRpbyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRleHQsIGVtYWlsLCBkYXRlLCBldGMuXHJcbiAgICAgIGVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgZGlzcGF0Y2hFdmVudHMoZWxlbWVudCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgLy8gVHJ5IHRvIGZpbmQgb3B0aW9uIGJ5IHZhbHVlIG9yIHRleHRcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IEFycmF5LmZyb20oZWxlbWVudC5vcHRpb25zKTtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9ucy5maW5kKFxyXG4gICAgICAgIChvcHQpID0+XHJcbiAgICAgICAgICBvcHQudmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKSB8fFxyXG4gICAgICAgICAgb3B0LnRleHQudG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBvcHRpb24udmFsdWU7XHJcbiAgICAgICAgZGlzcGF0Y2hFdmVudHMoZWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIGRpc3BhdGNoRXZlbnRzKGVsZW1lbnQpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1tBdXRvZmlsbF0gRXJyb3Igc2V0dGluZyB2YWx1ZTonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGlzcGF0Y2ggaW5wdXQgYW5kIGNoYW5nZSBldmVudHMgdG8gdHJpZ2dlciBmcmFtZXdvcmsgcmVhY3Rpdml0eVxyXG4gKi9cclxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAvLyBJbnB1dCBldmVudCAoUmVhY3QgdXNlcyB0aGlzKVxyXG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pKTtcclxuXHJcbiAgLy8gQ2hhbmdlIGV2ZW50XHJcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pKTtcclxuXHJcbiAgLy8gQmx1ciBldmVudCAoc29tZSB2YWxpZGF0b3JzIHRyaWdnZXIgb24gYmx1cilcclxuICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdibHVyJywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pKTtcclxuXHJcbiAgLy8gRm9yIEFuZ3VsYXIgYW5kIHNvbWUgb3RoZXIgZnJhbWV3b3Jrc1xyXG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgS2V5Ym9hcmRFdmVudCgna2V5dXAnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xyXG59XHJcblxyXG4vKipcclxuICogRmlsbCBhIHNpbmdsZSBmaWVsZCBiYXNlZCBvbiBtYXBwaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsbEZpZWxkKFxyXG4gIG1hcHBpbmc6IEZpZWxkTWFwcGluZyxcclxuICBjYXNlRGF0YTogQ2FzZVdpdGhDYXJyaWVyc1xyXG4pOiB7IHN1Y2Nlc3M6IGJvb2xlYW47IGZpZWxkOiBzdHJpbmc7IGVycm9yPzogc3RyaW5nIH0ge1xyXG4gIGNvbnN0IHJhd1ZhbHVlID0gZ2V0TmVzdGVkVmFsdWUoY2FzZURhdGEgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgbWFwcGluZy5jYXNlRmllbGQpO1xyXG4gIGNvbnN0IHZhbHVlID0gdHJhbnNmb3JtVmFsdWUocmF3VmFsdWUsIG1hcHBpbmcudHJhbnNmb3JtKTtcclxuXHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZmllbGQ6IG1hcHBpbmcuY2FzZUZpZWxkIH07IC8vIEVtcHR5IHZhbHVlIGlzIE9LLCBqdXN0IHNraXBcclxuICB9XHJcblxyXG4gIGNvbnN0IGVsZW1lbnQgPSBmaW5kRWxlbWVudChtYXBwaW5nLnNlbGVjdG9ycyk7XHJcblxyXG4gIGlmICghZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIGZpZWxkOiBtYXBwaW5nLmNhc2VGaWVsZCxcclxuICAgICAgZXJyb3I6IGBObyBlbGVtZW50IGZvdW5kIGZvciBzZWxlY3RvcnM6ICR7bWFwcGluZy5zZWxlY3RvcnMuam9pbignLCAnKX1gLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGZpbGxlZCA9IHNldElucHV0VmFsdWUoZWxlbWVudCwgdmFsdWUpO1xyXG5cclxuICBpZiAoIWZpbGxlZCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIGZpZWxkOiBtYXBwaW5nLmNhc2VGaWVsZCxcclxuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gc2V0IHZhbHVlIG9uIGVsZW1lbnRgLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGBbQXV0b2ZpbGxdIEZpbGxlZCAke21hcHBpbmcuY2FzZUZpZWxkfTogJHt2YWx1ZX1gKTtcclxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBmaWVsZDogbWFwcGluZy5jYXNlRmllbGQgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIE1GQSBpcyBiZWluZyByZXF1ZXN0ZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RNRkEobWZhSW5kaWNhdG9ycz86IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgaWYgKCFtZmFJbmRpY2F0b3JzIHx8IG1mYUluZGljYXRvcnMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgbWZhSW5kaWNhdG9ycykge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbQXV0b2ZpbGxdIE1GQSBkZXRlY3RlZDonLCBzZWxlY3Rvcik7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQWxzbyBjaGVjayBmb3IgY29tbW9uIE1GQSB0ZXh0IHBhdHRlcm5zXHJcbiAgY29uc3QgYm9keVRleHQgPSBkb2N1bWVudC5ib2R5LmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IG1mYVBocmFzZXMgPSBbXHJcbiAgICAnZW50ZXIgdGhlIGNvZGUnLFxyXG4gICAgJ3ZlcmlmaWNhdGlvbiBjb2RlJyxcclxuICAgICd3ZSBzZW50IGEgY29kZScsXHJcbiAgICAnZW50ZXIgeW91ciBjb2RlJyxcclxuICAgICd0d28tZmFjdG9yJyxcclxuICAgICcyZmEnLFxyXG4gICAgJ2F1dGhlbnRpY2F0ZScsXHJcbiAgXTtcclxuXHJcbiAgZm9yIChjb25zdCBwaHJhc2Ugb2YgbWZhUGhyYXNlcykge1xyXG4gICAgaWYgKGJvZHlUZXh0LmluY2x1ZGVzKHBocmFzZSkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gTUZBIGRldGVjdGVkIHZpYSB0ZXh0OicsIHBocmFzZSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xpY2sgYSBidXR0b24gYnkgc2VsZWN0b3Igb3IgdGV4dCBjb250ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tCdXR0b24oc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IHNlbGVjdG9ycyA9IHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKChzKSA9PiBzLnRyaW0oKSk7XHJcblxyXG4gIGZvciAoY29uc3Qgc2VsIG9mIHNlbGVjdG9ycykge1xyXG4gICAgLy8gSGFuZGxlIHRleHQtYmFzZWQgbWF0Y2hpbmcgKGUuZy4sIFwiYnV0dG9uOmNvbnRhaW5zKCdOZXh0JylcIilcclxuICAgIGlmIChzZWwuaW5jbHVkZXMoJzpjb250YWlucygnKSkge1xyXG4gICAgICBjb25zdCBtYXRjaCA9IHNlbC5tYXRjaCgvXihbXjpdKyk6Y29udGFpbnNcXChbJ1wiXShbXidcIl0rKVsnXCJdXFwpJC8pO1xyXG4gICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICBjb25zdCBbLCBiYXNlU2VsZWN0b3IsIHRleHRdID0gbWF0Y2g7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihiYXNlU2VsZWN0b3IpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZWwgb2YgZWxlbWVudHMpIHtcclxuICAgICAgICAgIGlmIChlbC50ZXh0Q29udGVudD8uaW5jbHVkZXModGV4dCkgJiYgIWVsLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICBlbC5jbGljaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dG9maWxsXSBDbGlja2VkIGJ1dHRvbiBieSB0ZXh0OicsIHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhbmRhcmQgQ1NTIHNlbGVjdG9yXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihzZWwpO1xyXG4gICAgaWYgKGJ1dHRvbiAmJiAhYnV0dG9uLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xyXG4gICAgICBidXR0b24uY2xpY2soKTtcclxuICAgICAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gQ2xpY2tlZCBidXR0b246Jywgc2VsKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZygnW0F1dG9maWxsXSBObyBjbGlja2FibGUgYnV0dG9uIGZvdW5kIGZvcjonLCBzZWxlY3Rvcik7XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgZm9yIHZhbGlkYXRpb24gZXJyb3JzIG9uIHRoZSBwYWdlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0VmFsaWRhdGlvbkVycm9ycygpOiBzdHJpbmdbXSB7XHJcbiAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAvLyBDb21tb24gZXJyb3Igc2VsZWN0b3JzXHJcbiAgY29uc3QgZXJyb3JTZWxlY3RvcnMgPSBbXHJcbiAgICAnLmVycm9yJyxcclxuICAgICcuZXJyb3ItbWVzc2FnZScsXHJcbiAgICAnLnZhbGlkYXRpb24tZXJyb3InLFxyXG4gICAgJ1tyb2xlPVwiYWxlcnRcIl0nLFxyXG4gICAgJy5maWVsZC1lcnJvcicsXHJcbiAgICAnLmhhcy1lcnJvcicsXHJcbiAgICAnLmludmFsaWQtZmVlZGJhY2snLFxyXG4gIF07XHJcblxyXG4gIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgZXJyb3JTZWxlY3RvcnMpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXh0ID0gKGVsIGFzIEhUTUxFbGVtZW50KS5pbm5lclRleHQ/LnRyaW0oKTtcclxuICAgICAgaWYgKHRleHQgJiYgdGV4dC5sZW5ndGggPCAyMDApIHtcclxuICAgICAgICBlcnJvcnMucHVzaCh0ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gWy4uLm5ldyBTZXQoZXJyb3JzKV07IC8vIFJlbW92ZSBkdXBsaWNhdGVzXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXYWl0IGZvciBhIGNvbmRpdGlvbiB0byBiZSB0cnVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvcihcclxuICBjb25kaXRpb246ICgpID0+IGJvb2xlYW4sXHJcbiAgdGltZW91dCA9IDUwMDAsXHJcbiAgaW50ZXJ2YWwgPSAxMDBcclxuKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrID0gKCkgPT4ge1xyXG4gICAgICBpZiAoY29uZGl0aW9uKCkpIHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydFRpbWUgPj0gdGltZW91dCkge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0VGltZW91dChjaGVjaywgaW50ZXJ2YWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjaGVjaygpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4iLCAiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQVBJIENsaWVudCBmb3IgRXh0ZW5zaW9uXHJcbi8vIENvbW11bmljYXRlcyB3aXRoIHRoZSB3ZWItYXBwIGJhY2tlbmRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IENhc2VXaXRoQ2FycmllcnMsIENhcnJpZXJQbGF0Zm9ybSwgQ2FzZUNhcnJpZXJTdGF0dXMgfSBmcm9tICcuLi90eXBlcy9tb2RlbHMnO1xyXG5cclxuLy8gRGVmYXVsdCB0byBsb2NhbGhvc3QgZm9yIGRldmVsb3BtZW50XHJcbi8vIEluIHByb2R1Y3Rpb24sIHRoaXMgd291bGQgYmUgeW91ciBWZXJjZWwgZGVwbG95bWVudCBVUkxcclxuLy8gVE9ETyBhZnRlciAxMi81LzIwMjU6IENoYW5nZSB0aGlzIHRvIHRoZSBhY3R1YWwgcHJvZHVjdGlvbiBVUkwgKioqKioqKioqKioqKioqKipcclxuY29uc3QgQVBJX0JBU0VfVVJMID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XHJcblxyXG5pbnRlcmZhY2UgQXBpUmVzcG9uc2U8VD4ge1xyXG4gIGRhdGE/OiBUO1xyXG4gIGVycm9yPzogc3RyaW5nO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhcGlSZXF1ZXN0PFQ+KFxyXG4gIGVuZHBvaW50OiBzdHJpbmcsXHJcbiAgb3B0aW9uczogUmVxdWVzdEluaXQgPSB7fVxyXG4pOiBQcm9taXNlPEFwaVJlc3BvbnNlPFQ+PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEluIGNvbnRlbnQgc2NyaXB0cywgcm91dGUgdGhyb3VnaCBiYWNrZ3JvdW5kIHRvIGF2b2lkIENPUlNcclxuICAgIC8vIEJhY2tncm91bmQgc2NyaXB0IGhhcyBob3N0X3Blcm1pc3Npb25zIGFuZCBjYW4gbWFrZSBjcm9zcy1vcmlnaW4gcmVxdWVzdHNcclxuICAgIGlmICh0eXBlb2YgY2hyb21lICE9PSAndW5kZWZpbmVkJyAmJiBjaHJvbWUucnVudGltZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgdHlwZTogJ0FQSV9SRVFVRVNUJyxcclxuICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgdXJsOiBgJHtBUElfQkFTRV9VUkx9JHtlbmRwb2ludH1gLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJyxcclxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICByZXR1cm4geyBlcnJvcjogcmVzcG9uc2UuZXJyb3IgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlLmRhdGEgfTtcclxuICAgICAgfSBjYXRjaCAobXNnRXJyb3IpIHtcclxuICAgICAgICAvLyBGYWxsYmFjayB0byBkaXJlY3QgZmV0Y2ggaWYgYmFja2dyb3VuZCBzY3JpcHQgaXNuJ3QgYXZhaWxhYmxlXHJcbiAgICAgICAgY29uc29sZS53YXJuKCdbQVBJXSBCYWNrZ3JvdW5kIHNjcmlwdCB1bmF2YWlsYWJsZSwgdXNpbmcgZGlyZWN0IGZldGNoJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXJlY3QgZmV0Y2ggKHdvcmtzIGluIHBvcHVwL2JhY2tncm91bmQgY29udGV4dHMpXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0FQSV9CQVNFX1VSTH0ke2VuZHBvaW50fWAsIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJywgLy8gSW5jbHVkZSBjb29raWVzIGZvciBhdXRoXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICByZXR1cm4geyBlcnJvcjogZGF0YS5lcnJvciB8fCBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgZGF0YSB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdbQVBJXSBSZXF1ZXN0IGZhaWxlZDonLCBlcnJvcik7XHJcbiAgICByZXR1cm4geyBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnTmV0d29yayBlcnJvcicgfTtcclxuICB9XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFQSSBGdW5jdGlvbnNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qKlxyXG4gKiBGZXRjaCBhIHNwZWNpZmljIGNhc2Ugd2l0aCBjbGllbnQgYW5kIGNhcnJpZXIgZGV0YWlsc1xyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2FzZShjYXNlSWQ6IHN0cmluZyk6IFByb21pc2U8QXBpUmVzcG9uc2U8Q2FzZVdpdGhDYXJyaWVycz4+IHtcclxuICByZXR1cm4gYXBpUmVxdWVzdDxDYXNlV2l0aENhcnJpZXJzPihgL2FwaS9jYXNlcy8ke2Nhc2VJZH1gKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZldGNoIGFsbCBjYXNlcyBmb3IgdGhlIGN1cnJlbnQgYWdlbnRcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaENhc2VzKCk6IFByb21pc2U8QXBpUmVzcG9uc2U8eyBjYXNlczogQ2FzZVdpdGhDYXJyaWVyc1tdIH0+PiB7XHJcbiAgcmV0dXJuIGFwaVJlcXVlc3Q8eyBjYXNlczogQ2FzZVdpdGhDYXJyaWVyc1tdIH0+KCcvYXBpL2Nhc2VzJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgY2FycmllciBzdGF0dXMgZm9yIGEgY2FzZSAoY2FsbGVkIGR1cmluZyBhdXRvZmlsbClcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTdGF0dXMoXHJcbiAgY2FzZUlkOiBzdHJpbmcsXHJcbiAgY2FycmllclBsYXRmb3JtOiBDYXJyaWVyUGxhdGZvcm0sXHJcbiAgc3RhdHVzOiBDYXNlQ2FycmllclN0YXR1cyxcclxuICBwYWdlSWRlbnRpZmllcj86IHN0cmluZyxcclxuICBtZXNzYWdlPzogc3RyaW5nXHJcbik6IFByb21pc2U8QXBpUmVzcG9uc2U8eyBzdWNjZXNzOiBib29sZWFuIH0+PiB7XHJcbiAgcmV0dXJuIGFwaVJlcXVlc3Q8eyBzdWNjZXNzOiBib29sZWFuIH0+KCcvYXBpL2FwcC1zdGF0dXMnLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgY2FzZUlkLFxyXG4gICAgICBjYXJyaWVyUGxhdGZvcm0sXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgcGFnZUlkZW50aWZpZXIsXHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICB9KSxcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0F1dGgoKTogUHJvbWlzZTxBcGlSZXNwb25zZTx7IHVzZXI6IHsgaWQ6IHN0cmluZzsgZW1haWw6IHN0cmluZyB9IHwgbnVsbCB9Pj4ge1xyXG4gIHJldHVybiBhcGlSZXF1ZXN0PHsgdXNlcjogeyBpZDogc3RyaW5nOyBlbWFpbDogc3RyaW5nIH0gfCBudWxsIH0+KCcvYXBpL2F1dGgvbWUnKTtcclxufVxyXG5cclxuIiwgIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbnRlbnQgU2NyaXB0IC0gSW5qZWN0ZWQgaW50byBjYXJyaWVyIHBvcnRhbHNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVE9ETzogVGhpcyB3aWxsIG5lZWQgc2VyaW91cyBlZGl0cyBhbmQgcmV2aXNpb25zIGJhc2VkIG9uIGFjdHVhbFxyXG4vLyBjYXJyaWVyIHBvcnRhbCBzdHJ1Y3R1cmVzLiBDdXJyZW50IGltcGxlbWVudGF0aW9uIGlzIGEgc3RhcnRpbmcgcG9pbnQuXHJcblxyXG5pbXBvcnQge1xyXG4gIENhc2VXaXRoQ2FycmllcnMsXHJcbiAgRXh0ZW5zaW9uTWVzc2FnZSxcclxuICBBdXRvZmlsbFN0YXRlLFxyXG4gIENhcnJpZXJQbGF0Zm9ybSxcclxufSBmcm9tICcuLi90eXBlcy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRDYXJyaWVyQnlIb3N0LCBpZGVudGlmeVBhZ2UgfSBmcm9tICcuL21hcHBpbmcnO1xyXG5pbXBvcnQge1xyXG4gIGZpbGxGaWVsZCxcclxuICBkZXRlY3RNRkEsXHJcbiAgY2xpY2tCdXR0b24sXHJcbiAgZGV0ZWN0VmFsaWRhdGlvbkVycm9ycyxcclxuICB3YWl0Rm9yLFxyXG59IGZyb20gJy4vZG9tVXRpbHMnO1xyXG5pbXBvcnQgeyB1cGRhdGVTdGF0dXMgfSBmcm9tICcuLi9hcGkvY2xpZW50JztcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN0YXRlXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5sZXQgY3VycmVudFN0YXRlOiBBdXRvZmlsbFN0YXRlID0gJ2lkbGUnO1xyXG5sZXQgY3VycmVudENhc2VEYXRhOiBDYXNlV2l0aENhcnJpZXJzIHwgbnVsbCA9IG51bGw7XHJcbmxldCBkZXRlY3RlZENhcnJpZXI6IENhcnJpZXJQbGF0Zm9ybSB8IG51bGwgPSBudWxsO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gSW5pdGlhbGl6YXRpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmNvbnNvbGUubG9nKCdbQXV0b2ZpbGxdIENvbnRlbnQgc2NyaXB0IGxvYWRlZCBvbjonLCB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpO1xyXG5cclxuLy8gRGV0ZWN0IGNhcnJpZXIgb24gbG9hZFxyXG5jb25zdCBjYXJyaWVyTWFwcGluZyA9IGdldENhcnJpZXJCeUhvc3Qod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKTtcclxuaWYgKGNhcnJpZXJNYXBwaW5nKSB7XHJcbiAgZGV0ZWN0ZWRDYXJyaWVyID0gY2Fycmllck1hcHBpbmcucGxhdGZvcm07XHJcbiAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gRGV0ZWN0ZWQgY2FycmllcjonLCBkZXRlY3RlZENhcnJpZXIpO1xyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBNZXNzYWdlIEhhbmRsaW5nXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXHJcbiAgKG1lc3NhZ2U6IEV4dGVuc2lvbk1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gUmVjZWl2ZWQgbWVzc2FnZTonLCBtZXNzYWdlLnR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ1NUQVJUX0FVVE9GSUxMJzpcclxuICAgICAgICBoYW5kbGVTdGFydEF1dG9maWxsKG1lc3NhZ2UucGF5bG9hZCBhcyB7IGNhc2VEYXRhOiBDYXNlV2l0aENhcnJpZXJzIH0pO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdQQVVTRV9BVVRPRklMTCc6XHJcbiAgICAgICAgY3VycmVudFN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ1JFU1VNRV9BVVRPRklMTCc6XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gJ3BhdXNlZCcgJiYgY3VycmVudENhc2VEYXRhKSB7XHJcbiAgICAgICAgICBjdXJyZW50U3RhdGUgPSAncnVubmluZyc7XHJcbiAgICAgICAgICBydW5BdXRvZmlsbExvb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ0dFVF9TVEFURSc6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHtcclxuICAgICAgICAgIHN0YXRlOiBjdXJyZW50U3RhdGUsXHJcbiAgICAgICAgICBjYXJyaWVyOiBkZXRlY3RlZENhcnJpZXIsXHJcbiAgICAgICAgICBjYXNlSWQ6IGN1cnJlbnRDYXNlRGF0YT8uaWQgfHwgbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgZXJyb3I6ICdVbmtub3duIG1lc3NhZ2UgdHlwZScgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgY2hhbm5lbCBvcGVuIGZvciBhc3luYyByZXNwb25zZVxyXG4gIH1cclxuKTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEF1dG9maWxsIExvZ2ljXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdGFydEF1dG9maWxsKHBheWxvYWQ6IHsgY2FzZURhdGE6IENhc2VXaXRoQ2FycmllcnMgfSkge1xyXG4gIGN1cnJlbnRDYXNlRGF0YSA9IHBheWxvYWQuY2FzZURhdGE7XHJcbiAgY3VycmVudFN0YXRlID0gJ3J1bm5pbmcnO1xyXG5cclxuICBjb25zb2xlLmxvZygnW0F1dG9maWxsXSBTdGFydGluZyB3aXRoIGNhc2U6JywgY3VycmVudENhc2VEYXRhLmlkKTtcclxuXHJcbiAgLy8gUmVwb3J0IHN0YXR1cyB0byBiYWNrZW5kXHJcbiAgaWYgKGRldGVjdGVkQ2Fycmllcikge1xyXG4gICAgYXdhaXQgdXBkYXRlU3RhdHVzKFxyXG4gICAgICBjdXJyZW50Q2FzZURhdGEuaWQsXHJcbiAgICAgIGRldGVjdGVkQ2FycmllcixcclxuICAgICAgJ2luX3Byb2dyZXNzJyxcclxuICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAnQXV0b2ZpbGwgc3RhcnRlZCdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBTdGFydCB0aGUgYXV0b2ZpbGwgbG9vcFxyXG4gIHJ1bkF1dG9maWxsTG9vcCgpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBydW5BdXRvZmlsbExvb3AoKSB7XHJcbiAgaWYgKCFjdXJyZW50Q2FzZURhdGEgfHwgIWNhcnJpZXJNYXBwaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZygnW0F1dG9maWxsXSBObyBjYXNlIGRhdGEgb3IgY2FycmllciBtYXBwaW5nJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB3aGlsZSAoY3VycmVudFN0YXRlID09PSAncnVubmluZycpIHtcclxuICAgIC8vIENoZWNrIGZvciBNRkFcclxuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gaWRlbnRpZnlQYWdlKGNhcnJpZXJNYXBwaW5nLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgJiYgZGV0ZWN0TUZBKGN1cnJlbnRQYWdlLm1mYUluZGljYXRvcnMpKSB7XHJcbiAgICAgIGN1cnJlbnRTdGF0ZSA9ICdwYXVzZWQnO1xyXG4gICAgICBhd2FpdCB1cGRhdGVTdGF0dXMoXHJcbiAgICAgICAgY3VycmVudENhc2VEYXRhLmlkLFxyXG4gICAgICAgIGNhcnJpZXJNYXBwaW5nLnBsYXRmb3JtLFxyXG4gICAgICAgICd3YWl0aW5nX21mYScsXHJcbiAgICAgICAgY3VycmVudFBhZ2UuaWQsXHJcbiAgICAgICAgJ01GQSB2ZXJpZmljYXRpb24gcmVxdWlyZWQnXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBOb3RpZnkgcG9wdXBcclxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIHR5cGU6ICdNRkFfREVURUNURUQnLFxyXG4gICAgICAgIHBheWxvYWQ6IHsgcGFnZUlkOiBjdXJyZW50UGFnZS5pZCB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZGVudGlmeSBjdXJyZW50IHBhZ2VcclxuICAgIGlmICghY3VycmVudFBhZ2UpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gVW5rbm93biBwYWdlLCB3YWl0aW5nIGZvciBuYXZpZ2F0aW9uLi4uJyk7XHJcbiAgICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnW0F1dG9maWxsXSBQcm9jZXNzaW5nIHBhZ2U6JywgY3VycmVudFBhZ2UuaWQpO1xyXG5cclxuICAgIC8vIEZpbGwgYWxsIGZpZWxkcyBmb3IgdGhpcyBwYWdlXHJcbiAgICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGZpZWxkTWFwcGluZyBvZiBjdXJyZW50UGFnZS5maWVsZHMpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gZmlsbEZpZWxkKGZpZWxkTWFwcGluZywgY3VycmVudENhc2VEYXRhKTtcclxuICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcyAmJiByZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICBlcnJvcnMucHVzaChgJHtyZXN1bHQuZmllbGR9OiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdhaXQgYSBtb21lbnQgZm9yIGZpZWxkcyB0byBzZXR0bGVcclxuICAgIGF3YWl0IHNsZWVwKDUwMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIHZhbGlkYXRpb24gZXJyb3JzXHJcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gZGV0ZWN0VmFsaWRhdGlvbkVycm9ycygpO1xyXG4gICAgaWYgKHZhbGlkYXRpb25FcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnW0F1dG9maWxsXSBWYWxpZGF0aW9uIGVycm9yczonLCB2YWxpZGF0aW9uRXJyb3JzKTtcclxuICAgICAgY3VycmVudFN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICAgIGF3YWl0IHVwZGF0ZVN0YXR1cyhcclxuICAgICAgICBjdXJyZW50Q2FzZURhdGEuaWQsXHJcbiAgICAgICAgY2Fycmllck1hcHBpbmcucGxhdGZvcm0sXHJcbiAgICAgICAgJ2Vycm9yJyxcclxuICAgICAgICBjdXJyZW50UGFnZS5pZCxcclxuICAgICAgICBgVmFsaWRhdGlvbiBlcnJvcnM6ICR7dmFsaWRhdGlvbkVycm9ycy5qb2luKCc7ICcpfWBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICB0eXBlOiAnQVVUT0ZJTExfRVJST1InLFxyXG4gICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgIG1lc3NhZ2U6IHZhbGlkYXRpb25FcnJvcnMuam9pbignOyAnKSxcclxuICAgICAgICAgIHBhZ2VJZGVudGlmaWVyOiBjdXJyZW50UGFnZS5pZCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBvcnQgcGFnZSBjb21wbGV0aW9uXHJcbiAgICBhd2FpdCB1cGRhdGVTdGF0dXMoXHJcbiAgICAgIGN1cnJlbnRDYXNlRGF0YS5pZCxcclxuICAgICAgY2Fycmllck1hcHBpbmcucGxhdGZvcm0sXHJcbiAgICAgICdpbl9wcm9ncmVzcycsXHJcbiAgICAgIGN1cnJlbnRQYWdlLmlkLFxyXG4gICAgICAnUGFnZSBmaWxsZWQgc3VjY2Vzc2Z1bGx5J1xyXG4gICAgKTtcclxuXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgIHR5cGU6ICdQQUdFX0NPTVBMRVRFRCcsXHJcbiAgICAgIHBheWxvYWQ6IHsgcGFnZUlkOiBjdXJyZW50UGFnZS5pZCB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVHJ5IHRvIGNsaWNrIG5leHQgYnV0dG9uXHJcbiAgICBpZiAoY3VycmVudFBhZ2UubmV4dEJ1dHRvblNlbGVjdG9yKSB7XHJcbiAgICAgIGF3YWl0IHNsZWVwKDMwMCk7XHJcbiAgICAgIGNvbnN0IGNsaWNrZWQgPSBjbGlja0J1dHRvbihjdXJyZW50UGFnZS5uZXh0QnV0dG9uU2VsZWN0b3IpO1xyXG5cclxuICAgICAgaWYgKGNsaWNrZWQpIHtcclxuICAgICAgICAvLyBXYWl0IGZvciBuYXZpZ2F0aW9uIG9yIHBhZ2UgdXBkYXRlXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gQ2xpY2tlZCBuZXh0LCB3YWl0aW5nIGZvciBwYWdlIGNoYW5nZS4uLicpO1xyXG4gICAgICAgIGF3YWl0IHdhaXRGb3JQYWdlQ2hhbmdlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tBdXRvZmlsbF0gQ291bGQgbm90IGNsaWNrIG5leHQgYnV0dG9uLCBwYXVzaW5nJyk7XHJcbiAgICAgICAgY3VycmVudFN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICAgICAgYXdhaXQgdXBkYXRlU3RhdHVzKFxyXG4gICAgICAgICAgY3VycmVudENhc2VEYXRhLmlkLFxyXG4gICAgICAgICAgY2Fycmllck1hcHBpbmcucGxhdGZvcm0sXHJcbiAgICAgICAgICAnZXJyb3InLFxyXG4gICAgICAgICAgY3VycmVudFBhZ2UuaWQsXHJcbiAgICAgICAgICAnQ291bGQgbm90IGZpbmQgbmV4dCBidXR0b24nXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIE5vIG5leHQgYnV0dG9uIGRlZmluZWQsIHdlIG1pZ2h0IGJlIGRvbmUgb3IgbmVlZCBtYW51YWwgaW50ZXJ2ZW50aW9uXHJcbiAgICAgIGNvbnNvbGUubG9nKCdbQXV0b2ZpbGxdIE5vIG5leHQgYnV0dG9uIGRlZmluZWQgZm9yIHBhZ2UnKTtcclxuICAgICAgY3VycmVudFN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFV0aWxpdHkgRnVuY3Rpb25zXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5mdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JQYWdlQ2hhbmdlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgLy8gV2FpdCBmb3IgVVJMIGNoYW5nZSBvciBET00gY2hhbmdlXHJcbiAgY29uc3QgY2hhbmdlZCA9IGF3YWl0IHdhaXRGb3IoKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgIT09IGN1cnJlbnRVcmwgfHxcclxuICAgICAgZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJ1xyXG4gICAgKTtcclxuICB9LCAxMDAwMCk7XHJcblxyXG4gIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAvLyBXYWl0IGZvciBuZXcgcGFnZSB0byBiZSByZWFkeVxyXG4gICAgYXdhaXQgd2FpdEZvcigoKSA9PiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnLCA1MDAwKTtcclxuICAgIGF3YWl0IHNsZWVwKDUwMCk7IC8vIEV4dHJhIGJ1ZmZlciBmb3IgSlMgdG8gaW5pdGlhbGl6ZVxyXG4gIH1cclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVzdCBBdXRvZmlsbCBmb3IgRGV2ZWxvcG1lbnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGZyb20gdGhlIGNvbnNvbGUgZm9yIHRlc3RpbmdcclxuXHJcbih3aW5kb3cgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuX190ZXN0QXV0b2ZpbGwgPSAoXHJcbiAgY2FzZURhdGE6IENhc2VXaXRoQ2FycmllcnNcclxuKSA9PiB7XHJcbiAgaGFuZGxlU3RhcnRBdXRvZmlsbCh7IGNhc2VEYXRhIH0pO1xyXG59O1xyXG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBU08sTUFBTSxtQkFBNEQ7QUFBQTtBQUFBLElBRXZFLE1BQU07QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxJQUFJO0FBQUEsVUFDSixZQUFZO0FBQUEsVUFDWixRQUFRO0FBQUEsWUFDTjtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVyxDQUFDLGNBQWMsa0NBQWtDO0FBQUEsWUFDOUQ7QUFBQSxZQUNBO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXLENBQUMsa0JBQWtCLHNDQUFzQztBQUFBLFlBQ3RFO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVyxDQUFDLGFBQWEsaUNBQWlDO0FBQUEsWUFDNUQ7QUFBQSxZQUNBO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXLENBQUMsUUFBUSw0QkFBNEI7QUFBQSxjQUNoRCxXQUFXO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLFdBQVcsQ0FBQyxRQUFRLHdCQUF3QjtBQUFBLFlBQzlDO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVyxDQUFDLFlBQVksNkJBQTZCO0FBQUEsWUFDdkQ7QUFBQSxZQUNBO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXLENBQUMsU0FBUyxvQkFBb0I7QUFBQSxZQUMzQztBQUFBLFlBQ0E7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLFdBQVcsQ0FBQyxVQUFVLHNCQUFzQjtBQUFBLGNBQzVDLFdBQVc7QUFBQSxZQUNiO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVyxDQUFDLFFBQVEsdUJBQXVCO0FBQUEsWUFDN0M7QUFBQSxZQUNBO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXLENBQUMsVUFBVSw4QkFBOEI7QUFBQSxjQUNwRCxXQUFXO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLFdBQVcsQ0FBQyxVQUFVLDhCQUE4QjtBQUFBLFlBQ3REO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVyxDQUFDLDBCQUEwQjtBQUFBLGNBQ3RDLFdBQVc7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFVBQ0Esb0JBQW9CO0FBQUEsUUFDdEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLElBQUk7QUFBQSxVQUNKLFlBQVk7QUFBQSxVQUNaLFFBQVE7QUFBQSxZQUNOO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFBQSxjQUNBLFdBQVc7QUFBQSxZQUNiO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxjQUNGO0FBQUEsY0FDQSxXQUFXO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxnQkFDVDtBQUFBLGdCQUNBO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxvQkFBb0I7QUFBQSxVQUNwQixlQUFlO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxJQUFJO0FBQUEsVUFDSixZQUFZO0FBQUEsVUFDWixRQUFRO0FBQUEsWUFDTjtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxnQkFDVDtBQUFBLGdCQUNBO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFBQSxjQUNBLFdBQVc7QUFBQSxZQUNiO0FBQUEsWUFDQTtBQUFBLGNBQ0UsV0FBVztBQUFBLGNBQ1gsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFB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
