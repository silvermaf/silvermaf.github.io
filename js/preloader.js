let pre = document.getElementById("preload");
let ind = document.getElementById("inde");
let content = document.getElementById("body-content");

function preLoader() {
    setTimeout(() => {
        pre.style.display = 'none';
        ind.style.display = 'none';
        content.style.display = 'block';
    }, 3000);
}