import{c as U,A as K,d as Z,M as P,H,b as ee}from"./Footer-BlX-GE3y.js";import{a as n,j as e}from"./vendor-motion-zmcljbWX.js";import{u as b,a as te,F as se,g as re,C as L,i as I,b as ae,L as ie,c as le,P as oe,S as j}from"./kit-CYYzw_WQ.js";import{f as ne,d as ce}from"./about-courier-DraBpMvx.js";import{A as de,S as pe,a as me,b as xe,c as he}from"./autoplay-C-6JdoAn.js";import{A as _}from"./arrow-right-CzOl1ZUY.js";import{Q as ue}from"./quote-DMZWz8E3.js";import{P as ve,a as ge}from"./play-wMRcQBlZ.js";import{u as ye,b as fe,L as be}from"./LeadDetailsFields-ALve6ARK.js";import{S as M,a as je}from"./workDirections-Bg5bxOKr.js";import{C as D}from"./useWebsiteLeadSubmit-C5_uzLsK.js";import{r as we,f as Ne,F as A}from"./campaign-DXKnTuUP.js";import{B as Y}from"./bike-D7iRMd04.js";import{C}from"./car-rE5eezzy.js";import{C as ke}from"./clock-3-w-FvIfWD.js";import{S as B}from"./smartphone-D8bRc_aM.js";import{C as Ce}from"./check-hphx8sZh.js";import{B as Se}from"./boxes-Cwhuqou4.js";import"./vendor-react-T66SvYdt.js";import"./vendor-swiper-DTBcepxx.js";const ze=[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]],W=U("route",ze);const Ee=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]],T=U("truck",Ee),Le=""+new URL("delivery-compare-COJbPLja.webp",import.meta.url).href,Ie=""+new URL("delivery-route-1gMMYAMW.webp",import.meta.url).href,X=""+new URL("delivery-form-CwmNgPAS.webp",import.meta.url).href,Re=""+new URL("delivery-door-handover-HKCpLUht.webp",import.meta.url).href,_e=""+new URL("delivery-cargo-trolley-BHIzbOZN.webp",import.meta.url).href,v="https://yandex.com/maps/org/baroripark/70152279860/reviews/",R=[{id:"tima-tima",name:"тима тима",date:"13 августа",text:"Красавцы, думал уже из доставки уходить из-за постоянных корректировок в минус баланс, но все решили быстрее чем я им написал. Круто очень",sourceUrl:v},{id:"dasha-lasyuta",name:"Даша Ласюта",date:"20 августа",text:"Просто лучшие, решили мой вопрос с задержкой выплаты, очень благодарна за быстрый ответ и результат)))",sourceUrl:v},{id:"svetlana-kataeva",name:"Светлана Катаева",date:"9 июля",text:"Быстро,понятно,продуктивно. Рекомендую 👍🏻",sourceUrl:v},{id:"ivan-evdokimov",name:"Иван Евдокимов",date:"18 мая",text:"Хороший парк , добрая поддержка , быстро отвечают",sourceUrl:v},{id:"marta-batyreva",name:"Марта Батырева",date:"15 мая",text:"Выражаю благодарность Вашему специалисту Льву. Он помог разобраться в программе. Объяснил всё доходчиво. Проявив терпение и знание вопроса. Побольше бы таких сотрудников!",sourceUrl:v},{id:"vladimir-bondar",name:"Владимир Бондарь",date:"13 февраля",text:"Отличный сервис. Решают очень много вопросов и довольно быстро. Сотрудничаю с ними уже пятый месяц и ни разу не пожалел о выборе парка. Спасибо за Ваш профессионализм. Минусов пока небыло.",sourceUrl:v}],Me=6e3,De=({isVisible:t,isPageVisible:s,prefersReducedMotion:o,isUserPaused:l,isHovered:m,hasFocus:i})=>t&&s&&!o&&!l&&!m&&!i,Ae=()=>{const t=n.useRef(null),s=n.useId(),o=`${s}-delivery-reviews-heading`,l=`${s}-delivery-reviews-carousel`,m=`${s}-delivery-reviews-motion`,[i,x]=n.useState(null),[h,g]=n.useState(0),[y,w]=n.useState(!1),[u,c]=n.useState(!1),[a,f]=n.useState(!1),[d,N]=n.useState(!1),[S,F]=n.useState(!1),[z,O]=n.useState(!1);n.useEffect(()=>{const r=t.current;if(!r||typeof IntersectionObserver>"u")return;const p=new IntersectionObserver(([V])=>{w(V.isIntersecting&&V.intersectionRatio>=.15)},{threshold:.15});return p.observe(r),()=>p.disconnect()},[]),n.useEffect(()=>{const r=()=>c(document.visibilityState==="visible");return r(),document.addEventListener("visibilitychange",r),()=>document.removeEventListener("visibilitychange",r)},[]),n.useEffect(()=>{if(typeof window.matchMedia!="function")return;const r=window.matchMedia("(prefers-reduced-motion: reduce)"),p=()=>f(r.matches);return p(),typeof r.addEventListener=="function"?(r.addEventListener("change",p),()=>r.removeEventListener("change",p)):(r.addListener(p),()=>r.removeListener(p))},[]);const E=De({isVisible:y,isPageVisible:u,prefersReducedMotion:a,isUserPaused:d,isHovered:S,hasFocus:z}),$=E&&!!(i&&!i.destroyed);n.useEffect(()=>{if(!(!i||i.destroyed))return E?i.autoplay.start():i.autoplay.stop(),()=>{i.destroyed||i.autoplay.stop()}},[i,E]);const k=a?0:350,G=a?"reduced-motion":d?"user":z?"focus":S?"hover":u?y?"none":"out-of-view":"hidden-tab",Q=r=>{N(!0),i?.slideToLoop(r,k)},q=r=>{N(!0),r==="previous"?i?.slidePrev(k):i?.slideNext(k)},J=a?"Автопрокрутка отключена: включено уменьшение движения.":d?"Автопрокрутка на паузе.":S||z?"Автопрокрутка приостановлена на время чтения.":"Смена отзыва каждые 6 секунд.";return e.jsx("section",{id:"delivery-reviews",ref:t,className:"delivery-page-reviews","aria-labelledby":o,"aria-roledescription":"карусель","data-autoplay":$?"running":"paused","data-pause-reason":G,"data-review-index":h+1,onMouseEnter:()=>F(!0),onMouseLeave:()=>F(!1),onFocusCapture:()=>O(!0),onBlurCapture:r=>{r.currentTarget.contains(r.relatedTarget)||O(!1)},children:e.jsxs("div",{className:"delivery-page-reviews-inner",children:[e.jsxs("div",{className:"delivery-page-reviews-heading",children:[e.jsxs("div",{children:[e.jsx("p",{className:"delivery-page-reviews-eyebrow",children:"Опыт работы с парком"}),e.jsx("h2",{id:o,children:"Отзывы о Барори Парк"}),e.jsx("p",{className:"delivery-page-reviews-intro",children:"Отзывы пользователей Яндекс Карт о парке и поддержке. Направление работы может отличаться."})]}),e.jsxs("div",{className:"delivery-page-reviews-navigation",role:"group","aria-label":"Переключение отзывов",children:[e.jsx("button",{type:"button",className:"delivery-page-reviews-arrow","aria-label":"Предыдущий отзыв","aria-controls":l,onClick:()=>q("previous"),children:e.jsx(de,{size:22,"aria-hidden":"true"})}),e.jsx("button",{type:"button",className:"delivery-page-reviews-arrow","aria-label":"Следующий отзыв","aria-controls":l,onClick:()=>q("next"),children:e.jsx(_,{size:22,"aria-hidden":"true"})})]})]}),e.jsx(pe,{id:l,className:"delivery-page-reviews-carousel",wrapperClass:"swiper-wrapper delivery-page-reviews-track",modules:[me,xe],onSwiper:r=>{r.autoplay.stop(),x(r)},onSlideChange:r=>g(r.realIndex),onSliderFirstMove:()=>N(!0),loop:!0,speed:k,spaceBetween:20,slidesPerView:1,breakpoints:{700:{slidesPerView:2},1100:{slidesPerView:3}},autoplay:{delay:Me,disableOnInteraction:!1},a11y:{enabled:!0,containerMessage:"Отзывы о Барори Парк",itemRoleDescriptionMessage:"отзыв",slideLabelMessage:"Отзыв {{index}} из {{slidesLength}}",wrapperLiveRegion:!1},children:R.map(r=>e.jsx(he,{className:"delivery-page-review-slide",children:e.jsxs("figure",{className:"delivery-page-review-card",children:[e.jsx(ue,{className:"delivery-page-review-quote",size:32,"aria-hidden":"true"}),e.jsx("blockquote",{className:"delivery-page-review-text",children:e.jsx("p",{children:r.text})}),e.jsxs("figcaption",{className:"delivery-page-review-author",children:[e.jsx("strong",{children:r.name}),e.jsxs("span",{children:["Яндекс Карты · ",r.date]})]})]})},r.id))}),e.jsxs("div",{className:"delivery-page-reviews-controls",children:[e.jsx("div",{className:"delivery-page-reviews-pagination",role:"group","aria-label":"Выбор отзыва",children:R.map((r,p)=>e.jsx("button",{type:"button",className:"delivery-page-reviews-dot","aria-label":`Перейти к отзыву ${p+1}: ${r.name}`,"aria-controls":l,"aria-current":h===p?"true":void 0,onClick:()=>Q(p),children:e.jsx("span",{"aria-hidden":"true"})},r.id))}),e.jsxs("p",{className:"delivery-page-reviews-counter",role:"status","aria-live":$?"off":"polite","aria-atomic":"true",children:["Отзыв ",h+1," из ",R.length]}),e.jsxs("button",{type:"button",className:"delivery-page-reviews-playback","aria-label":a?"Автопрокрутка отключена при уменьшении движения":d?"Включить автопрокрутку":"Приостановить автопрокрутку","aria-pressed":d||a,"aria-controls":l,"aria-describedby":m,disabled:a,onClick:()=>N(r=>!r),children:[d||a?e.jsx(ve,{size:16,"aria-hidden":"true"}):e.jsx(ge,{size:16,"aria-hidden":"true"}),a?"Автопрокрутка отключена":d?"Включить автопрокрутку":"Пауза"]})]}),e.jsxs("div",{className:"delivery-page-reviews-footer",children:[e.jsx("p",{id:m,className:"delivery-page-reviews-motion-note",children:J}),e.jsxs("a",{href:v,target:"_blank",rel:"noopener noreferrer",children:["Все отзывы на Яндекс Картах ",e.jsx(K,{size:17,"aria-hidden":"true"})]})]})]})})},Te=[{value:"Уже оформлена",label:"Уже оформлена"},{value:"Готов оформить",label:"Готов оформить"}],Fe=t=>{if(!t.name.trim()||!t.phone.trim())return"Заполните имя и телефон";const s=t.phone.replace(/\D/g,"");return s.length<10?"Укажите телефон: не менее 10 цифр":s.length>15?"Укажите корректный телефон: от 10 до 15 цифр":t.city.trim()?t.consent?null:"Нужно согласие на обработку персональных данных":"Укажите город, чтобы подобрать доступные направления"},Oe=(t,s)=>({name:t.name.trim(),phone:t.phone.trim(),city:t.city.trim(),department:t.service,self_employment:t.selfEmployment,...s,message:`Сервис доставки: ${t.service}. Самозанятость: ${t.selfEmployment}.`}),$e=["Подберите мне","Яндекс Доставка","Купер","TopGo","Интересует другое направление работы"].map(t=>({value:t,label:t})),qe=t=>{const{track:s}=b(),{details:o,setDetails:l,resetDetails:m}=ye("smena"),[i,x]=n.useState({name:"",phone:"",city:t.city,service:"Подберите мне",selfEmployment:"Готов оформить",consent:!1,format:"Пока не решил"}),{submit:h,isLoading:g,showToast:y}=te({position:"Курьер / Доставка",leadType:"Курьер / Доставка (рекламный лендинг)",onSuccess:()=>{x(u=>({...u,name:"",phone:"",consent:!1})),m()}});return{state:i,setState:x,handleSubmit:u=>{u.preventDefault();const c=Fe(i);if(c){s("lead_validation_error",{reason:c}),y(c,"error");return}const a=i.service==="Интересует другое направление работы",f=a?{name:i.name.trim(),phone:i.phone.trim(),city:i.city.trim(),message:"",...t.attribution}:Oe(i,t.attribution),d=fe(o,"delivery",i.format||"Пока не решил",a);h({...f,...d,department:a?d.department:i.service,message:[f.message,d.message].filter(Boolean).join(`
`)},i.consent)},isLoading:g,details:o,setDetails:l}},Ve=({idPrefix:t,captchaMount:s=!1,compact:o=!1,state:l,setState:m,handleSubmit:i,isLoading:x,details:h,setDetails:g})=>{const{track:y}=b(),[w,u]=n.useState(!1),c=(a,f)=>m(d=>({...d,[a]:f}));return e.jsxs("form",{onSubmit:i,onFocusCapture:()=>{w||(u(!0),y("lead_start",{place:t}))},className:o?"space-y-3":"space-y-4","aria-label":"Заявка на работу курьером",children:[s&&e.jsx("div",{id:"captcha-container"}),o?e.jsxs("div",{children:[e.jsx("p",{className:"font-bold font-oswald text-xl text-gray-900",children:"Подберём подходящий вариант"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Свяжемся в рабочее время и проверим предложения по городу"})]}):e.jsxs("div",{className:"flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs uppercase tracking-wide text-green-800/70 font-semibold",children:"Направление"}),e.jsx("p",{className:"font-bold text-green-800 font-oswald text-lg leading-tight",children:"Курьер / Доставка"}),e.jsx("p",{className:"text-xs text-green-800/70",children:"Яндекс Доставка, Купер и TopGo"})]}),e.jsx(D,{className:"text-green-800 shrink-0",size:24})]}),e.jsx(L,{name:`${t}-service`,label:"Какой сервис интересует?",options:$e,value:l.service,onChange:a=>c("service",a),columns:o?1:2}),l.service!=="Интересует другое направление работы"&&e.jsx(L,{name:`${t}-format`,label:"Как будете доставлять?",options:je.delivery.map(a=>({value:a.label,label:a.label})),value:l.format||"Пока не решил",onChange:a=>c("format",a)}),e.jsxs("div",{className:`grid gap-3 ${o?"grid-cols-1":"grid-cols-1 sm:grid-cols-2"}`,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:`${t}-name`,className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Имя и фамилия"}),e.jsx("input",{id:`${t}-name`,type:"text",required:!0,autoComplete:"name",placeholder:"Иван Иванов",className:I,value:l.name,onChange:a=>c("name",a.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:`${t}-phone`,className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Телефон"}),e.jsx("input",{id:`${t}-phone`,type:"tel",required:!0,autoComplete:"tel",inputMode:"tel",minLength:10,maxLength:26,pattern:"(?=(?:\\D*\\d){10,15}\\D*$)[\\d+\\(\\)\\s\\-]+",title:"Введите корректный телефон: от 10 до 15 цифр","aria-describedby":`${t}-phone-hint`,placeholder:"+7 (999) 000-00-00",className:I,value:l.phone,onChange:a=>c("phone",a.target.value)}),e.jsx("p",{id:`${t}-phone-hint`,className:"sr-only",children:"Введите корректный телефон, содержащий от 10 до 15 цифр"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:`${t}-city`,className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Город"}),e.jsx("input",{id:`${t}-city`,type:"text",required:!0,autoComplete:"address-level2",placeholder:"Например, Казань",className:I,value:l.city,onChange:a=>c("city",a.target.value)})]}),l.service!=="Интересует другое направление работы"&&e.jsx(L,{name:`${t}-self-employment`,label:"Самозанятость",options:Te,value:l.selfEmployment,onChange:a=>c("selfEmployment",a),columns:o?1:2}),h&&g&&e.jsx(be,{details:h,setDetails:g,ownDirection:"delivery",chooseDirection:l.service==="Интересует другое направление работы",idPrefix:t}),e.jsx(ae,{id:`${t}-consent`,checked:l.consent,onChange:a=>c("consent",a),place:t}),e.jsx("button",{type:"submit",disabled:x||!l.consent,className:`w-full bg-green-600 text-[var(--on-accent)] font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${x||!l.consent?"opacity-70 cursor-not-allowed":"cursor-pointer hover:bg-green-700"}`,children:x?"Отправляем...":l.service==="Интересует другое направление работы"?"Отправить заявку":"Подобрать вариант"}),e.jsx("p",{className:"text-center text-xs text-gray-400",children:"Условия оформления зависят от выбранного сервиса и города. Заявка не является трудовым договором."})]})},Ue=t=>e.jsx(se,{title:"Подберём доставку под вас",lead:"Оставьте контакты. Проверим направления в вашем городе и объясним условия конкретного предложения.",image:X,minAge:re(t.state.service==="Интересует другое направление работы"?t.details?.direction:"delivery"),bullets:[{icon:e.jsx(Z,{size:18}),text:"Свяжемся в рабочее время с 10:00 до 20:00"},{icon:e.jsx(D,{size:18}),text:"Подберём формат под ваш транспорт и график"},{icon:e.jsx(M,{size:18}),text:"Документы и статус оформления уточним до подключения"}],children:e.jsx(Ve,{idPrefix:"final-courier",captchaMount:!0,...t})}),Pe=[{id:"foot",value:"Пеший курьер",label:"Пешком",title:"Пеший курьер",description:"Небольшие заказы рядом с домом. Автомобиль и водительские права не нужны.",fit:"Документы и небольшие посылки"},{id:"bike",value:"Велокурьер",label:"Велосипед или самокат",title:"Вело и самокат",description:"Быстрый формат для коротких городских маршрутов и большего числа точек.",fit:"Экспресс-доставка по городу"},{id:"auto",value:"Автокурьер",label:"Легковой автомобиль",title:"На автомобиле",description:"Подходит для дальних маршрутов, плановых рейсов и более крупных заказов.",fit:"Экспресс, плановая и обычная доставка"},{id:"cargo",value:"Водитель грузовой доставки",label:"Грузовой автомобиль",title:"Грузовой формат",description:"Для объёмных заказов на подходящем автомобиле. Тип кузова уточняется заранее.",fit:"Грузы и крупногабаритные заказы"}],He=[{id:"express",value:"Экспресс-доставка",title:"Экспресс-доставка",lead:"Документы, посылки и небольшие заказы по городу с получением и передачей клиенту.",reward:"Ориентир от 4 000 ₽ за день",formats:"Пешком, велосипед, самокат или автомобиль",facts:["Приём и доставка заказов","Общение с клиентами","Ответственность за сохранность товара"]},{id:"planned",value:"Плановая доставка",title:"Плановая доставка",lead:"Заранее известные точки и маршрут. Подходит тем, кому удобнее работать рейсами.",reward:"Ориентир от 7 000 ₽ за день",formats:"Обычно на автомобиле",facts:["До 10 заказов на рейс","Планирование маршрутов","Обеспечение сохранности товаров"]},{id:"auto",value:"Автодоставка",title:"Автодоставка",lead:"Обычные и крупные заказы, которые удобнее перевозить на личном автомобиле.",reward:"Условия зависят от маршрута и города",formats:"Легковой автомобиль",facts:["Городские и более дальние маршруты","Заказы разного размера","Подходящие предложения проверяются по модели автомобиля"]},{id:"cargo",value:"Грузовая доставка",title:"Грузовая доставка",lead:"Перевозка объёмных заказов и грузов получателю на подходящем автомобиле.",reward:"Ориентир от 6 000 ₽ за день",formats:"Грузовой автомобиль",facts:["Доставка грузов получателю","Поддержание чистоты автомобиля","Вежливое общение с клиентами"]}],Ye={foot:e.jsx(A,{size:25}),bike:e.jsx(Y,{size:25}),auto:e.jsx(C,{size:25}),cargo:e.jsx(T,{size:25})},Be={express:e.jsx(Se,{size:24}),planned:e.jsx(W,{size:24}),auto:e.jsx(C,{size:24}),cargo:e.jsx(T,{size:24})},We=[{icon:e.jsx(W,{size:20}),title:"Все форматы",text:"от пешего до грузового"},{icon:e.jsx(P,{size:20}),title:"По вашему городу",text:"проверяем доступность"},{icon:e.jsx(M,{size:20}),title:"Понятные условия",text:"до оформления"},{icon:e.jsx(H,{size:20}),title:"Поддержка парка",text:"после подключения"}],Xe=[{q:"Можно работать без автомобиля?",a:"Да. Для документов, посылок и небольших заказов доступны пеший формат, велосипед и самокат. Набор предложений зависит от города."},{q:"Какие направления можно выбрать?",a:"Экспресс-доставка, плановые маршруты, автодоставка и грузовая доставка. Менеджер проверит, какие варианты доступны именно в вашем городе."},{q:"Указанный доход гарантирован?",a:"Нет. На странице указаны ориентиры действующих предложений с главного сайта. Итоговое вознаграждение зависит от города, направления, транспорта, спроса, количества заказов и условий выбранного сервиса."},{q:"Это оформление по трудовому договору?",a:"Формат сотрудничества зависит от выбранного сервиса и конкретного предложения. Это может быть договор с самозанятым или ИП, а для отдельных предложений другой формат. Менеджер сообщит вид договора до оформления."},{q:"Нужна ли самозанятость?",a:"Не для каждого направления действуют одинаковые требования. Если потребуется статус самозанятого, об этом скажут заранее и помогут разобраться с оформлением."},{q:"Можно совмещать с учёбой или другой работой?",a:"Во многих предложениях можно выбирать доступные интервалы и дни. Конкретный график зависит от сервиса и города, поэтому подтвердим его до подключения."},{q:"Сколько стоит заявка?",a:"Заявка и первичная консультация бесплатны. Возможные расходы на документы или оснащение зависят от направления и обсуждаются заранее."}],Ge=({headline:t})=>{const{track:s,scrollToOrder:o,phone:l}=b();return e.jsx("section",{"data-testid":"delivery-hero",className:"delivery-hero service-hero relative",children:e.jsxs("div",{className:"delivery-hero-grid service-hero-grid container relative mx-auto",children:[e.jsxs("div",{className:"delivery-hero-copy service-hero-copy",children:[e.jsx("p",{className:"delivery-hero-badge service-eyebrow",children:"Работа и подработка в доставке, 16+"}),e.jsx("h1",{className:"delivery-hero-title",children:t}),e.jsx("p",{className:"delivery-hero-description service-lead",children:"Посылки, документы и грузы. Пешком, на самокате, велосипеде или авто. Сравним доступные варианты в вашем городе."}),e.jsxs("div",{className:"delivery-hero-actions",children:[e.jsxs("button",{type:"button",onClick:()=>o("hero"),className:"delivery-primary-cta",children:["Подобрать вариант ",e.jsx("span",{children:e.jsx(_,{size:19})})]}),e.jsxs("a",{href:l.href,onClick:()=>s("phone_click",{place:"hero"}),className:"delivery-secondary-cta",children:[e.jsx(oe,{size:18})," Позвонить"]})]})]}),e.jsxs("figure",{"data-testid":"delivery-route-scene",className:"delivery-route-scene service-hero-visual relative overflow-hidden bg-green-950",children:[e.jsx("img",{src:Ie,alt:"Пеший, вело- и автокурьеры на городском маршруте",width:"1672",height:"941",fetchPriority:"high",decoding:"async",className:"absolute inset-0 h-full w-full object-cover object-center"}),e.jsx("div",{className:"delivery-route-shade absolute inset-0"}),e.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 480 320",preserveAspectRatio:"none",className:"delivery-route-map pointer-events-none absolute inset-0 h-full w-full",children:e.jsx("path",{className:"delivery-route-path",pathLength:"1",d:"M-8 206 C 84 246, 138 118, 232 148 S 372 214, 488 108"})}),e.jsxs("span",{className:"delivery-route-chip delivery-route-chip--foot",children:[e.jsx(A,{size:16})," Пешком"]}),e.jsxs("span",{className:"delivery-route-chip delivery-route-chip--bike",children:[e.jsx(Y,{size:16})," Вело"]}),e.jsxs("span",{className:"delivery-route-chip delivery-route-chip--car",children:[e.jsx(C,{size:16})," Авто"]}),e.jsxs("figcaption",{className:"delivery-route-caption absolute inset-x-0 bottom-0 z-10 text-left text-white",children:[e.jsx("span",{className:"delivery-route-caption-title",children:"Один запрос — разные варианты"}),e.jsx("span",{className:"delivery-route-caption-description",children:"Город, транспорт и условия соберём в один понятный маршрут"})]})]})]})})},Qe=()=>e.jsx("div",{className:"delivery-trust-wrap container mx-auto",children:e.jsx("div",{className:"delivery-reveal delivery-trust-bar grid grid-cols-2 lg:grid-cols-4",children:We.map(t=>e.jsxs("div",{className:"flex items-start gap-3 lg:px-7 lg:first:pl-0 lg:last:pr-0",children:[e.jsx("span",{className:"mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800",children:t.icon}),e.jsxs("div",{children:[e.jsx("p",{className:"font-oswald text-base font-bold uppercase leading-tight text-slate-900",children:t.title}),e.jsx("p",{className:"mt-0.5 text-xs text-slate-500 sm:text-sm",children:t.text})]})]},t.title))})}),Je=()=>e.jsx("section",{id:"formats",className:"scroll-mt-24 l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto",children:[e.jsx(j,{kicker:"С чего начнём",title:"На чём удобно работать",subtitle:"Выбирать сейчас ничего не нужно. Оставьте контакты — менеджер проверит, какие форматы открыты в вашем городе, и поможет сравнить."}),e.jsx("div",{className:"delivery-format-rail",children:Pe.map(t=>e.jsxs("article",{className:"delivery-format-card flex min-w-0 flex-col rounded-[20px] border border-slate-200 l-glass p-6 text-slate-900 transition-all duration-300",children:[e.jsx("span",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm",children:Ye[t.id]}),e.jsx("h3",{className:"mt-5 block font-oswald text-2xl font-bold uppercase",children:t.title}),e.jsx("span",{className:"mt-2 block max-w-xl text-sm leading-relaxed text-slate-600",children:t.description}),e.jsx("span",{className:"mt-5 block text-xs font-semibold text-green-800 md:mt-auto md:pt-5",children:t.fit})]},t.id))})]})}),Ke=({direction:t})=>e.jsxs("article",{className:"delivery-direction-card relative flex flex-col overflow-hidden rounded-[20px] border border-slate-200 l-glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",children:[e.jsxs("div",{className:"delivery-direction-top flex min-h-12 items-center justify-between gap-4",children:[e.jsx("span",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-800",children:Be[t.id]}),e.jsx("span",{className:"delivery-direction-reward rounded-full bg-green-50 px-3 py-1.5 text-right text-[11px] font-bold leading-snug text-green-800",children:t.reward})]}),e.jsx("h3",{className:"mt-5 font-oswald text-2xl font-bold uppercase leading-tight text-slate-950 lg:text-3xl",children:t.title}),e.jsx("p",{className:"mt-3 max-w-xl text-sm leading-relaxed text-slate-600",children:t.lead}),e.jsxs("p",{className:"mt-4 border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-500",children:["Формат: ",t.formats]}),e.jsx("div",{className:"mt-5 grow space-y-2",children:t.facts.map(s=>e.jsxs("p",{className:"flex items-start gap-2 text-sm text-slate-700",children:[e.jsx(Ce,{size:17,className:"mt-0.5 shrink-0 text-green-800"}),e.jsx("span",{children:s})]},s))}),e.jsx(Ze,{direction:t})]}),Ze=({direction:t})=>{const{track:s,scrollToOrder:o}=b();return e.jsxs("button",{type:"button",onClick:()=>{s("direction_apply",{direction:t.value}),o("direction_card")},className:"mt-6 inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-green-700 bg-white px-5 py-3 text-sm font-bold text-green-800 transition-colors hover:bg-green-700 hover:text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800",children:["Оставить заявку ",e.jsx(_,{size:16})]})},et=()=>e.jsx("section",{id:"directions",className:"scroll-mt-24 l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto",children:[e.jsx(j,{kicker:"Направления",title:"Все направления доставки",subtitle:"Здесь собрана вся информация с главной страницы. Указанный ориентир не является обещанием конкретного дохода."}),e.jsx("div",{className:"delivery-direction-grid delivery-page-directions",children:He.map(t=>e.jsxs("div",{className:"delivery-page-direction-row","data-direction":t.id,children:[e.jsx(Ke,{direction:t}),e.jsx(st,{direction:t})]},t.id))})]})}),tt={express:{src:ce,alt:"Пеший курьер с посылкой на городской улице",width:1200,height:900},planned:{src:Re,alt:"Курьер передаёт посылку клиентам у двери",width:1200,height:675},auto:{src:X,alt:"Курьер загружает коробки в автомобиль",width:1024,height:1536},cargo:{src:_e,alt:"Курьер везёт коробки на тележке от фургона",width:1200,height:795}},st=({direction:t})=>{const s=tt[t.id],o={express:"Посылки и документы",planned:"Точки и маршрут",auto:"Заказы на личном автомобиле",cargo:"Объёмные заказы и грузы"}[t.id];return e.jsxs("figure",{className:`delivery-page-direction-visual delivery-page-direction-visual--${t.id}`,children:[e.jsx("img",{src:s.src,alt:s.alt,width:s.width,height:s.height,loading:"lazy",decoding:"async"}),e.jsx("figcaption",{children:o})]})},rt=()=>e.jsx("section",{id:"compare",className:"delivery-comparison scroll-mt-24 l-tint py-16",children:e.jsx("div",{className:"delivery-reveal container mx-auto",children:e.jsxs("div",{className:"grid items-start gap-10 lg:grid-cols-12",children:[e.jsxs("div",{className:"lg:sticky lg:top-28 lg:col-span-5",children:[e.jsx(j,{kicker:"Подбор",title:"Что подойдёт именно вам",subtitle:"Не нужно угадывать по объявлению. Оставьте город и транспорт, а мы отфильтруем неподходящие варианты до оформления."}),e.jsx("img",{src:Le,alt:"Велокурьер едет по городской велодорожке",loading:"lazy",decoding:"async",className:"delivery-comparison-photo mt-8 aspect-[16/9] w-full rounded-[20px] object-cover lg:aspect-[4/3]"})]}),e.jsx("div",{className:"delivery-match-grid grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-6",children:[{icon:e.jsx(A,{size:22}),title:"Нет автомобиля",text:"Пешая доставка, велосипед и самокат для документов, посылок и небольших заказов."},{icon:e.jsx(ke,{size:22}),title:"Нужна подработка",text:"Ищем предложения с доступными днями и интервалами, которые можно совмещать."},{icon:e.jsx(C,{size:22}),title:"Есть личное авто",text:"Сравниваем экспресс, плановые рейсы и обычную автодоставку."},{icon:e.jsx(T,{size:22}),title:"Есть грузовой автомобиль",text:"Проверяем подходящие грузы, маршруты и требования к кузову."},{icon:e.jsx(B,{size:22}),title:"Нет опыта",text:"Для многих направлений опыт не нужен. Поможем разобраться с приложением и стартом."}].map(t=>e.jsxs("div",{className:"delivery-match-card rounded-[18px] border border-slate-200 l-glass p-5",children:[e.jsx("span",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm",children:t.icon}),e.jsx("h3",{className:"mt-4 font-oswald text-xl font-bold uppercase text-slate-950",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-600",children:t.text})]},t.title))})]})})}),at=()=>e.jsx("section",{className:"l-tint py-16",children:e.jsx("div",{className:"delivery-reveal container mx-auto",children:e.jsx("div",{className:"delivery-support-panel overflow-hidden rounded-[20px] border border-green-200 l-glass shadow-[0_24px_70px_var(--accent-shadow)]",children:e.jsxs("div",{className:"grid lg:grid-cols-12",children:[e.jsxs("div",{className:"delivery-support-intro bg-green-700 p-7 text-[var(--on-accent)] lg:col-span-5 lg:p-10",children:[e.jsxs("p",{className:"flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--on-accent-soft)]",children:[e.jsx("span",{"aria-hidden":"true",className:"h-px w-8 bg-green-200/50"}),"Барори Парк"]}),e.jsx("h2",{className:"mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em]",children:"Не оставляем после заявки"}),e.jsx("p",{className:"mt-5 leading-relaxed text-[var(--on-accent-soft)]",children:"Помогаем понять условия, подготовиться к подключению и решить вопросы после старта."})]}),e.jsx("div",{className:"delivery-support-grid grid sm:grid-cols-2 lg:col-span-7",children:[{icon:e.jsx(P,{size:22}),title:"Проверяем город",text:"Показываем только те направления, которые доступны для вашего региона."},{icon:e.jsx(M,{size:22}),title:"Объясняем договор",text:"До оформления сообщаем формат сотрудничества и требования сервиса."},{icon:e.jsx(B,{size:22}),title:"Помогаем начать",text:"Подсказываем по приложению, документам и первым доступным заказам."},{icon:e.jsx(H,{size:22}),title:"Остаёмся на связи",text:"Помогаем с вопросами по доступу, заказам и спорным ситуациям."}].map(t=>e.jsxs("div",{className:"border-b border-slate-100 p-6 sm:border-l lg:p-8",children:[e.jsx("span",{className:"text-green-800",children:t.icon}),e.jsx("h3",{className:"mt-4 font-oswald text-xl font-bold uppercase text-slate-950",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-600",children:t.text})]},t.title))})]})})})}),it=()=>e.jsx("section",{id:"start",className:"scroll-mt-24 l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto",children:[e.jsx(j,{kicker:"Как это работает",title:"От заявки до доступных заказов",subtitle:"Без длинной анкеты на сайте и без обещаний срока, который зависит от проверки сервиса."}),e.jsx("div",{className:"delivery-route-steps mt-10 grid gap-4 md:grid-cols-4 lg:gap-6",children:[{title:"Оставьте контакты",text:"Имя, телефон, город и удобный транспорт."},{title:"Сравним варианты",text:"Проверим направления и условия в вашем городе."},{title:"Уточним оформление",text:"Заранее скажем, какой договор и документы потребуются."},{title:"Получите доступ",text:"После проверки сервиса поможем разобраться с началом работы."}].map((t,s)=>e.jsxs("div",{className:"delivery-step relative border-t-2 border-green-700 pt-5",children:[e.jsxs("span",{className:"font-oswald text-sm font-bold text-green-800",children:["0",s+1]}),e.jsx("h3",{className:"mt-3 font-oswald text-xl font-bold uppercase text-slate-950",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-600",children:t.text})]},t.title))})]})}),lt=()=>e.jsx("section",{className:"delivery-requirements l-tint py-16",children:e.jsx("div",{className:"delivery-reveal container mx-auto",children:e.jsxs("div",{className:"delivery-page-requirements-layout",children:[e.jsx("figure",{className:"delivery-page-requirements-photo",children:e.jsx("img",{src:ne,alt:"Велокурьер на городской дорожке",width:"1200",height:"900",loading:"lazy",decoding:"async"})}),e.jsxs("div",{className:"delivery-page-requirements-copy",children:[e.jsx(j,{kicker:"Требования",title:"Что потребуется для старта",subtitle:"Базовый список короткий. Дополнительные требования зависят от направления, поэтому их проверяем до оформления."}),e.jsx("ul",{className:"delivery-page-requirements-list",children:["Возраст от 16 лет","Смартфон с доступом в интернет","Документы для выбранного формата оформления","Личный транспорт только для вело-, авто- и грузового формата","Самозанятость, если её требует конкретный сервис"].map(t=>e.jsxs("li",{children:[e.jsx(D,{size:20,"aria-hidden":"true"}),e.jsx("span",{children:t})]},t))}),e.jsxs("div",{className:"delivery-contract-note delivery-page-contract-note rounded-[18px] border border-green-200 bg-green-700 p-6 text-[var(--on-accent)]",children:[e.jsx("h3",{children:"Важно о договоре"}),e.jsx("p",{className:"mt-2 max-w-4xl text-sm leading-relaxed text-[var(--on-accent-soft)]",children:"Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, договор и порядок выплат сообщаются для конкретного предложения."})]})]})]})})}),ot=()=>{const{track:t}=b(),[s]=n.useState(()=>we(typeof window>"u"?"":window.location.search)),o=qe(s),m=!!(s.city||s.format!=="Пока не выбрал")?Ne(s):"Работа в доставке";return n.useEffect(()=>{t("view",{city:s.city||"not_set",format:s.format,direction:s.direction})},[]),e.jsxs("div",{className:"delivery-page",children:[e.jsx(Ge,{headline:m}),e.jsx(Qe,{}),e.jsx(Je,{}),e.jsx(et,{}),e.jsx(rt,{}),e.jsx(at,{}),e.jsx(it,{}),e.jsx(lt,{}),e.jsx(Ae,{}),e.jsx(le,{items:Xe,title:"Частые вопросы"}),e.jsx(Ue,{...o}),e.jsx("style",{children:`
        @keyframes delivery-copy-in {
          from { opacity: .35; transform: translateY(18px); clip-path: inset(0 0 12%); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0); }
        }

        @keyframes delivery-scene-settle {
          from { transform: scale(1.08); filter: saturate(.8); }
          to { transform: scale(1.01); filter: saturate(1); }
        }

        @keyframes delivery-route-draw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes delivery-chip-in {
          from { opacity: 0; transform: translateY(12px) scale(.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes delivery-cta-sweep {
          from { transform: translateX(-140%) skewX(-18deg); }
          to { transform: translateX(340%) skewX(-18deg); }
        }

        @keyframes delivery-section-in {
          from { opacity: .35; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .delivery-hero::before {
          position: absolute;
          inset: 0;
          content: '';
          pointer-events: none;
          opacity: .52;
          background-image:
            linear-gradient(var(--accent-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-grid) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: linear-gradient(to bottom, #000 0, transparent 75%);
        }

        .delivery-hero-copy > * {
          animation: delivery-copy-in .7s cubic-bezier(.16, 1, .3, 1) both;
        }

        .delivery-hero-copy > :nth-child(2) { animation-delay: .07s; }
        .delivery-hero-copy > :nth-child(3) { animation-delay: .14s; }
        .delivery-hero-copy > :nth-child(4) { animation-delay: .21s; }

        .delivery-route-scene img {
          animation: delivery-scene-settle 1.2s cubic-bezier(.16, 1, .3, 1) both;
        }

        .delivery-route-map {
          z-index: 2;
          filter: drop-shadow(0 2px 5px rgba(5, 46, 22, .35));
        }

        .delivery-route-path {
          fill: none;
          stroke: rgba(255, 255, 255, .92);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 1;
          animation: delivery-route-draw 1.2s cubic-bezier(.16, 1, .3, 1) .25s both;
        }

        .delivery-route-chip {
          position: absolute;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 36px;
          padding: 8px 11px;
          border: 1px solid rgba(255, 255, 255, .72);
          border-radius: 999px;
          color: var(--color-green-900);
          background: rgba(255, 255, 255, .92);
          box-shadow: 0 10px 28px rgba(3, 18, 9, .24);
          backdrop-filter: blur(10px);
          font-size: 12px;
          font-weight: 700;
          animation: delivery-chip-in .55s cubic-bezier(.16, 1, .3, 1) both;
        }

        /* Чипы идут по направлению маршрута: слева ниже, справа выше.
           На мобильном кадр низкий, поэтому держим их выше подписи в нижней трети. */
        .delivery-route-chip--foot { top: 30%; left: 5%; animation-delay: .5s; }
        .delivery-route-chip--bike { top: 18%; left: 36%; animation-delay: .65s; }
        .delivery-route-chip--car { top: 6%; right: 5%; animation-delay: .8s; }

        .delivery-primary-cta {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .delivery-primary-cta::after {
          position: absolute;
          inset-block: -30%;
          left: 0;
          z-index: -1;
          width: 36%;
          content: '';
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          animation: delivery-cta-sweep 1.1s cubic-bezier(.16, 1, .3, 1) .85s both;
        }

        .delivery-format-rail,
        .delivery-match-grid {
          scrollbar-width: none;
        }

        @media (min-width: 1024px) {
          .delivery-trust-bar > * + * {
            border-left: 1px solid var(--color-green-100);
          }
        }

        .delivery-format-rail::-webkit-scrollbar,
        .delivery-match-grid::-webkit-scrollbar {
          display: none;
        }

        .delivery-support-panel {
          border-radius: 24px;
        }

        /* Закреплённая мобильная кнопка висит над контентом: якорный скролл и автоскролл
           к полю формы не должны прятать цель под ней и под home indicator. */
        @media (max-width: 1023px) {
          html {
            scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 639px) {
          .delivery-match-grid {
            display: flex;
            margin-inline: -1rem;
            padding: 0 1rem 8px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }

          .delivery-match-card {
            min-width: 78vw;
            scroll-snap-align: center;
          }

          .delivery-route-steps {
            position: relative;
          }

          .delivery-route-steps::before {
            position: absolute;
            top: 8px;
            bottom: 24px;
            left: 14px;
            width: 2px;
            content: '';
            background: linear-gradient(to bottom, var(--color-green-700), var(--color-green-300));
          }

          .delivery-route-steps .delivery-step {
            padding: 0 0 24px 48px;
            border-top: 0;
          }

          .delivery-route-steps .delivery-step::before {
            position: absolute;
            top: 3px;
            left: 6px;
            width: 18px;
            height: 18px;
            content: '';
            border: 5px solid #fff;
            border-radius: 999px;
            background: var(--color-green-700);
            box-shadow: 0 0 0 1px var(--color-green-300);
          }
        }

        /* Значения посчитаны по самой линии: центр чипа = точка пути на этой доле ширины. */
        @media (min-width: 1024px) {
          .delivery-route-chip--foot { top: 59.5%; left: 7%; }
          .delivery-route-chip--bike { top: 41%; left: 39.5%; }
          .delivery-route-chip--car { top: 45%; right: 6%; }
        }

        @media (hover: hover) {
          .delivery-format-card:hover,
          .delivery-direction-card:hover,
          .delivery-match-card:hover {
            transform: translateY(-5px);
          }
        }

        @supports (animation-timeline: view()) {
          .delivery-direction-card,
          .delivery-match-card,
          .delivery-support-panel,
          .delivery-step {
            animation: delivery-section-in both cubic-bezier(.16, 1, .3, 1);
            animation-timeline: view();
            animation-range: entry 8% cover 28%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .delivery-hero-copy > *,
          .delivery-route-scene img,
          .delivery-route-path,
          .delivery-route-chip,
          .delivery-primary-cta::after,
          .delivery-direction-card,
          .delivery-match-card,
          .delivery-support-panel,
          .delivery-step,
          .delivery-reveal {
            animation: none !important;
            transform: none !important;
            clip-path: none !important;
          }
          html { scroll-behavior: auto !important; }
        }
      `})]})},nt=()=>e.jsx(ie,{goalPrefix:"courier",ctaLabel:"Подобрать вариант",stickyLabel:"Подобрать вариант",footerAbout:"Подбираем направления доставки в крупных городах России и помогаем разобраться с оформлением и началом работы.",legalNote:"ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, вид договора, доступность предложений и размер вознаграждения зависят от выбранного сервиса и города. Информация не является публичной офертой или гарантией дохода. 16+.",nav:[{href:"#formats",label:"Форматы"},{href:"#directions",label:"Направления"},{href:"#start",label:"Как начать"},{href:"#faq",label:"Вопросы"}],children:e.jsx(ot,{})});ee.createRoot(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(nt,{})}));
