let circle = document.querySelector('.first');
let skills = document.querySelector('.skills');



document.addEventListener('scroll',() => {
    if (window.scrollTop() > skills.offset.top - 1000) {
        circle.classList.add ('active');
    }
});