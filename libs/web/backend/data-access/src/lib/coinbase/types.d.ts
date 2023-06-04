export interface PriceSellResponse {
  data: Data;
}

export interface Data {
  amount: string;
  base: string;
  currency: string;
}
