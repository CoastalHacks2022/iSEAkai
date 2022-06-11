window.onload = function() {
    const nextButton = document.getElementById("next");
    const blinkingRozxie = document.getElementById("rozxie");
    const oilSpillNav = document.getElementById("oilSpill");
    const screens = ['start', 'litter', 'coral', 'marine', 'kelpie']
    
    let i = 0;

    nextButton.addEventListener("click", () => {
        console.log(i)
        if (i !== 0) document.getElementById(screens[i-1]).style.display = "none";
        if (i == 1) blinkingRozxie.style.display = "none";
        document.getElementById(screens[i]).style.display = "flex";
        i++;
        if (i == screens.length) {
            nextButton.style.display = "none";
            oilSpillNav.style.display = "block";
        }      
    })
}