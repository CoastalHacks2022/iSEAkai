window.onload = function() {
    const nextButton = document.getElementById("next");
    const blinkingRozxie = document.getElementById("rozxie");
    const oilSpillNav = document.getElementById("oilSpill");
    const screens = ['start', 'litter', 'coral', 'marine', 'kelpie', 'curse', 'breakcurse']
    const scream = document.getElementById("scream");
    
    let i = 0;

    nextButton.addEventListener("click", () => {
        if (i !== 0) document.getElementById(screens[i-1]).style.display = "none";
        if (i == 1) blinkingRozxie.style.display = "none";
        document.getElementById(screens[i]).style.display = "flex";
        if (screens[i] === "curse") scream.play();
        i++;
        if (i == screens.length) {
            nextButton.style.display = "none";
            oilSpillNav.style.display = "block";
        } 
    })
}