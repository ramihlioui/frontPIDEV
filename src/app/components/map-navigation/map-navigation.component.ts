import { AfterViewInit, Component } from "@angular/core";
import * as L from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
import { Estate } from "src/app/Entity/EstateModel";
import { EstateService } from "src/app/services/estate.service";

@Component({
  selector: "app-map",
  templateUrl: "./map-navigation.component.html",
  styleUrls: ["./map-navigation.component.css"],
})
export class MapNavigationComponent implements AfterViewInit {
  public adding: boolean = false;
  public searching = false;
  public creating = false;

  private currentBounds = { minLat: 0, maxLat: 0, minLong: 0, maxLong: 0 };

  public estates: Estate[] = [];
  public markers: L.Marker[] = [];
  public addingForm = {
    name: "",
    description: "",
    price: 0,
    area: 0,
    details: {
      nbRoom: 0,
      floors: 0,
      built_at: new Date(),
    },
    location: {
      latitude: 0,
      longitude: 0,
    },
  };

  constructor(private estateService: EstateService) {}

  private map: L.Map;

  public setBounds() {
    const data = this.map.getBounds();
    this.currentBounds = {
      minLat: data.getSouthWest().lat,
      maxLat: data.getNorthEast().lat,
      minLong: data.getSouthWest().lng,
      maxLong: data.getNorthEast().lng,
    };
  }

  private initMap() {
    if (this.map) return;
    this.map = L.map("map", {
      doubleClickZoom: false,
      center: [37.3101063519868, 9.855422973632814],
      zoom: 9,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.setBounds();

    this.map.addEventListener("dragend", (e) => {
      const data = e.target.getBounds();
      this.currentBounds = {
        minLat: data._southWest.lat,
        maxLat: data._northEast.lat,
        minLong: data._southWest.lng,
        maxLong: data._northEast.lng,
      };
    });

    this.map.addEventListener("dblclick", (e) => {
      this.adding = true;
      this.addingForm.location.latitude = e.latlng.lat;
      this.addingForm.location.longitude = e.latlng.lng;
    });
  }

  public cancelAdding() {
    this.adding = false;
    this.addingForm = {
      name: "",
      description: "",
      price: 0,
      area: 0,
      details: {
        nbRoom: 0,
        floors: 0,
        built_at: new Date(),
      },
      location: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  public async searchInMap() {
    this.searching = true;
    this.markers.forEach((marker) => {
      marker.removeFrom(this.map);
    });
    this.estates = await this.estateService.searchOnMap(this.currentBounds);
    this.processEstates();
    this.searching = false;
  }

  public placeMarkerOnMap(estate: Estate) {
    const marker = L.marker([
      estate.location.latitude,
      estate.location.longitude,
    ])
      .setIcon(
        L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        })
      )
      .addTo(this.map).bindPopup(`<div>
        <h6>${estate.owner.fullName} on ${new Date(
      estate.createdAt
    ).toDateString()}</h6>
        <div style="height: 1px; width: 100%; border-top: 1px solid black; margin-top: 2px; margin-bottom: 2px"></div>
        <h6>Description: ${estate.description}</h6>
        <div style="height: 1px; width: 100%; border-top: 1px solid black; margin-top: 2px; margin-bottom: 2px"></div>
        <h6>Area: ${estate.area}</h6>
        <div style="height: 1px; width: 100%; border-top: 1px solid black; margin-top: 2px; margin-bottom: 2px"></div>
        <h6>Details: built at ${new Date(
          estate.details.built_at
        ).toDateString()}, with ${estate.details.floors} floors and ${
      estate.details.nbRoom
    } rooms.</h6>
        <div style="height: 1px; width: 100%; border-top: 1px solid black; margin-top: 2px; margin-bottom: 2px"></div>
        <h6>Price: ${estate.price}DT</h6>
      </div>`);
    this.markers.push(marker);
  }

  public processEstates() {
    for (const estate of this.estates) {
      this.placeMarkerOnMap(estate);
    }
  }

  public async addEstate() {
    try {
      this.creating = true;
      const added = await this.estateService.createEstate({
        ...this.addingForm,
        location: {
          ...this.addingForm.location,
          address: "SOME LOCATION",
        },
      });
      this.estates.push(added);
      this.placeMarkerOnMap(added);
    } catch (error) {
      console.log(error);
    } finally {
      this.creating = false;
      this.cancelAdding()
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.map.whenReady(this.addHeatMapLayer)
    //@ts-ignore
    // this.map.whenReady(async (map) => {
    //   const heatmapPoints = await this.estateService.getHeatmap();
    //   (L as any).heatLayer(
    //     heatmapPoints.map(e=>[e.lat,e.lng,e.count])
    //   )
    //   //@ts-ignore
    //   .addTo(map.target);
    // });
    // const HML = this.addHeatMapLayer()
    // console.log(HML);
  }
}
