export interface UserModelType extends Document {
  username?: string;
  email: string;
  password: string;
  avatar: string;
  _doc?: any;
}

export interface ListingModelType extends Document {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: ArrayConstructor;
  userRef: string;
  _doc?: any;
}
