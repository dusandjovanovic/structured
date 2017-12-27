Model perzistencije i podataka

Model perzistencije

Zbog kompatibilnosti unutar MEAN (MongoDB, Express, Angular, Node.js) stack-a kao i pogodnosti koje pruža zahvaljujući svojoj asinhronoj prirodi odabrali smo MongoDB. Ne-striktno struktuirana priroda podataka koje čuvamo zahtevala je implementaciju noSQL baze podataka, a MongoDB se pozicionirala kao standard na ovom polju.

Sema baze mapirana je pomocu mongoose modula za objektno modeliranje. Poöto se mapiranje izvröava jako brzo, format u kome cuvamo podatke o strukturama mapiran je na osnovu formata koji koristi biblioteka za vizualizaciju, kako bi se izbegle nepotrebne konverzije pri svakom pristupu bazi. Pri postupku mapiranja odabrali smo pristup pomocu ugnjeûdenih öema.

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


Model podataka

Modeli podataka za rute:

GET /graph
ruta koja vraca graf

POST /graph
ruta koja prosleduje trenutni graf