import React from 'react';

const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
];

const CountrySelect = ({ country, onChange }) => {
  return (
    <div style={{ maxWidth: '320px' }}>
      <label
        htmlFor="country-select"
        style={{ display: 'block', marginBottom: '8px' }}
        className="text-gray-500 tracking-wider"
      >
        What country do you live in?
      </label>

      <select
        id="country-select"
        value={country}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          outline: 'none',
          fontSize: '14px',
        }}
        className="text-gray-600 uppercase tracking-wider rounded-md"
      >
        <option value="">Select country</option>
        {countries.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>

      {country && (
        <p style={{ marginTop: '10px', fontSize: '15px' }} className="mt-8 ml-10 text-gray-600">
          Selected country: <strong>{country}</strong>
        </p>
      )}
    </div>
  );
};

export default CountrySelect;