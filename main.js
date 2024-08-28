(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=o.querySelector(".card__image"),i=o.querySelector(".card__title");return c.src=e.link,c.alt=e.name,i.textContent=e.name,o.querySelector(".card__delete-button").addEventListener("click",(function(e){n(o)})),c.addEventListener("click",(function(e){r(c)})),o.querySelector(".card__like-button").addEventListener("click",t),o}function r(e){e.remove()}e.d({},{I:()=>z}),document.querySelector(".content").querySelector(".places__list");var o=function(e,t){t.classList.remove(z.errorClass);var n=e.querySelector(".".concat(t.id,"-error"));n.classList.add("popup__input_transparent_text"),n.textContent=""},c=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(z.inactiveButtonClass):t.classList.add(z.inactiveButtonClass)};function i(e){e.currentTarget===e.target&&u(document.querySelector(".popup_is-opened"))}function a(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function u(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keyup",a),e.removeEventListener("click",i),null!=e.querySelector(".popup__form")&&function(e){var t=e.querySelector(z.formSelector);Array.from(t.querySelectorAll(z.inputSelector)).forEach((function(e){o(t,e)}))}(e)}function l(e){e.classList.add("popup_is-opened"),window.addEventListener("keyup",a),e.addEventListener("click",i)}var s=function(e){return"url("+e+")"},p=document.querySelector(".content"),d=p.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=n(e,t,r,A);d.append(o)}));var _=p.querySelector(".profile__info"),f=_.querySelector(".profile__title"),m=_.querySelector(".profile__description"),v=p.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),S=y.querySelector(".popup__close"),q=document.forms["edit-profile"],k=q.elements.profile__title,g=q.elements.profile__description;k.value=f.textContent,g.value=m.textContent,v.addEventListener("click",(function(e){l(y),k.value=f.textContent,g.value=m.textContent})),q.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=k.value,m.textContent=g.value,u(y)})),S.addEventListener("click",(function(e){u(y)}));var b=p.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_new-card"),E=L.querySelector(".popup__close"),h=document.forms["new-place"],C=h.elements["place-name"],x=h.elements.link,j={name:"",link:""};b.addEventListener("click",(function(e){l(L)})),E.addEventListener("click",(function(e){u(L)})),h.addEventListener("submit",(function(e){e.preventDefault(),j.name=C.value,j.link=x.value;var o=n(j,t,r,A);d.prepend(o),u(L),h.reset()}));var w=document.querySelector(".popup_type_image");function A(e){var t=w.querySelector(".popup__image"),n=w.querySelector(".popup__caption");t.src=e.src,t.alt=e.alt,n.textContent=e.alt,l(w)}w.querySelector(".popup__close").addEventListener("click",(function(e){u(w)}));var B=document.querySelector(".profile__image"),D=document.querySelector(".popup_type_profile-image-edit"),I=D.querySelector(".popup__close"),M=document.forms["edit-profile-image"],O=M.elements["link-to-image"];B.addEventListener("click",(function(e){var t;l(D),O.value=(t=B.style.backgroundImage).substring(5,t.length-2)})),I.addEventListener("click",(function(e){u(D)})),M.addEventListener("submit",(function(e){e.preventDefault(),B.style.backgroundImage=s(O.value),u(D)}));var z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(){var e=document.querySelector(".profile__info"),t=e.querySelector(".profile__title"),n=e.querySelector(".profile__description"),r=document.querySelector(".profile__image");fetch("https://nomoreparties.co/v1/wff-cohort-21/users/me ",{headers:{authorization:"936197d7-9c28-4a02-b461-a2e30a81b6a7"}}).then((function(e){return e.json()})).then((function(e){t.textContent=e.name,n.textContent=e.about,r.style.backgroundImage=s(e.avatar)}))}(),Array.from(document.querySelectorAll(z.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(z.inputSelector)),n=e.querySelector(z.submitButtonSelector);c(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){!function(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.patternMismatchErrorMessage):e.setCustomValidity("")}(t),t.validity.valid?o(e,t):function(e,t,n){t.classList.add(z.errorClass);var r=e.querySelector(".".concat(t.id,"-error"));r.classList.remove("popup__input_transparent_text"),r.textContent=n}(e,t,t.validationMessage)})(e,r),c(t,n)}))}))}(e)}))})();