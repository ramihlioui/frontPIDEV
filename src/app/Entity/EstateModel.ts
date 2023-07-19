export type HeatmapSingleCluster = {
  count: number;
  lat: number;
  lng: number;
  cluster: number;
};
export type HeatmapClusters = Array<HeatmapSingleCluster>;

export type EstateDetails = {
  id: number;
  nbRoom: number;
  floors: number;
  built_at: Date;
};

export type EstateLocation = {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
};

export type Estate = {
  id: number;
  name: string;
  area: number;
  price: number;
  description: string;
  createdAt: Date;
  details: EstateDetails;
  location: EstateLocation;
};
