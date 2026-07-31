export type ProductType = {
  name: string;
  price: number;
  category: string;
  subCategory: string;
  tags?: string
  description: string;
  images: (File | string | null)[];
  video: File | string | null;
  brand?: string;
  discount?: number;
  color: string;
  deviceSpecifications?: {
    rom?: number;
    ram?: number;
    processor?: number;
    battery_health?: number;
    ibm?: string;
    idm?: string;
    icm?: string;
    sim?:
      | "Dual Physical Sim"
      | " Dual E-Sim"
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
  };
  condition:
    | "UK Used"
    | "Brand New"
    | "Open Box"
    | "Tokunbo"
    | "Refurbished"
    | "Damaged"
    | "Nigerian Used";
  size: '' | "XS" | "S" | "M" | "L" | "XL" | "XXL";
};
