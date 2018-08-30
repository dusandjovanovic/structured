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

#### MERN Stack

MERN skup softvera se sastoji od MongoDB-a, Express.js-a, React-a i Node.js-a. Zahvaljujući svim komponentama MERN skupa softvera i podržanosti JavaScript-a, MERN aplikacije mogu biti napisane na jednom jeziku koji se izvršava i na serverskoj i na klijentskoj strani.

#### React

**React** je JavaScript biblioteka otvorenog koda koja obezbeđuje pregled podataka zapisanih preko HTMLa. React pregledi su obično obezbeđeni korišćenjem komponenti koje sadrže dodatne komponente definisane kao prilagođene HTML oznake. React obezbeđuje programeru model u kojem podkomponente ne mogu direktno da utiču na spoljašnje komponente, efikasno ažuriranje HTML dokumenta pri promeni podataka i jasno razdvajanje komponenti na današnjim jednostraničnim aplikacijama. On je podržan od strane Facebook, Instagram i zajednice pojedinačnih programera i korporacija.

#### Express.js

**Express.js** je middleware u okviru Node.js servera, dizajniran za izradu jednostraničnih, višestraničnih i hibridnih web aplikacija. Exspress.js je pozadinski deo MERN steka, zajedno sa Mongo DB bazom podataka.

### Jezici

#### JavaScript

**JavaScript** je dinamičan, slabo tipiziran i interpretiran programski jezik visokog nivoa. Standardizovan je po ECMAScript specifikaciji jezika. Pored HTML-a i CSS-a, JavaScript je jedna od tri vodeće tehnologije za definisanje sadržaja na Vebu; većina veb-sajtova koristi Javaskript a svi moderni veb-čitači ga podržavaju bez potrebe za instaliranjem dodataka. Kombinovan sa HTML jezikom i CSS-om Javaskript čini DHTML (Dynamic HTML). JavaScript je jezik zasnovan na prototipovima sa funkcijama prvog reda, što ga čini jezikom višestruke paradigme koji podržava objektno-orijentisani, imperativni i funkcionalni način programiranja. Sadrži API za rad sa tekstom, nizovima, datumima i regularnim izrazima, ali ne i ulazno/izlazne funkcionalnosti, kao što su povezivanje, skladištenje podataka ili grafičke funkcionalnosti, za šta se oslanja na okruženje u kome se izvršava. 


### Korišćene biblioteke i moduli

`d3` `d3-force`

D3.js je JavaScript biblioteka koja pruža manipulaciju dokumenata na osnovu podataka. Dozvoljava povezivanje DOM-a i podakata, a zatim i primenjivanje podacima vodjenih transformacija nad dokumentom. Ova biblioteka predstavlja idealno rešenje za vizualizaciju kompleksnih i dinamičkih struktura podataka poput grafova i stabala, a pritom ostavlja dovoljno prostora za samu logiku koja se primenjuje nad predstavljenom strukturom.

`react-redux` `redux-thunk`

Biblioteka koja se koristi za upravljanje stanjem aplikacije (state-managment). Inspirisana je Flux arhitekturnim obrascem. Ovo je mala biblioetka od svega 2kB sa ograničenim API-jem dizajnirana da bude predvidiv container za stanje aplikacije. Radi po principu svodjenja (reducing) i oslanja se na metode funckionalnog programiranja. `redux-thunk` se koristi kao middleware u sprezi sa `react-redux` komponentama i koristi se za uvodjenje asingronih operacija.

`react-router` `react-router-dom`

Omogućava deklerativno rutiranje u React aplikacijama. Ova biblioetka nije razvijana od strane React tima ali se smatra de-facto standardom za rutiranje u izradi klijentskih aplikacija u ovom ekosistemu. Uokviru biblioeteke se nalaze navigacione komponente koje se koriste za navigaciju i rutiranje generalno.

`reactstrap`

Bootstrap je frontend okvir koji se koristi za izradu i dizajn web-aplikacija oslanjajući se na različite šablone. `reactstrap` je biblioetka koja sve mogućnosti Bootstrap okvira donosi u vidu React komponenti.

`socket.io-client`

Biblioteka koja se koristi za razvoj real-time web-aplikacija sa komunikacijom u realnom vremenu. Omogućava bidirekcione veze izmedju web klijenata i servera oslanjajući se na dogadjajem vodjene akcije. Primarno koristi WebSocket protokol.

`prop-types`

Jedna od popularnijih biblioetka koja se koristi u fazi razvoja softvera. Koristi se za dokumentovanje tipova argumenata (props) koji se prosledjuju komponentama React aplikacije. Prilikom renderovanja komponenti koje su obogaćene ovom bibliotekom uvodi se aktivna provera svih prosledjenih argumenata, poredjenje njihovih tipova sa zamišljenim i obaveštavanje programera ukoliko postoje neslaganja.

`react-notification-system`

Manje poznata biblioteka koja se koristi za generisanje asinhronih notifikacija koje najčešće obaveštavaju korisnika o neregularnim dogadjajima poput neuspele konekcije, problema ili nemogućnosti izvršenja nekih zahteva i slično.

`mongoose`

Najpopularnija biblioteka za modelovanje objekata MongoDB baze podataka. Dizajnirana je za rad u asinhronom okruženju. Pruža rešenje za modelovanje podataka zasnovano na šemama. Uključuje ugrađene type-casting, validaciju, pravljenje upita i drugo.

`passport` `passport-jwt`

Ova biblioteka predstavlja middleware za autentikaciju u Express okruženju. Jedina svrha ove biblioteke je da potvrdi autentičnost zahteva korišćenjem skupa dodataka zvanih strategije. Passport ne upravlja rutama, niti zavisi od šeme baze podataka, što dozvoljava maksimalnu fleksibilnost programeru da donosi odluke na nivou aplikacije.

Ostale manje relevantne biblioteke: `axios`, `bcrypt-nodejs`, `bluebird`, `body-parser`, `lodash`, `unserscore`, ...

Sve zavisnosti sa modulima i bibilotekama mogu se pogledati u datoteci `package.json`.




