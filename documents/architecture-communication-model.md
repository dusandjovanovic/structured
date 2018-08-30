# Model komunikacije
## Socket.IO
Za komunikaciju se koristi **WebSocket** komunikacioni protokol koji obezbedjuje dvosmerne komunikacione kanale izmedju dve strane pomoću jedne TCP konekcije. Za implementaciju modela koristi se **Socket.IO** JavaScript biblioteka.


Za ostvarivanje realtime komunikacije između klijenata iskorišćena je Socket.IO javascript biblioteka. Ova biblioteka omogućava krajnje jednostavnu implementaciju komunikacije koja se realizuje pomoću dve komponente, serverske (izvršava se u Node.js-u) i klijentske (izvršava se u browser-u). Socket.io forsira upotrebu WebSocket protokola, koji omogućava interakciju između browser-a i server-a sa manjim overhead-om, obezbeđivanjem standardizovanog načina da server šalje podatke klijentu bez prosleđivanja zahteva od strane klijenta, kao i omogućavanjem da se poruke šalju bidirekciono bez zatvaranja konekcije. Iako se može koristiti i kao wrapper za WebSocket protokol sa jednostavnim i intuitivnim API-jem, Socket.IO omogućava i veliki broj dodatnih funkcionalnosti koje olakšavaju implementaciju našeg projekta, među kojima se izdvajaju emitovanje podataka na više soketa kao i čuvanje podataka vezanih za svaki od klijenata.

![alt text][communication]

[communication]: architecture/diagram-communication-model.png

## Model podataka poruka

Prilikom uspostavljanja komunikacije izmedju reactive-model i klijentske (frontend) strane postoje različite rute za prosledjivanje konkretnih poruka.
Možemo razlikovati dve vrste poruka koje se prosleđuju, na osnovu toga čemu te poruke služe:
* **Chat poruke**
* **Graph poruke**

### Model podataka chat poruka

**`chat message`**
```javascript
{
  room: String,
  sender: String,
  msg: String
}
```
Prosleđuje se kada korisnik pošalje chat poruku ostalim korisnicima.

### Model podataka graph poruka

**`get graph`**
```javascript
{
  masterName: String,
  username: String
}
```
Prosleđuje se master korisniku sobe kada korisnik uđe u sobu da bi mu master poslao graf sobe.

**`graph`**
```javascript
{
  username: String,
  graph: Graph
}
```
Prosleđuje se korisniku koji je ušao u sobu koja sadrži trenutni graf sobe.

**`graph change`**
```javascript
{
  room: String,
  graph: Graph
}
```
Prosleđuje se svim korisnicima sobe kada master korisnik generiše novi graf.

**`add node`**
```javascript
{
  room: String,
  sender: String,
  node: Node
}
```
Prosleđuje se svim korisnicima sobe kada neki korisnik doda čvor.

**`remove node`**
```javascript
{
  room: String,
  sender: String,
  node: Node
}
```
Prosleđuje se svim korisnicima sobe kada neki korisnik ukloni čvor.

**`add edge`**
```javascript
{
  room: String,
  sender: String,
  edge: Edge
}
```
Prosleđuje se svim korisnicima sobe kada neki korisnik doda poteg.

**`remove edge`**
```javascript
{
  room: String,
  sender: String,
  edge: Edge
}
```
Prosleđuje se svim korisnicima sobe kada neki korisnik ukloni poteg.

**`compete begin`**
```javascript
{
  room: String,
  agName: String,
  root: Number
}
```
Prosleđuje se svim korisnicima sobe kada master korisnik započne compete mod.

**`compete end`**
```javascript
{
  room: String,
  user: String,
  score: Number
}
```
Prosleđuje se svim korisnicima sobe kada korisnik koji šalje poruku završi sa algoritmom.

**`algorithm begin`**
```javascript
{
  room: String,
  agName: String,
  agIterations: Number,
  root: Number
}
```
Prosleđuje se ...

**`algorithm end`**
```javascript
{
  room: String
}
```
Prosleđuje se ...

**`master changed`**
```javascript
{
  room: String,
  master: String
}
```
Prosleđuje se svim korisnicima sobe kada master napusti sobu i dodeli se novi master. Informativna poruka.

**`join and leave room`**
```javascript
{
  room: String,
  msg: String
}
```
Prosleđuje se svim korisnicima sobe kada novi korisnik upadne u sobu ili kada neki korisnik napusti sobu. Informativna poruka.

**`delete room`**
```javascript
{
  room: String
}
```
Prosleđuje se...
