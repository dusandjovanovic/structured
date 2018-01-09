# Arhitekturni dizajn softverskog sistema

## Layered (n-tier)

Arhitekturni stil koji se primenjuje nad celom strukturom aplikacije je Layered (slojeviti) obrazac. Komponente aplikacije su organizovane u horizontalne slojeve gde svaki sloj ima konkretnu ulogu i odgovornost. Svaki od slojeva formira abstrakciju oko uloge koju treba da sprovodi što doprinosi modularnosti. Jedna od glavnih prednosti primene ovog obrasca u našoj aplikaciji je razdvajanje briga izmedju komponenti, gde na primer, Klijentski sloj pregleda ne uzima u obzir način predstavljanja podataka već samo konkretne podatke koje treba da predstavi; sami podaci su ovom sloju dopremljeni u njemu odgovarajućem obliku.

![alt text][layered]

[layered]: images/layered.png

* *Server* - pozadisnki sloj koji enkapsulira bazu podataka i pristup (Node.js)
* *Reactive model* - sloj koji omotava (*wrapper*) celokupnu logiku pribavljanja podataka i manipulaciju njima
* *Client controller* - sloj koji prima naredbe od pogleda i zadaje konkretne direktive nižim slojevima
* *Client view* - sloj pogleda, interakcija sa korisnikom 

---

Iz priloženog se može videti da postoji sličnost sa Model-View-Controller obrascem, medjutim struktuiranost je slojevita. Konkretna primena **MVC** obrasca je prisutna nad komponentama front-end strane, što je uslovljeno dizajnom same strukture Angular frameworka. Za sinhronizaciju više korisnika je primenjen **Observer** obrazac.

Dijagrami klasa i detaljnije osobine sledećih segmenata će biti dodate u kasnijim fazama implementacije.

### Server

...

### Reactive model

...

### Client controller

...

### Client view

...


## Arhitekturni obrasci

### Publish and subscribe
...

### Observer
...

### Model-View-Controller

Model-View-Controller je arhitektura uslovljena Angular frameworkom, pa samim tim je prisutna na klijentskoj strani. Svaka frontend reprezentaciona komponenta aplikacije je realizovana kroz ovaj obrazac.

## Fizički pogled
Fizički pogled, odnosno razmeštaj aplikacije, čine serverska i klijentska strana. Server ostvaruje direktnu konekciju sa bazom podataka uz dodatno izvršavanje logike na serverskoj strani. Na kiljentskoj strani je servirana komponenta koja se dinamički menja u zavisnosti od zahteva i direktiva klijenta, za čiju je funkcionalnost neophodna dvosmerna komunikacija sa serverskom stranom.

![alt text][deployment]

[deployment]: architecture/diagram-deployment.png


## Procesni pogled

Procesni pogled se sastoji od najznačajnijih dijagrama sekvenci u kojima su predstavljeni tokovi i razmene poruka.

![alt text][changes]

[changes]: architecture/activity-user-changes-model.png


Dijagram sekvence promene Data modela od strane jednog od korisnika. Prilikom izbora neke od direktiva pogleda za promenu Data modela (poput dodavanja čvora u graf) preko Kontrolera se zahtev prosledjuje do Socket.io servisa. Zatim je neophodno na nivou sobe proslediti informacije o promeni strukture do svih ostalih korisnika u sobi. Za ovakvo propagiranje promena se koristi Broadcast sa serverske strane. Takodje je neophodno promenjenu strukturu u celosti snimiti u bazu podataka.

![alt text][enters]

[enters]: architecture/activity-user-enters-room.png


Dijagram sekvence ulaska korisnika u već uspostavljenu sobu. Prilikom priključivanja sobi neophodno je korisniku dostaviti trenutno stanje strukture podataka koja je aktuelna za sobu. Zahtev za trenutnim stanjem se propagira do najnižeg sloja, odnosno servera koji pribavlja trenutno stanje Data modela iz baze podataka i vraća ga nazad do samog kontrolera pridruženog pogledu koji je zatražio zahtev. Nakon pribavljanja podataka pogled može da izvrši prikazivanje, odnosno vizualizaciju. U ovom procesu je neophodno pridružiti korisnika konkretnom Socket kanalu koji je vezan za sobu kojoj pristupa.


![alt text][learnmode]

[learnmode]: architecture/activity-user-enters-learnmode.png

Dijagram sekvence pristupanja modu za učenje (learning). Kada korisnik bira mod učenje neophodno je predstaviti mu statički sadržaj koji će ga uvesti u problematiku izabrane strukture. Sam sadržaj, koji obuhvata oformljenu strukturu i pokazne primere, se pribavlja iz baze podataka i dostavlja korisniku, odnosno do kontrolera a zatim se oslikava i na pogled samog korisnika.

## Pogled slučajeva korišćenja

![alt text][usecases]

[usecases]: architecture/diagram-usecases.png

Postoji više privilegija (*modova*) u kojima korisnik može da se nadje prilikom korišćenja aplikacije. Pre svega, neophodno je da se korisnik uloguje, nakon logovanja dobija pregled svih trenutno aktivnih soba, a takodje i mogućnost kreiranja nove sobe. Prilikom kreiranja sobe, kao i pristupanja, ima izbor izmedju soba u kojima se prikazuju Grafovi i soba u kojima se prikazuju Binarna stabla traženja.

Na nivou jedne sobe u Practise modu, korisnik može da bude rukovodeći (inicijalno korisnik koji je napravio sobu) i pritom ima pristup svim modifikacijama strukture podataka koja je prikazana u sobi. Ove mogućnosti uključuju dodavnje i brisanje elemenata strukturi, kao i pokretanje vizualizacije algoritama. U svakom trenutku korisnik može da napusti sobu, tada prvi sledeći korisnik postaje rukovodeći za tu sobu. Korisnici koji su spektaktori mogu samo da nadgledaju stanje strukture i modifikacije rukovodećeg korisnika.

Na nivou sobe u Compete modu, korisnici naizmenično menjaju uloge, nakon greške jednog od korisnika.
