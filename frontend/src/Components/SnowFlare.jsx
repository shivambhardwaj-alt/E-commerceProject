import React from 'react'

const SnowFlare = ({ color = '#16273D', size = 300 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none">
    <circle cx="150" cy="150" r="2.5" fill={color} />
    <g stroke={color} strokeWidth="1.1">
      {/* main spokes */}
      <path d="M150 20 L150 280" />
      <path d="M20 150 L280 150" />
      <path d="M55 55 L245 245" />
      <path d="M245 55 L55 245" />

      {/* branch ticks at each spoke end */}
      <path d="M150 20 L130 55 M150 20 L170 55" />
      <path d="M150 280 L130 245 M150 280 L170 245" />
      <path d="M20 150 L55 130 M20 150 L55 170" />
      <path d="M280 150 L245 130 M280 150 L245 170" />
    </g>
  </svg>
)

export default SnowFlare