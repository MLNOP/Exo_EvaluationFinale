/*Animation pour le menu burger*/ 
document.addEventListener('DOMContentLoaded', () => {
    let menuIco = document.getElementById('menuIco');
    let menu = document.getElementById('menu');
    //console.log(menu);
    menuIco.addEventListener('click',() => {
        //rajoute la classe menuAfter au menu
        menu.classList.toggle('menuAfter');
    });
});