**Structured** je web aplikacija namenjena kolaborativnom učenju dinamičkih struktura podataka. Pruža tri osnovna moda: mod učenja (learning), mod vežbanja (practise) i kompetetivan mod (competitive). Ova aplikacija pruža vizualizaciju struktura podataka u realnom vremenu, kao i modifikaciju prikazane strukture. Korisnici imaju izbor izmedju Grafova i Binarnih stabala traženja.

### Funkcionalni zahtevi:
* Prijavljivanje i registrovanje na veb-aplikaciju.
* Izbor između tri moda aplikacije: Learn, Practice i Compete.
* Odabir strukture: grafa ili stabla.
* Opšti uvod o odabranoj strukturi.
* Vizualizacija same strukture.
* Izvršenje osnovnih operacija nad strukturom u realnom vremenu od strane više korisnika - dodavanje, brisanje, premeštanje čvorova i potega. 
* Vizualizacija strukture prilikom modifikacije u realnom vremenu. 
* Izbor i vizualizacija algoritama za obilazak strukture korak po korak.
* Interaktivno takmičenje više korisnika u znanju o odabranoj strukturi i konkretnim algoritmima.
* Kreiranje nove ili pridruživanje u već postojeću sobu u kojoj će korisnici učiti i raditi na odabranoj strukturi.
* Izlistavanje već postojećih soba.
* Komunikacija u realnom vremenu između korisnika u sobi - chat servis.
* Rangiranje korisnika na osnovu ostvarenih rezultata.

### Funkcionalna specifikacija projekta:
* Snimanje crteza u relacionu bazu podataka koriscenjem Hibernate (ili nekog drugog) ORM alata
* Podrska za istovremeni rad vise klijenata na jednom dokumentu (crtezu, partiji igre itd.) pri cemu prvi korisnik koji je otvorio dokument moze da unosi izmene, a svi ostali (obavezno podrzati vise) mogu u realnom vremenu da prate izmene. Ukoliko prvi korisnik (onaj koji unosi izmene) zatvori dokument, prvi sledeci korisnik koji je imao read-only pogled dobija read-write privilegiju.
* Implementirati sinhronizaciju dokumenta kod svih klijenata koriscenjem neke message-passing biblioteke (jeromq).
* Omoguciti istovremeni rad na vise dokumenata (veceg broja grupa korisnika)
* Omoguciti adekvatnu vizuelizaciju veceg broja razlicitih elemenata iz modela podataka pri cemu je moguce svakom elementu dodeliti tekstualnu labelu
* Omoguciti iscrtavanje veza izmedju objekata modela podataka. 
* Uvesti razlicita ogranicenja prilikom uvodjenja veza u model (nije moguce povezati bilo koji objekat sa bilo kojim drugim, ograniciti broj veza po objektu itd.).
* Prilikom implementacija na odgovarajucim mestima iskoristiti barem 3 razlicita projektna obrasca.

### Nefunkcionalni zahtevi:
* Performanse
* Modifikabilnost
* Sigurnost
* Dostupnost
* Upotrebljivost
* Testabilnost
* Proširljivost
* Lako održavanje
* Otpornost na greške
* Otvoreni kod

## Arhitekturni zahtevi:
* **Performanse** - Vreme odziva aplikacije treba da bude što manji, i u normalnim uslovima ne treba da prelazi nekoliko sekundi.
* **Modifikabilnost** - Moguća promena korišćenih tehnologija servera i baze podataka.
* **Sigurnost** - Autentifikacija i autorizacija korisnika i integritet podataka.
* **Dostupnost** - Aplikacija bi trebalo da bude dostupna 24/7 sa 99% garantovanim uptime-om.
* **Upotrebljivost** - Jasan, jednostavan i pregledan korisnički interfejs, gde korisnik nema problema u lakom korišćenju aplikacije.
* **Testabilnost** - Komponente treba projektovati u slaboj međusobnoj sprezi kako bi testiranje bilo jednostavno, takođe, gotove komponente su već podobno testirane.
* **Proširljivost** - Aplikacija treba imati modularnu arhitekturu kako bi se lako dodavale nove funkcionalnosti.
* **Lako održavanje** - Jasan i čitljiv kod, sa precizno definisanim modulima kako bi otkiravanje grešaka bilo lokalizovano i njihovo uklanjanje jednostavno.
* **Otpornost na greške** - U slučaju pada servera, aplikacija treba da funkcioniše u jednokorisničkom režimu.
* **Otvoreni kod** - Kod aplikacije treba da se nalazi u repozitorijumu koji je dostupan svima.

### Okruženje

**Node.js** je multiplatformsko JavaScript okruženje otvorenog koda za izvršavanje JavaScript-a na serverskoj strani. Inicijalno JavaScript je dizajniran za izvršavanje na klijentskoj strani, odnosno u okviru web pregledača. Node.js omogućava da se JavaScript kod izvršava na strani servera i pritom dozvoljava dinamičko generisanje web sadržaja pre nego što se pošalje do web pregledača korisnika. Ovo omogućava uniforman razvoj web aplikacija u jednom programskom jeziku. Node.js poseduje arhitekturu koja je bazirana na dogadjajima koja je sposobna da obavlja asinhrone ulaze i izlaze. Ovakav izbor omogućava optimizaciju propusnosti i skalabilnosti u razvoju web aplikacija koje se izvršavaju u realnom vremenu.

### Baza podataka

**MongoDB** je NoSQL baza podataka, i pritom i glavni predstavnik ove grupe baza podataka koje ne koriste SQL za povezivanje, nerelacione su, distribuirane, otvorenog koda i horizontalno skalabilne. MongoDB čuva podatke kao JSON dokumente sa dinamičkim šemama. JSON (JavaScript Object Notation) je standard zasnovan na tekstu, osmišljen za razmenu podataka.

### Okviri

#### MEAN Stack

MEAN skup softvera se sastoji od MongoDB-a, Express.js-a, Angular-a i Node.js-a. Zahvaljujući svim komponentama MEAN skupa softvera i podržanosti JavaScript-a, MEAN aplikacije mogu biti napisane na jednom jeziku koji se izvršava i na serverskoj i na klijentskoj strani.

#### Angular (ver. 5.0.0)

**Angular** je front-end framework (okvir) otvorenog koda baziran na TypeScript jeziku. Framework prilagođava i proširuje tradiocinlani HTML kako bi predstavio dinamički sadržaj kroz dvosmerno vezivanje podataka koje omogućava automatsku sinhronizaciju modela i view-a u MVC arhitekturi. Angular implementira MVC arhitekturu radi razdvajanja komponenti za prezentaciju, podatke i logičkih komponenti. Koristeći zavisnost paketa, Angular donosi tradicionalne serverske servise, kao što su kontroleri koji zavise od prezentacionog sloja, na web aplikacije na klijentskoj strani.

#### Express.js

**Express.js** je middleware u okviru Node.js servera, dizajniran za izradu jednostraničnih, višestraničnih i hibridnih web aplikacija. Exspress.js je pozadinski deo MEAN steka, zajedno sa Mongo DB bazom podataka.

### Jezici

#### TypeScript

**TypeScript** je programski jezik otvorenog koda koji predstavlja osnovu Angular frameworka. Strog je nadskup Javaskripta, i dodaje jeziku opcionu statičku tipizaciju i objektnu orijentisanost. Typescript se može koristiti za razvoj Javaskript aplikacija za izvršavanje na klijentu ili serveru (Node.js). TypeScript, za razliku od JavaScript-a, pruža objektnu-orijentisanost i lakšu primenu svih paradigmi i šablona koji su teško primenljivi u čistom (*vanilla*) JavaScript-u.


### Korišćene biblioteke

#### D3JS
D3.js je JavaScript biblioteka koja pruža manipulaciju dokumenata na osnovu podataka. Dozvoljava povezivanje DOM-a i podakata, a zatim i primenjivanje podacima vodjenih transformacija nad dokumentom. Ova biblioteka predstavlja idealno rešenje za vizualizaciju kompleksnih i dinamičkih struktura podataka poput grafova i stabala, a pritom ostavlja dovoljno prostora za samu logiku koja se primenjuje nad predstavljenom strukturom.

#### RxJS

ReactiveX library for JavaScript je skup biblioteka namenjenih reaktivnom programiranju. Omogućava izgradnju asinhonih i dogadjajima vodjenih programa. Znatno olakšava pisanje asinhorog i call-back koda. Većina funkcionalnosti koje pruža ovaj skup biblioteka je bazairano na Observer i Iterator obrasima.



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
