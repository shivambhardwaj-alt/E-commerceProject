import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CollectionsPage = () => {
  const [hoveredBrand, setHoveredBrand] = useState(null);

  const collections = [
    {
      id: 1,
      name: 'Winter-X Arctic',
      badge: 'Winter-X Series',
      description: 'Premium arctic gear engineered for extreme cold. Advanced insulation and weatherproofing.',
      icon: '❄️',
      color: '#3da5d9'
    },
    {
      id: 2,
      name: 'Glacier Peak Edition',
      badge: 'Limited Edition',
      description: 'Exclusive mountaineering collection. Built for high-altitude expeditions and harsh climates.',
      icon: '🧊',
      color: '#3da5d9'
    },
    {
      id: 3,
      name: 'Alpine Essentials',
      badge: 'New',
      description: 'Modern alpine wear for everyday winter. Style meets functionality at every level.',
      icon: '🏔️',
      color: '#3da5d9'
    },
    {
      id: 4,
      name: 'Frost Urban Collection',
      badge: 'Bestseller',
      description: 'Contemporary winter fashion for city living. Warmth without compromising style.',
      icon: '⛸️',
      color: '#3da5d9'
    }
  ];

  const brands = [
    'The North Face',
    'Arc\'teryx',
    'Patagonia',
    'Canada Goose',
    'Mammut',
    'Salomon',
    'Marmot',
    'Columbia'
  ];

  const features = [
    {
      title: 'Premium Outerwear',
      description: 'From insulated parkas to technical shells, our outerwear collection features cutting-edge materials and design. Each piece is tested in real-world conditions to ensure maximum protection and comfort.',
      icon: '🧥',
      link: 'View outerwear'
    },
    {
      title: 'Accessories & Gear',
      description: 'Complete your winter setup with our curated selection of gloves, beanies, scarves, and thermal layers. All accessories are engineered to work seamlessly with our collections.',
      icon: '🤖',
      link: 'Shop accessories'
    }
  ];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f3a52 0%, #1a5a7d 100%)',
          color: '#f5f7fa',
          padding: '80px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '60px',
            fontSize: '80px',
            opacity: 0.05
          }}
        >
          ❄️
        </div>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            margin: '0 0 16px 0',
            letterSpacing: '-1px',
            fontFamily: 'Fraunces, serif'
          }}
        >
          Our Collections
        </h1>
        <p
          style={{
            fontSize: '18px',
            margin: 0,
            opacity: 0.95,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'Sora, sans-serif'
          }}
        >
          Explore our premium winter wear collections from the world's finest brands
        </p>
      </div>

      {/* Featured Collections */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
        <h2
          style={{
            fontSize: '32px',
            fontFamily: 'Fraunces, serif',
            color: '#1a3a52',
            marginBottom: '8px',
            fontWeight: 700
          }}
        >
          Featured series
        </h2>
        <div
          style={{
            width: '50px',
            height: '3px',
            background: '#3da5d9',
            marginBottom: '48px'
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '100px'
          }}
        >
          {collections.map((collection) => (
            <div
              key={collection.id}
              style={{
                background: '#fff',
                border: '0.5px solid #e0e4ea',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3da5d9';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e4ea';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  background: '#1a5a7d',
                  color: '#f5f7fa',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  margin: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  fontFamily: 'Sora, sans-serif'
                }}
              >
                {collection.badge}
              </div>

              <div
                style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, #e8f4f8 0%, #d0e8f2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px'
                }}
              >
                {collection.icon}
              </div>

              <div style={{ padding: '24px 20px' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1a3a52',
                    marginBottom: '8px',
                    fontFamily: 'Fraunces, serif'
                  }}
                >
                  {collection.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '16px',
                    lineHeight: 1.5,
                    fontFamily: 'Sora, sans-serif'
                  }}
                >
                  {collection.description}
                </p>
                <button
                  style={{
                    padding: '10px 20px',
                    background: '#d97f40',
                    color: '#f5f7fa',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    fontFamily: 'Sora, sans-serif'
                  }}
                  onMouseEnter={(e) => (e.target.style.background = '#c46630')}
                  onMouseLeave={(e) => (e.target.style.background = '#d97f40')}
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Sections */}
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              marginBottom: '80px',
              flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#1a3a52',
                  marginBottom: '16px',
                  fontFamily: 'Fraunces, serif'
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                  fontFamily: 'Sora, sans-serif'
                }}
              >
                {feature.description}
              </p>
              <button
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1.5px solid #3da5d9',
                  color: '#3da5d9',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'Sora, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e8f4f8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {feature.link}
                <ArrowRight size={16} />
              </button>
            </div>
            <div
              style={{
                flex: 1,
                height: '280px',
                background: 'linear-gradient(135deg, #e8f4f8 0%, #d0e8f2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '100px'
              }}
            >
              {feature.icon}
            </div>
          </div>
        ))}

        {/* Brands Section */}
        <h2
          style={{
            fontSize: '32px',
            fontFamily: 'Fraunces, serif',
            color: '#1a3a52',
            marginBottom: '8px',
            fontWeight: 700,
            marginTop: '60px'
          }}
        >
          Premium brands
        </h2>
        <div
          style={{
            width: '50px',
            height: '3px',
            background: '#d97f40',
            marginBottom: '48px'
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px'
          }}
        >
          {brands.map((brand, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                border: '0.5px solid #e0e4ea',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.2s',
                cursor: 'pointer',
                fontFamily: 'Sora, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a3a52';
                e.currentTarget.style.color = '#f5f7fa';
                e.currentTarget.style.borderColor = '#1a3a52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#1a3a52';
                e.currentTarget.style.borderColor = '#e0e4ea';
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 500
                }}
              >
                {brand}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: '#1a3a52',
          color: '#f5f7fa',
          padding: '60px 20px',
          textAlign: 'center',
          marginTop: '60px'
        }}
      >
        <h3
          style={{
            fontSize: '24px',
            fontWeight: 600,
            margin: '0 0 12px 0',
            fontFamily: 'Sora, sans-serif'
          }}
        >
          Can't find what you're looking for?
        </h3>
        <p
          style={{
            fontSize: '16px',
            margin: 0,
            opacity: 0.9,
            fontFamily: 'Sora, sans-serif'
          }}
        >
          Contact our team or explore all available products.
        </p>
      </div>
    </div>
  );
};

export default CollectionsPage;