import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";

declare var google: any;

@Component({
  selector: 'page-add-object',
  templateUrl: 'add-object.html',
})
export class AddObjectPage {

  object = {name: '', function: '', creationDate: '', archivalSource: '', genre: '', status: '', lat: '', lon: '', street:'', houseNumber: '', flatNumber: '', postCode:'', city: ''}

  @ViewChild('map') mapContainer2: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddObjectPage');
    this.displayGoogleMap();
  }

  ionViewWillEnter() {

  }

  displayGoogleMap = () => {
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
      this.map = new google.maps.Map(this.mapContainer2.nativeElement, mapOptions);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
      this.map.addListener('click', (event) =>{
        marker.setPosition(event.latLng);
      });

    }, (err) => {
      console.log(err);
    });
  }

  goAdd() {
    this.buildMonument();
  }

  buildMonument() {

  }

}
