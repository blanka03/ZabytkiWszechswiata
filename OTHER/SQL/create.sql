DROP TABLE Obraz;
DROP TABLE Wideo;
DROP TABLE Link;
DROP TABLE Obiekt;
DROP TABLE Wlasciciel;
DROP TABLE Adres;
DROP TABLE Wspolrzedne;
DROP TABLE Slownik;
DROP TABLE RolaUzytkownika;
DROP TABLE Rola;
DROP TABLE Uzytkownik;
DROP SEQUENCE uzytkownik_seq;
DROP SEQUENCE rola_seq;
DROP SEQUENCE slownik_seq;
DROP SEQUENCE wspolrzedne_seq;
DROP SEQUENCE adres_seq;
DROP SEQUENCE wlasciciel_seq;
DROP SEQUENCE obiekt_seq;
DROP SEQUENCE link_seq;
DROP SEQUENCE wideo_seq;
DROP SEQUENCE obraz_seq;

CREATE TABLE Uzytkownik (
	uzytkownik_id INTEGER PRIMARY KEY,
	login VARCHAR(50),
	haslo VARCHAR(100),
	imie VARCHAR(40),
	nazwisko VARCHAR(80)
);

CREATE TABLE Rola (
	rola_id INTEGER PRIMARY KEY,
	nazwa VARCHAR(12)
);

CREATE TABLE RolaUzytkownika (
	uzytkownik_id INTEGER NOT NULL,
	rola_id INTEGER NOT NULL,
	CONSTRAINTS fk_uzytkownik_id FOREIGN KEY (uzytkownik_id) REFERENCES Uzytkownik (uzytkownik_id),
	CONSTRAINTS fk_rola_id FOREIGN KEY (rola_id) REFERENCES Rola (rola_id),
	PRIMARY KEY (uzytkownik_id, rola_id)
);

CREATE TABLE Slownik (
	slownik_id INTEGER PRIMARY KEY,
	typ VARCHAR(50),
	rodzaj VARCHAR(50),
	opis VARCHAR(254)
);

CREATE TABLE Wspolrzedne (
	wspolrzedne_id INTEGER PRIMARY KEY,
	dlugosc FLOAT,
	szerokosc FLOAT
);

CREATE TABLE Adres (
	adres_id INTEGER PRIMARY KEY,
	ulica VARCHAR(254),
	dom VARCHAR(5),
	mieszkanie VARCHAR(5),
	kod VARCHAR(50),
	miasto VARCHAR(254),
	kraj VARCHAR(40)
);

CREATE TABLE Wlasciciel (
	wlasciciel_id INTEGER PRIMARY KEY,
	wlasciciel_nazwa1 VARCHAR(40),
	wlasciciel_nazwa2 VARCHAR(80),
	kontakt VARCHAR(254)
);

CREATE TABLE Obiekt (
	obiekt_id INTEGER PRIMARY KEY,
	nazwa VARCHAR(254),
	funkcja VARCHAR(254),
	adres_id INTEGER,
	autor_id INTEGER,
	wlasciciel_id INTEGER,
	data_powstania DATE,
	zrodla_archiwalne VARCHAR(500),
	rodzaj_obiektu INTEGER,
	status_prawny INTEGER,
	wspolrzedne_id INTEGER,
	czy_zaakceptowane INTEGER,
	CONSTRAINTS fk_adres_id FOREIGN KEY (adres_id) REFERENCES Adres (adres_id),
	CONSTRAINTS fk_autor_id FOREIGN KEY (autor_id) REFERENCES Uzytkownik (uzytkownik_id),
	CONSTRAINTS fk_wlasciciel_id FOREIGN KEY (wlasciciel_id) REFERENCES Wlasciciel (wlasciciel_id),
	CONSTRAINTS fk_rodzaj_obiektu FOREIGN KEY (rodzaj_obiektu) REFERENCES Slownik (slownik_id),
	CONSTRAINTS fk_status_prawny FOREIGN KEY (status_prawny) REFERENCES Slownik (slownik_id),
	CONSTRAINTS fk_wspolrzedne_id FOREIGN KEY (wspolrzedne_id) REFERENCES Wspolrzedne (wspolrzedne_id)
);

CREATE TABLE Link (
	link_id INTEGER PRIMARY KEY,
	odnosnik VARCHAR(254),
	opis VARCHAR(254),
	obiekt_id INTEGER,
	CONSTRAINTS fk_obiekt_id_l FOREIGN KEY (obiekt_id) REFERENCES Obiekt (obiekt_id)
);

CREATE TABLE Wideo (
	wideo_id INTEGER PRIMARY KEY,
	sciezka VARCHAR(254),
	opis VARCHAR(254),
	obiekt_id INTEGER,
	CONSTRAINTS fk_obiekt_id_w FOREIGN KEY (obiekt_id) REFERENCES Obiekt (obiekt_id)
);

CREATE TABLE Obraz (
	obraz_id INTEGER PRIMARY KEY,
	sciezka VARCHAR(254),
	opis VARCHAR(254),
	obiekt_id INTEGER,
	CONSTRAINTS fk_obiekt_id_o FOREIGN KEY (obiekt_id) REFERENCES Obiekt (obiekt_id)
);

CREATE SEQUENCE uzytkownik_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE rola_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE slownik_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE wspolrzedne_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE adres_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE wlasciciel_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE obiekt_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE link_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE wideo_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;
CREATE SEQUENCE obraz_seq START WITH 0 INCREMENT BY 1 MINVALUE 0;