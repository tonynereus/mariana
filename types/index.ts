export type VotesType = {
  count: number;
  value: number;
};

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[];
};

export type ReviewType = {
  name: string;
  rating: number;
  review: string;
};

export type ProductType = {
  image: any;
  colors: any;
  returnPolicy: string;
  rating: string;
  description: string;
  quantity?: number;
  photo: string;
  amount: any;
  title: any;
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  images: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
};

export type ProductTypeList = {
  id: string;
  name: string;
  price: string;
  color: string;
  images: string[];
  discount?: string;
  currentPrice?: number;
};

export type ProductStoreType = {
  id: string | number;
  cartId: number | 0;
  productId?: number;
  quantity: number;
  photo: string;
  name: string;
  price: number;
  count: number;
  color: string;
  size: string;
  addGift?: any;
  thumb?: any;
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
