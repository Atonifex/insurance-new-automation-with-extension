'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { CarrierPlatform, SmokerStatus, CreateCaseRequest } from '@/lib/types';
import { ALL_CARRIERS, CARRIER_CONFIGS } from '@/lib/carriers';

// US States for dropdown
const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

// Coverage amount options
const COVERAGE_OPTIONS = [
  { value: 50000, label: '$50,000' },
  { value: 100000, label: '$100,000' },
  { value: 150000, label: '$150,000' },
  { value: 250000, label: '$250,000' },
  { value: 500000, label: '$500,000' },
  { value: 750000, label: '$750,000' },
  { value: 1000000, label: '$1,000,000' },
];

// Term length options
const TERM_OPTIONS = [
  { value: 10, label: '10 Years' },
  { value: 15, label: '15 Years' },
  { value: 20, label: '20 Years' },
  { value: 25, label: '25 Years' },
  { value: 30, label: '30 Years' },
];

interface FormData {
  // Client info
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  ssnLast4: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  smokerStatus: SmokerStatus;
  // Case info
  coverageAmount: number;
  termLengthYears: number;
  selectedCarriers: CarrierPlatform[];
}

const initialFormData: FormData = {
  firstName: '',
  middleInitial: '',
  lastName: '',
  dateOfBirth: '',
  ssnLast4: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  email: '',
  smokerStatus: 'non-smoker',
  coverageAmount: 250000,
  termLengthYears: 20,
  selectedCarriers: [],
};

export default function NewCasePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarrierToggle = (carrier: CarrierPlatform) => {
    setFormData((prev) => ({
      ...prev,
      selectedCarriers: prev.selectedCarriers.includes(carrier)
        ? prev.selectedCarriers.filter((c) => c !== carrier)
        : [...prev.selectedCarriers, carrier],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      setError('First name and last name are required');
      return;
    }
    if (!formData.dateOfBirth) {
      setError('Date of birth is required');
      return;
    }
    if (formData.selectedCarriers.length === 0) {
      setError('Please select at least one carrier');
      return;
    }

    setLoading(true);

    try {
      const requestBody: CreateCaseRequest = {
        client: {
          firstName: formData.firstName,
          middleInitial: formData.middleInitial || undefined,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          ssnLast4: formData.ssnLast4 || undefined,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          smokerStatus: formData.smokerStatus,
        },
        coverageAmount: formData.coverageAmount,
        termLengthYears: formData.termLengthYears,
        selectedCarriers: formData.selectedCarriers,
      };

      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Navigate to the new case
        router.push(`/cases/${data.id}`);
      }
    } catch (err) {
      console.error('Error creating case:', err);
      setError('Failed to create case. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header userEmail="demo@agency.com" onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 animate-fade-in">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cases
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create New Case</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Enter client information and select carriers to begin applications
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Coverage Details Section */}
          <section className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 animate-fade-in">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center text-sm font-bold">
                1
              </span>
              Coverage Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Coverage Amount *
                </label>
                <select
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                >
                  {COVERAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Term Length *
                </label>
                <select
                  name="termLengthYears"
                  value={formData.termLengthYears}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                >
                  {TERM_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Client Information Section */}
          <section className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 animate-fade-in stagger-1">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center text-sm font-bold">
                2
              </span>
              Client Information
            </h2>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                  required
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  M.I.
                </label>
                <input
                  type="text"
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleInputChange}
                  placeholder="M"
                  maxLength={1}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Smith"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                  required
                />
              </div>
            </div>

            {/* DOB and SSN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  SSN (Last 4 Digits)
                </label>
                <input
                  type="text"
                  name="ssnLast4"
                  value={formData.ssnLast4}
                  onChange={handleInputChange}
                  placeholder="1234"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mb-6">
              <div className="col-span-2 sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Columbia"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                >
                  <option value="">Select...</option>
                  {US_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="29201"
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(803) 555-0123"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
                />
              </div>
            </div>

            {/* Smoker Status */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                Tobacco Use in Last 12 Months *
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.smokerStatus === 'non-smoker'
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                      : 'border-[var(--border)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="smokerStatus"
                    value="non-smoker"
                    checked={formData.smokerStatus === 'non-smoker'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-2xl">✓</span>
                  <span className="font-medium text-[var(--text-primary)]">Non-Smoker</span>
                </label>
                <label
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.smokerStatus === 'smoker'
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                      : 'border-[var(--border)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="smokerStatus"
                    value="smoker"
                    checked={formData.smokerStatus === 'smoker'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-2xl">🚬</span>
                  <span className="font-medium text-[var(--text-primary)]">Smoker</span>
                </label>
              </div>
            </div>
          </section>

          {/* Carrier Selection Section */}
          <section className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 animate-fade-in stagger-2">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center text-sm font-bold">
                3
              </span>
              Select Carriers
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              Choose which carrier applications to prepare. You can fill multiple applications simultaneously.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_CARRIERS.map((carrierKey) => {
                const carrier = CARRIER_CONFIGS[carrierKey];
                const isSelected = formData.selectedCarriers.includes(carrierKey);

                return (
                  <label
                    key={carrierKey}
                    className={`relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                        : 'border-[var(--border)] hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCarrierToggle(carrierKey)}
                      className="sr-only"
                    />
                    {/* Checkbox indicator */}
                    <div
                      className={`absolute top-4 right-4 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[var(--accent)] border-[var(--accent)]'
                          : 'border-[var(--border)]'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3"
                      style={{ backgroundColor: carrier.logoColor }}
                    >
                      {carrierKey[0]}
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] pr-8">
                      {carrier.displayName}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      {carrier.description}
                    </p>
                  </label>
                );
              })}
            </div>

            {formData.selectedCarriers.length > 0 && (
              <div className="mt-6 p-4 bg-[var(--accent)]/10 rounded-xl">
                <p className="text-sm text-[var(--accent)] font-medium">
                  {formData.selectedCarriers.length} carrier{formData.selectedCarriers.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-[var(--error)] px-6 py-4 rounded-xl text-sm animate-fade-in">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in stagger-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Case...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Case
                </>
              )}
            </button>
            <Link
              href="/cases"
              className="py-4 px-6 bg-[var(--border-light)] text-[var(--text-secondary)] rounded-xl font-medium hover:bg-[var(--border)] transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

