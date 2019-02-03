import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AddObjectPage } from "../add-object/add-object";
import { RestProvider } from "../../providers/rest/rest";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  monuments: any;
  constructor(public restProvider: RestProvider, public navCtrl: NavController, public geolocation: Geolocation) {
    this.getMonuments();
  }

  getMonuments() {
    this.restProvider.getMonuments().then(data => {
        this.monuments = data;
        console.log(this.monuments);
      });
  }

  ionViewWillEnter() {
    this.displayGoogleMap();
  }

  displayGoogleMap() {
    let latLng;// = new google.maps.LatLng(57.8127004, 14.2106225);
    this.geolocation.getCurrentPosition().then((position) => {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        //disableDefaultUI: true,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "simplified"
              },
              {
                "hue": "#ff0000"
              }
            ]
          }
        ]
      }
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.addMarker();
      //this.addMarkers();

    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {
    for(var i in this.monuments) {
      let latLng = new google.maps.LatLng((this.monuments[i].coordinates).latitude, (this.monuments[i].coordinates).longitude);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {lat: (this.monuments[i].coordinates).latitude, lng: (this.monuments[i].coordinates).longitude }
      });

      let content = "<h4>Zabytek!</h4>";

      this.addInfoWindow(marker, content, this.monuments[i]);
    }
  }

  addInfoWindow(marker, content, object){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent('<p>Nazwa: ' + object.name +'</p>' +
        '<p>' + " " +'</p>' +
        '<p>Funkcja: ' + object.function +'</p>' +
        '<p>Data powstania: ' + object.creationDate + '</p>' +
        '<p>Adres: ' + (object.address).street + ' ' + object.address.houseNumber + ' ' + object.address.flatNumber  +'</p>' +
        '<p>' +object.address.postCode + ' ' + object.address.city + '</p>' +
        '<p>Status: ' + '</p>' +
        '<button id="x" >Monument</button>');
      infoWindow.addListener('domready', () => {
        document.getElementById("x").addEventListener("click", () => {
          this.goToMonument();
        });
      });
      infoWindow.open(this.map, marker);
    });
  }

  addMarkers() {
    for(var prop in this.monuments) {
      console.log(prop + "|" + this.monuments[prop].name)
    }
  }

  goToMonument(){
    this.navCtrl.push(AddObjectPage);
  }
}
