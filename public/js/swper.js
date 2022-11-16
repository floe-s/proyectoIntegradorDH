const swiper = new Swiper('.swiper-hero', {
    // Optional parameters
    direction: 'horizontal',
    spaceBetween: 5,
    loop: false,
    slidesPerView: 2,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    //   type: 'fraction',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

const swiper2 = new Swiper('.swiper-hero2', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    //   type: 'fraction',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
