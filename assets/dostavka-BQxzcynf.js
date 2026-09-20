import{c as v,b as L,M as k,g as R}from"./metrika-7Ip_zQOo.js";import{a as x,j as e}from"./vendor-motion-CgKT7xo3.js";import{u as p,a as T,F as q,C as w,i as u,b as M,L as D,c as O,P as H,S as m}from"./kit-e7A4jjHD.js";import{a as Y,c as C,h as A}from"./workDirections-Cwyv3eJy.js";import{C as b}from"./circle-check-CrFG7VBZ.js";import{S as f}from"./shield-check-D9STWs3o.js";import{r as B,f as V,F as y,C as X}from"./campaign-peD0jimR.js";import{A as z}from"./arrow-right-Buag0msf.js";import{B as S}from"./bike-Bo1TFXmM.js";import{C as h,H as _}from"./headphones-Dzzuqhyp.js";import{S as E}from"./smartphone-CEtgAw12.js";import{B as G}from"./boxes-CAPuF_0l.js";import"./vendor-react-Cc8UVYhI.js";import"./useScrollAnimation-B3pXjT2K.js";const Q=[["path",{d:"M12 6v6h4",key:"135r8i"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],U=v("clock-3",Q);const J=[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]],F=v("route",J);const K=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]],j=v("truck",K),P=[{value:"Уже оформлена",label:"Уже оформлена"},{value:"Готов оформить",label:"Готов оформить"}],W=t=>{if(!t.name.trim()||!t.phone.trim())return"Заполните имя и телефон";const s=t.phone.replace(/\D/g,"");return s.length<10?"Укажите телефон: не менее 10 цифр":s.length>15?"Укажите корректный телефон: от 10 до 15 цифр":t.city.trim()?t.consent?null:"Нужно согласие на обработку персональных данных":"Укажите город, чтобы подобрать доступные направления"},Z=(t,s)=>({name:t.name.trim(),phone:t.phone.trim(),city:t.city.trim(),department:t.service,self_employment:t.selfEmployment,...s,message:`Сервис доставки: ${t.service}. Самозанятость: ${t.selfEmployment}.`}),ee=Y.delivery.map(t=>({value:t.label,label:t.label})),te=t=>{const{track:s}=p(),[r,a]=x.useState({name:"",phone:"",city:t.city,service:"Подберите мне",selfEmployment:"Готов оформить",consent:!1}),{submit:o,isLoading:g,showToast:n}=T({position:"Курьер / Доставка",leadType:"Курьер / Доставка (рекламный лендинг)",onSuccess:()=>a(c=>({...c,name:"",phone:"",consent:!1}))});return{state:r,setState:a,handleSubmit:c=>{c.preventDefault();const d=W(r);if(d){s("lead_validation_error",{reason:d}),n(d,"error");return}o(Z(r,t.attribution),r.consent)},isLoading:g}},se=({idPrefix:t,captchaMount:s=!1,compact:r=!1,state:a,setState:o,handleSubmit:g,isLoading:n})=>{const{track:N}=p(),[c,d]=x.useState(!1),i=(l,I)=>o($=>({...$,[l]:I}));return e.jsxs("form",{onSubmit:g,onFocusCapture:()=>{c||(d(!0),N("lead_start",{place:t}))},className:r?"space-y-3":"space-y-4","aria-label":"Заявка на работу курьером",children:[s&&e.jsx("div",{id:"captcha-container"}),r?e.jsxs("div",{children:[e.jsx("p",{className:"font-bold font-oswald text-xl text-gray-900",children:"Подберём подходящий вариант"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Свяжемся в рабочее время и проверим предложения по городу"})]}):e.jsxs("div",{className:"flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs uppercase tracking-wide text-green-800/70 font-semibold",children:"Направление"}),e.jsx("p",{className:"font-bold text-green-800 font-oswald text-lg leading-tight",children:"Курьер / Доставка"}),e.jsx("p",{className:"text-xs text-green-800/70",children:"Яндекс Доставка, Купер и TopGo"})]}),e.jsx(b,{className:"text-green-800 shrink-0",size:24})]}),e.jsx(w,{name:`${t}-service`,label:"Какой сервис интересует?",options:ee,value:a.service,onChange:l=>i("service",l),columns:r?1:2}),e.jsxs("div",{className:`grid gap-3 ${r?"grid-cols-1":"grid-cols-1 sm:grid-cols-2"}`,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:`${t}-name`,className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Имя и фамилия"}),e.jsx("input",{id:`${t}-name`,type:"text",required:!0,autoComplete:"name",placeholder:"Иван Иванов",className:u,value:a.name,onChange:l=>i("name",l.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:`${t}-phone`,className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Телефон"}),e.jsx("input",{id:`${t}-phone`,type:"tel",required:!0,autoComplete:"tel",inputMode:"tel",minLength:10,maxLength:26,pattern:"(?=(?:\\D*\\d){10,15}\\D*$)[\\d+\\(\\)\\s\\-]+",title:"Введите корректный телефон: от 10 до 15 цифр","aria-describedby":`${t}-phone-hint`,placeholder:"+7 (999) 000-00-00",className:u,value:a.phone,onChange:l=>i("phone",l.target.value)}),e.jsx("p",{id:`${t}-phone-hint`,className:"sr-only",children:"Введите корректный телефон, содержащий от 10 до 15 цифр"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:`${t}-city`,className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Город"}),e.jsx("input",{id:`${t}-city`,type:"text",required:!0,autoComplete:"address-level2",placeholder:"Например, Казань",className:u,value:a.city,onChange:l=>i("city",l.target.value)})]}),e.jsx(w,{name:`${t}-self-employment`,label:"Самозанятость",options:P,value:a.selfEmployment,onChange:l=>i("selfEmployment",l),columns:r?1:2}),e.jsx(M,{id:`${t}-consent`,checked:a.consent,onChange:l=>i("consent",l),place:t}),e.jsx("button",{type:"submit",disabled:n||!a.consent,className:`w-full bg-green-600 text-[var(--on-accent)] font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${n||!a.consent?"opacity-70 cursor-not-allowed":"cursor-pointer hover:bg-green-700"}`,children:n?"Отправляем...":"Подобрать вариант"}),e.jsx("p",{className:"text-center text-xs text-gray-400",children:"Условия оформления зависят от выбранного сервиса и города. Заявка не является трудовым договором."})]})},re=t=>e.jsx(q,{title:"Подберём доставку под вас",lead:"Оставьте контакты. Проверим направления в вашем городе и объясним условия конкретного предложения.",image:C,minAge:16,bullets:[{icon:e.jsx(L,{size:18}),text:"Свяжемся в рабочее время с 10:00 до 20:00"},{icon:e.jsx(b,{size:18}),text:"Подберём формат под ваш транспорт и график"},{icon:e.jsx(f,{size:18}),text:"Документы и статус оформления уточним до подключения"}],children:e.jsx(se,{idPrefix:"final-courier",captchaMount:!0,...t})}),ae=[{id:"foot",value:"Пеший курьер",label:"Пешком",title:"Пеший курьер",description:"Небольшие заказы рядом с домом. Автомобиль и водительские права не нужны.",fit:"Документы и небольшие посылки"},{id:"bike",value:"Велокурьер",label:"Велосипед или самокат",title:"Вело и самокат",description:"Быстрый формат для коротких городских маршрутов и большего числа точек.",fit:"Экспресс-доставка по городу"},{id:"auto",value:"Автокурьер",label:"Легковой автомобиль",title:"На автомобиле",description:"Подходит для дальних маршрутов, плановых рейсов и более крупных заказов.",fit:"Экспресс, плановая и обычная доставка"},{id:"cargo",value:"Водитель грузовой доставки",label:"Грузовой автомобиль",title:"Грузовой формат",description:"Для объёмных заказов на подходящем автомобиле. Тип кузова уточняется заранее.",fit:"Грузы и крупногабаритные заказы"}],le=[{id:"express",value:"Экспресс-доставка",title:"Экспресс-доставка",lead:"Документы, посылки и небольшие заказы по городу с получением и передачей клиенту.",reward:"Ориентир от 4 000 ₽ за день",formats:"Пешком, велосипед, самокат или автомобиль",facts:["Приём и доставка заказов","Общение с клиентами","Ответственность за сохранность товара"]},{id:"planned",value:"Плановая доставка",title:"Плановая доставка",lead:"Заранее известные точки и маршрут. Подходит тем, кому удобнее работать рейсами.",reward:"Ориентир от 7 000 ₽ за день",formats:"Обычно на автомобиле",facts:["До 10 заказов на рейс","Планирование маршрутов","Обеспечение сохранности товаров"]},{id:"auto",value:"Автодоставка",title:"Автодоставка",lead:"Обычные и крупные заказы, которые удобнее перевозить на личном автомобиле.",reward:"Условия зависят от маршрута и города",formats:"Легковой автомобиль",facts:["Городские и более дальние маршруты","Заказы разного размера","Подходящие предложения проверяются по модели автомобиля"]},{id:"cargo",value:"Грузовая доставка",title:"Грузовая доставка",lead:"Перевозка объёмных заказов и грузов получателю на подходящем автомобиле.",reward:"Ориентир от 6 000 ₽ за день",formats:"Грузовой автомобиль",facts:["Доставка грузов получателю","Поддержание чистоты автомобиля","Вежливое общение с клиентами"]}],ie={foot:e.jsx(y,{size:25}),bike:e.jsx(S,{size:25}),auto:e.jsx(h,{size:25}),cargo:e.jsx(j,{size:25})},oe={express:e.jsx(G,{size:24}),planned:e.jsx(F,{size:24}),auto:e.jsx(h,{size:24}),cargo:e.jsx(j,{size:24})},ne=[{icon:e.jsx(F,{size:20}),title:"Все форматы",text:"от пешего до грузового"},{icon:e.jsx(k,{size:20}),title:"По вашему городу",text:"проверяем доступность"},{icon:e.jsx(f,{size:20}),title:"Понятные условия",text:"до оформления"},{icon:e.jsx(_,{size:20}),title:"Поддержка парка",text:"после подключения"}],ce=[{q:"Можно работать без автомобиля?",a:"Да. Для документов, посылок и небольших заказов доступны пеший формат, велосипед и самокат. Набор предложений зависит от города."},{q:"Какие направления можно выбрать?",a:"Экспресс-доставка, плановые маршруты, автодоставка и грузовая доставка. Менеджер проверит, какие варианты доступны именно в вашем городе."},{q:"Указанный доход гарантирован?",a:"Нет. На странице указаны ориентиры действующих предложений с главного сайта. Итоговое вознаграждение зависит от города, направления, транспорта, спроса, количества заказов и условий выбранного сервиса."},{q:"Это оформление по трудовому договору?",a:"Формат сотрудничества зависит от выбранного сервиса и конкретного предложения. Это может быть договор с самозанятым или ИП, а для отдельных предложений другой формат. Менеджер сообщит вид договора до оформления."},{q:"Нужна ли самозанятость?",a:"Не для каждого направления действуют одинаковые требования. Если потребуется статус самозанятого, об этом скажут заранее и помогут разобраться с оформлением."},{q:"Можно совмещать с учёбой или другой работой?",a:"Во многих предложениях можно выбирать доступные интервалы и дни. Конкретный график зависит от сервиса и города, поэтому подтвердим его до подключения."},{q:"Сколько стоит заявка?",a:"Заявка и первичная консультация бесплатны. Возможные расходы на документы или оснащение зависят от направления и обсуждаются заранее."}],de=({headline:t})=>{const{track:s,scrollToOrder:r,phone:a}=p();return e.jsxs("section",{"data-testid":"delivery-hero",className:"delivery-hero relative overflow-hidden bg-green-50 pb-10 pt-20 lg:min-h-[760px] lg:pb-14 lg:pt-28",children:[e.jsx("div",{className:"delivery-hero-orb pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-green-300/30 blur-3xl"}),e.jsxs("div",{className:"delivery-hero-grid container relative mx-auto grid items-center gap-5 lg:grid-cols-12 lg:gap-10",children:[e.jsxs("div",{className:"delivery-hero-copy text-center lg:col-span-5 lg:text-left",children:[e.jsx("p",{className:"delivery-hero-badge inline-flex items-center rounded-full border border-green-200 bg-white/90 px-4 py-2 text-xs font-bold text-green-800 shadow-sm",children:"Работа и подработка в доставке, 16+"}),e.jsx("h1",{className:"mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.6rem,9vw,4.3rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-slate-950 lg:mx-0 lg:mt-5",children:t}),e.jsx("p",{className:"mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-700 sm:text-lg lg:mx-0 lg:mt-5",children:"Посылки, документы и грузы. Пешком, на самокате, велосипеде или авто. Сравним доступные варианты в вашем городе."}),e.jsxs("div",{className:"mt-5 flex flex-col justify-center gap-3 sm:flex-row lg:mt-7 lg:justify-start",children:[e.jsxs("button",{type:"button",onClick:()=>r("hero"),className:"delivery-primary-cta inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-green-700 px-6 py-4 text-base font-bold text-[var(--on-accent)] shadow-[0_14px_35px_var(--accent-shadow)] transition-transform hover:-translate-y-0.5 hover:bg-green-600 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800",children:["Подобрать вариант ",e.jsx(z,{size:19})]}),e.jsxs("a",{href:a.href,onClick:()=>s("phone_click",{place:"hero"}),className:"inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/90 px-7 py-4 text-base font-bold text-slate-800 transition-colors hover:border-green-700 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800",children:[e.jsx(H,{size:18})," Позвонить"]})]})]}),e.jsxs("figure",{"data-testid":"delivery-route-scene",className:"delivery-route-scene relative aspect-[3/2] overflow-hidden rounded-[22px] border border-white/90 bg-green-950 shadow-[0_24px_60px_rgba(15,23,42,.18)] lg:col-span-7 lg:h-[560px] lg:aspect-auto",children:[e.jsx("img",{src:A,alt:"Курьеры пешего, вело- и автоформата перед началом работы",width:"1536",height:"1024",fetchPriority:"high",decoding:"async",className:"absolute inset-0 h-full w-full object-cover object-center"}),e.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(180deg,rgba(6,38,20,.06)_25%,rgba(3,18,9,.8)_100%)]"}),e.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 480 320",preserveAspectRatio:"none",className:"delivery-route-map pointer-events-none absolute inset-0 h-full w-full",children:e.jsx("path",{className:"delivery-route-path",pathLength:"1",d:"M-8 206 C 84 246, 138 118, 232 148 S 372 214, 488 108"})}),e.jsxs("span",{className:"delivery-route-chip delivery-route-chip--foot",children:[e.jsx(y,{size:16})," Пешком"]}),e.jsxs("span",{className:"delivery-route-chip delivery-route-chip--bike",children:[e.jsx(S,{size:16})," Вело"]}),e.jsxs("span",{className:"delivery-route-chip delivery-route-chip--car",children:[e.jsx(h,{size:16})," Авто"]}),e.jsxs("figcaption",{className:"delivery-route-caption absolute inset-x-0 bottom-0 z-10 p-5 text-left text-white lg:p-6",children:[e.jsx("span",{className:"block font-oswald text-2xl font-bold uppercase leading-none",children:"Один запрос — разные варианты"}),e.jsx("span",{className:"mt-2 block text-xs text-white/80 lg:text-sm",children:"Город, транспорт и условия соберём в один понятный маршрут"})]})]})]})]})},xe=()=>e.jsx("div",{className:"border-t border-green-100 bg-white",children:e.jsx("div",{className:"delivery-reveal delivery-trust-bar container mx-auto grid grid-cols-2 gap-x-5 gap-y-6 py-7 lg:grid-cols-4 lg:gap-x-0",children:ne.map(t=>e.jsxs("div",{className:"flex items-start gap-3 lg:px-7 lg:first:pl-0 lg:last:pr-0",children:[e.jsx("span",{className:"mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800",children:t.icon}),e.jsxs("div",{children:[e.jsx("p",{className:"font-oswald text-base font-bold uppercase leading-tight text-slate-900",children:t.title}),e.jsx("p",{className:"mt-0.5 text-xs text-slate-500 sm:text-sm",children:t.text})]})]},t.title))})}),pe=()=>e.jsx("section",{id:"formats",className:"scroll-mt-24 l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto",children:[e.jsx(m,{kicker:"С чего начнём",title:"На чём удобно работать",subtitle:"Выбирать сейчас ничего не нужно. Оставьте контакты — менеджер проверит, какие форматы открыты в вашем городе, и поможет сравнить."}),e.jsx("div",{className:"delivery-format-rail mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-12 md:gap-4 md:overflow-visible md:pb-0 lg:gap-6",children:ae.map((t,s)=>{const r=["md:col-span-5","md:col-span-7","md:col-span-7","md:col-span-5"];return e.jsxs("article",{className:`${r[s]} delivery-format-card min-w-[82vw] snap-center rounded-[20px] border border-slate-200 l-glass p-6 text-slate-900 transition-all duration-300 md:flex md:min-w-0 md:flex-col lg:col-span-3`,children:[e.jsx("span",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm",children:ie[t.id]}),e.jsx("span",{className:"mt-5 block font-oswald text-2xl font-bold uppercase",children:t.title}),e.jsx("span",{className:"mt-2 block max-w-xl text-sm leading-relaxed text-slate-600",children:t.description}),e.jsx("span",{className:"mt-5 block text-xs font-semibold text-green-800 md:mt-auto md:pt-5",children:t.fit})]},t.id)})})]})}),me=({direction:t})=>e.jsxs("article",{className:"delivery-direction-card relative flex flex-col overflow-hidden rounded-[20px] border border-slate-200 l-glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-6",children:[e.jsxs("div",{className:"flex min-h-12 items-center justify-between gap-4",children:[e.jsx("span",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-800",children:oe[t.id]}),e.jsx("span",{className:"max-w-[62%] rounded-full bg-green-50 px-3 py-1.5 text-right text-[11px] font-bold leading-snug text-green-800",children:t.reward})]}),e.jsx("h3",{className:"mt-5 font-oswald text-2xl font-bold uppercase leading-tight text-slate-950 lg:text-3xl",children:t.title}),e.jsx("p",{className:"mt-3 max-w-xl text-sm leading-relaxed text-slate-600",children:t.lead}),e.jsxs("p",{className:"mt-4 border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-500",children:["Формат: ",t.formats]}),e.jsx("div",{className:"mt-5 grow space-y-2",children:t.facts.map(s=>e.jsxs("p",{className:"flex items-start gap-2 text-sm text-slate-700",children:[e.jsx(X,{size:17,className:"mt-0.5 shrink-0 text-green-800"}),e.jsx("span",{children:s})]},s))}),e.jsx(he,{direction:t})]}),he=({direction:t})=>{const{track:s,scrollToOrder:r}=p();return e.jsxs("button",{type:"button",onClick:()=>{s("direction_apply",{direction:t.value}),r("direction_card")},className:"mt-6 inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-green-700 bg-white px-5 py-3 text-sm font-bold text-green-800 transition-colors hover:bg-green-700 hover:text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800",children:["Оставить заявку ",e.jsx(z,{size:16})]})},ge=()=>e.jsx("section",{id:"directions",className:"scroll-mt-24 l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto",children:[e.jsx(m,{kicker:"Направления",title:"Все направления доставки",subtitle:"Здесь собрана вся информация с главной страницы. Указанный ориентир не является обещанием конкретного дохода."}),e.jsx("div",{className:"delivery-direction-grid mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6",children:le.map(t=>e.jsx(me,{direction:t},t.id))})]})}),ue=()=>e.jsx("section",{id:"compare",className:"scroll-mt-24 l-tint py-16",children:e.jsx("div",{className:"delivery-reveal container mx-auto",children:e.jsxs("div",{className:"grid items-start gap-10 lg:grid-cols-12",children:[e.jsxs("div",{className:"lg:sticky lg:top-28 lg:col-span-5",children:[e.jsx(m,{kicker:"Подбор",title:"Что подойдёт именно вам",subtitle:"Не нужно угадывать по объявлению. Оставьте город и транспорт, а мы отфильтруем неподходящие варианты до оформления."}),e.jsx("img",{src:C,alt:"Курьер на городском маршруте",loading:"lazy",decoding:"async",className:"mt-8 aspect-[16/9] w-full rounded-[20px] object-cover shadow-[0_18px_55px_rgba(15,23,42,.12)] lg:aspect-[4/3]"})]}),e.jsx("div",{className:"delivery-match-grid grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-6",children:[{icon:e.jsx(y,{size:22}),title:"Нет автомобиля",text:"Пешая доставка, велосипед и самокат для документов, посылок и небольших заказов."},{icon:e.jsx(U,{size:22}),title:"Нужна подработка",text:"Ищем предложения с доступными днями и интервалами, которые можно совмещать."},{icon:e.jsx(h,{size:22}),title:"Есть личное авто",text:"Сравниваем экспресс, плановые рейсы и обычную автодоставку."},{icon:e.jsx(j,{size:22}),title:"Есть грузовой автомобиль",text:"Проверяем подходящие грузы, маршруты и требования к кузову."},{icon:e.jsx(E,{size:22}),title:"Нет опыта",text:"Для многих направлений опыт не нужен. Поможем разобраться с приложением и стартом."}].map(t=>e.jsxs("div",{className:"delivery-match-card rounded-[18px] border border-slate-200 l-glass p-5",children:[e.jsx("span",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm",children:t.icon}),e.jsx("h3",{className:"mt-4 font-oswald text-xl font-bold uppercase text-slate-950",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-600",children:t.text})]},t.title))})]})})}),ve=()=>e.jsx("section",{className:"l-tint py-16",children:e.jsx("div",{className:"delivery-reveal container mx-auto",children:e.jsx("div",{className:"delivery-support-panel overflow-hidden rounded-[20px] border border-green-200 l-glass shadow-[0_24px_70px_var(--accent-shadow)]",children:e.jsxs("div",{className:"grid lg:grid-cols-12",children:[e.jsxs("div",{className:"bg-green-700 p-7 text-[var(--on-accent)] lg:col-span-5 lg:p-10",children:[e.jsxs("p",{className:"flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--on-accent-soft)]",children:[e.jsx("span",{"aria-hidden":"true",className:"h-px w-8 bg-green-200/50"}),"Барори Парк"]}),e.jsx("h2",{className:"mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em]",children:"Не оставляем после заявки"}),e.jsx("p",{className:"mt-5 leading-relaxed text-[var(--on-accent-soft)]",children:"Помогаем понять условия, подготовиться к подключению и решить вопросы после старта."})]}),e.jsx("div",{className:"grid sm:grid-cols-2 lg:col-span-7",children:[{icon:e.jsx(k,{size:22}),title:"Проверяем город",text:"Показываем только те направления, которые доступны для вашего региона."},{icon:e.jsx(f,{size:22}),title:"Объясняем договор",text:"До оформления сообщаем формат сотрудничества и требования сервиса."},{icon:e.jsx(E,{size:22}),title:"Помогаем начать",text:"Подсказываем по приложению, документам и первым доступным заказам."},{icon:e.jsx(_,{size:22}),title:"Остаёмся на связи",text:"Помогаем с вопросами по доступу, заказам и спорным ситуациям."}].map(t=>e.jsxs("div",{className:"border-b border-slate-100 p-6 sm:border-l lg:p-8",children:[e.jsx("span",{className:"text-green-800",children:t.icon}),e.jsx("h3",{className:"mt-4 font-oswald text-xl font-bold uppercase text-slate-950",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-600",children:t.text})]},t.title))})]})})})}),be=()=>e.jsx("section",{id:"start",className:"scroll-mt-24 l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto",children:[e.jsx(m,{kicker:"Как это работает",title:"От заявки до доступных заказов",subtitle:"Без длинной анкеты на сайте и без обещаний срока, который зависит от проверки сервиса."}),e.jsx("div",{className:"delivery-route-steps mt-10 grid gap-4 md:grid-cols-4 lg:gap-6",children:[{title:"Оставьте контакты",text:"Имя, телефон, город и удобный транспорт."},{title:"Сравним варианты",text:"Проверим направления и условия в вашем городе."},{title:"Уточним оформление",text:"Заранее скажем, какой договор и документы потребуются."},{title:"Получите доступ",text:"После проверки сервиса поможем разобраться с началом работы."}].map((t,s)=>e.jsxs("div",{className:"delivery-step relative border-t-2 border-green-700 pt-5",children:[e.jsxs("span",{className:"font-oswald text-sm font-bold text-green-800",children:["0",s+1]}),e.jsx("h3",{className:"mt-3 font-oswald text-xl font-bold uppercase text-slate-950",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-600",children:t.text})]},t.title))})]})}),fe=()=>e.jsx("section",{className:"l-tint py-16",children:e.jsxs("div",{className:"delivery-reveal container mx-auto grid items-start gap-10 lg:grid-cols-12",children:[e.jsx(m,{kicker:"Требования",title:"Что потребуется для старта",subtitle:"Базовый список короткий. Дополнительные требования зависят от направления, поэтому их проверяем до оформления.",className:"lg:col-span-5 lg:row-start-1"}),e.jsxs("div",{className:"rounded-[18px] border border-green-200 bg-green-700 p-6 text-[var(--on-accent)] lg:col-span-12 lg:row-start-2",children:[e.jsx("p",{className:"font-oswald text-2xl font-bold uppercase",children:"Важно о договоре"}),e.jsx("p",{className:"mt-2 max-w-4xl text-sm leading-relaxed text-[var(--on-accent-soft)]",children:"Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, договор и порядок выплат сообщаются для конкретного предложения."})]}),e.jsx("div",{className:"grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:gap-4",children:["Возраст от 16 лет","Смартфон с доступом в интернет","Документы для выбранного формата оформления","Личный транспорт только для вело-, авто- и грузового формата","Самозанятость, если её требует конкретный сервис"].map(t=>e.jsxs("div",{className:"flex items-start gap-3 rounded-[16px] border border-slate-200 l-glass p-4",children:[e.jsx(b,{size:20,className:"mt-0.5 shrink-0 text-green-800"}),e.jsx("span",{className:"text-sm leading-relaxed text-slate-700",children:t})]},t))})]})}),ye=()=>{const{track:t}=p(),[s]=x.useState(()=>B(typeof window>"u"?"":window.location.search)),r=te(s),o=!!(s.city||s.format!=="Пока не выбрал")?V(s):"Работа в доставке";return x.useEffect(()=>{t("view",{city:s.city||"not_set",format:s.format,direction:s.direction})},[]),e.jsxs(e.Fragment,{children:[e.jsx(de,{headline:o}),e.jsx(xe,{}),e.jsx(pe,{}),e.jsx(ge,{}),e.jsx(ue,{}),e.jsx(ve,{}),e.jsx(be,{}),e.jsx(fe,{}),e.jsx(O,{items:ce,title:"Частые вопросы"}),e.jsx(re,{...r}),e.jsx("style",{children:`
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
      `})]})},je=()=>e.jsx(D,{goalPrefix:"courier",ctaLabel:"Подобрать вариант",stickyLabel:"Подобрать вариант",footerAbout:"Подбираем направления доставки в крупных городах России и помогаем разобраться с оформлением и началом работы.",legalNote:"ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, вид договора, доступность предложений и размер вознаграждения зависят от выбранного сервиса и города. Информация не является публичной офертой или гарантией дохода. 16+.",nav:[{href:"#formats",label:"Форматы"},{href:"#directions",label:"Направления"},{href:"#start",label:"Как начать"},{href:"#faq",label:"Вопросы"}],children:e.jsx(ye,{})});R.createRoot(document.getElementById("root")).render(e.jsx(x.StrictMode,{children:e.jsx(je,{})}));
