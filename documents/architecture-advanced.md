# Arhitekturni dizajn softverskog sistema

## Layered (n-tier)

Arhitekturni stil koji se primenjuje nad celom strukturom aplikacije je Layered (slojeviti) obrazac. Komponente aplikacije su organizovane u horizontalne slojeve gde svaki sloj ima konkretnu ulogu i odgovornost. Svaki od slojeva formira abstrakciju oko uloge koju treba da sprovodi što doprinosi modularnosti. Jedna od glavnih prednosti primene ovog obrasca u našoj aplikaciji je razdvajanje briga izmedju komponenti, gde na primer, Klijentski sloj pregleda ne uzima u obzir način predstavljanja podataka već samo konkretne podatke koje treba da predstavi; sami podaci su ovom sloju dopremljeni u njemu odgovarajućem obliku.

![alt text][layered]

[layered]: images/layered.png

* *Server* - pozadisnki sloj koji enkapsulira bazu podataka i pristup (Node.js)
* *Reactive model* - sloj koji omotava (*wrapper*) celokupnu logiku pribavljanja podataka i manipulaciju njima
* *Redux state* - sloj za održavanje stanja aplikacije (state-managment) oslanja se na `react-redux` biblioteku
* *View* - sloj pogleda, interakcija sa korisnikom

**React** je JavaScript biblioteka za gradjenje korisničkih interfejsa i predstavlja okvir (*engl. framework*). React čini samo View sloj, donosno V iz MVC Model-View-Controller arhitekture jer je osnovna funkcija ove biblioteke označavanje i renderovanje HTML elemenata. React nudi šablonski jezik označavanja elemenata, pritom se bazira na komponentama što znači da se aplikacije grade kroz kompoziciju. Osnovni principi React-a su fleksibilnost, efikasnost i deklerativan kod oslanjajući se na **funkcionalno programiranje**.

Okvirom poput React-a se aplikacije grade od View-a. View je reprezentacija stanja aplikacije. Stanje, sa druge strane, predstavlja promenljiv skup podataka na kome se apliakcija bazira. Stanje se sastoji od **nepromenljivih objetakata**, prinicip poznat kao *Immutability*. Sloj domena se usko vezuje za sloj stanja i može se smatrati njegovim delom, opisuje model predstavljanja podataka i način korišćenja  istih.

**Redux state** sloj je zadužen za održavanje stanja aplikacije kroz jedinstveno Singleton **skladište** (store). React/Redux integracija je inspirisana Flux arhitekturom i u svojoj osnovi je modifikacija Observer obrasca. Odredjene komponente View-a oslikavaju stanje skladišta i imaju mogućnost otpremljenja akcija koje će rezultovati promene stanja, a zatim i refleksiju promene u View sloju gde god je potrebno.
 
**View layer** se sastoji od **prezentacionih (pure) i container (stateful) komponenti**. Prezentacione komponente se brinu o korisničkom interfejsu, odnosno kako stvari izgledaju, a container komponente o tome kako stvari funkcionišu.

* **Views** ili prezentacione komponente
  1. gradivni elementi korisničkog interfejsa
  2. mogu da sadrže ugnježdene prezentacione komponente i DOM elemente
  3. nemaju zavisnosti ka ostalim modulima aplikacije poput Redux-a
  4. ne definišu načine pribavljanja i mutiranja podataka
  5. primaju podatke i callback metode isključivo od komponenti više hijerarhije
  6. najčešće se pišu u vidu funkcionalnih komponenti
  7. retko poseduju stanja

* **Controller Views** ili container komponente
  1. orkestruju tok aplikacije i definišu funkcionalnosti
  2. mogu da sadrže prezentacione i container komponente, uglavnom ne poseduju DOM elemente
  3. doprimaju podatke prezentacionim komponentama
  4. ostvaruju zavisnost ka Redux-u u vidu poziva akcija i preslikvanja delova stanja
  5. često se generišu oslanjajući se na hoc komponente poput Redux-ovog connect() hoc-a
  6. poseduju stanja

Ovakvom podelom View komponenti imamo konceptualno odvajanje briga. Reupotrebljivost je znatno povećana obzirom da se ista prezentaciona komponenta može koristiti na više mesta u aplikaciji pritom oslanjajući se na različite izvore podataka za svoju prezentaciju. Prezentacione komponente mogu da se smatraju "paletom" aplikacije. Ovim pristupom se istiskuju komponente i kombinuju na različite načine.
 
---

# Projektni obrasci

## Flux arhitektura

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

## Backend: Publish and subscribe

Programiranje vođeno događajima (engl. Event-driven programming) je paradigma u programiranju u kojoj je tok programa određeno događajima kao što su akcije korisnika (klik mišem, pritiskanje tastera), senzor izlaza, ili porukama iz drugih programa / niti. Programiranje vođeno događajima je dominantna paradigma koja se koristi kod grafičkih korisničkih interfejsa i u drugim aplikacijama koje su usmerene da obavljaju pojedine radnje u odgovoru na korisnički unos.

**Publish and subscribe** je obrazac koji se koristi za razmenu poruka gde pošaljioci (publishers) ne navode konkretna odredišta poruka, odnosno primaoce (subscribers), već **kategorizuju poruke u klase** bez znanja da li uopšte ima primaoca. Slično tome, primaoci se registruju na konkretne klase i primaju poruke tih klasa kad god su poslate. Korišćenjem `publish–subscribe` obrasca razdvojene su poruke *na nivou sobe u kojoj se nalaze korisnici*.

### Publish and subscribe i socket.io

Upotreba publish and subscribe obrasca sa bibliotekom socket.io odrađena je na veoma jednostavan način. Svaka instanca publish and subscribe obrasca u biblioteci socket.io predstavlja se paradigmom *namespace*, što u suštini znači dodeljivanje različitih krajnjih tačaka ili putanja.

* Primer kreiranje namespace-a
```javascript
var nsp = io.of('/my-namespace');
```

U okviru jednog namespace-a, pošiljaoci poruka mogu da se prijave na poruke (subscribe), i šalju poruke (publish) koje će se proslediti svim prijavljenima (subscribers) na istom namespace-u, kao što i sam obrazac nalaže.

* Primer prijave na namespace (subscribe)
```javascript
nsp.on('connection', function(socket){
  console.log('someone connected');
});
```
* Primer slanje na namespace-u (publish)
```javascript
nsp.emit('hi', 'everyone!');
```

Kategorizacija poruka u klase izvršena je tako što se svakoj klasi dodeli identifikator na osnovu koga će se klase razlikovati, i time svaka poruka poslata u okviru jedne klase će biti prosleđena samo prijavljenima na toj klasi.

* Primer prijave u okviru klase (subscribe)
```javascript
nsp.on('connection', function(socket){
  socket.on('classA', function(msg){
    print(msg) // hello classA!
  });
  socket.on('classB', function(msg){
    print(msg) // hello classB!
  });
});
```
* Primer slanje u okviru klase (publish)
```javascript
nsp.emit('classA', 'hello classA!');
nsp.emit('classB', 'hello classB!');
```

U aplikaciji structured iskorišćene su dve instance publish and subscribe obrasca sa svojim klasama:
* **chat**
  * chat message
  * *roomname*
* **graph**
  * get graph
  * *mastername*
  * graph
  * *username*
  * graph change
  * *roomname* graph change ...

## React/Redux Observer

![alt text][redux]

[redux]: images/redux-architecture.png

Osnovni elementi priloženog dijagrama pripadaju odvojenim celinama - React-u i Redux-u. Redux čine servisi, akcije, kreatori akcija (*action creators*), svoditelji (*reducers*) i selektori. Šabloni (*templates*) i komponente predstavljaju React. Container je deo koji dozvoljava labavo spajanje ovih razdvojenih delova, dozvoljavajući individualne promene. Stanje aplikacije se nalazi u jednom centralnom skladištu - store, za raziku od više skladišta koja mogu da budu deo Flux arhitekture. Kada se stanje u skladištu promeni, ove promene preslikane su preko Container-a do samog View-a što znači ponovno **rerenderovanje** kritičnih elemenata DOM-a.

Postoji nekoliko temeljnih razlika izmedju Redux-a i Flux arhitekture. Pre svega, Redux je JavaScript biblioteka i koristi se kao middleware u React/Redux obrascu. Akcije kao koncept postoje na obe strane, medjutim akcije u Redux-u mogu pored JavaScript objekata da budu funkcije i obećanja. Konvencija Flux-a dozvoljava više skladišta od kojih je svako Singleton objekat, sa druge strane, Redux preporučuje samo jedno skladište koje je interno izdeljeno po domenima podataka. Redux ne poseduje Dispatcher, mehanizam otpremljivanja akcija je integrisan u skladište u vidu prostog **API-a oko skladišta**. U Flux arhitekturi sama logika promene stanja aplikacije u odnosu na nastalu akciju nalazi se uokviru skladišta, Redux se u ovom segmentu oslanja na svoditelje (reducers). Kada je akcija otpremljena kroz API skladišta, namenjeni reducer se poziva i menja stanje, odnosno skladište. Skladište Redux-a je **nepromenljivo (immutable)**, ovo je omogućeno korišćenjem funkcija bez bočnih efekata kao svoditelje, svoditelji menjaju kopiju prethodnog stanja koje primaju kao argumenat, i vraćaju promenjenu kopiju kao rezultat.

Komponente u React-u su renderovane i odredjene skupom atributa *props*, ovi atributi su prosledjeni od strane komponenti višeg nivoa hijerarhije. U ovom slučaju komponenta najvišeg nivoa označena je kao **Template**, jedina svrha ove komponente je da preko mehanizma prosledjivanja atributa dostavi neophodne atribute za interakciju sa Redux-om svim nižim komponentama aplikacije. **Container komponenta** luži za spajanje neke od komponenti nižeg nivoa sa Redux modulom. Uzima tri argumenta: objekat koji mapira **stanje** u props, objekat koji mapira **akcije koje mogu da se otpreme (dispatch)** u props i poslednji objekat koji omogućava sklapanje novih atributa i preslikavanje istih na konkretnu React komponentu.

Akcija je objekat koji sadrži tip akcije i stanje koje je promenjeno zbog akcije. Kretori akcija su kod koji se poziva da bi se otpremila (dispatch) konkretna akcija, koja na kraju rezultuje pozivom svoditelja (reducer) koji menja stanje skladišta. Akcija se može tumačiti kao dogadja koji se javlja, pritom se uz dogadjaj vezuje njegov tip i svi podaci koji su relevantni za dalje odvijanje.
Korišćenjem connect mogućnosti Redux modula **akcije i segmenti stanja mapiraju se na props atribute React komponenti.**

Prilikom svake akcije koja je otpremljena (dispatched) konkretan svoditelj (reducer) je pozvan i dodeljena mu je ta akcija. Parametri reducera su akcija koja je pozvana i prethodno stanje, **reazultat svoditelja je novo stanje**. U zavinosti od spektra akcija koje su dostupne nad skaldištem treba da postoje svoditelji koji su namenjeni svakoj od njih. Bitan aspekt Redux-a je da se postojeće stanje ne modifikuje, već se novo stanje formira i zamenjuje prethodno iz skladišta.

### Povezivanje React aplikacije sa Redux-om
Napravljeno skladište treba dostaviti komponentama. Ovde se koristi komponenta `Provider` iz `react-redux` biblioteke koja dostavlja skladište svim komponentama nižeg nivoa.

```javascript
const store = createStore(structured, {})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-node')
)
```

Kada je skladište dostavljeno aplikaciji preostaje samo **povezivanje komponenti sa skladištem**. Redux ne dozvoljava direktan pristup i manipulaciju skladišta po dizajnu. Mogu se pribavljati podaci *preuzimanjem trenutnog stanja* ili *otpremiti akcije* koje zahvaljujući svoditeljima menjaju stanje.
Za ovu svrhu koristi se `connect` funckija `react-redux` biblioteke.

```javascript
const mapStateToProps = state => {
  return {
    segment: state.something
  }
}

const mapDispatchToProps = dispatch => {
  return {
    someAction: () =>
      dispatch({
        type: 'SOME_ACTION_TYPE'
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WrappedComponent)
```

`mapStateToProps` i `mapDispatchToProps` su čiste funckije bez bočnih efekata kojima se preslikavaju stanje skladišta i moguće akcije. Ključevi objekata koje ove funkcije vraćaju su preslikani na props komponente koja je njom obuhvaćena - `WrappedComponent`.

### Model redux-store

```json
--state
----auth
------token
------username
------error
------waiting
------authRedirectPath

----user
------username
------friends
--------array[]
------requests
--------array[]
------error

----notification
------message
------level
------autoDismiss
------action
------onRemove

----room
------rooms
--------array[]
------room
--------name
--------master
--------data
----------users
------------array[]
----------_id
----------name
----------currentUsers
------------array[]
----------maxUsers
----------createdBy
----------time
----------__v
```

## Composition

Kompozicija je u React-u veoma istaknuta i dozvoljava fleksibilno sklapanje komponenti. Svaka komponenta poseduje `children` prop preko koga se pristupa svim komponentama koje su ugnježdene uokviru nje. Ovim pristupom se bolje izoluju komponente i formiraju različite kompozicije bez dupliranja koda.

Na primeru soba različitih tipova toolbarova navbar elementi se dinamički "ubrizgavaju" i mogu da budu različitih tipova. Vrši se kompozicija `Room` komponenti sa elementima tipa `toolbar-master`, `toolbar-spectator`, `toolbar-compete`, `toolbar-compete-spectator` i `toolbar-learn` u zavisnosti od tipa sobe u kojoj je korisnik i njegovih privilegija.

![alt text][toolbar]

[toolbar]: images/toolbar.png

```jsx
<Wrapper>
                {this.props.room.master
                    ? <WrappedComponent {...this.props}>
                        <ToolbarMaster ...shared props
                                randomGraph={this.props.randomGraph}                       
                                algorithmBreadth={this.props.algorithmBreadth}
                                algorithmDepth={this.props.algorithmDepth}

                        />
                      </WrappedComponent>
                    : <WrappedComponent {...this.props}>
                        <ToolbarSpectator ...shared props
                        />
                      </WrappedComponent>
                }
                </Wrapper>
```

Na primeru `Toolbar` komponente. Uvek su prikazani logo i navigacioni elementi.  
```jsx
const toolbar = (props) => (
    <header className="Toolbar">
        <Logo />
        <NavigationItems />
        {props.children}
        ...
    </header>
);
```
`Dropdown` je komponenta koja se prosledjuje kao dete i dinamički se vrši kompozicija po potrebi.
```jsx
<Toolbar props...
    <Dropdown showRequests={(event) => this.showRequestsHandler(event)}
              hideRequests={(event) => this.showRequestsHandler(event)}
              ...
    />
</Toolbar>
```


## Decorator: Higher-order components

*Higher-order komponente (hoc)* se koriste za **poboljšavanje i kompoziciju** komponenti njihovim *omotavanjem* što podseća na Decorator obrazac. Hoc je najčešće funkcija koja kao argumenat prima komponentu, obogaćuje je, i vraća kao rezultat novu dekorisanu komponentu. Za Hoc komponentu je neophodno da renderuje komponentu koju obuhvata i da joj prosledi sve originalne props atribute. Sve nakon ovoga predstavlja dekoraciju, odnosno proširivanje osnovne komponente. Hoc komponentom se kontroliše ulaz pa se u vidu props atributa obuhvaćenoj komponenti može proslediti entitet ili skup podataka kome inicijalno nema pristup. Glavna prednost hoc-a je **uvodjenje logiku u dekoraciju** i **propagiranje logike** u vidu props atributa obuhvaćene komponente.

Primer Decorator Higher-order komponente je `withIO`. Ovaj Decorator osnovnu komponentu `WrappedComponent` obogaćuje funkcionalnostima socket.io biblioteke. Lifecycle metode su predefinisane za uspostavljanje WebSocket-a, a metoda poput `addNodeIO(node)` je pridoata logika u vidu props atributa `addNodeIO`.
```javascript
function withIO (WrappedComponent) {
    return class extends React.Component {
        socket = null;

        componentWillMount() {
            this.socket = this.props.io('http://localhost:2998/graph');
            this.socket.on('connect', () => {
                console.log(this.props.username, 'websocket::opened');
            });
            this.socket.on('disconnect', () => {
                console.log(this.props.username, 'websocket::closed');
            })
        }

        componentWillUnmount() {
            this.socket.close();
        }

        addNodeIO = (node) => {
            this.socket.emit('add node', {
                room: this.props.data.name,
                sender: this.props.username,
                node: node
            });
        };
        ...
        
        render() {
            return (
                <WrappedComponent addNodeIO={this.addNodeIO}
                                  ...
                                  {...this.props}
                                />
            );
        }
}
```

Kompozicija i dekoracija su najviše primenjene na `Room` komponentu. Inicijalno ova komponenta nema previše funkcionalnosti osim gradivnog koriničkog interfejsa i odvojeniih containera za predstavljanje chata, grafa i navbara. Dekoratorima se dobija znatno kompleksnija komponenta bez dupliranja koda i mogućnosti ponovne upotrebe hoc dekoratora.

U konkretnom primeru dekorator `withPlaygroud` se koristi za gradjenje soba `practice` tipa i dinamiči dodeljuje privilegije i dozvoljene aktivnosti u vidu elemenata navbara `Room` komponenti, sve to u zavisnosti od statusa korisnika. Ako je korisnik `master` sobe u kojoj se nalazi dobiće dodatne privilegije. `withPlaygroud` je pritom hoc koji se oslanja na metode koje su prethodno propaginare od strane `withIO` i `withGraph` dekoratora. Pored `withPlayground` dekoratora od ključne su važnosti i dekoratori `withCompete` i `withLearn`. Ova tri hoc-a se koriste za formiranje soba različitih tipova i shodno tipu soba se oslanja na različite mogućnosti i atribute. `withAlgorithm` dekorator dodaje mogućnost vitualizacija različitih algoritama, mogućnot koja je potrebna samo u sobama `practice` tipa.

```javascript
export const RoomPlayground = withRouter((withRedux (withIO (withGraph (withAlgorithm (withPlayground (Room)))))));
export const RoomCompete = withRouter((withRedux (withIO (withGraph (withCompete (Room))))));
export const RoomLearn = withRouter((withRedux (withGraph (withLearn (Room)))));
```

## Dependency injection

Moduli i komponente poseduju zavinosti (dependency), upravljanje ovim zavisnostima je od krucijalne važnosti. Kada je konkretna zavinost ka nekom izvoru potrebna samo na jednom nivou dubine, ubrizgavanje, odnosno *injection*, može se ostvariti prethodno pomenutim obrascem oslanjajući se na hoc kao posrednik. Kada je medjutim zavisnost potrebna na više nivoa dubine i kada više različitih komponenti treba da se obraća istom itvoru koristi se `context` mogućnost React-a. Inicijalizacija konteksta je prvi korak.

```javascript
import { createContext } from 'react';

const Context = createContext({});

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;
```
`createContext` vraća objekat koji poseduje `.Provider` i `.Consumer` atribute. `Provider` klasa pridodaje konteksne vrednosti preko `value` prop-a. `Consumer` klasa pristupa prethodno dodatim konktekstnim vrednostima.

Konktekst na primeru ubrizgavanja iste socket.io instance kroz sve module. 

```javascript
import * as io from 'socket.io-client'
const context = io();

class App extends React.Component {
  render() {
    return (
      <Provider value={context}>
        ...
      </Provider>
    );
  }
};
```

Obzirom da je inicijalizacija izvršena u korenoj komponenti, sve ostale komponente imaće pristup kontekstu ukoliko se koristi ukoviru tagova `<Consumer>` i `</Consumer>`.

## Builder

**Builder** obrazac koristi se za enkapsulaciju gradjenja kompleksnih objekata tokom vremena, delegiranjem zahteva na niže nivoe. `graphProto` poseduje metode za gradjenje globalnog objekta `graph` na koji se istovremeno oslanja više komponenti. Cilj primene je razdvajanje kreiranja objekta od reprezentacije. `graphProto` se može smatrati `concreteBuilder` implementacijom, nema potrebe za `Builder` abstrakcijom u vidu interfejsa obzirom da se ne grade druge strukture podataka. Interno `graphProto` koristi `Factory` obrazac za kreiranje delova objekata.

#### Factory

**Factory** obrazac u JavaScript-u se koristi za odvajanje kreacije objekata od ostatka koda. U situacijama kada je proces kreiranja varijabilan ili kompleksan treba uspostaviti bafer u vidu Factory-a. Najprostiji Factory enkapsulira kreiranje nekog objekta, metode za kreiranje mogu da budu parametrizovane. Rezultat je Product objekat, u slučaju različitih tipova očekuju se da ovi objekti imaju konzistentan interfejs. Factory obrazac kao glavnu prednost ima centralizovano i konzistentno kreiranje objekata.

```javascript
export const graphFactory = () => {
    let graph = {};
    
    const graphProto = {
        contains: (node),
        addVertex: (vertex),
        addVertexRandom: (),
        removeVertex: (node),
        addEdge: (nodeOne, nodeTwo),
        removeEdge: (nodeOne, nodeTwo),
        getGraph: (),
        getVertex: (node),
        getNumVertices: ()
   }
   
   return Object.create(graphProto)
}
```

## Strategy

`algorithm`
 - `breadthFirstSearch`
 - `breadthFirstSearch ? observable`
 - `depthFirstSearch`
 - `depthFirstSearch ? observable`
 
#### Algoritmi

Nov algoritam se može dodati kroz `strategy` u dva oblika:
 - `algorithmName`
 - `algorithmName ? observable`

`algorithmName` kao rezultat vraća niz obidjenih/relevantnih čvorova. `algorithmName ? observable` je proširenje ovog algoritma koje za ` observable === true` vraća niz koraka koji predstavljaju stanje grafa. Koraci moraju da budu modelovani u obliku:
```json
{
  visited: [string],
  solution: [string],
  tempVertex: string,
  unvisitedVertex: string,
  algorithmLine: string,
  structure : [string],
}
```

`visited` kao niz posećenih čvorova, `solution` kao rešenje, `tempVertex`/`unvisitedVertex` mogu da predstavljaju različite čvorove u etapama algoritma. `algorithmLine` trenutnu aktivnu liniju pseudo koda koji predstavlja algoritam i `structure` sadržaj pomoćne strukture poput reda ili steka.
Ova dva različita oblika koriste se odvojeno u `practice` i `compete` sobama.

### Observable/Iterator

Obrazac `observable` koristi se kod vizualizacija algoritama nad grafom u veoma prostom obliku, oslanjajući se na biblioteku `rxjs`. Ima ulogu `iteratora` nad *nizom stanja* u kojima se graf nalazi u toku izvršavanja konkretnog algoritma, *generisanim pomenutim `observable` varijantama algoritama*.

```javascript
algorithmVisualize = () => {
            ...
            const source$ = interval(1000);
            source$.pipe(takeWhile(async => this.state.algorithmState.active))
                .subscribe(async => this.algorithmNextState());
        };
```

`rxjs` se retko koristi uz React.js zbog već postojećeg dinamičkog `react-redux` state managment-a. Medjutim, u aplikaciji se stanje grafa ne održava kroz `redux-store` i to ostavlja prostora za reaktivno programiranje uz `rxjs`.

> Reactive Programming with rxjs
> ReactiveX provides a collection of operators with which you can filter, select, transform, combine, and compose Observables. This allows for efficient execution and composition.
> You can think of the Observable class as a “push” equivalent to Iterable, which is a “pull.” With an Iterable, the consumer pulls values from the producer and the thread blocks until those values arrive. By contrast, with an Observable the producer pushes values to the consumer whenever values are available. This approach is more flexible, because values can arrive synchronously or asynchronously.

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
