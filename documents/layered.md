## Layered (n-tier)

Arhitekturni stil koji se primenjeje nad celom strukturom aplikacije je Layered (slojeviti) obrazac. Komponente aplikacije su organizovane u horizontalne slojeve gde svaki sloj ima konkretnu ulogu i odgovornost. Svaki od slojeva formira abstrakciju oko uloge koju treba da sprovodi što doprinosi modularnosti. Jedna od glavnih prednosti primene ovog obrasca u našoj aplikaciji je razdvajanje briga izmedju komponenti, gde na primer, Klijentski sloj pregleda ne uzima u obzir način predstavljanja podataka već samo konkretne podatke koje treba da predstavi; sami podaci su ovom sloju dopremljeni u njemu odgovarajućem obliku.

![alt text][layered]

[layered]: images/layered.png

* *Server* - pozadisnki sloj koji enkapsulira bazu podataka i pristup (Node.js)
* *Reactive model* - sloj koji omotava (*wrapper*) celokupnu logiku pribavljanja podataka i manipulaciju njima
* *Client controller* - sloj koji prima naredbe od pogleda i zadaje konkretne direktive nižim slojevima
* *Client view* - sloj pogleda, interakcija sa korisnikom 

---

Iz priloženog se može videti da postoji sličnost sa Model-View-Controller obrascem, medjutim struktuiranost je slojevita. Konkretna primena **MVC** obrasca je prisutna nad komponentama front-end strane, što je uslovljeno dizajnom same strukture Angular frameworka. Za sinhronizaciju više korisnika je primenjen **Observer** obrazac.

### Server

...

### Reactive model

...

### Client controller

...

### Client view

...
