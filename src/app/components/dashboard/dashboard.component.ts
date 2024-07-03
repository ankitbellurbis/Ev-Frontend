import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/service/message.service';
import { StationService } from 'src/app/service/station.service';
import { userService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('mapContainer') mapContainer?: ElementRef;
  private map: any;
  mapInitialized: boolean = false;
  private currentMarker: any = null;

  searchRange: any = 0
  radius: any = 5000 // 5000 meter (5 km)

  selectedState!: any
  selectedCity!: any
  stateList!: any
  cityList!: any
  circle!: L.Circle<any>;
  selectedStateName: any;
  selectedCityName: any;
  chargerList: any;
  chargerIcon!: any;
  currentLatitude!: number;
  currentLongitude!: number;

  constructor(
    private router: Router,
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService,
    private userService: userService,
    private _stationService: StationService,
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initializeMap();
    this.getStateList()
  }

  initializeMap(): void {
    if (!this.mapInitialized) {
      let $this: any = this
      setTimeout(() => {
        if (
          this.mapContainer &&
          this.mapContainer.nativeElement &&
          !this.mapInitialized
        ) {
          this.mapInitialized = true;

          const iconUrl = '../../../../../assets/images/location_icon2.png';
          const iconDefault = L.icon({
            iconUrl,
            iconSize: [24, 24],
          });

          this.chargerIcon = L.icon({
            iconUrl: '../../../../../assets/images/location_icon3.png',
            iconSize: [12, 12],
          });

          L.Marker.prototype.options.icon = iconDefault;

          const mapElement = this.mapContainer.nativeElement;
          this.map = L.map(mapElement, {
            center: [20.5937, 78.9629],
            zoom: 8,
            boxZoom: false,
            zoomControl: true,
            doubleClickZoom: false,
            // scrollWheelZoom: false,
          });

          // const tiles = L.tileLayer(
          //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          //   {
          //     maxZoom: 20,
          //     minZoom: 1,
          //   },
          // );

          const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20, minZoom: 1,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          }).addTo(this.map);
          
          if (navigator?.geolocation) {
            const config = {
              enableHighAccuracy: true,
              // response should provide a more accurate position
              timeout: 10000,
              // the device is allowed to take 10 seconds in order to return a position
            };

            navigator?.geolocation?.getCurrentPosition(
              position => {
                // this.spinner.show();
                const latitude = position?.coords?.latitude;
                const longitude = position?.coords?.longitude;
                this.currentLatitude = latitude;
                this.currentLongitude = longitude;
                this.map.setView([latitude, longitude], 12);
                const marker1 = L.marker([
                  latitude,
                  longitude
                ]).addTo(this.map);
                marker1.bindPopup('latitude');

                this.circle = L.circle([latitude, longitude], {
                  color: 'blue',
                  fillColor: '#158cba',
                  fillOpacity: 0.5,
                  radius: this.radius
                }).addTo(this.map);
                tiles.addTo(this.map);

                this.getChargerList(L, latitude, longitude)
                // this.showCoordinatesOnMap(latitude, longitude);

                // this.mapCircleRadius(circle)

                // console.log(circle)

                // let latlng1 = L.latLng(latitude, longitude);
                // let latlng2 = L.latLng(28.404990758851316, 77.05879211425783);
                // let distance = latlng1.distanceTo(latlng2) / 1000;
                // map.remove()
              },
              errorFunction,
              config,
            );

            function errorFunction() {
              $this._spinner.hide();
              $this._messageService.errorToast(
                'Please enable the location from the browser setting to view the map'
              );
            }
          } else {
            $this._messageService.errorToast(
              'Geolocation is not supported by this browser.'
            );
            this._spinner.hide();
          }

          // this.showCoordinatesOnMap();
          const legend1 = new L.Control();
          legend1.setPosition('bottomleft');
          legend1.onAdd = () => {
            const div = L.DomUtil.create('div', 'legend');
            // Set the icon and text for the legend
            div.innerHTML = `<img src='../../../../../assets/images/location_icon3.png' style="width: 13px; height: 13px;"> Charger Icon <img src="2../../../../../assets/images/location_icon2.png" style="width: 24px; height: 24px;"> Current Icon`;
            div.style.color = '#015e89';
            div.style.backgroundColor = '#fff';
            div.style.padding = '3px 9px';
            div.style.borderRadius = '7px';
            div.style.fontWeight = '600';
            div.style.fontSize = '13px';
            return div;
          };
          legend1.addTo(this.map);
        }
      }, 0);
    }
  }

  showCoordinatesOnMap(latitude: number, longitude: number): void {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    if (latitude > 0 && longitude > 0) {
      setTimeout(() => {
        this.currentMarker = L?.marker([latitude, longitude], {
          title: `Lat: ${latitude}, Long: ${longitude}`,
          // Add other marker options if needed
        })?.addTo(this.map);

        // this.currentMarker.bindPopup(`Lat: ${latitude}, Long: ${longitude}`).openPopup();
        this.currentMarker.bindPopup(`Lat: ${latitude}, Long: ${longitude}`);
        this.map.setView([latitude, longitude], 10);
      }, 0);
    }
  }

  changeSearchRange(event: any) {
    console.log(event.target.value);
    switch (event.target.value) {
      case '0': this.radius = 5000; break;
      case '1': this.radius = 10000; break;
      case '2': this.radius = 50000; break;
      case '3': this.radius = 100000; break;
      case '4': this.radius = 150000; break;
      case '5': this.radius = 200000; break;
      default: break;
    }

    this.mapCircleRadius(this.radius)
  }

  mapCircleRadius(radius: any) {
    this.circle.setRadius(radius)
    console.log(this.circle.getRadius())

  }

  getStateList() {
    this._spinner.show();
    this.userService.getStateList().subscribe((res: any) => {
      this.stateList = res.data
      this._spinner.hide();
    })
  }

  getCityList(event: any) {
    this._spinner.show();
    let stateId = event.target.value
    this.selectedCityName = null
    this.selectedCity = null
    this.stateList.find((ele: any) => {
      if (ele._id == event.target.value) {
        this.selectedStateName = ele.name
        this.findLatLong()
      }
    })
    this.userService.getCityListById(stateId).subscribe((res: any) => {
      this.cityList = res.data
      this._spinner.hide();
    })
  }

  findLatLong() {
    let zoomSize: number;
    if (
      !this.selectedCity
    ) {
      zoomSize = 4;
    } else zoomSize = 10;
    this._stationService
      .searchAddressLatLong(
        this.selectedStateName, this.selectedCityName
      )
      .subscribe((res: any) => {
        if (res?.length > 0) {
          this.map.setView(
            [Number(res[0]?.lat), Number(res[0]?.lon)],
            zoomSize
          );
          this.checkNearByChargers(Number(res[0]?.lat), Number(res[0]?.lon));
        } else {
          this._messageService.errorToast('Please enter valid city code.');
        }
      });
  }

  changeCity(event: any) {
    this.cityList.forEach((ele: any) => {
      if (ele._id == event.target.value) {
        this.selectedCityName = ele.name
        this.findLatLong()
      }
    })
  }

  getChargerList(L: any, latitude: any, longitude: any) {
    this._spinner.show();
    this._stationService.getStationList().subscribe((res: any) => {
      this._spinner.hide();
      this.chargerList = res?.data;

      this.checkNearByChargers(this.currentLatitude, this.currentLongitude);
    })
  }

  checkNearByChargers(currentLatitude: any, currentLongitude: any) {
    if (this.chargerList.length > 0) {
      let latlng1 = L.latLng(currentLatitude, currentLongitude);
      this.chargerList.forEach((ele: any) => {
        let latlng2 = L.latLng(Number(ele?.latLong?.split(',')[0]), Number(ele?.latLong?.split(',')[1]));
        let distance = latlng1.distanceTo(latlng2) / 1000;

        if (distance <= this.radius / 1000) {
          this.currentMarker = L?.marker([Number(ele?.latLong?.split(',')[0]), Number(ele?.latLong?.split(',')[1])], {
            title: `Lat: ${Number(ele?.latLong?.split(',')[0])}, Long: ${Number(ele?.latLong?.split(',')[1])}`, icon: this.chargerIcon
            // Add other marker options if needed
          })?.addTo(this.map);

          // this.currentMarker.bindPopup(`Lat: ${latitude}, Long: ${longitude}`).openPopup();
          this.currentMarker.bindPopup(`Lat: ${Number(ele?.latLong?.split(',')[0])}, Long: ${Number(ele?.latLong?.split(',')[1])}`);
        }
      })
    }
  }

}
