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
  customer_name: string;
  customer_address: string;
  customer_city?: string;
  customer_email: string;
  phone_number: string;
  createDate: string;
  status: StatusType;
  price?: string;
  userId: number;
  pcs: Article[];
  customPcs: Article[];
}

export interface OfferItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  // Add other properties if needed
}

export type StatusType = "pending" | "done" | "rejected";

export interface Article {
  id: number;
  name: string;
  processor: Processor;
  motherboard: Motherboard;
  graphicsCard: GraphicsCard;
  memory: Memory;
  storage: Storage;
  caseEntity: Case;
  powerSupply: PowerSupply;
  price: number;
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

export interface DashboardData {
  totalOffers: number;
  offersDone: number;
  offersPending: number;
  offersRejected: number;
  lastOffers: Offer[];
}
