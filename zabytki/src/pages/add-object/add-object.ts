import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { RestProvider } from "../../providers/rest/rest";
import { HomePage } from "../home/home";

declare var google: any;

@Component({
  selector: 'page-add-object',
  templateUrl: 'add-object.html',
})
export class AddObjectPage {

  object = { name: '', function: '', creationDate: '', archivalSource: '', genre: '', status: '', lat: '', lon: '', street:'', houseNumber: '', flatNumber: '', postCode:'', city: '', country: ''}
  coordinates = {
    longitude: 0,
    latitude: 0
  }
  @ViewChild('map') mapContainer2: ElementRef;
  map: any;
  constructor(public restProvider: RestProvider, public navCtrl: NavController, public geolocation: Geolocation, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AddObjectPage');
    this.displayGoogleMap();
  }

  sendMonument(monument) {
    this.restProvider.addMonument(monument).then((result) => {
      console.log(result);
      this.navCtrl.setRoot(HomePage);
      return result;
    }, (err) => {
      console.log(err);
      this.showError("Coś poszło nie tak!");
    });
  }

  displayGoogleMap = () => {
    let latLng;// = new google.maps.LatLng(57.8127004, 14.2106225);
    this.geolocation.getCurrentPosition().then((position) => {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.coordinates.latitude = position.coords.latitude;
      this.coordinates.longitude = position.coords.longitude;
      let mapOptions = {
        center: latLng,
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
        marker.getPosition();
        this.coordinates.latitude = marker.getPosition().lat();
        this.coordinates.longitude = marker.getPosition().lng();
      });

    }, (err) => {
      console.log(err);
    });
  }

  goAdd() {
    let monument = this.buildMonument();
    this.sendMonument(monument);
  }

  buildMonument() {
    let monument = {
      name: this.object.name,
      function: this.object.function,
      creationDate: this.object.creationDate,
      archivalSource: this.object.archivalSource,
      coordinates: this.coordinates,
      address: {
        street: this.object.street,
        houseNumber: this.object.houseNumber,
        flatNumber: this.object.flatNumber,
        postCode: this.object.postCode,
        city: this.object.city,
        country: this.object.country
      },
      status: this.object.status,
      type: this.object.genre
    }
    return monument
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  update() {
    window.location.reload();
  }
}
