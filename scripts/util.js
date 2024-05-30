export function getRandomRect() {
    const rectObject = [
        { color: "#8a8cdb", number: "2" },
        { color: "#5f60c2", number: "4" },
        { color: "#5255e7", number: "8" },
        { color: "#393cf0", number: "16" },
        { color: "#3133c0", number: "32" },
        { color: "#0e11af", number: "64" },
        { color: "#02047d", number: "128" }//,
        //{ color: "#1d1d44", number: "256" },
        //{ color: "#5c8dcc", number: "512" },
        //{ color: "#179ee1", number: "1024" },
        //{ color: "#073850", number: "2048" }//,
        //{ color: "#1398a1", number: "4096" }
    ];

    let totalProbability = rectObject.reduce((sum, rect) => sum + (rect.probability || 1), 0);
    let randomIndex = Math.floor(Math.random() * totalProbability);
    let sum = 0;

    for (let rect of rectObject) {
        sum += rect.probability || 1;
        if (randomIndex < sum) {
            return rect;
        }
    }
}

export function drawScore(score) {
    let lblScore = document.getElementById("score");
    lblScore.innerText = `Ton score: ${score}`;
}
