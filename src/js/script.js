const main = document.querySelector('.wrapper');

const scrollEvent = () => {
    const listOfCircles = [...document.querySelectorAll('.circle')];

    const dash = listOfCircles.map((el) => {
        const style = getComputedStyle(el);
        return style.strokeDashoffset;
    });

    if (main.scrollTop >= 1600) {
        listOfCircles.forEach((el, i) => {
            el.style.setProperty('--stroke-dashoffset', dash[i]);
            el.classList.add('active');
        });
    } else {
        listOfCircles.forEach((el) => {
            el.classList.remove('active');
        });
    }
  };

main.addEventListener('scroll', scrollEvent);
