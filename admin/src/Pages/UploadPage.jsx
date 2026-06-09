import { useState, useCallback, useContext } from "react";
import { adminContext } from "../context/AdminContext";
import axios from "axios";

// ─── Constants ────────────────────────────────────────────────────────────────
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
  colorHex: "#1a3a2a",
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

// ─── Shared UI Components ─────────────────────────────────────────────────────

const styles = {
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    fontSize: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "9px 12px",
    fontSize: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%236b7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
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
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    outline: "none",
    resize: "vertical",
    lineHeight: 1.6,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.7px",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

function Field({ label, required, children, hint, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}
      {children}
      {hint && <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{hint}</span>}
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
        borderColor: focused ? "#1a3a2a" : "#e5e7eb",
        boxShadow: focused ? "0 0 0 3px rgba(26,58,42,0.08)" : "none",
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
        borderColor: focused ? "#1a3a2a" : "#e5e7eb",
        boxShadow: focused ? "0 0 0 3px rgba(26,58,42,0.08)" : "none",
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
        borderColor: focused ? "#1a3a2a" : "#e5e7eb",
        boxShadow: focused ? "0 0 0 3px rgba(26,58,42,0.08)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}

function Toggle({ checked, onChange, label, sub }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div>
        <div style={{ fontSize: "14px", color: "#111", fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "1px" }}>{sub}</div>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: "40px",
          height: "22px",
          borderRadius: "11px",
          background: checked ? "#1a3a2a" : "#d1d5db",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: "3px",
            left: checked ? "21px" : "3px",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
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
    if (e.key === "Backspace" && !input && tags.length) {
      onRemove(tags.length - 1);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        padding: "8px 10px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        minHeight: "42px",
        cursor: "text",
        background: "#fff",
        alignItems: "center",
      }}
      onClick={(e) => e.currentTarget.querySelector("input").focus()}
    >
      {tags.map((t, i) => (
        <span
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "#e8f4ee",
            color: "#1a3a2a",
            padding: "3px 8px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {t}
          <button
            onClick={() => onRemove(i)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1a3a2a", fontSize: "14px", lineHeight: 1, padding: 0 }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder={tags.length ? "" : placeholder}
        style={{ border: "none", outline: "none", fontSize: "13px", flex: 1, minWidth: "80px", background: "transparent", color: "#111" }}
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

// ─── Tab Pages ────────────────────────────────────────────────────────────────

function BasicTab({ product, update }) {
  const autoSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;

    setPreviews(selected.map((f) => URL.createObjectURL(f)));

    const existing = Array.isArray(product.image) ? product.image : [];
    update("image", [...existing, ...selected]);
  };

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
            <Input
              value={product.slug}
              onChange={(v) => update("slug", v)}
              placeholder="winterx-fleece-hoodie"
            />
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
            <Input
              value={product.subCategory}
              onChange={(v) => update("subCategory", v)}
              placeholder="Hoodies, Jackets…"
              maxLength={20}
            />
          </Field>
          <Field label="Product Type" required>
            <Input
              value={product.productType}
              onChange={(v) => update("productType", v)}
              placeholder="Fleece, Down, Thermal…"
            />
          </Field>
          <Field label="Collection" required style={{ gridColumn: "1 / -1" }}>
            <Input
              value={product.collection}
              onChange={(v) => update("collection", v)}
              placeholder="Arctic Series 2025"
            />
          </Field>
        </Grid>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>📝 Description</div>
        <Field label="Short Description" required style={{ marginBottom: "12px" }}>
          <Textarea
            value={product.description.short}
            onChange={(v) => update("description.short", v)}
            rows={2}
            placeholder="One-liner for listings (min 10 chars)"
          />
        </Field>
        <Field label="Long Description">
          <Textarea
            value={product.description.long}
            onChange={(v) => update("description.long", v)}
            rows={4}
            placeholder="Full product details, care instructions, fabric story…"
          />
        </Field>
      </div>

      {/* Product Images */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>🖼️ Product Images</div>
        <label htmlFor="images" style={styles.label}>
          Images
        </label>

        {/* Preview images */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          {previews.length === 0 ? (
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>
              No images selected yet
            </div>
          ) : (
            previews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview ${index}`}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))
          )}
        </div>

        {/* File input */}
        <input
          type="file"
          name="files"
          id="images"
          multiple
          accept="image/*"
          onChange={handleChange}
          style={{ display: "block" }}
        />
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>🏷️ Tags & Flags</div>
        <Field label="Tags" style={{ marginBottom: "14px" }}>
          <TagsInput
            tags={product.tags}
            onAdd={(v) => update("tags", [...product.tags, v])}
            onRemove={(i) =>
              update("tags", product.tags.filter((_, idx) => idx !== i))
            }
            placeholder="Add tag + Enter"
          />
        </Field>
        <Toggle
          checked={product.bestseller}
          onChange={(v) => update("bestseller", v)}
          label="Bestseller"
        />
        <Toggle
          checked={product.featured}
          onChange={(v) => update("featured", v)}
          label="Featured"
        />
        <Toggle
          checked={product.newArrival}
          onChange={(v) => update("newArrival", v)}
          label="New Arrival"
        />
        <div style={{ borderBottom: "none" }}>
          <Toggle
            checked={product.isActive}
            onChange={(v) => update("isActive", v)}
            label="Active"
            sub="Show on storefront"
          />
        </div>
      </div>
    </>
  );
}

function VariantCard({ variant, index, onChange, onRemove }) {
  const update = (key, val) => onChange({ ...variant, [key]: val });

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "14px",
        marginBottom: "10px",
        background: "#fafafa",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            background: "#e8f4ee",
            color: "#1a3a2a",
            padding: "3px 10px",
            borderRadius: "5px",
            letterSpacing: "0.5px",
          }}
        >
          VARIANT #{index + 1}
        </span>
        <button
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9ca3af",
            fontSize: "18px",
            lineHeight: 1,
            padding: "2px 6px",
            borderRadius: "4px",
            transition: "color 0.15s",
          }}
          title="Remove variant"
        >
          ×
        </button>
      </div>

      <Grid cols={3} gap={10}>
        <Field label="Variant ID" required>
          <Input value={variant.variantId} onChange={(v) => update("variantId", v)} placeholder="v-001-red-m" />
        </Field>
        <Field label="SKU" required>
          <Input value={variant.sku} onChange={(v) => update("sku", v)} placeholder="WX-HOD-R-M" />
        </Field>
        <Field label="Stock">
          <Input type="number" value={variant.stock} onChange={(v) => update("stock", Number(v))} min="0" />
        </Field>
      </Grid>

      <Grid cols={3} gap={10} style={{ marginTop: "10px" }}>
        <Field label="Color">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "7px",
                  background: variant.colorHex,
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <input
                type="color"
                value={variant.colorHex}
                onChange={(e) => update("colorHex", e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
              />
            </div>
            <input
              value={variant.color}
              onChange={(e) => update("color", e.target.value)}
              placeholder="Forest Green"
              style={{ ...styles.input, flex: 1 }}
            />
          </div>
        </Field>
        <Field label="Size" required>
          <Select value={variant.size} onChange={(v) => update("size", v)}>
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Price Adjustment (₹)">
          <Input type="number" value={variant.priceAdjustment} onChange={(v) => update("priceAdjustment", Number(v))} />
        </Field>
      </Grid>

      <Field label="Variant Image URLs" hint="Press Enter after each URL" style={{ marginTop: "10px" }}>
        <TagsInput
          tags={variant.image}
          onAdd={(v) => update("image", [...variant.image, v])}
          onRemove={(i) => update("image", variant.image.filter((_, idx) => idx !== i))}
          placeholder="Paste image URL + Enter"
        />
      </Field>
    </div>
  );
}

function VariantsTab({ product, update }) {
  const updateVariant = (idx, v) => {
    const updated = [...product.variants];
    updated[idx] = v;
    update("variants", updated);
  };
  const removeVariant = (idx) => update("variants", product.variants.filter((_, i) => i !== idx));
  const addVariant = () => update("variants", [...product.variants, initialVariant()]);

  return (
    <>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>🎨 Product Variants</div>
        {product.variants.map((v, i) => (
          <VariantCard key={v.id} variant={v} index={i} onChange={(nv) => updateVariant(i, nv)} onRemove={() => removeVariant(i)} />
        ))}
        <button
          onClick={addVariant}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "10px",
            background: "#e8f4ee",
            color: "#1a3a2a",
            border: "1px dashed #2d7a4f",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            transition: "background 0.15s",
            fontFamily: "inherit",
          }}
        >
          + Add Variant
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>🧵 Attributes</div>
        <Grid cols={2} gap={12}>
          <Field label="Material">
            <Input value={product.attributes.material} onChange={(v) => update("attributes.material", v)} />
          </Field>
          <Field label="Fit">
            <Input value={product.attributes.fit} onChange={(v) => update("attributes.fit", v)} />
          </Field>
          <Field label="Neckline">
            <Input value={product.attributes.neckline} onChange={(v) => update("attributes.neckline", v)} placeholder="Crew, V-neck…" />
          </Field>
          <Field label="Sleeve">
            <Input value={product.attributes.sleeve} onChange={(v) => update("attributes.sleeve", v)} placeholder="Full, Half, Sleeveless…" />
          </Field>
          <Field label="Fabric Weight (GSM)">
            <Input value={product.attributes.fabricWeight} onChange={(v) => update("attributes.fabricWeight", v)} />
          </Field>
          <Field label="Stretchable">
            <div style={{ paddingTop: "6px" }}>
              <Toggle checked={product.attributes.stretchable} onChange={(v) => update("attributes.stretchable", v)} label="" />
            </div>
          </Field>
        </Grid>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>📏 Size Guide</div>
        <Grid cols={3} gap={12}>
          <Field label="Model Height">
            <Input value={product.sizeGuide.modelHeight} onChange={(v) => update("sizeGuide.modelHeight", v)} />
          </Field>
          <Field label="Model Size">
            <Select value={product.sizeGuide.modelSize} onChange={(v) => update("sizeGuide.modelSize", v)}>
              {SIZES.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </Field>
          <Field label="Fit Advice">
            <Input value={product.sizeGuide.fitAdvice} onChange={(v) => update("sizeGuide.fitAdvice", v)} />
          </Field>
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
        <Field label="MRP" required>
          <Input type="number" value={product.pricing.mrp} onChange={(v) => update("pricing.mrp", v)} placeholder="1999" min="0" />
        </Field>
        <Field label="Selling Price">
          <Input type="number" value={product.pricing.sellingPrice} onChange={(v) => update("pricing.sellingPrice", v)} placeholder="1499" min="0" />
        </Field>
        <Field label="Discount %">
          <Input type="number" value={product.pricing.discountPercentage} onChange={(v) => update("pricing.discountPercentage", Number(v))} min="0" max="100" />
        </Field>
        <Field label="Currency">
          <Select value={product.pricing.currency} onChange={(v) => update("pricing.currency", v)}>
            {CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </Field>
        <Field label="GST %">
          <Input type="number" value={product.pricing.gstPercentage} onChange={(v) => update("pricing.gstPercentage", Number(v))} min="0" max="100" />
        </Field>
      </Grid>
      <div style={{ marginTop: "4px" }}>
        <Toggle
          checked={product.pricing.taxIncluded}
          onChange={(v) => update("pricing.taxIncluded", v)}
          label="Tax Included in Price"
          sub="GST is already part of the listed price"
        />
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
          <Field label="Temperature Rating">
            <Input value={product.winterSpecs.temperature_rating} onChange={(v) => update("winterSpecs.temperature_rating", v)} />
          </Field>
          <Field label="Insulation Level">
            <Select value={product.winterSpecs.insulationLevel} onChange={(v) => update("winterSpecs.insulationLevel", v)}>
              {INSULATION_LEVELS.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </Field>
        </Grid>
        <Toggle
          checked={product.winterSpecs.layeringFriendly}
          onChange={(v) => update("winterSpecs.layeringFriendly", v)}
          label="Layering Friendly"
          sub="Can be worn under outer layers"
        />
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>↩️ Return Policy</div>
        <Grid cols={2} gap={12}>
          <Field label="Return Window (days)">
            <Input type="number" value={product.returnPolicy.returnDays} onChange={(v) => update("returnPolicy.returnDays", Number(v))} min="0" />
          </Field>
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
        <Field label="Weight">
          <Input value={product.shipping.weightInGrams} onChange={(v) => update("shipping.weightInGrams", v)} />
        </Field>
        <Field label="Dimensions">
          <Input value={product.shipping.dimensions} onChange={(v) => update("shipping.dimensions", v)} />
        </Field>
        <Field label="Estimated Delivery (days)">
          <Input type="number" value={product.shipping.estimatedDeliveryDays} onChange={(v) => update("shipping.estimatedDeliveryDays", Number(v))} min="1" />
        </Field>
      </Grid>
      <Toggle
        checked={product.shipping.freeShipping}
        onChange={(v) => update("shipping.freeShipping", v)}
        label="Free Shipping"
        sub="No shipping charges for this product"
      />
    </div>
  );
}

function SeoTab({ product, update, onSubmit, submitState }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(buildPayload(product), null, 2);

  const copyJson = () => {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>🔍 SEO Metadata</div>
        <Field label="SEO Title" style={{ marginBottom: "12px" }}>
          <Input value={product.seo.title} onChange={(v) => update("seo.title", v)} />
        </Field>
        <Field label="SEO Description" style={{ marginBottom: "12px" }}>
          <Textarea value={product.seo.description} onChange={(v) => update("seo.description", v)} rows={2} />
        </Field>
        <Field label="SEO Keywords" hint="Press Enter after each keyword">
          <TagsInput
            tags={product.seo.keywords}
            onAdd={(v) => update("seo.keywords", [...product.seo.keywords, v])}
            onRemove={(i) => update("seo.keywords", product.seo.keywords.filter((_, idx) => idx !== i))}
            placeholder="winter jacket, warm hoodie…"
          />
        </Field>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>📄 JSON Preview</div>
        <pre
          style={{
            background: "#f9fafb",
            border: "1px solid #f3f4f6",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "11px",
            lineHeight: 1.6,
            maxHeight: "280px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            color: "#374151",
            fontFamily: "monospace",
          }}
        >
          {json}
        </pre>
        <button
          onClick={copyJson}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "9px",
            background: copied ? "#e8f4ee" : "#f9fafb",
            color: copied ? "#1a3a2a" : "#374151",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all 0.15s",
            fontFamily: "inherit",
          }}
        >
          {copied ? "✓ Copied!" : "📋 Copy JSON"}
        </button>
      </div>

      <button
        onClick={onSubmit}
        style={{
          width: "100%",
          padding: "14px",
          background: submitState === "success" ? "#2d7a4f" : "#1a3a2a",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.3px",
          transition: "background 0.2s",
          fontFamily: "inherit",
        }}
      >
        {submitState === "loading" ? "Saving…" : submitState === "success" ? "✓ Saved!" : "💾 Save Product"}
      </button>
    </>
  );
}

// ─── Build Payload ────────────────────────────────────────────────────────────

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

  form.append('name', product.name);
  form.append(
    'slug',
    product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  );
  form.append('brand', product.brand || 'winter-x');
  form.append('description', JSON.stringify(product.description));
  form.append('pricing', JSON.stringify(product.pricing));
  form.append('category', product.category);
  form.append('subCategory', product.subCategory);
  form.append('productType', product.productType);
  form.append('collection', product.collection);

  // Images — append each File with the same key, multer picks them up via upload.array('images')
  if (product.image && product.image.length > 0) {
    product.image.forEach((file) => {
      if (file instanceof File) {
        form.append('images', file, file.name);
      }
    });
  }

  form.append('variants', JSON.stringify(product.variants));
  form.append('attributes', JSON.stringify(product.attributes));
  form.append('winterSpecs', JSON.stringify(product.winterSpecs));
  form.append('sizeGuide', JSON.stringify(product.sizeGuide));
  form.append('shipping', JSON.stringify(product.shipping));
  form.append('returnPolicy', JSON.stringify(product.returnPolicy));
  form.append('seo', JSON.stringify(product.seo));
  form.append('tags', JSON.stringify(product.tags));
  form.append('bestseller', product.bestseller);
  form.append('featured', product.featured);
  form.append('newArrival', product.newArrival);
  form.append('isActive', product.isActive);
  form.append('isDeleted', false);
  form.append('ratings', JSON.stringify(product.ratings || {
    average: 0,
    totalReviews: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  }));

  return form;
}

  // ─── Main Component ───────────────────────────────────────────────────────────

  export default function UploadPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [product, setProduct] = useState(initialProduct);
    const [submitState, setSubmitState] = useState("idle");
    const [errors, setErrors] = useState([]);
    const {backendUrl} = useContext(adminContext);
    
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
  if (errs.length) {
    setErrors(errs);
    setActiveTab(0);
    return;
  }


  product.image.forEach((item, i) => {
  console.log(`image[${i}]:`, typeof item, item instanceof File ? item.name : item.substring?.(0, 30));
});

  setErrors([]);
  setSubmitState("loading");

  const formPayload = buildPayloadAsFormData(product);

  try {
    await axios.post(backendUrl + "/api/admin/addProduct", formPayload);
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
      <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'DM Sans', system-ui, sans-serif" , maxWidth:"100vw" }}>
      {/* Header */}
      <div style={{ background: "#1a3a2a", padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ width: "34px", height: "34px", background: "#2d7a4f", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>WX</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", lineHeight: 1.2 }}>Add New Product</div>
          <div style={{ color: "#6dbc8e", fontSize: "11px" }}>WinterX Admin Panel</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          {TABS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "6px 12px",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                transition: "all 0.15s",
                background: activeTab === i ? "#fff" : "transparent",
                color: activeTab === i ? "#1a3a2a" : "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span>{t.icon}</span>
              <span style={{ display: window.innerWidth < 768 ? "none" : "inline" }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "#e5e7eb" }}>
        <div style={{ height: "100%", width: `${((activeTab + 1) / TABS.length) * 100}%`, background: "#2d7a4f", transition: "width 0.3s ease" }} />
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{ maxWidth: "720px", margin: "16px auto 0", padding: "0 16px" }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px 14px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626", marginBottom: "6px" }}>Please fix these errors:</div>
            {errors.map((e, i) => <div key={i} style={{ fontSize: "13px", color: "#dc2626", lineHeight: 1.6 }}>• {e}</div>)}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px 40px" }}>
        {tabContent[activeTab]}

        {/* Navigation */}
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          {activeTab > 0 && (
            <button
              onClick={() => setActiveTab((t) => t - 1)}
              style={{ flex: 1, padding: "11px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "9px", cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "inherit" }}
            >
              ← Back
            </button>
          )}
          {activeTab < TABS.length - 1 && (
            <button
              onClick={() => setActiveTab((t) => t + 1)}
              style={{ flex: 1, padding: "11px", background: "#1a3a2a", color: "#fff", border: "none", borderRadius: "9px", cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "inherit" }}
            >
              Next →
            </button>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "#9ca3af" }}>
          Step {activeTab + 1} of {TABS.length} — {TABS[activeTab].label}
        </div>
      </div>
    </div>
  );
}

