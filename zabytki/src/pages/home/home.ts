import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AddObjectPage } from "../add-object/add-object";
import {HttpClient} from '@angular/common/http';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  apiUrl = 'http://localhost:3000';
  constructor(public http: HttpClient, public navCtrl: NavController, public geolocation: Geolocation) {

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

    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Zabytek!</h4>";

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent('<p>Nazwa: ' + '</p>' +
        '<p>' + '</p>' +
        '<p>Funkcja: ' + '</p>' +
        '<p>Data powstania: ' + '</p>' +
        '<p>Rodzaj: ' + '</p>' +
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

  goToMonument(){
    this.navCtrl.push(AddObjectPage);
  }
}
