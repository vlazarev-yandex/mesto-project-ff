(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=o.querySelector(".card__image"),i=o.querySelector(".card__title");return c.src=e.link,c.alt=e.name,i.textContent=e.name,o.querySelector(".card__delete-button").addEventListener("click",(function(e){n(o)})),c.addEventListener("click",(function(e){r(c)})),o.querySelector(".card__like-button").addEventListener("click",t),o}function r(e){e.remove()}e.d({},{I:()=>O}),document.querySelector(".content").querySelector(".places__list");var o=function(e,t){t.classList.remove(O.errorClass);var n=e.querySelector(".".concat(t.id,"-error"));n.classList.add("popup__input_transparent_text"),n.textContent=""},c=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(O.inactiveButtonClass):t.classList.add(O.inactiveButtonClass)};function i(e){e.currentTarget===e.target&&l(document.querySelector(".popup_is-opened"))}function a(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function l(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keyup",a),e.removeEventListener("click",i),null!=e.querySelector(".popup__form")&&function(e){var t=e.querySelector(O.formSelector);Array.from(t.querySelectorAll(O.inputSelector)).forEach((function(e){o(t,e)}))}(e)}function u(e){e.classList.add("popup_is-opened"),window.addEventListener("keyup",a),e.addEventListener("click",i)}var s=document.querySelector(".content"),p=s.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=n(e,t,r,w);p.append(o)}));var d=s.querySelector(".profile__info"),_=d.querySelector(".profile__title"),m=d.querySelector(".profile__description"),f=s.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),y=v.querySelector(".popup__close"),S=document.forms["edit-profile"],k=S.elements.profile__title,q=S.elements.profile__description;k.value=_.textContent,q.value=m.textContent,f.addEventListener("click",(function(e){u(v),k.value=_.textContent,q.value=m.textContent})),S.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=k.value,m.textContent=q.value,l(v)})),y.addEventListener("click",(function(e){l(v)}));var g=s.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_new-card"),b=L.querySelector(".popup__close"),E=document.forms["new-place"],h=E.elements["place-name"],C=E.elements.link,x={name:"",link:""};g.addEventListener("click",(function(e){u(L)})),b.addEventListener("click",(function(e){l(L)})),E.addEventListener("submit",(function(e){e.preventDefault(),x.name=h.value,x.link=C.value;var o=n(x,t,r,w);p.prepend(o),l(L),E.reset()}));var j=document.querySelector(".popup_type_image");function w(e){var t=j.querySelector(".popup__image"),n=j.querySelector(".popup__caption");t.src=e.src,t.alt=e.alt,n.textContent=e.alt,u(j)}j.querySelector(".popup__close").addEventListener("click",(function(e){l(j)}));var A=document.querySelector(".profile__image"),B=document.querySelector(".popup_type_profile-image-edit"),D=B.querySelector(".popup__close"),M=document.forms["edit-profile-image"],I=M.elements["link-to-image"];A.addEventListener("click",(function(e){var t;u(B),I.value=(t=A.style.backgroundImage).substring(5,t.length-2)})),D.addEventListener("click",(function(e){l(B)})),M.addEventListener("submit",(function(e){e.preventDefault(),A.style.backgroundImage="url("+I.value+")",l(B)}));var O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};console.log("info",fetch("https://nomoreparties.co/v1/wff-cohort-21/users/me ",{headers:{authorization:"936197d7-9c28-4a02-b461-a2e30a81b6a7"}}).then((function(e){return e.json()})).then((function(e){var t=e;console.log(t)}))),Array.from(document.querySelectorAll(O.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(O.inputSelector)),n=e.querySelector(O.submitButtonSelector);c(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){!function(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.patternMismatchErrorMessage):e.setCustomValidity("")}(t),t.validity.valid?o(e,t):function(e,t,n){t.classList.add(O.errorClass);var r=e.querySelector(".".concat(t.id,"-error"));r.classList.remove("popup__input_transparent_text"),r.textContent=n}(e,t,t.validationMessage)})(e,r),c(t,n)}))}))}(e)}))})();