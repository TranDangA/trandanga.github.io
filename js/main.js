const $navbarLink = document.querySelectorAll(".navbar-nav .nav-item");
const $navbarItemActive = document.querySelector(".nav-item.active");

// on click $navbarLink
$navbarLink.forEach((link) => {
  link.addEventListener("click", () => {
    // remove class active on $navbarItemActive
    $navbarLink.forEach((link) => {
      link.classList.remove("active");
    });

    // add class active on $navbarLink
    link.closest("a").classList.add("active");
  });
});

// get hash from url and add class active on navbar
const hash = window.location.hash;

if (hash) {
  // remove class active on $navbarItemActive
  $navbarItemActive.classList.remove("active");

  // add class active on $navbarLink
  document
    .querySelector('.navbar-nav a[href="' + hash + '"]')
    .closest("a")
    .classList.add("active");
} else {
  // remove class active on $navbarItemActive
  $navbarItemActive;

  // add class active on $navbarLink
  document
    .querySelector('.navbar-nav a[href="#home"]')
    .closest("a")
    .classList.add("active");
}

// Navbar on scrolling
const $navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    $navbar.style.display = "flex";
  } else {
    $navbar.style.display = "none";
  }
});

// on click .navbar-toggler
const $navbarToggler = document.querySelector(".navbar-toggler");
const $navbarContainer = document.querySelector(".navbar-container");

$navbarToggler.addEventListener("click", () => {
  // toggle class .show on .navbar-container
  $navbarContainer.classList.toggle("show");
});

// when window resize
const resizeWindow = () => {
  // check width window
  if (window.innerWidth > 992) {
    $navbarContainer.classList.remove("show");
  }
};

resizeWindow();

// check resize window
window.addEventListener("resize", () => {
  resizeWindow();
});

// Typed Initiate
const $typedTextOutput = document.querySelector(".typed-text-output");

if ($typedTextOutput) {
  const textList = [
    "Special but not special",
    "We always smile",
    "We are one",
    "Work hard – Play hard",
  ];

  const typeWriter = (text) => {
    $typedTextOutput.textContent = "";

    let i = 0;
    let speed = 50;
    let textLength = text.length;

    const type = () => {
      $typedTextOutput.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    };

    type();
  };

  for (let i = 0; i < textList.length; i++) {
    setTimeout(() => {
      typeWriter(textList[i]);
    }, 2000 * i);
  }

  setInterval(() => {
    for (let i = 0; i < textList.length; i++) {
      setTimeout(() => {
        typeWriter(textList[i]);
      }, 2000 * i);
    }
  }, 2000 * textList.length);
}

// Scroll to Bottom
const $scrollToBottom = document.querySelector(".scroll-to-bottom");

// back to top
const $backToTop = document.querySelector(".back-to-top");

if ($backToTop) {
  $backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

if ($backToTop && $scrollToBottom) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      $backToTop.style.display = "block";
      $scrollToBottom.style.display = "none";
    } else {
      $backToTop.style.display = "none";
      $scrollToBottom.style.display = "block";
    }
  });
}

// Skills
const $progressBar = document.querySelectorAll(".progress .progress-bar");

$progressBar.forEach((bar) => {
  // set width progress bar with attr data-value
  bar.style.width = bar.getAttribute("data-value") + "%";
  bar.style.backgroundColor = bar.getAttribute("data-color");
});

// portfolio
const $portfolioFilters = document.querySelectorAll(".portfolio-filters li");

$portfolioFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // remove class active on $portfolioFilters
    $portfolioFilters.forEach((filter) => {
      filter.classList.remove("active");
    });

    // add class active on $portfolioFilters
    filter.classList.add("active");

    const selector = filter.getAttribute("data-filter");

    // show all .portfolio-item and hide .portfolio-item with selector
    const $portfolioItem = document.querySelectorAll(".portfolio-item");

    $portfolioItem.forEach((item) => {
      item.style.display = "none";

      if (selector == "*") {
        item.style.display = "block";
      } else {
        item.style.display = "none";

        if (item.classList.contains(selector)) {
          item.style.display = "block";
        }
      }
    });
  });
});

// testimonial
const $testimonialCarousel = document.querySelector(".testimonial-carousel");

// contact form
const $contactForm = document.querySelector("#contactForm");

if ($contactForm) {
  $contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = [];

    const addError = (el, msg) => {
      el.classList.add("is-invalid");
      el.nextElementSibling.textContent = msg;
    };

    // remove all error
    $contactForm.querySelectorAll(".is-invalid").forEach((el) => {
      el.classList.remove("is-invalid");
    });

    $contactForm.querySelectorAll(".help-block").forEach((el) => {
      el.textContent = "";
    });

    // check name
    const $name = $contactForm.querySelector('input[name="name"]');
    const nameVal = $name.value.trim();

    if (nameVal == "") {
      addError($name, "Please enter your name.");
      errors.push("name");
    } else {
      $name.classList.remove("is-invalid");
    }

    // check email
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const $email = $contactForm.querySelector('input[name="email"]');
    const emailVal = $email.value.trim();

    if (emailVal == "") {
      addError($email, "Please enter your email address.");
      errors.push("email");
    } else if (!emailReg.test(emailVal)) {
      addError($email, "Please enter a valid email address.");
      errors.push("email");
    } else {
      $email.classList.remove("is-invalid");
    }

    // check subject
    const $subject = $contactForm.querySelector('input[name="subject"]');
    const subjectVal = $subject.value.trim();

    if (subjectVal == "") {
      addError($subject, "Please enter your subject.");
      errors.push("subject");
    } else {
      $subject.classList.remove("is-invalid");
    }

    // check message
    const $message = $contactForm.querySelector('textarea[name="message"]');
    const messageVal = $message.value.trim();

    if (messageVal == "") {
      addError($message, "Please enter your message.");
      errors.push("message");
    } else {
      $message.classList.remove("is-invalid");
    }

    if (errors.length) {
      $contactForm.querySelector(".is-invalid").focus();
      return;
    }

    // add text success to #success and remove it after 3s
    const $success = document.querySelector("#success");
    $success.textContent = "Your message has been sent. Thank you!";
    $success.style.display = "block";

    // empty form
    $contactForm.reset();

    setTimeout(() => {
      $success.style.display = "none";
    }, 3000);
  });
}

// testimonial slider
const $testimonialItem = document.querySelectorAll(".testimonial-item");

// generate carousel indicators
const $dots = document.querySelector(".dots");
const itemCount = $testimonialItem.length;

for (let i = 0; i < itemCount; i++) {
  const $dot = document.createElement("li");
  $dot.setAttribute("data-slide-to", i);
  $dot.classList.add("dot");

  $dots.appendChild($dot);
}

// active first dot
$dots.firstElementChild.classList.add("active");

// add event click on $dots
const $dot = document.querySelectorAll(".dot");

const changeSlide = (index) => {
  // remove class active on $dot
  $dot.forEach((dot) => {
    dot.classList.remove("active");
  });

  // add class active on $dot
  $dot[index].classList.add("active");

  // remove class active on $testimonialItem
  $testimonialItem.forEach((item) => {
    item.classList.remove("active");
  });

  // add class active on $testimonialItem
  $testimonialItem[index].classList.add("active");
};

$dot.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = dot.getAttribute("data-slide-to");

    changeSlide(index);
  });
});

// auto slide
setInterval(() => {
  let index = document
    .querySelector(".dot.active")
    .getAttribute("data-slide-to");

  index++;

  if (index >= itemCount) {
    index = 0;
  }

  changeSlide(index);
}, 3000);
