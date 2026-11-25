import mongoose, { Schema, models, model } from "mongoose";

const Enquiry = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    organization: { type: String, trim: true, maxlength: 160 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    product: { type: String, trim: true, maxlength: 160 },
    location: { type: String, trim: true, maxlength: 160 },
    message: { type: String, trim: true, maxlength: 2000 },
    source: { type: String, default: "contact-form" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new", index: true },
  },
  { timestamps: true }
);

const Admin = new Schema(
  { email: { type: String, required: true, unique: true, lowercase: true, trim: true }, passwordHash: { type: String, required: true } },
  { timestamps: true }
);

// Photos uploaded from the admin dashboard; files live on the persistent volume (UPLOAD_DIR).
const GalleryItem = new Schema(
  {
    file: { type: String, required: true },
    w: { type: Number, default: 1200 },
    h: { type: Number, default: 900 },
    caption: { type: String, trim: true, maxlength: 160, default: "" },
    category: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export const EnquiryModel = models.Enquiry || model("Enquiry", Enquiry);
export const AdminModel = models.Admin || model("Admin", Admin);
export const GalleryModel = models.GalleryItem || model("GalleryItem", GalleryItem);
export type { mongoose };
