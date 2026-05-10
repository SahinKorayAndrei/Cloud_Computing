# PROIECT CLOUD COMPUTING

**Nume:** Șahin Koray-Andrei

# Link-uri Proiect
* **Video Prezentare:** https://youtu.be/zGt9ubUXrfE
* **Aplicație Live:** https://cloud-computing-7oal.onrender.com

# Centrul de Știri despre Fotbal | Cloud Hub

## 1. Introducere
Aplicația pe care am făcut-o este o platformă web dedicată microbiștilor, care permite utilizatorilor să caute orice echipă de fotbal pentru a afla detalii și ultimele știri curente legate de diferite echipe de fotbal. Proiectul demonstrează integrarea serviciilor de tip Cloud pentru procesarea și afișarea datelor în timp real.

## 2. Descriere problemă
Pasionații de fotbal trebuie de multe ori să acceseze mai multe site-uri pentru a vedea știri și informații despre echipa lor. Aplicația centralizează aceste date într-o singură interfață simplă și rapidă, eliminând căutările multiple.

## 3. Descriere API
Proiectul utilizează două servicii cloud prin API-uri REST:
1. **SportAPI7 (via RapidAPI):** Folosit pentru identificarea echipei. Din acest API extragem teamId (pentru generarea automată a siglei prin SofaScore), numele oficial și țara de proveniență.
2. **NewsAPI:** Folosit pentru a prelua cele mai relevante 5 articole de știri despre echipa căutată, folosind parametri de filtrare după limbă și relevanță.

## 4. Flux de date
* **Metode HTTP:** Aplicația folosește metoda GET pentru a prelua numele echipei de la client către serverul propriu la endpoint-ul /api/football-news. Serverul redirecționează cererea prin apeluri axios.get către serviciile externe SportAPI7 și NewsAPI.
* **Autentificare:** Cheile API sunt stocate securizat pe server în variabile de mediu (process.env.RAPID_API_KEY, process.env.NEWS_API_KEY).
  * Autentificarea se realizează prin headerele HTTP: X-RapidAPI-Key pentru serviciul de sport și X-Api-Key pentru serviciul de știri.
* **Exemplu Request:** GET /api/football-news?team=Real Madrid
* **Exemplu Response:** Un obiect JSON care conține datele echipei (numele oficial, țara, teamId pentru siglă) și un array de articole ce include titlul, sursa și URL-ul către știrea completă.

## 5. Capturi ecran aplicație
<img width="1157" height="844" alt="Screenshot 2026-05-09 201508" src="https://github.com/user-attachments/assets/8364b1bb-f94b-4edb-898d-08551eb9d52d" />

<img width="1429" height="723" alt="Screenshot 2026-05-09 202131" src="https://github.com/user-attachments/assets/2101ebdf-3782-4fe4-a185-ac8b36767671" />


## 6. Referințe
* [Express.js](https://expressjs.com/) - Framework-ul de backend.
* [Axios](https://axios-http.com/) - Client HTTP pentru cereri API.
* [NewsAPI Documentation](https://newsapi.org/)
* [RapidAPI Documentation](https://rapidapi.com/)
