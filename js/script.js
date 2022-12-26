'use strict';
window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    // !Adaptive Burger
    // I prefer to write in pure JS))
    const headerBurger = document.querySelector('.header__burger'),
            headerMenu = document.querySelector('.header__menu');

    headerBurger.addEventListener('click', () => {
            headerBurger.classList.toggle('active');
            headerMenu.classList.toggle('active');
            document.querySelector('body').classList.toggle('lock');
    });
    // $(document).ready(function() {
    //     $('.header__burger').click(function() {
    //         $('.header__burger, .header__menu').toggleClass('active');
    //         $('body').toggleClass('lock');
    //     });
    // });

    // !Slider
    const sliderBlock = document.querySelector('.slider'),
          slideItems = document.querySelectorAll('.slider__item'),
          slidesWrapper = document.querySelector('.slider__wrapper'),
          slidesField = document.querySelector('.slider__inner'),
          slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width,
          prevBtn = document.querySelector('.slider__prev-btn'),
          nextBtn = document.querySelector('.slider__next-btn');
    console.log(slideItems);
    let slideIndex = 1,
        offset = 0; // Indent, to determine the indents of our slider carousel

    const circleIndicatorsArr = []; // array for dynamically created slider indicators. 
                                 // Made so as not to iterate over the pseudo-array, but to work with a real array

    // Setting up the Slider Carousel:
    slidesField.style.width = 100 * slideItems.length + '%';
    slideItems.forEach(slide => {
        slide.style.width = slidesWrapperWidth;
    });

    // The wrapper of our slider indicators
    const indicatorsWrapper = document.createElement('div');
    indicatorsWrapper.classList.add('slider__navigation-wrapper');
    sliderBlock.append(indicatorsWrapper);
    

    // our indicators corresponding to the number of our slides
    for (let i = 0; i < slideItems.length; i++) {
        const circleIndicatorItem = document.createElement('div');
        circleIndicatorItem.classList.add('slider__navigation-item');
        circleIndicatorItem.setAttribute('data-slide-to', i + 1);
        indicatorsWrapper.append(circleIndicatorItem);
        circleIndicatorsArr.push(circleIndicatorItem);
        if (i == 0) {
            circleIndicatorItem.classList.add('slider-navigation__item-active');
        }
    }


    nextBtn.addEventListener('click', () => {
        if (offset == (+slidesWrapperWidth.slice(0, slidesWrapperWidth.length - 2) * (slideItems.length - 1))) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += +slidesWrapperWidth.slice(0, slidesWrapperWidth.length - 2);  
            slideIndex++;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        circleIndicatorsArr.forEach(indicator => indicator.classList.remove('slider-navigation__item-active'));
        circleIndicatorsArr[slideIndex - 1].classList.add('slider-navigation__item-active');
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = +slidesWrapperWidth.slice(0, slidesWrapperWidth.length - 2) * (slideItems.length - 1);
            slideIndex = slideItems.length;    
        } else {
            offset -= +slidesWrapperWidth.slice(0, slidesWrapperWidth.length - 2);  
            slideIndex--;
        }
        slidesField.style.transform = `translateX(${-offset}px)`;
        circleIndicatorsArr.forEach(indicator => indicator.classList.remove('slider-navigation__item-active'));
        circleIndicatorsArr[slideIndex - 1].classList.add('slider-navigation__item-active');
    });

    circleIndicatorsArr.forEach(indicator => {
        indicator.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +slidesWrapperWidth.slice(0, slidesWrapperWidth.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            circleIndicatorsArr.forEach(indicator => indicator.classList.remove('slider-navigation__item-active'));
            circleIndicatorsArr[slideIndex - 1].classList.add('slider-navigation__item-active');
        });
    });

});