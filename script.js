document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");

    
    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username cannot be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid username format. Please enter a valid LeetCode username.");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const response = await fetch(
            `https://leetcode-stats-api.herokuapp.com/${username}`
            );
            if(!response.ok){
                throw new Error("User not found");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error){
            statsContainer.innerHTML= `<p>${error.message}</p>`;
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function displayUserData(data){

    if(data.status !== "success"){
        statsContainer.innerHTML = "<p>No data found</p>";
        return;
    }

    statsContainer.classList.remove("hidden");
    cardStatsContainer.classList.remove("hidden");

    easyLabel.textContent = `${data.easySolved}/${data.totalEasy}`;
    mediumLabel.textContent = `${data.mediumSolved}/${data.totalMedium}`;
    hardLabel.textContent = `${data.hardSolved}/${data.totalHard}`;

    
    const easyPercent = (data.easySolved / data.totalEasy) * 100;
    const mediumPercent = (data.mediumSolved / data.totalMedium) * 100;
    const hardPercent = (data.hardSolved / data.totalHard) * 100;

    easyProgressCircle.style.setProperty("--progress-degree", easyPercent + "%");
    mediumProgressCircle.style.setProperty("--progress-degree", mediumPercent + "%");
    hardProgressCircle.style.setProperty("--progress-degree", hardPercent + "%");


    const cardsData = [
        {label: "Total Solved",value: data.totalSolved},
        {label: "Total Questions",value: data.totalQuestions},
        {label: "Ranking",value: data.ranking},
        {label: "Acceptance Rate",value: data.acceptanceRate + "%"},
    ];
    console.log("Card Data: ", cardsData);
    cardStatsContainer.innerHTML = cardsData.map(
        data =>
            `<div class = "card">
            <h4>${data.label}</h4>
            <p>${data.value}</p>
            </div>`
    ).join("")
    }

    searchButton.addEventListener("click",function(){
        const username = usernameInput.value;
        console.log("Searching for user:",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})