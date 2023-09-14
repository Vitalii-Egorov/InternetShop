
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', documentActions);

    function documentActions(e) {
        const targetEl = e.target;
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetEl.classList.contains('menu__arrow')) {
                targetEl.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetEl.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
            }
        }
        if (targetEl.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if (!targetEl.closest('.search-form') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active');
        }
        if (targetEl.classList.contains('products__more')) {
            getProducts(targetEl);
            e.preventDefault();
        }

        if (targetEl.classList.contains('actions-product__button')) {
            const productId = targetEl.closest('.item-product').dataset.pid;
            addToCart(targetEl, productId);
            e.preventDefault();
        }

        if (targetEl.classList.contains('cart-header__icon') || targetEl.closest('.cart-header__icon')) {
            if (document.querySelector('.cart-list').children.length > 0) {
                document.querySelector('.cart-header').classList.toggle('_active');
            }
            e.preventDefault();
        } else if (!targetEl.closest('.cart-header') && !targetEl.classList.contains('actions-product__button')) {
            document.querySelector('.cart-header').classList.remove('_active');
        }

        if (targetEl.classList.contains('cart-list__delete')) {
            const productId = targetEl.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetEl, productId, false);
            e.preventDefault();
        }
    }

    // load more products
    async function getProducts(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = 'json/products.json';
            let response = await fetch(file, {
                method: 'GET'
            });
            if (response.ok) {
                let result = await response.json();
                loadProducts(result);
                button.classList.remove('_hold');
                button.remove();
            } else {
                alert('Error')
            }
        }
    }

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

            let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
            let productTemplateEnd = `</article>`;

            let productTemplateLabels = '';
            if (productLabels) {
                let productTemplateLabelsStart = `<div class="item-product__labels">`;
                let productTemplateLabelsEnd = `</div>`;
                let productTemplateLabelsContent = '';

                productLabels.forEach(labelItem => {
                    productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
                });

                productTemplateLabels += productTemplateLabelsStart;
                productTemplateLabels += productTemplateLabelsContent;
                productTemplateLabels += productTemplateLabelsEnd;
            }

            let productTemplateImage = `
                <a href="${productUrl}" class="item-product__image _ibg">
                    <img src="img/products/${productImage}" alt="${productTitle}">
                </a>
            `;

            let productTemplateBodyStart = `<div class="item-product__body">`;
            let productTemplateBodyEnd = `</div>`;

            let productTemplateContent = `
                <div class="item-product__content">
                    <h3 class="item-product__title">${productTitle}</h3>
                    <div class="item-product__text">${productText}</div>
                </div>
            `;

            let productTemplatePrices = '';
            let productTemplatePricesStart = `<div class="item-product__prices">`;
            let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
            let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
            let productTemplatePricesEnd = `</div>`;

            productTemplatePrices = productTemplatePricesStart;
            productTemplatePrices += productTemplatePricesCurrent;
            if (productOldPrice) {
                productTemplatePrices += productTemplatePricesOld;
            }
            productTemplatePrices += productTemplatePricesEnd;

            let productTemplateActions = `
                <div class="item-product__actions actions-product">
                    <div class="actions-product__body">
                        <a href="" class="actions-product__button btn btn_white">Add to cart</a>
                        <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
                        <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
                    </div>
                </div>
            `;

            let productTemplateBody = '';
            productTemplateBody += productTemplateBodyStart;
            productTemplateBody += productTemplateContent;
            productTemplateBody += productTemplatePrices;
            productTemplateBody += productTemplateActions;
            productTemplateBody += productTemplateBodyEnd;

            let productTemplate = '';
            productTemplate += productTemplateStart;
            productTemplate += productTemplateLabels;
            productTemplate += productTemplateImage;
            productTemplate += productTemplateBody;
            productTemplate += productTemplateEnd;

            productsItems.insertAdjacentHTML('beforeend', productTemplate);
            ibg();
        });
    }

    function addToCart(productBtn, productId) {
        if (!productBtn.classList.contains('_hold')) {
            productBtn.classList.add('_hold');
            productBtn.classList.add('_fly');

            const cart = document.querySelector('.cart-header__icon');
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const productImage = product.querySelector('.item-product__image');

            const productImageFly = productImage.cloneNode(true);

            const productImageFlyWidth = productImage.offsetWidth;
            const productImageFlyHeight = productImage.offsetHeight;
            const productImageFlyTop = productImage.getBoundingClientRect().top;
            const productImageFlyLeft = productImage.getBoundingClientRect().left;

            productImageFly.setAttribute('class', '_flyImage _ibg');
            productImageFly.style.cssText =
                `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
            `;

            document.body.append(productImageFly);


            const cartFlyTop = cart.getBoundingClientRect().top;
            const cartFlyLeft = cart.getBoundingClientRect().left;

            productImageFly.style.cssText =
                `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            width: 0px;
            height: 0px;
            opacity: 0;
            `;

            productImageFly.addEventListener('transitionend', () => {
                if (productBtn.classList.contains('_fly')) {
                    productImageFly.remove();
                    updateCart(productBtn, productId);
                    productBtn.classList.remove('_fly');
                }
            });
        }
    }

    function updateCart(productBtn, productId, productAdd = true) {
        const cart = document.querySelector('.cart-header');
        const cartIcon = cart.querySelector('.cart-header__icon');
        const cartQuantity = cartIcon.querySelector('span');
        const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
        const cartList = document.querySelector('.cart-list');

        if (productAdd) {
            if (cartQuantity) {
                cartQuantity.innerHTML = ++cartQuantity.innerHTML;
            } else {
                cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>')
            }

            if (!cartProduct) {
                const product = document.querySelector(`[data-pid="${productId}"]`);
                const cartProductImage = product.querySelector('.item-product__image').innerHTML;
                const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
                const cartProductContent = `
                <a href="" class='cart-list__image _ibg'>${cartProductImage}</a>
                <div class='cart-list__body'>
                    <a href="" class='cart-list__title'>${cartProductTitle}</a>
                    <div class='cart-list__quantity'>Quantity: <span>1</span></div>
                    <a href='' class='cart-list__delete'>Delete</a>
                </div>`;
                cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid='${productId}' class='cart-list__item'>${cartProductContent}</li>`);
                ibg();
            } else {
                const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
                cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
            }

            productBtn.classList.remove('_hold');
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
            if (!parseInt(cartProductQuantity.innerHTML)) {
                cartProduct.remove();
            }

            const cartQuantityValue = --cartQuantity.innerHTML;

            if (cartQuantityValue) {
                cartQuantity.innerHTML = cartQuantityValue;
            } else {
                cartQuantity.remove();
                cart.classList.remove('_active');
            }
        }
    }

    if (document.querySelector('.slider-main__body')) {
        new Swiper('.slider-main__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,

            // Dotts
            pagination: {
                el: '.controls-slider-main__dotts',
                clickable: true,
            },
            // Arrows
            navigation: {
                nextEl: '.slider-main .slider-arrow__next',
                prevEl: '.slider-main .slider-arrow__prev',
            },
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true
            },
        });
    }

    if (document.querySelector('.slider-rooms__body')) {
        new Swiper('.slider-rooms__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 24,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true
            },

            // Dotts
            pagination: {
                el: '.slider-rooms__dotts',
                clickable: true,
            },
            // Arrows
            navigation: {
                nextEl: '.slider-rooms .slider-arrow__next',
                prevEl: '.slider-rooms .slider-arrow__prev',
            },
        });
    }

    if (document.querySelector('.slider-tips__body')) {
        new Swiper('.slider-tips__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: false,
            preloadImages: false,

            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },

            // Dotts
            pagination: {
                el: '.slider-tips__dotts',
                clickable: true,
            },
            // Arrows
            navigation: {
                nextEl: '.slider-tips .slider-arrow__next',
                prevEl: '.slider-tips .slider-arrow__prev',
            },
        });
    }
    // header
    const header = document.querySelector('.header');

    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            header.classList.remove('_scroll');
        } else {
            header.classList.add('_scroll');
        }
    }

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(header);

    // furniture Gallery
    const furniture = document.querySelector('.furniture__body');
    let positionX = 0;
    let coordXprocent = 0;
    if (furniture && !isMobile.any()) {
        const furnitureItems = document.querySelector('.furniture__items');
        const furnitureColumn = document.querySelectorAll('.furniture__column');

        const speed = Number(furniture.dataset.speed);

        function setMouseGelleryStyle() {
            let furnitureItemsWidth = 0;

            furnitureColumn.forEach(element => {
                furnitureItemsWidth += element.offsetWidth;
            });
            // let furnitureItemWidth = furnitureColumn.reduce((acc, el) => acc += el.offsetWidth);

            const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
            const distX = Math.floor(coordXprocent - positionX);

            positionX = positionX + (distX * speed);
            let position = furnitureDifferent / 200 * positionX;

            furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0)`;

            if (Math.abs(distX) > 0) {
                requestAnimationFrame(setMouseGelleryStyle);
            } else {
                furniture.classList.remove('_init');
            }
        }
        furniture.addEventListener('mousemove', (e) => {
            const furnitureWidth = furniture.offsetWidth;
            const coordX = e.pageX - furnitureWidth / 2;

            coordXprocent = coordX / furnitureWidth * 200;

            if (!furniture.classList.contains('_init')) {
                requestAnimationFrame(setMouseGelleryStyle);
                furniture.classList.add('_init');
            }
        });
    }



}); // end