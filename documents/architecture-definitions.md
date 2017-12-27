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