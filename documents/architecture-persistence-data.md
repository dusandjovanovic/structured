# Model perzistencije i podataka

## Model perzistencije

Zbog kompatibilnosti unutar MEAN (MongoDB, Express, Angular, Node.js) stack-a kao i pogodnosti koje pruža zahvaljujući svojoj asinhronoj prirodi odabrali smo MongoDB. Ne-striktno struktuirana priroda podataka koje čuvamo zahtevala je implementaciju noSQL baze podataka, a MongoDB se pozicionirala kao standard na ovom polju.

Šema baze mapirana je pomoću *Mongoose modula* za objektno modeliranje. Pošto se mapiranje izvršava jako brzo, format u kome čuvamo podatke o strukturama mapiran je na osnovu formata koji koristi biblioteka za vizualizaciju, kako bi se izbegle nepotrebne konverzije pri svakom pristupu bazi. Pri postupku mapiranja odabrali smo pristup pomoću ugnježdenih šema.

```javascript
var nodeSchema = new schema({
    id : Number,
    index : Number,
    linkCount : Number,
    vx : Number,
    vy : Number,
    x : Number,
    y : Number
});

var edgeSchema = new schema({
    index: Number,
    source: [nodeSchema],
    target: [nodeSchema]
});
var graphSchema = new schema({
    edges : [edgeSchema],
    lastIndex: Number,
    nodes : [nodeSchema]
});
```

## Model podataka

Modeli podataka za rute:

```GET /graph```
Ruta koja vraca graf

```POST /graph```
Ruta koja prosleduje trenutni graf

..preostale rute biće dodate u kasnijim fazama implementacije.
