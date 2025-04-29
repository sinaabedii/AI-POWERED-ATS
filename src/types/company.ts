export interface Benefit {
  id: string;
  title: string;
  icon: string;
}

export interface Company {
  name: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
  benefits: Benefit[];
  photos: string[];
}