import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AddObjectPage} from "../add-object/add-object";
import { Geolocation } from '@ionic-native/geolocation';
import {HomePage} from "../home/home";

declare var google;
/**
 * Generated class for the AcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-accept',
  templateUrl: 'accept.html',
})
export class AcceptPage {
  @ViewChild('map') mapContainer: ElementRef;
  public notApprovedMonuments: any;
  map: any;
  constructor(public geolocation: Geolocation, public events: Events, public restProvider: RestProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.loadNotApprovedMonuments();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AcceptPage');
    this.displayGoogleMap();
  }

  loadNotApprovedMonuments() {
    this.restProvider.getNotApprovedMonuments().then((result) => {
      console.log(result);
      this.notApprovedMonuments = result;
      this.events.publish('notApprovedMonuments:get', Date.now());
      return result;
    }, (err) => {
      console.log(err);
    });
  }

  displayGoogleMap() {
    let latLng;// = new google.maps.LatLng(57.8127004, 14.2106225);
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
      this.events.subscribe('notApprovedMonuments:get', (time) => {
        this.addMarkers();
      });

    }, (err) => {
      console.log(err);
    });
  }

  addMarkers() {
    for(var i in this.notApprovedMonuments) {
        let latLng = new google.maps.LatLng((this.notApprovedMonuments[i].coordinates).latitude, (this.notApprovedMonuments[i].coordinates).longitude);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {lat: (this.notApprovedMonuments[i].coordinates).latitude, lng: (this.notApprovedMonuments[i].coordinates).longitude}
        });
        let content = "<h4>Zabytek!</h4>";
        this.addInfoWindow(marker, content, this.notApprovedMonuments[i]);
    }
  }

  addInfoWindow(marker, content, object){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      let content = '<p>Nazwa: ' +object.name +'</p>'
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
      content += '<button id="accept">Akceptuj</button>';
      infoWindow.setContent(content);
      infoWindow.addListener('domready', () => {
        document.getElementById("accept").addEventListener("click", () => {
          this.approveNewMonument(object.id);
        });
      });
      infoWindow.open(this.map, marker);
    });
  }

  approveNewMonument(id){
    this.restProvider.markMonumentAsApproved(id).then((result) => {
      console.log(result);
      this.navCtrl.setRoot(HomePage);
      this.showError("Obiekt został zaakceptowany!");
      return result;
    }, (err) => {
      console.log(err);
      this.showError("Coś poszło nie tak!");
    });
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Akceptuj Obiekt',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
