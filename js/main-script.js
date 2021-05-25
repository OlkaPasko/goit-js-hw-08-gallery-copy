import images from './data/gallery-items.js'

const refs = {
    galleryUl : document.querySelector('.js-gallery'),

    isModalOpen : document.querySelector('.js-lightbox.is-open'),
    lightboxEl : document.querySelector('.js-lightbox'),
    imgLightboxEl : document.querySelector('.lightbox__image'),
    btnCloseEl : document.querySelector('[data-action="close-lightbox"]'),
};

const imgsMarkup = createImageCardsMarkup(images);

refs.galleryUl.insertAdjacentHTML('beforeend', imgsMarkup);
refs.galleryUl.addEventListener('click', onImgCardClick);

function createImageCardsMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a> 
        </li>`;
    }).join('');
}

function onImgCardClick(e) {
    e.preventDefault();

    // const isItemEl = e.target.classList.contains('gallery__image');
    // if (!isItemEl) 
    //     return;

    if (e.target.tagName !== "IMG")
        return;

    if (!refs.isModalOpen) {

        refs.lightboxEl.classList.add('is-open');

        document.body.addEventListener('keydown', onKeyPressCheck);

        setImg(e.target.dataset.source, e.target.alt);

        refs.btnCloseEl.addEventListener('click', onCloseModal);
    }
}

function onCloseModal() {
    document.querySelector('.js-lightbox.is-open')?.classList.remove('is-open');
    document.body.removeEventListener('keydown', onKeyPressCheck);

    clearImgBox();
}

function onKeyPressCheck(e) {
    switch (e.code) {
        case "Escape":
            onCloseModal();
            break;
        case "ArrowLeft":
            changeImg(-1);
            break;
        case "ArrowRight":
            changeImg(1);
            break;
        default:
            // console.log();
    }
}

function changeImg(shift) {

    const imgCurrent = images.find((img) => 
                img.original === refs.imgLightboxEl.src
    );
    
    let newIndex = images.indexOf(imgCurrent) + shift;

    if (newIndex < 0)
        newIndex = images.length - 1;
    
    if (newIndex === images.length)
        newIndex = 0;

    setImg(images[newIndex].original,
        images[newIndex].description);
}

function clearImgBox() {
    setImg('', '');
}

function setImg(src, alt) {
    refs.imgLightboxEl.src = src;
    refs.imgLightboxEl.alt = alt;
}