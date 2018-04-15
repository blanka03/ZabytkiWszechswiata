/* INSERTY */

INSERT INTO ROLA (ROLA_ID, NAZWA) VALUES (rola_seq.nextval, 'WOLONTARIUSZ');
INSERT INTO ROLA (ROLA_ID, NAZWA) VALUES (rola_seq.nextval, 'REDAKTOR');
INSERT INTO ROLA (ROLA_ID, NAZWA) VALUES (rola_seq.nextval, 'TURYSTA');

INSERT INTO UZYTKOWNIK (UZYTKOWNIK_ID, LOGIN, HASLO, IMIE, NAZWISKO) VALUES (uzytkownik_seq.nextval, 'dzasta94', '1234' , 'Justyna', 'Makowska');
INSERT INTO UZYTKOWNIK (UZYTKOWNIK_ID, LOGIN, HASLO, IMIE, NAZWISKO) VALUES (uzytkownik_seq.nextval, 'arksad95', '12345' , 'Arkadiusz', 'Sadowski');
INSERT INTO UZYTKOWNIK (UZYTKOWNIK_ID, LOGIN, HASLO, IMIE, NAZWISKO) VALUES (uzytkownik_seq.nextval, 'jendi94', '123456' , 'Jedrzej', 'Antkiewicz');
INSERT INTO UZYTKOWNIK (UZYTKOWNIK_ID, LOGIN, HASLO, IMIE, NAZWISKO) VALUES (uzytkownik_seq.nextval, 'blan95', '123' , 'Blanka', 'Sznyter');

INSERT INTO ROLAUZYTKOWNIKA (UZYTKOWNIK_ID, ROLA_ID) VALUES (1, 1);
INSERT INTO ROLAUZYTKOWNIKA (UZYTKOWNIK_ID, ROLA_ID) VALUES (2, 1);
INSERT INTO ROLAUZYTKOWNIKA (UZYTKOWNIK_ID, ROLA_ID) VALUES (3, 1);
INSERT INTO ROLAUZYTKOWNIKA (UZYTKOWNIK_ID, ROLA_ID) VALUES (4, 1);


INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'STATUS PRAWNY', 'REJESTR ZABYTKÓW', 'Wykaz obiektów uznanych za zabytki w danym kraju.');
INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'STATUS PRAWNY', 'POMNIK HISTORII', 'Przyznawany jest zabytkom nieruchomym o szczególnej wartości historycznej, naukowej i artystycznej, utrwalonym w powszechnej świadomości i mającym duże znaczenie dla dziedzictwa kulturalnego.');
INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'STATUS PRAWNY', 'PARK KULTUROWY', 'Chroni ona określony obszar krajobrazu kulturowego oraz wyróżniające się krajobrazowo tereny z zabytkami nieruchomymi.');
INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'STATUS PRAWNY', 'LOKALNA EWIDENCJA ZABYTKÓW', 'Ustalenie wymogów ochrony w miejscowym planie zagospodarowania przestrzennego lub w decyzji lokalizacyjnej');

INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'RODZAJ', 'NIERUCHOME', 'Np. krajobrazy, ukady urbanistyczne, budynki, obiekty techniki, cmentarze, parki, ogrody, miejsca upamiętniajace wydarzenia historyczne.');
INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'RODZAJ', 'RUCHOME', 'Np. dziela sztuki, kolekcje, numizmaty, wytwory techniki, ');
INSERT INTO SLOWNIK (SLOWNIK_ID, TYP, RODZAJ, OPIS) VALUES (slownik_seq.NEXTVAL, 'RODZAJ', 'ARCHEOLOGICZNE', 'Np. pozostalosci terenowe, cmentarzyska, relikty dzialanosci gospodarczej, religijnej i artystycznej');




INSERT INTO ADRES (ADRES_ID, ULICA, KOD, MIASTO, KRAJ) VALUES
                    (adres_seq.nextval, 'Dlugi Targ', '80-833', 'Gdańsk', 'Polska');
INSERT INTO WLASCICIEL (WLASCICIEL_ID, WLASCICIEL_NAZWA1, KONTAKT) VALUES(wlasciciel_seq.nextval, 'Narodowy Instytut Dziedzictwa','228261714' );
INSERT INTO WSPOLRZEDNE (WSPOLRZEDNE_ID, DLUGOSC, SZEROKOSC) VALUES (wspolrzedne_seq.nextval, 54.348575, 18.653364);
INSERT INTO OBIEKT (OBIEKT_ID, NAZWA, FUNKCJA, ADRES_ID, WLASCICIEL_ID, DATA_POWSTANIA, RODZAJ_OBIEKTU, STATUS_PRAWNY, WSPOLRZEDNE_ID, CZY_ZAAKCEPTOWANE) VALUES
                (OBIEKT_SEQ.NEXTVAL, 'Fontanna Neptuna w Gdańsku', 'FONTANNA',  1,  1, '1633-01-01', 1, 1 ,1, 1);
  
  
INSERT INTO ADRES (ADRES_ID, ULICA, DOM, KOD, MIASTO, KRAJ) VALUES
                    (adres_seq.nextval, 'Zator-Przytockiego','3', '80-001', 'Gdańsk', 'Polska');
INSERT INTO WSPOLRZEDNE (WSPOLRZEDNE_ID, DLUGOSC, SZEROKOSC) VALUES 
                    (wspolrzedne_seq.nextval, 54.379798, 18.608972);
  
INSERT INTO OBIEKT (OBIEKT_ID, NAZWA, FUNKCJA, ADRES_ID, DATA_POWSTANIA, RODZAJ_OBIEKTU, STATUS_PRAWNY, WSPOLRZEDNE_ID, CZY_ZAAKCEPTOWANE) VALUES
                (OBIEKT_SEQ.NEXTVAL, 'Kolegiata Gdańska pw. Serca Jazusowego w Gdańsku Wrzeszczu', 'kościól',  2, '1911-04-01', 2, 2 ,2, 1);
                

INSERT INTO ADRES (ADRES_ID, ULICA, DOM, KOD, MIASTO, KRAJ) VALUES
                    (adres_seq.nextval, 'Jana Pawla II','1', '81-817', 'Sopot', 'Polska');
INSERT INTO WSPOLRZEDNE (WSPOLRZEDNE_ID, DLUGOSC, SZEROKOSC) VALUES 
                    (wspolrzedne_seq.nextval, 54.518646, 18.558488);
INSERT INTO OBIEKT (OBIEKT_ID, NAZWA, FUNKCJA, ADRES_ID, DATA_POWSTANIA, RODZAJ_OBIEKTU, STATUS_PRAWNY, WSPOLRZEDNE_ID, CZY_ZAAKCEPTOWANE) VALUES
                (OBIEKT_SEQ.NEXTVAL, 'Pomnik Józefa Teodora Konrada Korzeniowskiego', 'pomnik',  3, '1976-06-19', 3, 3 ,3, 1);


INSERT INTO ADRES (ADRES_ID, ULICA, KOD, MIASTO, KRAJ) VALUES
                    (adres_seq.nextval, 'Malczewskiego', '81-345', 'Gdynia', 'Polska');
INSERT INTO WSPOLRZEDNE (WSPOLRZEDNE_ID, DLUGOSC, SZEROKOSC) VALUES 
                    (wspolrzedne_seq.nextval, 54.450833, 18.546111);
INSERT INTO OBIEKT (OBIEKT_ID, NAZWA, FUNKCJA, ADRES_ID, DATA_POWSTANIA, RODZAJ_OBIEKTU, STATUS_PRAWNY, WSPOLRZEDNE_ID, CZY_ZAAKCEPTOWANE) VALUES
                (OBIEKT_SEQ.NEXTVAL, 'Cmentarz żydowski w Sopocie', 'cmentarz',  4, '1913-01-01', 4, 1 ,4, 1);


