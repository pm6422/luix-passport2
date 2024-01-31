import { CountUp } from 'countup.js';

var countUpInitialized = false;

function visible (el) {
  return !(el.offsetWidth === 0 && el.offsetHeight === 0);
}

function isInViewport(element) {        
  var rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function createCountUp() {
  if (typeof CountUp === 'undefined') {
      return;
  }

  var elements = [].slice.call(document.querySelectorAll('[data-kt-countup="true"]:not(.counted)'));

  elements.map(function (element) {
    if (isInViewport(element)) {
      if (element.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      var options = {};

      var value = element.getAttribute('data-kt-countup-value');
      value = parseFloat(value.replace(/,/g, ""));

      if (element.hasAttribute('data-kt-countup-start-val')) {
        options.startVal = parseFloat(element.getAttribute('data-kt-countup-start-val'));
      }

      if (element.hasAttribute('data-kt-countup-duration')) {
        options.duration = parseInt(element.getAttribute('data-kt-countup-duration'));
      }

      if (element.hasAttribute('data-kt-countup-decimal-places')) {
        options.decimalPlaces = parseInt(element.getAttribute('data-kt-countup-decimal-places'));
      }

      if (element.hasAttribute('data-kt-countup-prefix')) {
        options.prefix = element.getAttribute('data-kt-countup-prefix');
      }

      if (element.hasAttribute('data-kt-countup-separator')) {
        options.separator = element.getAttribute('data-kt-countup-separator');
      }

      if (element.hasAttribute('data-kt-countup-suffix')) {
        options.suffix = element.getAttribute('data-kt-countup-suffix');
      }

      var count = new CountUp(element, value, options);

      count.start();

      element.classList.add('counted');

      element.setAttribute("data-kt-initialized", "1");
    }
  });
}

function createCountUpTabs() {
  if (typeof CountUp === 'undefined') {
      return;
  }

  if (countUpInitialized === false) {
    // Initial call
    createCountUp();

    // Window scroll event handler
    window.addEventListener('scroll', createCountUp);
  }      

  // Tabs shown event handler
  var tabs = [].slice.call(document.querySelectorAll('[data-kt-countup-tabs="true"][data-bs-toggle="tab"]'));
  tabs.map(function (tab) {
    if (tab.getAttribute("data-kt-initialized") === "1") {
      return;
    }

    tab.addEventListener('shown.bs.tab', createCountUp);

    tab.setAttribute("data-kt-initialized", "1");
  });

  countUpInitialized = true;
}

export function initCountUp() {
  createCountUp();
  createCountUpTabs();
}
