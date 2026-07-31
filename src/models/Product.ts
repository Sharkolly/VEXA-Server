import { Schema, model } from "mongoose";

export interface IDeviceSpecifications {
  rom?: string;
  ram?: string;
  processor?: number;
  battery_health?: number;
  ibm?: string;
  idm?: string;
  icm?: string;
  sim?:
    | "Dual Physical Sim"
    | "Dual E-Sim"
    | "Dual Physical Sim + E-Sim"
    | "Single Physical Sim"
    | "Single E-Sim";
  inches?: number;
  resolution?: string;
  refresh_rate?: number;
  NFC?: boolean | null;
  wireless_charging?: boolean | null;
  fast_charging?: boolean | null;
  charging_port?: "USB-C" | "Lightning" | "Micro-USB" | "Proprietary";
  operating_system?: string;
}


export interface IProduct {
  name: string;
  slug: string;
  price: number;
  category: string;
  subCategory: string;
  tags?: string;
  description: string;
  images: string[]; 
  video?: string | null; 
  brand?: string;
  discount?: number;
  color: string;
  deviceSpecifications?: IDeviceSpecifications;
  condition:
    | "UK Used"
    | "Brand New"
    | "Open Box"
    | "Tokunbo"
    | "Refurbished"
    | "Damaged"
    | "Nigerian Used";
  size?: "" | "XS" | "S" | "M" | "L" | "XL" | "XXL";
  createdAt: Date;
  updatedAt: Date;
  vendor: string
}


const deviceSpecificationsSchema = new Schema<IDeviceSpecifications>(
  {
    rom: { type: String },
    ram: { type: String },
    processor: { type: Number },
    battery_health: { type: Number },
    ibm: { type: String, trim: true },
    idm: { type: String, trim: true },
    icm: { type: String, trim: true },
    sim: {
      type: String,
      enum: [
        "Dual Physical Sim",
        "Dual E-Sim",
        "Dual Physical Sim + E-Sim",
        "Single Physical Sim",
        "Single E-Sim",
      ],
    },
    inches: { type: Number },
    resolution: { type: String, trim: true },
    refresh_rate: { type: Number },
    NFC: { type: Boolean, default: null },
    wireless_charging: { type: Boolean, default: null },
    fast_charging: { type: Boolean, default: null },
    charging_port: {
      type: String,
      enum: ["USB-C", "Lightning", "Micro-USB", "Proprietary"],
    },
    operating_system: { type: String, trim: true },
  },
  { _id: false } 
);

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    tags: { type: String, trim: true },
    description: { type: String, required: true },
    images: { type: [String], required: true, default: [] },
    video: { type: String, default: null },
    brand: { type: String, trim: true },
    discount: { type: Number, default: 0, min: 0 },
    color: { type: String, required: false, trim: true },
    vendor: {type: String, required: true},
    deviceSpecifications: {
      type: deviceSpecificationsSchema,
      required: false,
    },
    condition: {
      type: String,
      required: true,
      enum: [
        "UK Used",
        "Brand New",
        "Open Box",
        "Tokunbo",
        "Refurbished",
        "Damaged",
        "Nigerian Used",
      ],
    },
    size: {
      type: String,
      enum: ["", "XS", "S", "M", "L", "XL", "XXL"],
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
