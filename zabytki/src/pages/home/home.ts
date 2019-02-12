import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, Events, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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
  constructor(private alertCtrl: AlertController, public events : Events, public restProvider: RestProvider, public navCtrl: NavController, public geolocation: Geolocation) {
    this.getMonuments();
  }

  getMonuments() {
    this.restProvider.getMonuments().then((data) => {
      this.monuments = data;
      this.events.publish('monuments:get', Date.now());
      console.log(this.monuments);
      return data;
    }, (err) => {
      console.log(err);
      this.showError("Coś poszło nie tak, spróbuj jeszcze raz!");
    });
  }

  update() {
    window.location.reload();
  }
  ionViewWillEnter() {
    this.displayGoogleMap();
  }

  displayGoogleMap() {
    let latLng;
    this.geolocation.getCurrentPosition().then((position) => {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.events.subscribe('monuments:get', (time) => {
        this.addMarker();
      });
    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {
    for(var i in this.monuments) {
      if(this.monuments[i].approved) {
        let latLng = new google.maps.LatLng((this.monuments[i].coordinates).latitude, (this.monuments[i].coordinates).longitude);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {lat: (this.monuments[i].coordinates).latitude, lng: (this.monuments[i].coordinates).longitude}
        });
        this.addInfoWindow(marker, this.monuments[i]);
      }
    }
  }

  addInfoWindow(marker, object){

    let infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', () => {
      let content = '<p>Nazwa: ' +object.name +'</p>';
      if (object.function != null) {
        content += '<p>Funkcja: ' + object.function +'</p>';
      }
      if (object.creationDate != null) {
        content += '<p>Data powstania: ' + object.creationDate +'</p>';
      }
      if ((object.address).street != null) {
        content += '<p>Adres: ' + (object.address).street;
      }
      if ((object.address).houseNumber != null) {
        content += ' ' +(object.address).houseNumber;
      }
      if ((object.address).flatNumber != null) {
        content += ' ' +(object.address).flatNumber;
      }
      content += '</p><p>'
      if ((object.address).postCode != null) {
        content += ' ' +(object.address).postCode;
      }
      if ((object.address).city != null) {
        content += ' ' +(object.address).city;
      }
      content +='</p>';
      if (object.archivalSource != null) {
        content += '<p>Źródła archiwalne: ' + object.archivalSource +'</p>';
      }
      if (object.status != null) {

        content += '<p>Status prawny: ' + object.status +'</p>';
      }
      if (object.type != null) {
        content += '<p>Rodzaj: ' + object.type +'</p>';
      }
      infoWindow.setContent(content);
      infoWindow.open(this.map, marker);
    });
  }

  addMarkers() {
    for(var prop in this.monuments) {
      console.log(prop + "|" + this.monuments[prop].name)
    }
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
