import { Injectable } from "@angular/core";
import { Estate, HeatmapClusters } from "../Entity/EstateModel";
import { axios } from "../utils/axios";

@Injectable({
  providedIn: "root",
})
export class EstateService {
  constructor() {}
  async getHeatmap(): Promise<HeatmapClusters> {
    try {
      const { data } = await axios.get(`/estates/heatmap`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async searchBy(
    {
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      minNbRoom,
      maxNbRoom,
      minFloor,
      maxFloor,
    }: Record<string, number>,
    page: number
  ): Promise<Array<Estate>> {
    try {
      const { data } = await axios.post(
        "/estates/search",
        {
          minArea,
          maxArea,
          minPrice,
          maxPrice,
          minNbRoom,
          maxNbRoom,
          minFloor,
          maxFloor,
        },
        {
          params: {
            page: page ?? 0,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async searchOnMap({
    minLat,
    maxLat,
    minLong,
    maxLong,
  }): Promise<Array<Estate>> {
    try {
      const { data } = await axios.post("/estates/map-search", {
        minLat,
        maxLat,
        minLong,
        maxLong,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async createEstate(data: any): Promise<Estate> {
    const estate: Estate = await axios.post("/estates/", data);
    return estate
  }
}
