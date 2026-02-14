# 🚀 LeetMetric

LeetMetric is a lightweight web application that allows users to track their **LeetCode problem-solving progress** by simply entering their username. It fetches real-time statistics and displays them using visually appealing circular progress indicators and summary stat cards.

The goal of this project is to combine clean UI design with dynamic data handling using pure frontend technologies.

---

## 📌 Features

- 🔎 Search any valid LeetCode username  
- 📊 Difficulty-wise progress tracking (Easy / Medium / Hard)  
- 🎯 Circular progress indicators using CSS conic gradients  
- 📈 Summary statistics including:
  - Total Solved
  - Total Questions
  - Global Ranking
  - Acceptance Rate
- ⚡ Real-time API data fetching with async/await  
- 🧠 Username validation before API request  
- 🎨 Minimal dark-themed responsive UI  

---

## 🛠️ Tech Stack

- **HTML5** – Page structure  
- **CSS3** – Styling, layout, circular progress design  
- **Vanilla JavaScript** – DOM manipulation and API handling  
- **LeetCode Stats API** – Data source  

No frameworks. No libraries. Just core web fundamentals.

---

## 📂 Project Structure

LeetMetric/
│
├── index.html     # Main UI layout  
├── style.css      # Styling and circular progress design  
├── script.js      # API calls and dynamic rendering  
└── README.md      # Documentation  

---

## ⚙️ How It Works

1. User enters a LeetCode username.
2. Username is validated using a regex pattern:

   ^[a-zA-Z0-9_-]{1,15}$

3. The app sends a request to the LeetCode Stats API.
4. Data is fetched asynchronously.
5. Difficulty percentages are calculated.
6. CSS custom properties (`--progress-degree`) dynamically update circular progress visuals.
7. Summary stats are rendered as responsive cards.

---

## 🚀 How to Run Locally

1. Clone the repository:

   git clone https://github.com/TanviTater/LeetMetric.git

2. Navigate into the project folder:

   cd LeetMetric

3. Open `index.html` in your browser.

No additional setup required.

---

## 🎯 Learning Objectives

This project demonstrates:

- DOM selection and manipulation  
- Event handling  
- Asynchronous JavaScript (async/await)  
- Fetch API integration  
- Dynamic UI updates  
- CSS custom properties  
- Conic gradient progress rings  
- Input validation  

---

## 🧩 Future Improvements

- Add loading animation instead of button text change  
- Add Enter key support for search  
- Improve mobile responsiveness  
- Display recent submissions  
- Add better error UI feedback  
- Deploy live version  

---

## 📄 License

This project is open-source and available under the MIT License.
