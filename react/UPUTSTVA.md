Koristim Visual Studio Code kao editor, preporucujem da i vi to koristite,
lagan je i zgodan zbog terminala i ima podrsku za sve zajebancije oko JavaScripta.

Podelio sam pakete kao sto smo se dogovorili da bude u arhitekturnom modelu.
Frontend podelite na 'client-controller' i 'client-view' kako vam odgovara i naravno pazite da ne obrisete zahteve za autentifikaciju.

Build:
cd frontend
npm install
npm run build

cd reactive-model
npm install

cd server
npm install

pokretanje MongoDB servera, port: 27017

cd frontend
npm start

Valjda je to to, trebalo bi da radi.
