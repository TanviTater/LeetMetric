document.addEventListener("DOMContentLoaded", function () {
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


    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username cannot be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username format. Please enter a valid LeetCode username.");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {

        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            const targetUrl = 'https://leetcode.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("content-Type", "application/json");
            const graphql = JSON.stringify({
                query: `
        query userSessionProgress($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                profile {
                    ranking
                }
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                    totalSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
    `,
                variables: { username: username }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };
            const response = await fetch(proxyUrl + targetUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData);

            displayUserData(parsedData);
        }
        catch (error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {

        const allQuestions = parsedData.data.allQuestionsCount;
        const acStats = parsedData.data.matchedUser.submitStats.acSubmissionNum;
        const totalStats = parsedData.data.matchedUser.submitStats.totalSubmissionNum;

        const totalEasyQues = allQuestions[1].count;
        const totalMediumQues = allQuestions[2].count;
        const totalHardQues = allQuestions[3].count;

        const solvedTotal = acStats[0].count;
        const solvedEasy = acStats[1].count;
        const solvedMedium = acStats[2].count;
        const solvedHard = acStats[3].count;

        const totalSubmissions = totalStats[0].submissions;
        const acceptedSubmissions = acStats[0].submissions;

        const ranking = parsedData.data.matchedUser.profile.ranking;

        const acceptanceRate = (
            (acceptedSubmissions / totalSubmissions) * 100
        ).toFixed(2);

        // Update circles
        updateProgress(solvedEasy, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMedium, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHard, totalHardQues, hardLabel, hardProgressCircle);

        statsContainer.classList.remove("hidden");
        cardStatsContainer.classList.remove("hidden");

        const cardsData = [
            { label: "Total Solved", value: solvedTotal },
            { label: "Total Questions", value: allQuestions[0].count },
            { label: "Ranking", value: ranking },
            { label: "Acceptance Rate", value: acceptanceRate + "%" },
        ];

        cardStatsContainer.innerHTML = cardsData.map(card =>
            `<div class="card">
            <h4>${card.label}</h4>
            <p>${card.value}</p>
        </div>`
        ).join("");
    }


    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("Searching for user:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    })
});