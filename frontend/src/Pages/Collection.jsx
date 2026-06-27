import React, { useState } from 'react';
import { ArrowRight, Star, ShoppingBag, Filter, Snowflake } from 'lucide-react';

const CollectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Outerwear', 'Accessories', 'Limited Edition', 'New Arrivals'];

  const collections = [
    {
      id: 1,
      name: 'Winter-X Arctic',
      badge: 'Winter-X Series',
      category: 'Outerwear',
      description: 'Premium arctic gear engineered for extreme cold with advanced insulation.',
      icon: '❄️',
      priceFrom: 4499,
      rating: 4.8,
      reviews: 312,
      accent: 'from-[#3da5d9]/15 to-[#3da5d9]/5',
    },
    {
      id: 2,
      name: 'Glacier Peak Edition',
      badge: 'Limited Edition',
      category: 'Limited Edition',
      description: 'Exclusive mountaineering collection built for high-altitude expeditions.',
      icon: '🧊',
      priceFrom: 6999,
      rating: 4.9,
      reviews: 148,
      accent: 'from-[#d97f40]/15 to-[#d97f40]/5',
    },
    {
      id: 3,
      name: 'Alpine Essentials',
      badge: 'New',
      category: 'New Arrivals',
      description: 'Modern alpine wear for everyday winter — style meets functionality.',
      icon: '🏔️',
      priceFrom: 2999,
      rating: 4.6,
      reviews: 521,
      accent: 'from-[#3da5d9]/15 to-[#3da5d9]/5',
    },
    {
      id: 4,
      name: 'Frost Urban Collection',
      badge: 'Bestseller',
      category: 'Outerwear',
      description: 'Contemporary winter fashion for city living, without compromising warmth.',
      icon: '⛸️',
      priceFrom: 3499,
      rating: 4.7,
      reviews: 894,
      accent: 'from-[#3da5d9]/15 to-[#3da5d9]/5',
    },
    {
      id: 5,
      name: 'Tundra Accessories Set',
      badge: 'New',
      category: 'Accessories',
      description: 'Gloves, beanies, and thermal layers engineered to pair with any shell.',
      icon: '🧤',
      priceFrom: 999,
      rating: 4.5,
      reviews: 203,
      accent: 'from-[#d97f40]/15 to-[#d97f40]/5',
    },
    {
      id: 6,
      name: 'Summit Pro Limited',
      badge: 'Limited Edition',
      category: 'Limited Edition',
      description: 'Numbered drop, technical fabrics tested above 4,000m.',
      icon: '🏕️',
      priceFrom: 8499,
      rating: 5.0,
      reviews: 67,
      accent: 'from-[#d97f40]/15 to-[#d97f40]/5',
    },
  ];

  const brands = ['The North Face', "Arc'teryx", 'Patagonia', 'Canada Goose', 'Mammut', 'Salomon', 'Marmot', 'Columbia'];

  const stats = [
    { label: 'Collections', value: '40+' },
    { label: 'Premium Brands', value: '8' },
    { label: 'Happy Customers', value: '25K+' },
    { label: 'Avg. Rating', value: '4.8★' },
  ];

  const features = [
    {
      title: 'Premium Outerwear',
      description:
        'From insulated parkas to technical shells, our outerwear lineup uses cutting-edge materials tested in real-world conditions for maximum protection and comfort.',
      icon: '🧥',
      link: 'View outerwear',
    },
    {
      title: 'Accessories & Gear',
      description:
        'Complete your setup with gloves, beanies, scarves, and thermal layers — all engineered to work seamlessly with every collection above.',
      icon: '🤝',
      link: 'Shop accessories',
    },
  ];

  const filteredCollections =
    activeFilter === 'All' ? collections : collections.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f3a52] to-[#1a5a7d] px-6 py-20 text-center text-[#f5f7fa] sm:py-24">
        <Snowflake className="absolute -right-4 top-6 h-32 w-32 text-white/5 sm:h-40 sm:w-40" />
        <Snowflake className="absolute bottom-2 left-8 h-16 w-16 text-white/5" />

        <span className="font-['Sora'] inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#bfe3f2]">
          Winter 2026 Lineup
        </span>

        <h1 className="font-['Fraunces'] mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Our Collections
        </h1>
        <p className="font-['Sora'] mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
          Explore premium winter wear collections from the world's finest brands — built for every climate.
        </p>
      </div>

      {/* Stats strip */}
      <div className="border-b border-[#e0e4ea] bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-['Fraunces'] text-2xl font-bold text-[#1a3a52] sm:text-3xl">{s.value}</div>
              <div className="font-['Sora'] mt-1 text-xs text-[#666] sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {/* Section header + filter bar */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-['Fraunces'] text-3xl font-bold text-[#1a3a52]">Featured series</h2>
            <div className="mt-2 h-[3px] w-12 bg-[#3da5d9]" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter size={14} className="hidden text-[#666] sm:block" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-['Sora'] whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  activeFilter === f
                    ? 'bg-[#1a3a52] text-[#f5f7fa]'
                    : 'bg-white text-[#666] ring-1 ring-[#e0e4ea] hover:bg-[#e8f4f8] hover:text-[#1a3a52]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Collection cards */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              className="group overflow-hidden rounded-xl border border-[#e0e4ea] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3da5d9] hover:shadow-lg hover:shadow-[#3da5d9]/10"
            >
              {/* Image area */}
              <div className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${collection.accent}`}>
                <span className="font-['Sora'] absolute left-4 top-4 rounded-md bg-[#1a5a7d] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#f5f7fa]">
                  {collection.badge}
                </span>
                <span className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {collection.icon}
                </span>

                {/* quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 bg-gradient-to-t from-black/40 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <button className="font-['Sora'] flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-[#1a3a52] shadow-sm hover:bg-[#f5f7fa]">
                    <ShoppingBag size={13} /> Quick view
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Fraunces'] text-lg font-semibold text-[#1a3a52]">{collection.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#666]">
                    <Star size={13} className="fill-[#d97f40] text-[#d97f40]" />
                    <span className="font-['Sora'] font-medium text-[#1a3a52]">{collection.rating}</span>
                    <span className="font-['JetBrains_Mono']">({collection.reviews})</span>
                  </div>
                </div>

                <p className="font-['Sora'] mt-2 text-sm leading-relaxed text-[#666]">{collection.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-sm text-[#1a3a52]">
                    From ₹{collection.priceFrom.toLocaleString('en-IN')}
                  </span>
                  <button className="font-['Sora'] rounded-md bg-[#d97f40] px-4 py-2 text-sm font-medium text-[#f5f7fa] transition-colors hover:bg-[#c46630]">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial feature sections */}
        <div className="space-y-16 sm:space-y-20">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center gap-8 sm:gap-10 lg:flex-row ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className="font-['Fraunces'] text-2xl font-semibold text-[#1a3a52] sm:text-[28px]">
                  {feature.title}
                </h3>
                <p className="font-['Sora'] mt-4 text-base leading-relaxed text-[#666]">{feature.description}</p>
                <button className="font-['Sora'] mt-5 flex items-center gap-2 rounded-md border-[1.5px] border-[#3da5d9] px-5 py-2.5 text-sm font-medium text-[#3da5d9] transition-colors hover:bg-[#e8f4f8]">
                  {feature.link}
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex h-56 w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8f4f8] to-[#d0e8f2] text-[80px] sm:h-72 sm:text-[100px]">
                {feature.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div className="mt-20 sm:mt-24">
          <h2 className="font-['Fraunces'] text-3xl font-bold text-[#1a3a52]">Premium brands</h2>
          <div className="mt-2 h-[3px] w-12 bg-[#d97f40]" />

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {brands.map((brand) => (
              <div
                key={brand}
                className="font-['Sora'] flex items-center justify-center rounded-lg border border-[#e0e4ea] bg-white px-4 py-5 text-center text-sm font-medium text-[#1a3a52] transition-colors hover:bg-[#1a3a52] hover:text-[#f5f7fa]"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1a3a52] px-6 py-14 text-center text-[#f5f7fa]">
        <h3 className="font-['Sora'] text-2xl font-semibold">Can't find what you're looking for?</h3>
        <p className="font-['Sora'] mt-3 text-base text-white/85">
          Contact our team or explore all available products.
        </p>
        <button className="font-['Sora'] mt-6 rounded-md bg-[#d97f40] px-6 py-3 text-sm font-medium text-[#f5f7fa] transition-colors hover:bg-[#c46630]">
          Browse all products
        </button>
      </div>
    </div>
  );
};

export default CollectionsPage;