# Grupparbete - AirBean

Du ska bygga en webbapp där du kan beställa kaffe och få den levererad via drönare (drönare ingår ej i uppgiften).

**Figmaskiss:** https://www.figma.com/file/kXZaZLMYQzXzgC2k6o4ne0/AirBean-v.1.2---React?node-id=0%3A1

## Instruktioner

**För att få Godkänt ska du:**
* Gjort enligt Figma skissen
* Använder sig av Redux med en Redux store
* Gå att lägga till produkter i en varukorg
* I varukorgen ändra antal/ta bort produkter
* Hämta alla produkter med fetch
* Kunna skicka sin order och få ett svar med en ETA och ordernummer

**För att Väl Godkänt ska du:**
* Allt i godkänt
* Ha gjort tester för minst en komponent
* Det går att lägga till varukorgen i local storage samt hämta den därifrån

Inlämning är på Github i det repo som skapades via Github Classroom. Ta länken till ert repo och
lägg till som en kommentar på Ping Pong och lämna in uppgiften där senast **4 mars 2021 23:59**.


## Airbean API

Endpoint: `http://localhost:5000/api/beans`

Metod: `GET`

Beskrivning: För att hämta menyn

---

Endpoint: `http://localhost:5000/api/beans`

Metod: `POST`

Beskrivning: För att posta en beställning