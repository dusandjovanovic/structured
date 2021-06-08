## structured

Web application for realtime collaborative **graph visualization**. Supports **continuous algorithm simulations** for multiple users at the same time. Made possible with MERN, this stack consists of MongoDB, Express, **React w/ Redux, and Node.js**.

### `npm start`

To run frontend in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.<br>

### `cd backend && npm run local`

To run server in development mode.<br>
API will be accessible at [http://localhost:8080](http://localhost:8080) and socket-io entry point will be open on port `65080`. Optionally rename `.env.sample` to `.env` for establishing custom MongoDB cluster connection, otherwise make sure you have `mongod` instance running locally.

### `cd backend && npm start`

To run server with a daemon process manager suitable for production environment.<br>
Application is sustainable online with this configuration. Runs in multiple instances with auto-restart capability. Logging is available in realtime.

## Folder Structure

```
/
  README.md
  node_modules/
  public/
    index.html
    mainfest.json
    ...
  src/
    assets/
    components/
    containers/
    hoc/
    store/
    utils/
    App.js
    App.test.js
    package.json
    ...
  backend/
    README.md
    node_modules/
    app/
    config/
    public/
    test/
    ...
```
![alt text][screenshot_intro]

[screenshot_intro]: documents/images/screenshot_intro.png

![alt text][screenshot_playground]

[screenshot_playground]: documents/images/screenshot_playground.png

![alt text][screenshot_algorithm]

[screenshot_algorithm]: documents/images/screenshot_algorithm.png

![alt text][screenshot_dashboard]

[screenshot_dashboard]: documents/images/screenshot_dashboard.png

## Architecture (Serbian)

### Layered (n-tier)

Arhitekturni stil koji se primenjuje nad celom strukturom aplikacije je Layered (slojeviti) obrazac. Komponente aplikacije su organizovane u tri sloja.

![alt text][layered]

[layered]: documents/images/layered.png

* *Server* - pozadisnki sloj (Node.js)
* *Reactive model* - sloj koji omotava logiku pribavljanja podataka
* *Redux state* - sloj za održavanje stanja aplikacije (state-managment) oslanja se na `react-redux`
* *View* - sloj pogleda, interakcija sa korisnikom

### Backend: Publish and subscribe

**Publish and subscribe** metoda se koristi za razmenu poruka gde pošaljioci (publishers) ne navode konkretna odredišta poruka, odnosno primaoce (subscribers), već **kategorizuju poruke u klase** bez znanja da li uopšte ima primaoca. Slično tome, primaoci se registruju na konkretne klase i primaju poruke tih klasa kad god su poslate.


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

Na primeru soba različitih tipova toolbarova navbar elementi se dinamički "ubrizgavaju" i mogu da budu različitih tipova. Vrši se kompozicija `Room` komponenti sa elementima tipa `toolbar-master`, `toolbar-spectator`, `toolbar-compete`, `toolbar-compete-spectator` i `toolbar-learn` u zavisnosti od tipa sobe u kojoj je korisnik i njegovih privilegija.

![alt text][toolbar]

[toolbar]: documents/images/toolbar.png

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
<Toolbar>
    <Dropdown showRequests={(event) => this.showRequestsHandler(event)}
              hideRequests={(event) => this.showRequestsHandler(event)}
              ...
    />
</Toolbar>
```

## Dekoratori: Higher-order components

*Higher-order komponente (hoc)* se koriste za **poboljšavanje i kompoziciju** komponenti njihovim *omotavanjem*. Hoc komponentom se kontroliše ulaz pa se u vidu props atributa obuhvaćenoj komponenti može proslediti entitet ili skup podataka kome inicijalno nema pristup. Glavna prednost hoc-a je **uvodjenje logiku u dekoraciju** i **propagiranje logike** u vidu props atributa obuhvaćene komponente.

Primer Higher-order komponente je `withIO`. Ovaj Decorator osnovnu komponentu `WrappedComponent` obogaćuje funkcionalnostima socket.io biblioteke. Lifecycle metode su predefinisane za uspostavljanje WebSocket-a, a metoda poput `addNodeIO(node)` je pridoata logika u vidu props atributa `addNodeIO`.

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
export const RoomPlayground = connect(mapStateToProps, mapDispatchToProps)(
  withIO(
    withGraph(
     withAlgorithm(
      withPlayground(withStyles(styles)(withErrorHandler(Room))))
    )
  )
);

export const RoomCompete = connect(mapStateToProps, mapDispatchToProps)(
  withIO(
    withGraph(
      withCompete(
        withStyles(styles)(withErrorHandler(Room)))
    )
  )
);

export const RoomLearn = connect(mapStateToProps, mapDispatchToProps)(
  withGraph(
    withLearn(
      withStyles(styles)(withErrorHandler(Room))
    )
  )
);
```

### Strategy

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

`Observables` se koriste kod vizualizacija algoritama nad grafom u veoma prostom obliku, oslanjajući se na biblioteku `rxjs`. Ima ulogu `iteratora` nad *nizom stanja* u kojima se graf nalazi u toku izvršavanja konkretnog algoritma, *generisanim pomenutim `observable` varijantama algoritama*.

```javascript
algorithmVisualize = () => {
    ...
    const source$ = interval(1000);
    source$.pipe(takeWhile(async => this.state.algorithmState.active))
        .subscribe(async => this.algorithmNextState());
};
```

`rxjs` se retko koristi uz React.js zbog već postojećeg dinamičkog `react-redux` state managment-a. Medjutim, u aplikaciji se stanje grafa ne održava kroz `redux-store`.
