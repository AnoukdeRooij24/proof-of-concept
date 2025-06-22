<!-- Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md) -->

# PokeApp
<!-- Geef je project een titel en schrijf in één zin wat het is -->
![image](https://github.com/user-attachments/assets/a1140b56-8d64-4331-9915-6901cb3511e0)

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

Zie [hier](https://proof-of-concept-nlhk.onrender.com/) de live site.
Ik heb een Pokedex gemaakt waarop je informatie van pokemon kan vinden. Hier kan je op een pokemon zoeken, je kan een pokemon opslaan en je kan de informatie vinden. 
De informatie die te vinden is van de pokemon gaat over de pokemon zelf, de stats en de evolutions. Dit heb ik aan de hand van de volgende Must haves lijst opgeleverd van de opdrachtgever gedaan.

### ✅ Must

- [ ] De gehele pagina is mobile-first opgezet (RAP/PE).
- [ ] De gebruiker ziet een lijst met alle Pokémon volgens het aangeleverde design.
- [ ] De gebruiker heeft toegang tot een navigatiecomponent met alle content, zoals gespecificeerd in het design.
- [ ] De gebruiker kan Pokémon zoeken via een zoekbalk.
- [ ] De gebruiker kan op een Pokémon klikken om naar diens detailpagina te navigeren.
- [ ] De gebruiker kan de statistieken van een Pokémon bekijken via drie tabs.

### 🔶 Should

- [ ] De gebruiker ziet een foutpagina wanneer een Pokémon niet gevonden wordt.
- [ ] De gebruiker ziet standaard 15 Pokémon met daaronder een "Load More"-knop om meer te laden.
- [ ] De gebruiker ervaart subtiele UI-animaties (zoals hovers, overgangen, etc.).

### 🟡 Could

- [ ] De gebruiker ziet een laadanimatie bij het openen van de pagina.
- [ ] De gebruiker kan via een knop in de sidebar wisselen tussen light- en dark mode (kleuren mogen zelf gekozen worden).

### 🔵 Would

- [ ] De gebruiker kan de taal van de site wijzigen (Engels en Nederlands).
- [ ] De gebruiker kan Pokémon vangen, die daarna zichtbaar zijn in een "Caught"-lijst.
- [ ] De gebruiker kan twee Pokémon tegen elkaar laten vechten in een eenvoudige simulatie.

<!-- ## Gebruik -->
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

### Code conventies:
#### Liquid:
- In de head roep ik de CSS en JS bestanden aan
- Ik gebuik 1 tab (4 spaties) om de code in te laten springen
- Tussen verschillende elementen gebruik ik een witregel om aan te tonen dat het volgende element begint
- Ik gebruik lowercase (behalve voor de content)
- Met de W3C HTML validator check ik voor dingen die ik zelf over het hoofd zie

#### CSS:
- Comments MARK: per pagina
- Comments per element die uitleggen over wat het gaat
- Ik gebruik 1 tab (4 spaties) om de code in te laten springen
- Ik gebruik alstijd 1 spatie tussen de property en de value
- Ik gebruik lowercase
- Ik gebruik voor de class names kebab-case (door een exstention kan ik de gehele classname alsnog selecteren met een dubbelklik)
- Ik gebruik class names die omschrijven waar het over gaat, als de namen teveel op die van een andere pagina lijken zet ik de naam van de pagina erbij.
- Met de W3C CSS validator check ik voor dingen die ik zelf over het hoofd zie
- In de stylesheet geef ik de qustom-properties die ik in de style.css aanroep
- Ik nest media queries in de bijbehorende selecor

#### JavaScript:
- Ik hou dezelfde volgorde als in Liquid en CSS aan
- De POST zet ik onder de GET route van de pagina waar die op staat
- De naamgeving doe ik in camelCase
- Ik stel de views map in als standaard map
- Ik geef het port nummer 8000 mee
- Ik gebruik MARK: per GET/POST en geef de naam van de pagina/functie mee

### Data ophalen en HTML renderen
Gegevens worden opgehaald via fetch()-aanroepen naar de Directus API, bijvoorbeeld voor webinars, sprekers, categorieën en berichten (bookmarks).
<!-- Voorbeeld: ophalen van webinars met gerelateerde sprekers, categorieën en resources.
Rendering gebeurt met behulp van Liquid templates, waarbij data via Express wordt doorgegeven aan .liquid views.
Bookmarks worden opgeslagen als berichten in Directus (avl_messages) en worden gesorteerd/gefilterd op basis van text (bijv. webinar ID) en for (bijv. "Bookmark for Julia").
Filters in routes zoals /webinars en /speakers maken gebruik van querystrings (?category=..., ?sort=..., ?filter=...) voor dynamische weergave. -->

### Technische informatie:
- Server.js <!-- als backend webframework -->
- LiquidJS voor template rendering
- [PokeApi](https://pokeapi.co/) als API backend
- Fetch voor data-ophaalverzoeken naar de API

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->
Zoals beschreven bij Kenmerken is bij dit project gebruik gemaakt van NodeJS. Om aan dit project te werken moet NodeJS geïnstalleerd zijn. Eenmal geïnstalleerd kan het project geopend worden in de code editor.
Voer in de terminal npm install uit om alle afhankelijkheden te installeren.
Voer vervolgens npm start uit om de server te starten.
Ga in je browser naar http://localhost:8000 om het project te bekijken.

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
