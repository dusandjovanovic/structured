# Model komunikacije
## Socket.IO
Za komunikaciju se koristi **WebSocket** komunikacioni protokol koji obezbedjuje dvosmerne komunikacione kanale izmedju dve strane pomoću jedne TCP konekcije. Za implementaciju modela koristi se **Socket.IO** JavaScript biblioteka.


Za ostvarivanje realtime komunikacije između klijenata iskorišćena je Socket.IO javascript biblioteka. Ova biblioteka omogućava krajnje jednostavnu implementaciju komunikacije koja se realizuje pomoću dve komponente, serverske (izvršava se u Node.js-u) i klijentske (izvršava se u browser-u). Socket.io forsira upotrebu WebSocket protokola, koji omogućava interakciju između browser-a i server-a sa manjim overhead-om, obezbeđivanjem standardizovanog načina da server šalje podatke klijentu bez prosleđivanja zahteva od strane klijenta, kao i omogućavanjem da se poruke šalju bidirekciono bez zatvaranja konekcije. Iako se može koristiti i kao wrapper za WebSocket protokol sa jednostavnim i intuitivnim API-jem, Socket.IO omogućava i veliki broj dodatnih funkcionalnosti koje olakšavaju implementaciju našeg projekta, među kojima se izdvajaju emitovanje podataka na više soketa kao i čuvanje podataka vezanih za svaki od klijenata.

![alt text][communication]

[communication]: architecture/diagram-communication-model.png

Prilikom uspostavljanja komunikacije izmedju serverske (backend) i klijentske (frontend) strane postoje različite rute za prosledjivanje konkretnih poruka. Sadržaj poruke je jedinstven i daje informacije o daljem toku dogadjaja.

`new-message`

`{
 text: string
 self: boolean
 time: date
 }`
 
Ruta koja se koristi za razmenu chat poruka. Sadrzaj poruke je JavaScript objekat koji se prenosi izmedju obe strane i sastoji se od tekstualnog sadrzaja poruke, informacije o posaljiocu i vremena slanja. Poruka je pre svega dodata u listu poruka izvornog kontrolera, a za tim poslata serveru. Kada server primi poruku po ovoj ruti broadcastovana je svim konekcijama osim izvorne, odnosno konekcije sa koje je stigla sama poruka.


`new-node`

`{
 node: number
 linkCount: number
 }`
 
Za realizaciju funkcionalnosti dodavanja cvorova i emitovanje promena ostalim klijentima koristi se ruta new-node. Sadrzaj poruke je JavaScript objekat koji sadrzi vrednost cvora koji se dodaje u graf, kao i broj veza. Prilikom dodavanja novog cvora izvrsava se promena lokalne strukture grafa kod klijenta koji vrsi izmene, nakon cega se asinhronim upisom obezbedjuje perzistencija podataka. Zatim, kontroler klijenta salje zahtev serveru, koji emituje novonastalu promenu svim povezanim klijentima.

![alt text][node]

[node]: architecture/activity-user-adds-node.png


`new-edge`

`{
 source: number
 target: number
 }`
 
Analogno gorenavedenoj komunikacionoj ruti za dodavanje novog cvora izvrsava se i dodavanje novog potega u graf. Sadrzaj poruke je JavaScript objekat koji sadrzi vrednosti izvornog i odredisnog cvora koje taj poteg povezuje.
Prilikom obrade zahteva na serverskoj strani emituje se novonastala promena svim preostalim klijentima. Svaki kontroler klijenta ima metodu koja se poziva prilikom pristizanja konkretne poruke.
