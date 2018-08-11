# Arhitekturni dizajn softverskog sistema

## Layered (n-tier)

Arhitekturni stil koji se primenjuje nad celom strukturom aplikacije je Layered (slojeviti) obrazac. Komponente aplikacije su organizovane u horizontalne slojeve gde svaki sloj ima konkretnu ulogu i odgovornost. Svaki od slojeva formira abstrakciju oko uloge koju treba da sprovodi što doprinosi modularnosti. Jedna od glavnih prednosti primene ovog obrasca u našoj aplikaciji je razdvajanje briga izmedju komponenti, gde na primer, Klijentski sloj pregleda ne uzima u obzir način predstavljanja podataka već samo konkretne podatke koje treba da predstavi; sami podaci su ovom sloju dopremljeni u njemu odgovarajućem obliku.

![alt text][layered]

[layered]: images/layered.png

* *Server* - pozadisnki sloj koji enkapsulira bazu podataka i pristup (Node.js)
* *Reactive model* - sloj koji omotava (*wrapper*) celokupnu logiku pribavljanja podataka i manipulaciju njima
* *View* - sloj pogleda, interakcija sa korisnikom 

---

# Projektni obrasci
## Flux
**React** je JavaScript biblioteka za gradjenje korisničkih interfejsa i predstavlja okvir (*engl. framework*). React čini samo View sloj, donosno V iz MVC Model-View-Controller arhitekture jer je osnovna funkcija ove biblioteke označavanje i renderovanje HTML elemenata. React nudi šablonski jezik označavanja elemenata, pritom se bazira na komponentama što znači da se aplikacije grade kroz kompoziciju. Osnovni principi React-a su fleksibilnost, efikasnost i deklerativni kod.

### Flux kao arhitekturni obrazac
Obzirom da se React brine o V delu MVC-a, šta je pritom sa Modelom, odnosno M delom? **Flux** je arhitekturni obrazac koji vodi računa o Modelu. Ovo je arhitektura koja omogućava kreiranje **nivoa podataka (engl. data layer)** u JavaScript aplikacijama i koristi se u izradi klijentskih web-aplikacija. Flux upotpunjuje kompozitne View komponente React-a svojim **jednosmernim tokom podataka**. Flux ima četiri osnovne komponente:
* **Dispatcher** - prima akcije i emituje dogadjaje registrovanim komponentama
* **Stores** - centralizovana skladišta podataka u vidu container-a stanja aplikacije 
* **Controller Views** - komponente React-a koje oslikavaju stanje skladišta i propagiraju nižim komponentama
* **Actions** - akcije koje prenose podatke Dispatcheru

Razlika izmedju kontrolera u MVC obrascu je u tome što su kontroleri na samom vrhu hijerarhije i nazivaju se kao Controller Views. View predstavlja jednu React komponentu. Sama logika održavanja podataka je u skladištu i skladište govori Dispatcheru koje dogadjaje-akcije da osluškuje. Kada se konkretan dogadjaj desi, Dispathcer šalje takozvani *payload* iliti teret skladištu. Sada je na skladištu da izvrši promene stanja, koje će View na kraju oslikavati. Akcije koje mogu da se jave su predefinisane imenima ili tipovima.

**Jednosmerni tok podataka - flow** je striktno definisan Flux arhitekturom. Dispatcher zadaje pravila i izuzetke, dok u MVC obrascu postoji dvosmerna razmena podataka, ovde svi podaci idu kroz Dispatcher. Skladište ne može da se promeni samo od sebe, da bi došlo do promena moraju da se jave u vidu Akcija koje će proći kroz Dispathcer. **Skladište** (*engl. Store*) nudi centralizovan način čuvanja svih podataka koji su relevantni za aplikaciju. Kada je tok podataka jednosmeran, promene u View sloju okidaju akcije u sloju podataka - View sloj takodje prati i reflektuje ove promene, a da pritom ne pristupa sloju podataka direktno. 

![alt text][flux]

[flux]: images/flux-architecture.png

Komponente u Flux arhitekturi interaguju po principu magistrale dogadjaja. View propagira akcije kroz centralni Dispatcher, ove akcije mogu biti dalje propagirane u više skladišta. Svako skladište sadrži logiku i podatke koje opisuju trenutno stanje. Nakon promena stanja u skladištu dolazi do promena svih View-a koji oslikavaju to stanje. Ovaj tok dogadjaja je prilagodjen React-ovom okvirnom stilu gde skladište šalje promene do kojih je došlo bez navodjenja načina tranzicija izmedju prethodnog i novog stanja. Ovakav pristup omogućava jednosmeran tok podataka u arhitekturi, gde su akcija, Dispatcher, skladište i View odvojeni čvorovi sa konkretnim ulazima i izazima. Podaci teku kroz Dispatcher - središte arhitekture, koji se može smatrati centralnim registrom callback-ova na koji skladište odgovara. Promene skladišta su emitovane i prepoznate od strane Controller View komponenti.

Ovo nije generalizovani MVC koji se sreće u ostalim okvirima, medjutim postoje kontroleri ali su većinom Controller-View komponente. Pregledi (Views) su na vrhu hijerarhije, vuču podatke i funkcionalnosti i propuštaju ih svojoj deci. Flux strogo prati koncept jednosmernog toka podataka u kome podaci prate striktne putanje.
React se oslanja na Virtualni DOM za renderovanje promena, dok Flux prati korisnikove interakcije koje prouzrokuju akcije koje rezultuju promenama podataka. View sloj je zatim obavešten o nastalim promenama.

MVC obrazac se sastoji iz Modela koji vodi računa o predstavljanju podataka, View-a koji predstavlja Model i Kontrolora koji sluša korisnikove promene, menja Model i osvežava View. Glavni nedostatak MVC-a je skalabilnost jer porastom složenosti aplikacije Kontroleri postaju usko grlo i prevelikog su obima i složenosti. Kontroler ima zadatak da održava stanje aplikacije i podatke istovremeno. Takodje, kaskadne promene dovode do teškog uočavanja i otklanjanja grešaka - pa je prema ovome ponašanje aplikacija u odredjenim slučajevima nepredvidivo.

## React/Redux

![alt text][redux]

[redux]: images/redux-architecture.png

---

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
