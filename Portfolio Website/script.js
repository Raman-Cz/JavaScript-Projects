let dayNight = document.querySelector(".dayNight");
let banner = document.querySelector(".banner");

dayNight.addEventListener("click",()=>{
    banner.classList.toggle("night");
});

let typingEffect = new Typed("#text",{
    strings: ["Student","Coder","Developer"],
    loop:true,
    typeSpeed: 200,
    backSpeed: 100,
    backDelay: 1000
});
