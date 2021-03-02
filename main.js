const cigar = document.getElementById('cigar')
const gilz = document.getElementById('gilz')
const ash = document.getElementById('ash')
const smold = document.getElementById('smold')
const filter = document.getElementById('filter')

const footer = document.getElementById('footer')
const footerImg = document.getElementById('footerImg')
const body = document.getElementsByTagName('body')[0]

const cigarStyle = cigar.style
cigarStyle.zIndex = 1000
cigarStyle.position = 'absolute'
cigarStyle.width = '32px'
cigarStyle.left = '-128px'
cigarStyle.overflow = 'hidden'

const gilzStyle = gilz.style
gilzStyle.zIndex = 10
gilzStyle.position = 'relative'
gilzStyle.background = '#E8E0DE'
gilzStyle.width = '32px'

const ashStyle = ash.style
ashStyle.zIndex = 5
ashStyle.position = 'absolute'
ashStyle.background = '#bbb4af'
ashStyle.width = '32px'

const smoldStyle = smold.style
smoldStyle.zIndex = 15
smoldStyle.position = 'absolute'
smoldStyle.background = 'rgb(255,100,100)'
smoldStyle.width = '32px'

const filterStyle = filter.style
filterStyle.zIndex = 20
filterStyle.position = 'relative'
filterStyle.background = '#E0A56C'
filterStyle.width = '32px'

var widthOfset = 1280
var topOfset = 200
var bottomOfset = 360

var cigarHeight = 0
var gilzHeight = 0
var cigarPos = -9999
var ashPos = 0
var smoldPos = 0
var smoldAnger = 0
var ofsetedScrollY = 0

function processScrolling() {

    bottomOfset = footer.offsetHeight + 64

    cigarHeight = Math.max(Math.min(window.innerHeight/2, 450), 300)
    gilzHeight = cigarHeight - cigarHeight/4

    ofsetedScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight - bottomOfset
    ofsetedScrollY = Math.max(Math.min(window.scrollY, ofsetedScrollHeight), topOfset)

    gilzHeightSmoked = Math.max(gilzHeight - Math.max(
        ofsetedScrollY / ofsetedScrollHeight * cigarHeight-26
    , 0), 0)
    smoldPos = gilzHeight-gilzHeightSmoked-smoldAnger/2
    
    cigarStyle.top = `${ofsetedScrollY+(window.innerHeight-cigarHeight)/2}px`
    cigarStyle.height = `${cigarHeight}px`
    cigarStyle.left = (window.innerWidth > widthOfset+100) ? `${(window.innerWidth-widthOfset)/2-50+cigarPos}px` : `${cigarPos}px`

    gilzStyle.marginTop = `${gilzHeight-gilzHeightSmoked}px`
    gilzStyle.height = `${gilzHeightSmoked}px`

    ashStyle.top = `${ashPos}px`
    ashStyle.height = `${cigarHeight}px`

    smoldStyle.top = `${smoldPos}px`
    smoldStyle.height = `${smoldAnger}px`
    smoldStyle.background = `rgb(${100+smoldAnger*16},${100+smoldAnger*2},100)`

    filterStyle.height = `${cigarHeight/4}px`

    body.style.background = `hsl(23, 10%, ${gilzHeightSmoked/gilzHeight*50+60}%)`

    footerImg.style.width = (window.innerWidth < 1280) ? `${window.innerWidth * 0.9}px` : ''
    
}

// positioning
document.addEventListener('scroll', () => processScrolling())
setInterval(() => processScrolling())

// animations
var oldScrollY = ofsetedScrollY
setInterval(() => {
    cigarPos = cigarPos+(34-cigarPos)*0.133
    if (ashPos+(gilzHeight-gilzHeightSmoked-ashPos)*0.036 > ashPos)
        ashPos = ashPos+(gilzHeight-gilzHeightSmoked-ashPos)*0.036
    else
        ashPos = gilzHeight-gilzHeightSmoked
    smoldAnger = (gilzHeightSmoked > 1) ? Math.min(smoldAnger+(Math.max(ofsetedScrollY-oldScrollY, 0)-smoldAnger)*0.6, 6) : 0
    oldScrollY = ofsetedScrollY
}, 33)

// Calc
var c_PricePerPack = 100
var c_InPack = 20
var c_PerDay = 8
var c_Time = 0

const cigarsPricePerPackSpan = document.getElementById('cigarsPricePerPackSpan')
const cigarsPricePerPack = document.getElementById('cigarsPricePerPack')
const cigarsPricePerPackNum = document.getElementById('cigarsPricePerPackNum')

cigarsPricePerPack.addEventListener('change', (e) => {
    cigarsPricePerPackNum.value = e.target.value
    cigarsPricePerPackSpan.textContent = `Стоимость одной пачки (${e.target.value} руб)`
    c_PricePerPack = e.target.value
    startThinking()
})

cigarsPricePerPackNum.addEventListener('change', (e) => {
    cigarsPricePerPack.value = e.target.value
    cigarsPricePerPackSpan.textContent = `Стоимость одной пачки (${e.target.value} руб)`
    c_PricePerPack = e.target.value
    startThinking()
})

const cigarsInPackSpan = document.getElementById('cigarsInPackSpan')
const cigarsInPack = document.getElementById('cigarsInPack')
const cigarsInPackNum = document.getElementById('cigarsInPackNum')

cigarsInPack.addEventListener('change', (e) => {
    cigarsInPackNum.value = e.target.value
    cigarsInPackSpan.textContent = `Сигарет в пачке (${e.target.value} шт)`
    c_InPack = e.target.value
    startThinking()
})

cigarsInPackNum.addEventListener('change', (e) => {
    cigarsInPack.value = e.target.value
    cigarsInPackSpan.textContent = `Сигарет в пачке (${e.target.value} шт)`
    c_InPack = e.target.value
    startThinking()
})

const cigarsPerDaySpan = document.getElementById('cigarsPerDaySpan')
const cigarsPerDay = document.getElementById('cigarsPerDay')
const cigarsPerDayNum = document.getElementById('cigarsPerDayNum')

cigarsPerDay.addEventListener('change', (e) => {
    cigarsPerDayNum.value = e.target.value
    cigarsPerDaySpan.textContent = `Сколько выкуриваю в день (${e.target.value} шт)`
    c_PerDay = e.target.value
    startThinking()
})

cigarsPerDayNum.addEventListener('change', (e) => {
    cigarsPerDay.value = e.target.value
    cigarsPerDaySpan.textContent = `Сколько выкуриваю в день (${e.target.value} шт)`
    c_PerDay = e.target.value
    startThinking()
})

const cigarsReplaceMe = document.getElementById('cigarsReplaceMe')
const pickCigarsDate = document.getElementById('pickCigarsDate')
const pickCigarsPreDone = document.getElementById('pickCigarsPreDone')

const cigarsDateStartDiv = document.getElementById('cigarsDateStartDiv')
cigarsDateStartDiv.style.display = 'none'
const cigarsDateStartBack = document.getElementById('cigarsDateStartBack')
const cigarsDateStartSpan = document.getElementById('cigarsDateStartSpan')
const cigarsDateStart = document.getElementById('cigarsDateStart')

const cigarsPreDoneDiv = document.getElementById('cigarsPreDoneDiv')
cigarsPreDoneDiv.style.display = 'none'
const cigarsPreDoneBack = document.getElementById('cigarsPreDoneBack')
const cigarsPreDoneSpan = document.getElementById('cigarsPreDoneSpan')
const cigarsPreDone = document.getElementById('cigarsPreDone')

pickCigarsDate.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'none'
    cigarsDateStartDiv.style.display = 'inline-block'
    startThinking()
})
cigarsDateStartBack.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'inline-block'
    cigarsDateStartDiv.style.display = 'none'
    c_Time = 0
    startThinking()
})

pickCigarsPreDone.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'none'
    cigarsPreDoneDiv.style.display = 'inline-block'
    startThinking()
})
cigarsPreDoneBack.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'inline-block'
    cigarsPreDoneDiv.style.display = 'none'
    c_Time = 0
    startThinking()
})

cigarsDateStart.addEventListener('change', (e) => {
    c_Time = Math.max( (Date.now() - e.target.valueAsNumber) / 1000 / 60 / 60 / 24, 0 )
    startThinking()
})

var temp_c_time = 0
var temp_Hyrs = 0
var temp_yrs = 0
var temp_dys = 0
cigarsPreDone.addEventListener('change', (e) => {
    c_Time = e.target.value * 182.5
    if (c_Time >= 182.5) {

        temp_c_time = Math.round(c_Time)
        temp_Hyrs = Math.floor(temp_c_time/182.5)
        temp_yrs = Math.floor(temp_c_time/365)

        if (Math.round(temp_Hyrs%2) == 1 && temp_yrs < 1)

            cigarsPreDoneSpan.textContent = `Сколько я курил (1/2 года)`

        else if (Math.round(temp_Hyrs%2) == 1)

            cigarsPreDoneSpan.textContent = `Сколько я курил (${temp_yrs}+1/2 лет)`
        else
            cigarsPreDoneSpan.textContent = `Сколько я курил (${temp_yrs} лет)`
    } else {
        cigarsPreDoneSpan.textContent = `Сколько я курил (${Math.round( c_Time )} дней)`
    }
    startThinking()
})

const cigarsCheckout = document.getElementById('cigarsCheckout')
var packsPerDay = 0
var temp_days = 0
var temp_loosed_money = 0
function updateCheckout() {
    packsPerDay = parseInt(c_PerDay)/parseInt(c_InPack)

    temp_loosed_money = Math.round( c_Time*( packsPerDay * parseInt(c_PricePerPack) ) )
    if (temp_loosed_money != 0) {
        cigarsCheckout.innerText = `Вы потеряли ${new Intl.NumberFormat('ru-RU').format(temp_loosed_money)} рублей`

        if (temp_loosed_money > 900000) {
            looseThink('house', 'Квартира', 'Сейчас можно было бы сидеть в новой квартире')
        } else if (temp_loosed_money > 90000) {
            looseThink('sport-utility-vehicle', 'Машина', 'Вместо сигарет, можно было бы купить целую машину')
        } else if (temp_loosed_money > 50000) {
            looseThink('desert-island', 'Туризм', 'Можно было бы поехать отдохнуть в другую страну')
        } else if (temp_loosed_money > 12000) {
            looseThink('mobile-phone', 'Хороший смартфон', 'За эти деньги можно было купить себе хороший смартфон')
        } else if (temp_loosed_money > 8000) {
            looseThink('bicycle', 'Хороший велосипед', 'Сейчас бы катался и укреплял здоровье')
        } else if (temp_loosed_money > 5000) {
            looseThink('mobile-phone', 'Смартфон', 'За эти деньги можно было купить себе смартфон')
        } else if (temp_loosed_money > 1000) {
            looseThink('headphone', 'Наушники', 'Сейчас можно было бы наслаждаться музыкой')
        } else if (temp_loosed_money > 500) {
            looseThink('shortcake', 'Торт', 'Обычный вкусный тортик, которого нет')
        } else if (temp_loosed_money > 200) {
            looseThink('dumpling', 'Пельмени', 'Можно было бы сейчас поесть пельмени')
        } else {
            looseThink('croissant', 'Булочка', 'Вы бы могли купить вкусную булочку')
        }
    }
    else {
        cigarsCheckout.innerText = 'Вы ничего не потеряли'
        looseThink('money-with-wings', 'Деньги', 'То что вы смогли сохранить, не купив ни одной пачки сигарет')
    }
}

setInterval(() => updateCheckout(), 3000)

const cigarsWhatYouLoose = document.getElementById('cigarsWhatYouLoose')
function startThinking() {
    cigarsWhatYouLoose.childNodes[1].src = './thinking-face.png'
    cigarsWhatYouLoose.childNodes[3].innerText = 'Думаем...'
    cigarsWhatYouLoose.childNodes[5].innerText = 'Рассчитываем, исходя из ваших данных'
    cigarsCheckout.innerText = `Вы потеряли # рублей`
}
function looseThink(img, header, par) {
    cigarsWhatYouLoose.childNodes[1].src = './'+img+'.png'
    cigarsWhatYouLoose.childNodes[3].innerText = header
    cigarsWhatYouLoose.childNodes[5].innerText = par
}