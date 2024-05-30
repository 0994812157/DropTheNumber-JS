export function levels(levelNumber) {
    let speed;
    let level1 = document.getElementById("stage1");
    let level2 = document.getElementById("stage2");
    let level3 = document.getElementById("stage3");
    level1.style.backgroundColor = "white";
    level2.style.backgroundColor = "white";
    level3.style.backgroundColor = "white";
    switch (levelNumber) {
        case 1:
            speed = 500;
            level1.style.backgroundColor = "#070975";
            break;
        case 2:
            speed = 250;
            level2.style.backgroundColor = "#070975";
            break;
        case 3:
            speed = 100;
            level3.style.backgroundColor = "#070975";
            break;
    }
    return speed;
}
