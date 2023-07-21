import { AfterViewInit, Component } from "@angular/core";
import * as L from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
import { EstateService } from "src/app/services/estate.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements AfterViewInit {
  constructor(private estateService: EstateService) {}

  private map: L.Map;

  private initMap() {
    if (this.map) return;
    this.map = L.map("map").setView([37.3101063519868, 9.855422973632814], 9);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // L.marker([51.5, -0.09])
    //   .setIcon(
    //     L.icon({
    //       iconUrl:
    //         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    //       shadowUrl:
    //         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    //     })
    //   )
    //   .addTo(this.map)
    //   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    //   .openPopup();
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.map.whenReady(this.addHeatMapLayer)
    //@ts-ignore
    this.map.whenReady(async (map) => {
      const heatmapPoints = await this.estateService.getHeatmap();
      (L as any).heatLayer(
        heatmapPoints.map(e=>[e.lat,e.lng,e.count*100])
      )
      //@ts-ignore
      .addTo(map.target);
    });
    // const HML = this.addHeatMapLayer()
    // console.log(HML);
  }
}
