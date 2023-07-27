const main = document.querySelector(".wrapper"),
	percent = document.querySelectorAll(".skills__percent"),
	listOfCircles = [...document.querySelectorAll(".circle")],
	pageUpLink = document.querySelector(".pageup"),
	pageUpButton = document.querySelector(".buttonup"),
	diplomasBlock = document.querySelector(".diplomas"),
	certificatesButton = document.querySelector(".diplomas__certificates"),
	certificatesSlider = document.querySelector(".certificates");
let timer = [],
	counter = 0,
	isAnimated = false;

let tg = {
	token: "6212414082:AAFnyD7Aw5maZUaD5kR5f8DYO4fULCzXgcA",
	chat_id: "-1001830104792",
};

// MicroModal.init();

$(".certificates__slider").slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	initialSlide: 1,
	centerMode: true,
	variableWidth: true,
	slide: ".certificates__slider-item",
	prevArrow:
		'<div class="certificates__slider-arrow"><img src="icons/arrow_left.png" alt="arrow_left"></div>',
	nextArrow:
		'<div class="certificates__slider-arrow"><img src="icons/arrow_right.png" alt="arrow_right"></div>',
});

const setPerc = (value, i) => {
	const arr = [...percent];
	counter++;
	arr[i].textContent = `${counter}%`;
	if (counter == value) clearInterval(timer[i]);
};

const addLeftToRightAnimation = (items, min, max) => {
	let cur = 0,
		delay = 0.5;
	if (main.scrollTop > min && main.scrollTop < max) {
		items.forEach((el, i) => {
			if (i === 0) {
				el.style.setProperty("animation-delay", 0 + "s");
				el.style.setProperty("display", "block");
				el.classList.add("active");
			} else {
				el.style.setProperty("animation-delay", cur + delay + "s");
				cur += delay;
				el.style.setProperty("display", "block");
				el.classList.add("active");
			}
		});
	}
};

certificatesButton.addEventListener("click", (e) => {
	if (certificatesSlider.style.display === "" || certificatesSlider.style.display === "none") {
		certificatesSlider.style.display = "block";
		$(".certificates__slider").slick("refresh");
		certificatesSlider.scrollIntoView({
			behavior: "smooth",
		});
	} else if (certificatesSlider.style.display === "block") {
		certificatesSlider.style.display = "none";
	}
});

const circlesAnimation = (height) => {
	const dash = listOfCircles.map((el) => {
		const style = getComputedStyle(el);
		return style.strokeDashoffset;
	});

	let currScrollPos = main.scrollTop || 0;

	if (main.scrollTop > height) {
		listOfCircles.forEach((el, i) => {
			el.style.setProperty("--stroke-dashoffset", dash[i]);
			el.classList.add("active");
			if (!timer[i]) {
				timer[i] = setInterval(
					() =>
						setPerc(
							document
								.querySelectorAll(".skills__percent")
								[i].getAttribute("data-value"),
							i
						),
					100
				);
			}
		});
		pageUpLink.style.display = "block";
		pageUpLink.style.opacity = -2200 / currScrollPos + 2;
	} else {
		listOfCircles.forEach((el) => {
			el.classList.remove("active");
			pageUpLink.style.opacity = 0;
			pageUpLink.style.display = "none";
		});
	}

	const diplomasElements = [...document.querySelectorAll(".diplomas-item")];
	addLeftToRightAnimation(diplomasElements, 900, 1500);

	const languageElements = [...document.querySelectorAll(".languages-item")];

	if (certificatesSlider.style.display === "block") {
		addLeftToRightAnimation(
			languageElements,
			1600 + certificatesSlider.offsetHeight,
			3000 + certificatesSlider.offsetHeight
		);
	} else {
		addLeftToRightAnimation(languageElements, 1600, 3000);
	}
};

main.addEventListener("scroll", () => {
	if (certificatesSlider.style.display === "block") {
		circlesAnimation(1600 + certificatesSlider.offsetHeight);
	} else {
		circlesAnimation(1600);
	}
});

$(".slider").slick({
	infinite: true,
	slidesToShow: 7,
	slidesToScroll: 7,
	prevArrow:
		'<div class="slider__arrow_left"><img src="icons/arrow_left.png" alt="arrow_left"></div>',
	nextArrow:
		'<div class="slider__arrow_right"><img src="icons/arrow_right.png" alt="arrow_right"></div>',
});

const buttonProjects = document.querySelector(".projects__button");
const projectsList = [...document.querySelectorAll(".projects-item")];
const projectsBlock = document.querySelector(".projects");

const expandBlockEvent = () => {
	projectsBlock.scrollIntoView({
		behavior: "smooth",
	});
	projectsList.forEach((el) => {
		if (el.className.includes("expand")) {
			if (el.style.display === "inline-block") {
				el.style.opacity = "0";
				el.style.animation = "expandBlocksClose 0.5s";
				buttonProjects.lastElementChild.innerHTML = "VIEW&nbsp;ALL&nbsp;PROJECTS";
				window.setTimeout(() => {
					el.style.display = "none";
				}, 200);
			} else {
				el.style.display = "inline-block";
				el.style.animation = "expandBlocks 0.5s";
				el.style.opacity = "1";
				buttonProjects.lastElementChild.innerHTML = "HIDE&nbsp;ALL&nbsp;PROJECTS";
				el.scrollIntoView({
					behavior: "smooth",
				});
			}
		}
	});
};

buttonProjects.addEventListener("click", (e) => {
	e.preventDefault();
	expandBlockEvent();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});

const form = document.getElementById("new_form");

let formVal = new octaValidate("new_form");
const inputs = document.querySelectorAll("input, select, textarea");

function sendMessage(text) {
	const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}&parse_mode=HTML`; // The url to request
	const xht = new XMLHttpRequest();
	xht.open("POST", url);
	xht.send();
}

inputs.forEach((input) => {
	input.addEventListener("invalid", function (e) {
		e.preventDefault();
		formVal.validate();
	});
});

inputs.forEach((input) => {
	input.addEventListener("valid", function (e) {
		e.preventDefault();
		formVal.validate();
	});
});

document.addEventListener("DOMContentLoaded", () => {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (formVal.validate() === true) {
			const username = document.getElementById("inp_uname").value;
			const email = document.getElementById("inp_email").value;
			const text = document.getElementById("text").value;

			MicroModal.show("modal-1");

			for (let i = 0; i < form.length; i++) {
				form[i].value = "";
				form[i].setAttribute("value", "");
			}

			sendMessage(
				`<b>Username:</b> ${username}%0A<b>Email:</b> ${email}%0A<b>Text</b>: ${text}`
			);
		}
	});
});
