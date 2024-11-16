export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  enabled: boolean;
  phoneNumber?: string;
  image?: string;
}

export interface Session {
  userID: number;
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  deviceId: string;
  deviceName: string;
  loginDate: string;
  expire: string;
  refreshExpire: string;
}

export interface Offer {
  id: number;
  create_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  place?: Place;
  status: StatusType;
  total: number;

  // Additional properties
  description?: string;
  items?: OfferItem[];
  // Add other properties as needed
}

export interface OfferItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  // Add other properties if needed
}

export type StatusType = "pending" | "done" | "rejected";

export interface Place {
  place_name?: string;
  // Add other properties if needed
}

// src/types/index.ts

// Article Interface
export interface Article {
  id?: number | null;
  name: string;
  processorId?: number | null;
  motherboardId?: number | null;
  graphicsCardId?: number | null;
  memoryId?: number | null;
  storageId?: number | null;
  caseId?: number | null;
  powerSupplyId?: number | null;
  offerIds: number[];
}

// Case Interface
export interface Case {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
}

// GraphicsCard Interface
export interface GraphicsCard {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
}

// Memory Interface
export interface Memory {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
  capacity: number;
}

// MotherboardDTO Interface
export interface Motherboard {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
  socket: string;
}

// PowerSupplyDTO Interface
export interface PowerSupply {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
}

// ProcessorDTO Interface
export interface Processor {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
  cores: number;
  clockSpeed: number;
  socket: string;
}

// StorageDTO Interface
export interface Storage {
  id?: number | null;
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
  capacity: number;
}

export interface FormParams {
  processors: Processor[];
  motherboards: Motherboard[];
  graphicsCards: GraphicsCard[];
  memories: Memory[];
  storages: Storage[];
  cases: Case[];
  powerSupplys: PowerSupply[];
}

export interface AuthState {
  isLoading: boolean;
  user: User | null;
  accessToken: string;
  refreshToken: string;
  expire: string; // ISO string or Date
  refresh_expire: string; // ISO string or Date
}
