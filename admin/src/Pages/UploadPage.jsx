// ─── Theme tokens (light blue) ────────────────────────────────────────────────
// Primary:   #1e40af  (deep blue)
// Accent:    #3b82f6  (blue-500)
// Light:     #eff6ff  (blue-50)
// Mid:       #bfdbfe  (blue-200)
// Surface:   #f0f7ff  (near-white blue tint)

import { useState, useCallback, useContext } from "react";
import { adminContext } from "../context/AdminContext";
import axios from "axios";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "OS"];
const CATEGORIES = ["Men", "Women", "Kids", "Unisex"];
const INSULATION_LEVELS = ["Light", "Low", "Medium", "High", "Heavy", "Extra Heavy"];
const CURRENCIES = [{ value: "INR", label: "INR ₹" }, { value: "$", label: "USD $" }];

const TABS = [
  { id: "basic",    label: "Basic Info",  icon: "🧥" },
  { id: "variants", label: "Variants",    icon: "🎨" },
  { id: "pricing",  label: "Pricing",     icon: "💰" },
  { id: "specs",    label: "Specs",       icon: "❄️"  },
  { id: "shipping", label: "Shipping",    icon: "🚚" },
  { id: "seo",      label: "SEO",         icon: "🔍" },
];

const initialVariant = () => ({
  id: Date.now(),
  variantId: "",
  color: "",
  colorHex: "#1e40af",
  size: "M",
  sku: "",
  stock: 0,
  priceAdjustment: 200,
  image: [],
  _imgInput: "",
});

const initialProduct = {
  name: "",
  slug: "",
  brand: "winter-x",
  description: { short: "", long: "" },
  pricing: {
    mrp: "",
    sellingPrice: "",
    discountPercentage: 0,
    currency: "INR",
    taxIncluded: true,
    gstPercentage: 0,
  },
  category: "",
  subCategory: "",
  productType: "",
  image: [],
  collection: "",
  variants: [initialVariant()],
  attributes: {
    material: "100% Cotton",
    fit: "Regular fit",
    neckline: "",
    sleeve: "",
    fabricWeight: "250",
    stretchable: false,
  },
  winterSpecs: {
    temperature_rating: "8°C - 25°C",
    layeringFriendly: false,
    insulationLevel: "Medium",
  },
  sizeGuide: {
    modelHeight: "5ft 11 inch",
    modelSize: "L",
    fitAdvice: "True to size",
  },
  shipping: {
    weightInGrams: "250GMS",
    dimensions: "30x25x2 cm",
    freeShipping: false,
    estimatedDeliveryDays: 3,
  },
  returnPolicy: {
    returnable: false,
    returnDays: 7,
    exchangeAllowed: false,
  },
  tags: [],
  bestseller: false,
  featured: false,
  newArrival: true,
  seo: { title: "WinterX", description: "Buy premium cotton winter clothes", keywords: [] },
  isActive: true,
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  primary:     "#1e40af",
  primaryDark: "#1e3a8a",
  accent:      "#3b82f6",
  accentLight: "#eff6ff",
  accentMid:   "#bfdbfe",
  border:      "#dbeafe",
  borderHover: "#93c5fd",
  surface:     "#f0f7ff",
  white:       "#ffffff",
  text:        "#0f172a",
  textMuted:   "#64748b",
  textLight:   "#94a3b8",
  success:     "#0f6e56",
  successBg:   "#e0f2fe",
  danger:      "#dc2626",
  dangerBg:    "#fef2f2",
};

const styles = {
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: T.textMuted,
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    fontSize: "14px",
    border: `1px solid ${T.border}`,
    borderRadius: "8px",
    background: T.white,
    color: T.text,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "9px 12px",
    fontSize: "14px",
    border: `1px solid ${T.border}`,
    borderRadius: "8px",
    background: T.white,
    color: T.text,
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2364748b' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "32px",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "9px 12px",
    fontSize: "14px",
    border: `1px solid ${T.border}`,
    borderRadius: "8px",
    background: T.white,
    color: T.text,
    outline: "none",
    resize: "vertical",
    lineHeight: 1.6,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  card: {
    background: T.white,
    border: `1px solid ${T.border}`,
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.7px",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Field({ label, required, children, hint, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {label && (
        <label style={styles.label}>
          {label}{required && <span style={{ color: T.danger }}> *</span>}
        </label>
      )}
      {children}
      {hint && <span style={{ fontSize: "11px", color: T.textLight, marginTop: "4px" }}>{hint}</span>}
    </div>
  );
}

function Input({ value, onChange, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...styles.input,
        borderColor: focused ? T.accent : T.border,
        boxShadow: focused ? `0 0 0 3px ${T.accentMid}55` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}

function Select({ value, onChange, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...styles.select,
        borderColor: focused ? T.accent : T.border,
        boxShadow: focused ? `0 0 0 3px ${T.accentMid}55` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    >
      {children}
    </select>
  );
}

function Textarea({ value, onChange, rows = 3, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      style={{
        ...styles.textarea,
        borderColor: focused ? T.accent : T.border,
        boxShadow: focused ? `0 0 0 3px ${T.accentMid}55` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}

function Toggle({ checked, onChange, label, sub }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: `1px solid ${T.surface}`,
    }}>
      <div>
        <div style={{ fontSize: "14px", color: T.text, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: "12px", color: T.textLight, marginTop: "1px" }}>{sub}</div>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: "40px",
          height: "22px",
          borderRadius: "11px",
          background: checked ? T.accent : "#d1d5db",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: T.white,
          position: "absolute",
          top: "3px",
          left: checked ? "21px" : "3px",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
    </div>
  );
}

function TagsInput({ tags, onAdd, onRemove, placeholder }) {
  const [input, setInput] = useState("");
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = input.trim().replace(/,$/, "");
      if (val) { onAdd(val); setInput(""); }
    }
    if (e.key === "Backspace" && !input && tags.length) onRemove(tags.length - 1);
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        padding: "8px 10px",
        border: `1px solid ${T.border}`,
        borderRadius: "8px",
        minHeight: "42px",
        cursor: "text",
        background: T.white,
        alignItems: "center",
      }}
      onClick={(e) => e.currentTarget.querySelector("input").focus()}
    >
      {tags.map((t, i) => (
        <span key={i} style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: T.accentLight,
          color: T.primary,
          padding: "3px 8px",
          borderRadius: "5px",
          fontSize: "12px",
          fontWeight: 600,
          border: `1px solid ${T.accentMid}`,
        }}>
          {t}
          <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: T.accent, fontSize: "14px", lineHeight: 1, padding: 0 }}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder={tags.length ? "" : placeholder}
        style={{ border: "none", outline: "none", fontSize: "13px", flex: 1, minWidth: "80px", background: "transparent", color: T.text }}
      />
    </div>
  );
}

function Grid({ cols = 2, children, gap = 12 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, alignItems: "start" }}>
      {children}
    </div>
  );
}

// ─── Multi-image upload component ─────────────────────────────────────────────

function ImageUpload({ images, onChange }) {
  const [dragging, setDragging] = useState(false);

  const addFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (!valid.length) return;
    onChange([...images, ...valid]);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* Drop zone */}
      <label
        htmlFor="img-upload"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "28px 20px",
          border: `2px dashed ${dragging ? T.accent : T.accentMid}`,
          borderRadius: "12px",
          background: dragging ? T.accentLight : T.surface,
          cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: "12px",
        }}
      >
        <div style={{ fontSize: "28px" }}>🖼️</div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: T.primary }}>
          Drop images here or click to browse
        </div>
        <div style={{ fontSize: "11px", color: T.textLight }}>
          PNG, JPG, WEBP — multiple files supported
        </div>
        <input
          id="img-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => addFiles(e.target.files)}
          style={{ display: "none" }}
        />
      </label>

      {/* Preview grid */}
      {images.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: "10px",
        }}>
          {images.map((file, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt={`img-${i}`}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: `1px solid ${T.border}`,
                  display: "block",
                }}
              />
              {/* Primary badge */}
              {i === 0 && (
                <div style={{
                  position: "absolute",
                  bottom: "4px",
                  left: "4px",
                  background: T.accent,
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "2px 5px",
                  borderRadius: "4px",
                  letterSpacing: "0.5px",
                }}>
                  MAIN
                </div>
              )}
              {/* Remove button */}
              <button
                onClick={() => removeImage(i)}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          ))}
          {/* Add more tile */}
          <label
            htmlFor="img-upload-more"
            style={{
              aspectRatio: "1",
              border: `2px dashed ${T.accentMid}`,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: T.accentLight,
              fontSize: "22px",
              color: T.accent,
              transition: "background 0.15s",
            }}
          >
            +
            <span style={{ fontSize: "10px", color: T.textLight, marginTop: "2px" }}>Add more</span>
            <input
              id="img-upload-more"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => addFiles(e.target.files)}
              style={{ display: "none" }}
            />
          </label>
        </div>
      )}

      {images.length > 0 && (
        <p style={{ fontSize: "11px", color: T.textLight, marginTop: "8px" }}>
          {images.length} image{images.length > 1 ? "s" : ""} selected · First image is used as main photo
        </p>
      )}
    </div>
  );
}

// ─── Tab Pages ────────────────────────────────────────────────────────────────

function BasicTab({ product, update }) {
  const autoSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>📋 Core Details</div>
        <Grid cols={2} gap={14}>
          <Field label="Product Name" required style={{ gridColumn: "1 / -1" }}>
            <Input
              value={product.name}
              onChange={(v) => {
                update("name", v);
                if (!product.slug) update("slug", autoSlug(v));
              }}
              placeholder="e.g. WinterX Fleece Hoodie"
            />
          </Field>
          <Field label="Slug" required hint="Auto-generated from name">
            <Input value={product.slug} onChange={(v) => update("slug", v)} placeholder="winterx-fleece-hoodie" />
          </Field>
          <Field label="Brand">
            <Input value={product.brand} onChange={(v) => update("brand", v)} />
          </Field>
          <Field label="Category" required>
            <Select value={product.category} onChange={(v) => update("category", v)}>
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Sub-category" required>
            <Input value={product.subCategory} onChange={(v) => update("subCategory", v)} placeholder="Hoodies, Jackets…" />
          </Field>
          <Field label="Product Type" required>
            <Input value={product.productType} onChange={(v) => update("productType", v)} placeholder="Fleece, Down, Thermal…" />
          </Field>
          <Field label="Collection" required style={{ gridColumn: "1 / -1" }}>
            <Input value={product.collection} onChange={(v) => update("collection", v)} placeholder="Arctic Series 2025" />
          </Field>
        </Grid>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>📝 Description</div>
        <Field label="Short Description" required style={{ marginBottom: "12px" }}>
          <Textarea value={product.description.short} onChange={(v) => update("description.short", v)} rows={2} placeholder="One-liner for listings" />
        </Field>
        <Field label="Long Description">
          <Textarea value={product.description.long} onChange={(v) => update("description.long", v)} rows={4} placeholder="Full product details, care instructions…" />
        </Field>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>🖼️ Product Images</div>
        <ImageUpload
          images={product.image}
          onChange={(files) => update("image", files)}
        />
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>🏷️ Tags & Flags</div>
        <Field label="Tags" style={{ marginBottom: "14px" }}>
          <TagsInput
            tags={product.tags}
            onAdd={(v) => update("tags", [...product.tags, v])}
            onRemove={(i) => update("tags", product.tags.filter((_, idx) => idx !== i))}
            placeholder="Add tag + Enter"
          />
        </Field>
        <Toggle checked={product.bestseller} onChange={(v) => update("bestseller", v)} label="Bestseller" />
        <Toggle checked={product.featured} onChange={(v) => update("featured", v)} label="Featured" />
        <Toggle checked={product.newArrival} onChange={(v) => update("newArrival", v)} label="New Arrival" />
        <Toggle checked={product.isActive} onChange={(v) => update("isActive", v)} label="Active" sub="Show on storefront" />
      </div>
    </>
  );
}

function VariantCard({ variant, index, onChange, onRemove }) {
  const update = (key, val) => onChange({ ...variant, [key]: val });
  return (
    <div style={{
      border: `1px solid ${T.border}`,
      borderRadius: "10px",
      padding: "14px",
      marginBottom: "10px",
      background: T.surface,
      position: "relative",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          background: T.accentLight,
          color: T.primary,
          padding: "3px 10px",
          borderRadius: "5px",
          letterSpacing: "0.5px",
          border: `1px solid ${T.accentMid}`,
        }}>
          VARIANT #{index + 1}
        </span>
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: T.textLight, fontSize: "18px", lineHeight: 1, padding: "2px 6px", borderRadius: "4px" }}>×</button>
      </div>
      <Grid cols={3} gap={10}>
        <Field label="Variant ID" required><Input value={variant.variantId} onChange={(v) => update("variantId", v)} placeholder="v-001-red-m" /></Field>
        <Field label="SKU" required><Input value={variant.sku} onChange={(v) => update("sku", v)} placeholder="WX-HOD-R-M" /></Field>
        <Field label="Stock"><Input type="number" value={variant.stock} onChange={(v) => update("stock", Number(v))} min="0" /></Field>
      </Grid>
      <Grid cols={3} gap={10} style={{ marginTop: "10px" }}>
        <Field label="Color">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "7px", background: variant.colorHex, border: `1px solid ${T.border}`, cursor: "pointer", flexShrink: 0 }} />
              <input type="color" value={variant.colorHex} onChange={(e) => update("colorHex", e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
            </div>
            <input value={variant.color} onChange={(e) => update("color", e.target.value)} placeholder="Forest Blue" style={{ ...styles.input, flex: 1 }} />
          </div>
        </Field>
        <Field label="Size" required>
          <Select value={variant.size} onChange={(v) => update("size", v)}>{SIZES.map((s) => <option key={s}>{s}</option>)}</Select>
        </Field>
        <Field label="Price Adjustment (₹)">
          <Input type="number" value={variant.priceAdjustment} onChange={(v) => update("priceAdjustment", Number(v))} />
        </Field>
      </Grid>
      <Field label="Variant Image URLs" hint="Press Enter after each URL" style={{ marginTop: "10px" }}>
        <TagsInput tags={variant.image} onAdd={(v) => update("image", [...variant.image, v])} onRemove={(i) => update("image", variant.image.filter((_, idx) => idx !== i))} placeholder="Paste image URL + Enter" />
      </Field>
    </div>
  );
}

function VariantsTab({ product, update }) {
  const updateVariant = (idx, v) => { const u = [...product.variants]; u[idx] = v; update("variants", u); };
  const removeVariant = (idx) => update("variants", product.variants.filter((_, i) => i !== idx));
  const addVariant = () => update("variants", [...product.variants, initialVariant()]);

  return (
    <>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>🎨 Product Variants</div>
        {product.variants.map((v, i) => (
          <VariantCard key={v.id} variant={v} index={i} onChange={(nv) => updateVariant(i, nv)} onRemove={() => removeVariant(i)} />
        ))}
        <button onClick={addVariant} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          width: "100%", padding: "10px", background: T.accentLight, color: T.primary,
          border: `1px dashed ${T.accent}`, borderRadius: "8px", cursor: "pointer",
          fontSize: "13px", fontWeight: 600, fontFamily: "inherit",
        }}>
          + Add Variant
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>🧵 Attributes</div>
        <Grid cols={2} gap={12}>
          <Field label="Material"><Input value={product.attributes.material} onChange={(v) => update("attributes.material", v)} /></Field>
          <Field label="Fit"><Input value={product.attributes.fit} onChange={(v) => update("attributes.fit", v)} /></Field>
          <Field label="Neckline"><Input value={product.attributes.neckline} onChange={(v) => update("attributes.neckline", v)} placeholder="Crew, V-neck…" /></Field>
          <Field label="Sleeve"><Input value={product.attributes.sleeve} onChange={(v) => update("attributes.sleeve", v)} placeholder="Full, Half…" /></Field>
          <Field label="Fabric Weight (GSM)"><Input value={product.attributes.fabricWeight} onChange={(v) => update("attributes.fabricWeight", v)} /></Field>
          <Field label="Stretchable"><div style={{ paddingTop: "6px" }}><Toggle checked={product.attributes.stretchable} onChange={(v) => update("attributes.stretchable", v)} label="" /></div></Field>
        </Grid>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>📏 Size Guide</div>
        <Grid cols={3} gap={12}>
          <Field label="Model Height"><Input value={product.sizeGuide.modelHeight} onChange={(v) => update("sizeGuide.modelHeight", v)} /></Field>
          <Field label="Model Size">
            <Select value={product.sizeGuide.modelSize} onChange={(v) => update("sizeGuide.modelSize", v)}>{SIZES.map((s) => <option key={s}>{s}</option>)}</Select>
          </Field>
          <Field label="Fit Advice"><Input value={product.sizeGuide.fitAdvice} onChange={(v) => update("sizeGuide.fitAdvice", v)} /></Field>
        </Grid>
      </div>
    </>
  );
}

function PricingTab({ product, update }) {
  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>💰 Pricing</div>
      <Grid cols={2} gap={14}>
        <Field label="MRP" required><Input type="number" value={product.pricing.mrp} onChange={(v) => update("pricing.mrp", v)} placeholder="1999" min="0" /></Field>
        <Field label="Selling Price"><Input type="number" value={product.pricing.sellingPrice} onChange={(v) => update("pricing.sellingPrice", v)} placeholder="1499" min="0" /></Field>
        <Field label="Discount %"><Input type="number" value={product.pricing.discountPercentage} onChange={(v) => update("pricing.discountPercentage", Number(v))} min="0" max="100" /></Field>
        <Field label="Currency">
          <Select value={product.pricing.currency} onChange={(v) => update("pricing.currency", v)}>
            {CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </Field>
        <Field label="GST %"><Input type="number" value={product.pricing.gstPercentage} onChange={(v) => update("pricing.gstPercentage", Number(v))} min="0" max="100" /></Field>
      </Grid>
      <div style={{ marginTop: "4px" }}>
        <Toggle checked={product.pricing.taxIncluded} onChange={(v) => update("pricing.taxIncluded", v)} label="Tax Included in Price" sub="GST is already part of the listed price" />
      </div>
    </div>
  );
}

function SpecsTab({ product, update }) {
  return (
    <>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>❄️ Winter Specs</div>
        <Grid cols={2} gap={12}>
          <Field label="Temperature Rating"><Input value={product.winterSpecs.temperature_rating} onChange={(v) => update("winterSpecs.temperature_rating", v)} /></Field>
          <Field label="Insulation Level">
            <Select value={product.winterSpecs.insulationLevel} onChange={(v) => update("winterSpecs.insulationLevel", v)}>
              {INSULATION_LEVELS.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </Field>
        </Grid>
        <Toggle checked={product.winterSpecs.layeringFriendly} onChange={(v) => update("winterSpecs.layeringFriendly", v)} label="Layering Friendly" sub="Can be worn under outer layers" />
      </div>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>↩️ Return Policy</div>
        <Grid cols={2} gap={12}>
          <Field label="Return Window (days)"><Input type="number" value={product.returnPolicy.returnDays} onChange={(v) => update("returnPolicy.returnDays", Number(v))} min="0" /></Field>
        </Grid>
        <Toggle checked={product.returnPolicy.returnable} onChange={(v) => update("returnPolicy.returnable", v)} label="Returnable" />
        <Toggle checked={product.returnPolicy.exchangeAllowed} onChange={(v) => update("returnPolicy.exchangeAllowed", v)} label="Exchange Allowed" />
      </div>
    </>
  );
}

function ShippingTab({ product, update }) {
  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>🚚 Shipping Details</div>
      <Grid cols={2} gap={14}>
        <Field label="Weight"><Input value={product.shipping.weightInGrams} onChange={(v) => update("shipping.weightInGrams", v)} /></Field>
        <Field label="Dimensions"><Input value={product.shipping.dimensions} onChange={(v) => update("shipping.dimensions", v)} /></Field>
        <Field label="Estimated Delivery (days)"><Input type="number" value={product.shipping.estimatedDeliveryDays} onChange={(v) => update("shipping.estimatedDeliveryDays", Number(v))} min="1" /></Field>
      </Grid>
      <Toggle checked={product.shipping.freeShipping} onChange={(v) => update("shipping.freeShipping", v)} label="Free Shipping" sub="No shipping charges for this product" />
    </div>
  );
}

function SeoTab({ product, update, onSubmit, submitState }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(buildPayload(product), null, 2);
  const copyJson = () => {
    navigator.clipboard.writeText(json).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>🔍 SEO Metadata</div>
        <Field label="SEO Title" style={{ marginBottom: "12px" }}><Input value={product.seo.title} onChange={(v) => update("seo.title", v)} /></Field>
        <Field label="SEO Description" style={{ marginBottom: "12px" }}><Textarea value={product.seo.description} onChange={(v) => update("seo.description", v)} rows={2} /></Field>
        <Field label="SEO Keywords" hint="Press Enter after each keyword">
          <TagsInput tags={product.seo.keywords} onAdd={(v) => update("seo.keywords", [...product.seo.keywords, v])} onRemove={(i) => update("seo.keywords", product.seo.keywords.filter((_, idx) => idx !== i))} placeholder="winter jacket, warm hoodie…" />
        </Field>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>📄 JSON Preview</div>
        <pre style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px",
          padding: "12px", fontSize: "11px", lineHeight: 1.6, maxHeight: "280px",
          overflowY: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all",
          color: T.text, fontFamily: "monospace",
        }}>
          {json}
        </pre>
        <button onClick={copyJson} style={{
          marginTop: "10px", width: "100%", padding: "9px",
          background: copied ? T.accentLight : T.surface,
          color: copied ? T.primary : T.textMuted,
          border: `1px solid ${T.border}`, borderRadius: "8px", cursor: "pointer",
          fontSize: "13px", fontWeight: 600, fontFamily: "inherit",
        }}>
          {copied ? "✓ Copied!" : "📋 Copy JSON"}
        </button>
      </div>

      <button onClick={onSubmit} style={{
        width: "100%", padding: "14px",
        background: submitState === "success" ? T.accent : T.primary,
        color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer",
        fontSize: "15px", fontWeight: 700, letterSpacing: "0.3px", fontFamily: "inherit",
      }}>
        {submitState === "loading" ? "Saving…" : submitState === "success" ? "✓ Saved!" : "💾 Save Product"}
      </button>
    </>
  );
}

// ─── buildPayload & buildPayloadAsFormData — unchanged from your original ─────

function buildPayload(product) {
  return {
    name: product.name,
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    brand: product.brand || "winter-x",
    description: product.description,
    pricing: {
      mrp: Number(product.pricing.mrp),
      sellingPrice: product.pricing.sellingPrice ? Number(product.pricing.sellingPrice) : undefined,
      discountPercentage: product.pricing.discountPercentage,
      currency: product.pricing.currency,
      taxIncluded: product.pricing.taxIncluded,
      gstPercentage: product.pricing.gstPercentage,
    },
    category: product.category,
    subCategory: product.subCategory,
    productType: product.productType,
    image: product.image,
    collection: product.collection,
    variants: product.variants.map(({ id, colorHex, _imgInput, ...v }) => ({ ...v, color: v.color || colorHex })),
    attributes: product.attributes,
    winterSpecs: product.winterSpecs,
    sizeGuide: product.sizeGuide,
    shipping: product.shipping,
    returnPolicy: product.returnPolicy,
    tags: product.tags,
    bestseller: product.bestseller,
    featured: product.featured,
    newArrival: product.newArrival,
    seo: product.seo,
    isActive: product.isActive,
    isDeleted: false,
    ratings: { average: 0, totalReviews: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } },
  };
}

function buildPayloadAsFormData(product) {
  const form = new FormData();
  form.append("name", product.name);
  form.append("slug", product.slug || product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  form.append("brand", product.brand || "winter-x");
  form.append("description", JSON.stringify(product.description));
  form.append("pricing", JSON.stringify(product.pricing));
  form.append("category", product.category);
  form.append("subCategory", product.subCategory);
  form.append("productType", product.productType);
  form.append("collection", product.collection);
  if (product.image?.length > 0) {
    product.image.forEach((file) => { if (file instanceof File) form.append("images", file, file.name); });
  }
  form.append("variants", JSON.stringify(product.variants));
  form.append("attributes", JSON.stringify(product.attributes));
  form.append("winterSpecs", JSON.stringify(product.winterSpecs));
  form.append("sizeGuide", JSON.stringify(product.sizeGuide));
  form.append("shipping", JSON.stringify(product.shipping));
  form.append("returnPolicy", JSON.stringify(product.returnPolicy));
  form.append("seo", JSON.stringify(product.seo));
  form.append("tags", JSON.stringify(product.tags));
  form.append("bestseller", product.bestseller);
  form.append("featured", product.featured);
  form.append("newArrival", product.newArrival);
  form.append("isActive", product.isActive);
  form.append("isDeleted", false);
  form.append("ratings", JSON.stringify({ average: 0, totalReviews: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }));
  return form;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(initialProduct);
  const [submitState, setSubmitState] = useState("idle");
  const [errors, setErrors] = useState([]);
  const { backendUrl } = useContext(adminContext);

  const update = useCallback((path, value) => {
    setProduct((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const validate = () => {
    const errs = [];
    if (!product.name || product.name.length < 5) errs.push("Product name must be at least 5 characters");
    if (!product.description.short || product.description.short.length < 10) errs.push("Short description must be at least 10 characters");
    if (!product.category) errs.push("Category is required");
    if (!product.subCategory) errs.push("Sub-category is required");
    if (!product.productType) errs.push("Product type is required");
    if (!product.collection) errs.push("Collection is required");
    if (!product.pricing.mrp) errs.push("MRP is required");
    if (product.image.length === 0) errs.push("At least one product image is required");
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (errs.length) { setErrors(errs); setActiveTab(0); return; }
    setErrors([]);
    setSubmitState("loading");
    try {
      await axios.post(backendUrl + "/api/admin/addProduct", buildPayloadAsFormData(product));
      setSubmitState("success");
      setTimeout(() => setSubmitState("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSubmitState("idle");
      setErrors(["Upload failed: " + (err.response?.data?.message || err.message)]);
    }
  };

  const tabContent = [
    <BasicTab product={product} update={update} />,
    <VariantsTab product={product} update={update} />,
    <PricingTab product={product} update={update} />,
    <SpecsTab product={product} update={update} />,
    <ShippingTab product={product} update={update} />,
    <SeoTab product={product} update={update} onSubmit={handleSubmit} submitState={submitState} />,
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.surface, fontFamily: "'DM Sans', system-ui, sans-serif", maxWidth: "100vw" }}>

      {/* Header */}
      <div style={{
        background: T.primary,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${T.primaryDark}`,
      }}>
        <div style={{
          width: "34px", height: "34px",
          background: T.accent,
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: "12px", fontWeight: 800, letterSpacing: "1px",
        }}>WX</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", lineHeight: 1.2 }}>Add New Product</div>
          <div style={{ color: T.accentMid, fontSize: "11px" }}>WinterX Admin Panel</div>
        </div>

        {/* Tab nav */}
        <div style={{ marginLeft: "auto", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {TABS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "6px 11px",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                transition: "all 0.15s",
                background: activeTab === i ? "#fff" : "rgba(255,255,255,0.08)",
                color: activeTab === i ? T.primary : "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                border: activeTab === i ? "none" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span>{t.icon}</span>
              <span style={{ display: window.innerWidth < 768 ? "none" : "inline" }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: T.accentMid }}>
        <div style={{
          height: "100%",
          width: `${((activeTab + 1) / TABS.length) * 100}%`,
          background: T.accent,
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{ maxWidth: "720px", margin: "16px auto 0", padding: "0 16px" }}>
          <div style={{ background: T.dangerBg, border: `1px solid #fca5a5`, borderRadius: "8px", padding: "12px 14px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: T.danger, marginBottom: "6px" }}>Please fix these errors:</div>
            {errors.map((e, i) => <div key={i} style={{ fontSize: "13px", color: T.danger, lineHeight: 1.6 }}>• {e}</div>)}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px 40px" }}>
        {tabContent[activeTab]}

        {/* Navigation buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          {activeTab > 0 && (
            <button
              onClick={() => setActiveTab((t) => t - 1)}
              style={{
                flex: 1, padding: "11px", background: T.white, color: T.textMuted,
                border: `1px solid ${T.border}`, borderRadius: "9px", cursor: "pointer",
                fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
              }}
            >
              ← Back
            </button>
          )}
          {activeTab < TABS.length - 1 && (
            <button
              onClick={() => setActiveTab((t) => t + 1)}
              style={{
                flex: 1, padding: "11px", background: T.primary, color: "#fff",
                border: "none", borderRadius: "9px", cursor: "pointer",
                fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
              }}
            >
              Next →
            </button>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: T.textLight }}>
          Step {activeTab + 1} of {TABS.length} — {TABS[activeTab].label}
        </div>
      </div>
    </div>
  );
}