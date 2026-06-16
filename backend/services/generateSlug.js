import slugify from "slugify";


export const generateSlug = (name, uniqueSuffix = true) => {
    const base = slugify(name, { lower: true, strict: true, trim: true });
    return uniqueSuffix ? `${base}-${Date.now()}` : base;
};