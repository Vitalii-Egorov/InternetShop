




/* Устройство */
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android()
            || isMobile.BlackBerry()
            || isMobile.iOS()
            || isMobile.Opera()
            || isMobile.Windows()
        );
    }
};
if (isMobile.any()) {
    document.querySelector('html').classList.add('_touch');
}
/* Картинки */
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();
/* Добравление Json файла */
async function getProducts(button) {
    if (!button.classList.contains('_hold')) {
        button.classList.add('_hold');
        const file = "json/products.json";
        let rersonse = await fetch(file, {
            method: "GET"
        });
        if (rersonse.ok) {
            let result = await rersonse.json();
            loadProducts(result);
            button.classList.remove('_hold');
            button.remove();
        } else {
            alert('Ошибка')
        }

    }
}
/* function _removeClasses(e, t) {
    for (let o = 0; o < e.length; o++)
        e[o].classList.remove(t)
} */
/* function popup_open(e, t="") {
    document.querySelectorAll(".popup._active").length > 0 && popup_close("", !1);
    let o = document.querySelector(".popup_" + e);
    if (o && unlock) {
        if ("" != t && null != t) {
            document.querySelector(".popup_video").querySelector(".popup__video").innerHTML = '<iframe src="https://www.youtube.com/embed/' + t + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        }
        document.querySelector(".menu__body._active") || body_lock_add(500),
        o.classList.add("_active"),
        history.pushState("", "", "#" + e)
    }
}
function popup_close(e, t=!0) {
    if (unlock) {
        if (e) {
            let t = e.querySelector(".popup__video");
            t && (t.innerHTML = ""),
            e.classList.remove("_active")
        } else
            for (let e = 0; e < popups.length; e++) {
                const t = popups[e];
                let o = t.querySelector(".popup__video");
                o && (o.innerHTML = ""),
                t.classList.remove("_active")
            }
        !document.querySelector(".menu__body._active") && t && body_lock_remove(500),
        history.pushState("", "", window.location.href.split("#")[0])
    }
}
let popup_close_icon = document.querySelectorAll(".popup__close,._popup-close");
if (popup_close_icon)
    for (let e = 0; e < popup_close_icon.length; e++) {
        const t = popup_close_icon[e];
        t.addEventListener("click", (function() {
            popup_close(t.closest(".popup"))
        }
        ))
    } */
let gallery = document.querySelectorAll("._gallery");
function gallery_init() {
    for (let e = 0; e < gallery.length; e++) {
        const t = gallery[e];
        lightGallery(t, {
            counter: !1,
            selector: "a",
            download: !1
        })
    }
}
gallery && gallery_init();
/* Вывод json файла */
function loadProducts(data) {
    const productsItems = document.querySelector('.products__items');

    data.products.forEach(item => {
        const productId = item.id;
        const productUrl = item.url;
        const productImage = item.image;
        const productTitle = item.title;
        const productText = item.text;
        const productPrice = item.price;
        const productOldPrice = item.priceOld;
        const productShareUrl = item.shareUrl;
        const productLikeUrl = item.likeUrl;
        const productLabels = item.labels;

        let productTemlateStart = `<article data-pid="${productId}" class="products__item item-product">`;
        let productTemlateEnd = `</article>`;

        let productTemlateLabels = '';
        if (productLabels) {
            let productTemlateLabelsStart = `<div class="item-product__labels">`
            let productTemlateLabelsEnd = `</div>`
            let productTemlateLabelsContent = '';

            productLabels.forEach(labelsItem => {
                productTemlateLabelsContent += `<div class="item-product__label item-product__label_${labelsItem.type}">${labelsItem.value}</div>`


            });
            productTemlateLabels += productTemlateLabelsStart;
            productTemlateLabels += productTemlateLabelsContent;
            productTemlateLabels += productTemlateLabelsEnd;
        }
        let productTemlateImage = `<a href="${productUrl}" class="item-product__image _ibg">
            <img src="./img/Product/${productImage}" alt="${productTitle}">
        </a>`;

        let productTemlateBodyStart = `<div class="item-product__body">`;
        let productTemlateBodyEnd = `</div>`;

        let productTemlateContent = `<div class="item-product__content">
            <h4 class="item-product__title">${productTitle}</h4>
            <div class="item-product__text">${productText}</div>
        </div>`;

        let productTemlatePrices = '';
        let productTemlatePricesStart = `<div class="item-product__prices">`;
        let productTemlatePricesCurrent = `<div class="item-product__price">${productPrice}</div>`;
        let productTemlatePricesOld = `<div class="item-product__price item-product__price_old">${productOldPrice}</div>`;
        let productTemlatePricesEnd = `</div>`;

        productTemlatePrices = productTemlatePricesStart;
        productTemlatePrices += productTemlatePricesCurrent;
        if (productOldPrice) {
            productTemlatePrices += productTemlatePricesOld;
        }
        productTemlatePrices += productTemlatePricesEnd;


        let productTemlateAction = `<div class="item-product__actions actions-product">
            <div class="actions-product__body">
                <a href="#" class="actions-product__button _btn _btn_white">Add to cart</a>
                <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
                <a href="${productLikeUrl}" class="actions-product__link _icon-heart">Like</a>
            </div>
        </div>`;


        let productTemlateBody = '';
        productTemlateBody += productTemlateBodyStart;
        productTemlateBody += productTemlateContent;
        productTemlateBody += productTemlatePrices;
        productTemlateBody += productTemlateAction;
        productTemlateBody += productTemlateBodyEnd;


        let productTeplate = '';
        productTeplate += productTemlateStart;
        productTeplate += productTemlateLabels;
        productTeplate += productTemlateImage;
        productTeplate += productTemlateBody;
        productTeplate += productTemlateEnd;

        productsItems.insertAdjacentHTML("beforeend", productTeplate);

    });
}
/* Анимация переноса товара в карзину */
function addToCart(productButton, productID) {
    if (!productButton.classList.contains('_hold')) {
        productButton.classList.add('_hold');
        productButton.classList.add('_fly');

        const cart = document.querySelector('.cart-header__icon');
        const product = document.querySelector(`[data-pid="${productID}"]`);
        const productImage = product.querySelector('.item-product__image');
        const productImageFly = productImage.cloneNode(true);

        const productImageFlyWidth = productImage.offsetWidth;
        const productImageFlyHeight = productImage.offsetHeight;
        const productImageFlyTop = productImage.getBoundingClientRect().top;
        const productImageFlyLeft = productImage.getBoundingClientRect().left;

        productImageFly.setAttribute('class', '_flyImage _ibg');
        productImageFly.style.cssText = `
        left: ${productImageFlyLeft}px;
        top: ${productImageFlyTop}px;
        width: ${productImageFlyWidth}px;
        height: ${productImageFlyHeight}px;
        `;

        document.body.append(productImageFly);

        const cartFlyLeft = cart.getBoundingClientRect().left;
        const cartFlyTop = cart.getBoundingClientRect().top;

        productImageFly.style.cssText = `
        left: ${cartFlyLeft}px;
        top: ${cartFlyTop}px;
        width: 0px;
        height: 0px;
        opacity:0;
        `;
        productImageFly.addEventListener('transitionend', function () {
            if (productButton.classList.contains('_fly')) {
                productImageFly.remove();
                updateCart(productButton, productID);
                productButton.classList.remove('_fly');
            }
        });
    }
}
/* Конец анимации переноса товара в карзину */
function updateCart(productButton, productID, productAdd = true) {
    const cart = document.querySelector('.cart-header');
    const cartIcon = cart.querySelector('.cart-header__icon');
    let cartQantity = cartIcon.querySelector('span');
    const cartProduct = document.querySelector(`[data-cart-pid="${productID}"]`);
    const cartlist = document.querySelector('.cart-list ');

    //добавить товар
    if (productAdd) {
        if (cartQantity) {
            cartQantity.innerHTML = ++cartQantity.innerHTML;
        } else {
            cartIcon.insertAdjacentHTML("beforeend", `<span>1</span>`);
        }
        if (!cartProduct) {
            const product = document.querySelector(`[data-pid="${productID}"]`);
            const cartProductImage = product.querySelector('.item-product__image').innerHTML;
            const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
            const cartProductContent = `
            <a href="#" class="cart-list__image _ibg">${cartProductImage}</a>
            <div class="cart-list__body">
            <a href="#" class="cart-list__title">${cartProductTitle}</a>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <a href="#" class="cart-list__delete">Delete</a>
            </div>
            `;
            cartlist.insertAdjacentHTML("beforeend", `<li data-cart-pid = "${productID}" class="cart-list__item">${cartProductContent}</li>`);
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
        }
        productButton.classList.remove('_hold');
        //удаление товар
    } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
        if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
        }
        const cartProductV = --cartQantity.innerHTML;
        if (cartProductV) {
            cartQantity.innerHTML = cartProductV;
        } else {
            cartQantity.remove();
            cart.classList.remove('_active');
        }
    }

}
const furniture = document.querySelector('.furniture__body');
if (furniture && !isMobile.any()) {
    const furnitureItems = document.querySelector('.furniture__items');
    const furnitureColumn = document.querySelectorAll('.furniture__culumn');

    const speed = furniture.dataset.speed;

    let positionX = 0;
    let coordXprocent = 0;

    function setMauseGalleryStyle() {
        let furnitureItemsWidth = 0;
        furnitureColumn.forEach(element => {
            furnitureItemsWidth += element.offsetWidth;
        });

        const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
        const distX = Math.floor(coordXprocent - positionX);
        positionX = positionX + (distX * speed);
        let position = furnitureDifferent / 200 * positionX;
        furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0)`;

        if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMauseGalleryStyle);
        } else {
            furniture.classList.remove('_init')
        }
    }
    furniture.addEventListener("mousemove", function (event) {
        const furnitureWidth = furniture.offsetWidth;
        const coordX = event.pageX - furnitureWidth / 2;
        coordXprocent = coordX / furnitureWidth * 200;
        if (!furniture.classList.contains('_init')) {
            requestAnimationFrame(setMauseGalleryStyle);
            furniture.classList.add('_int');
        }
    });

}

window.onload = function () {
    document.addEventListener("click", documentActions);
    ////////////////////////////////////////Выпадающее меню на компьютере
    function documentActions(event) {
        const targetElement = event.target;
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetElement.classList.contains('menu__arrow')) {
                document.querySelectorAll('.menu__item')[0].classList.remove('_hover')
                document.querySelectorAll('.menu__item')[1].classList.remove('_hover')
            }
        }
        ////////////////////////////////////////Выпадающий поиск
        if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active')
        } else if (!targetElement.classList.contains('search-form__icon') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active')
        }
        ////////////////////////////////////////Выпадаюее меню на телефоне
        if (window.innerWidth < 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('_open');
                targetElement.closest('.menu__arrow').classList.toggle('_open');
            }
            if (!targetElement.classList.contains('menu__arrow')) {
                document.querySelectorAll('.menu__item')[0].classList.remove('_open')
                document.querySelectorAll('.menu__item')[1].classList.remove('_open')
                document.querySelectorAll('.menu__arrow')[0].classList.remove('_open')
                document.querySelectorAll('.menu__arrow')[1].classList.remove('_open')
            }
            ////////////////////////////////////////Burger
            const element1 = document.getElementById('burger');
            const element2 = document.getElementById('menu__body');
            if (element1) {
                targetElement.closest('.icon-menu').classList.toggle('_active');
                // Функция для проверки появления класса у элемента
                const checkClass = () => {
                    // Проверяем, есть ли класс у элемента 1
                    if (element1.classList.contains('_active')) {
                        // Если есть, добавляем класс элементу 2
                        element2.classList.add('_active');
                    } else {
                        element2.classList.remove('_active');
                    }
                };
                checkClass();
                // Добавляем обработчик события на элемент 1
                element1.addEventListener('click', checkClass);
            }
        }
        ////////////////////////////////////////Перенос товара в карзину
        if (targetElement.classList.contains('products__more')) {
            getProducts(targetElement);
            event.preventDefault();
        }
        if (targetElement.classList.contains('actions-product__button')) {
            const productId = targetElement.closest('.item-product').dataset.pid;
            addToCart(targetElement, productId);
            event.preventDefault();
        }

        if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
            if (document.querySelector('.cart-list').children.length > 0) {
                document.querySelector('.cart-header').classList.toggle('_active');
            }
            event.preventDefault();
        } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
            document.querySelector('.cart-header').classList.remove('_active');
        }
        if (targetElement.classList.contains('cart-list__delete')) {
            const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetElement, productId, false);
            event.preventDefault();
        }
    }
    lightGallery(document.querySelector('.furniture__items'), {
        selector: '.row-furniture',
    });
}
////////////////////////////////////////Добавление шапке класса при скроле
const headerElement = document.querySelector('.header');
const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        headerElement.classList.remove('_scroll');
    } else {
        headerElement.classList.add('_scroll');
    }
};
const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);

//heder



/* Спойлер аккордион в футере */
// Получаем все элементы спойлеров на странице
const spoilerElements = document.querySelectorAll('.footer__column');

// Обходим каждый элемент спойлера
spoilerElements.forEach((spoiler) => {
    // Получаем кнопку и контент спойлера
    const button = spoiler.querySelector('.footer__label');
    const content = spoiler.querySelector('.menu-footer__list');

    // Добавляем обработчик события на клик по кнопке
    button.addEventListener('click', () => {
        spoilerElements.forEach((otherSpoiler) => {
            if (otherSpoiler !== spoiler) {
                otherSpoiler.classList.remove('_open');
            }
        });
        // Переключаем класс 'open' на элементе спойлера
        spoiler.classList.toggle('_open');
    });
});
/* Конец спойлер аккордион в футере */
/* Слийдер */
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
        if (slider.classList.contains('_gallery')) {

        }
    }
    sliders_bild_callback();
}
function sliders_bild_callback(params) { }
let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
        const sliderScrollItem = sliderScrollItems[index];
        const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
        const sliderScroll = new Swiper(sliderScrollItem, {
            observer: true,
            observerParent: true,
            direction: 'auto',
            sliderPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: sliderScrollBar,
                draggable: true,
                snapOnRelese: false
            },
            mousewheel: {
                releaseOnEdges: true,
            },
        });
        sliderScroll.scrollbar.updateSize();
    }
}
function sliders_bild_callback(params) { }
/* слайдер 1 */
if (document.querySelector('.slider-main__body')) {
    new Swiper('.slider-main__body', {
        observer: true,
        observerParent: true,
        sliderPerView: 1,
        spaceBetween: 32,
        watchOverflow: true,
        centeredSlides: true,
        speed: 800,
        loop: true,
        loopAdditionalSliders: 1,
        preloadImages: false,
        loadPrevNext: true,
        parallax: true,
        freeMode: true,
        pagination: {
            el: '.controls-slider-main__dotts',
            clickable: true,

        },
        navigation: {
            nextEl: '.slider-main .slider-arrow_next',
            prevEl: '.slider-main .slider-arrow_prev'
        },
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
    });
}
/* слайдер 2 */
if (document.querySelector('.slider-rooms_body')) {
    new Swiper('.slider-rooms_body', {
        breakpoints: {
            670: {
                slidesPerView: 2,
                allowTouchMove: true,
                loop: false,
                spaceBetween: 0,
                parallax: false,
            },
            997: {
                slidesPerView: 1,
                loop: true,
                spaceBetween: 24,
                allowTouchMove: false,
                watchOverflow: true,
            },
        },
        observer: true,
        observerParent: true,
        slidesPerView: 1,
        spaceBetween: 0,
        watchOverflow: false,
        speed: 800,
        loop: false,
        allowTouchMove: true,
        parallax: true,
        pagination: {
            el: '.slider-rooms__dotts',
            clickable: true,
        },
        navigation: {
            nextEl: '.slider-rooms .slider-arrow_next',
            prevEl: '.slider-rooms .slider-arrow_prev',
        },

    })
}
/* слайдер 3 */
if (document.querySelector('.slider-tips__body')) {
    new Swiper('.slider-tips__body', {
        breakpoints: {
            769: {
                loop: false,
                slidesPerView: 2,
            },
            1345: {
                slidesPerView: 3,
                loop: false,
            },
        },
        observer: true,
        observerParent: true,
        slidesPerView: 1.1,
        spaceBetween: 32,
        watchOverflow: false,
        speed: 800,
        loop: false,
        pagination: {
            el: '.slider-tips__dotts',
            clickable: true,
        },

    })
}
