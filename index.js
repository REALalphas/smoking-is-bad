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

/**
 * Updates the position and styles of various elements on the page based on scrolling.
 *
 * @return {undefined} No return value.
 */
function processScrolling() {
    bottomOfset = footer.offsetHeight + 64

    cigarHeight = Math.max(Math.min(window.innerHeight / 2, 450), 300)
    gilzHeight = cigarHeight - cigarHeight / 4

    ofsetedScrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight -
        bottomOfset
    ofsetedScrollY = Math.max(
        Math.min(window.scrollY, ofsetedScrollHeight),
        topOfset
    )

    gilzHeightSmoked = Math.max(
        gilzHeight -
            Math.max(
                (ofsetedScrollY / ofsetedScrollHeight) * cigarHeight - 26,
                0
            ),
        0
    )
    smoldPos = gilzHeight - gilzHeightSmoked - smoldAnger / 2

    cigarStyle.top = `${
        ofsetedScrollY + (window.innerHeight - cigarHeight) / 2
    }px`
    cigarStyle.height = `${cigarHeight}px`
    cigarStyle.left =
        window.innerWidth > widthOfset + 100
            ? `${(window.innerWidth - widthOfset) / 2 - 50 + cigarPos}px`
            : `${cigarPos}px`

    gilzStyle.marginTop = `${gilzHeight - gilzHeightSmoked}px`
    gilzStyle.height = `${gilzHeightSmoked}px`

    ashStyle.top = `${ashPos}px`
    ashStyle.height = `${cigarHeight}px`

    smoldStyle.top = `${smoldPos}px`
    smoldStyle.height = `${smoldAnger}px`
    smoldStyle.background = `rgb(${100 + smoldAnger * 16},${
        100 + smoldAnger * 2
    },100)`

    filterStyle.height = `${cigarHeight / 4}px`

    body.style.background = `hsl(23, 10%, ${
        (gilzHeightSmoked / gilzHeight) * 70 + 40
    }%)`

    footerImg.style.width =
        window.innerWidth < 1280 ? `${window.innerWidth * 0.9}px` : ''
}

// positioning
document.addEventListener('scroll', () => processScrolling())
setInterval(() => processScrolling())

// animations
var oldScrollY = ofsetedScrollY
setInterval(() => {
    cigarPos = cigarPos + (34 - cigarPos) * 0.08
    if (ashPos + (gilzHeight - gilzHeightSmoked - ashPos) * 0.01 > ashPos)
        ashPos = ashPos + (gilzHeight - gilzHeightSmoked - ashPos) * 0.01
    else ashPos = gilzHeight - gilzHeightSmoked
    smoldAnger =
        gilzHeightSmoked > 1
            ? Math.min(
                  smoldAnger +
                      (Math.max(ofsetedScrollY - oldScrollY, 0) - smoldAnger) *
                          0.8,
                  100
              )
            : 0
    oldScrollY = ofsetedScrollY
}, 12)

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
    c_Time = Math.max(
        (Date.now() - e.target.valueAsNumber) / 1000 / 60 / 60 / 24,
        0
    )
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
        temp_Hyrs = Math.floor(temp_c_time / 182.5)
        temp_yrs = Math.floor(temp_c_time / 365)

        if (Math.round(temp_Hyrs % 2) == 1 && temp_yrs < 1)
            cigarsPreDoneSpan.textContent = `Сколько я курил (1/2 года)`
        else if (Math.round(temp_Hyrs % 2) == 1)
            cigarsPreDoneSpan.textContent = `Сколько я курил (${temp_yrs}+1/2 лет)`
        else cigarsPreDoneSpan.textContent = `Сколько я курил (${temp_yrs} лет)`
    } else {
        cigarsPreDoneSpan.textContent = `Сколько я курил (${Math.round(
            c_Time
        )} дней)`
    }
    startThinking()
})

const cigarsCheckout = document.getElementById('cigarsCheckout')
var packsPerDay = 0
var temp_days = 0
var temp_loosed_money = 0
/**
 * Updates the checkout based on the given parameters.
 *
 * @return {undefined} There is no return value.
 */
function updateCheckout() {
    packsPerDay = parseInt(c_PerDay) / parseInt(c_InPack)

    temp_loosed_money = Math.round(
        c_Time * (packsPerDay * parseInt(c_PricePerPack))
    )
    if (temp_loosed_money != 0) {
        cigarsCheckout.innerText = `Вы потеряли ${new Intl.NumberFormat(
            'ru-RU'
        ).format(temp_loosed_money)} рублей`

        outData = {
            imgId: 'money-with-wings',
            header: 'Деньги',
            par: 'То что вы смогли сохранить, не купив ни одной пачки сигарет',
        }
        if (temp_loosed_money > 0)
            outData = {
                imgId: 'moai',
                header: 'А ну не кури',
                par: 'Остановись курить придурок, сдохнешь!',
            }
        if (temp_loosed_money > 38)
            outData = {
                imgId: 'croissant',
                header: 'Булочка',
                par: 'Вы бы могли купить вкусную булочку',
            }
        if (temp_loosed_money > 500)
            outData = {
                imgId: 'dumpling',
                header: 'Пельмени',
                par: 'Можно было бы сейчас поесть пельменей',
            }
        if (temp_loosed_money > 1000)
            outData = {
                imgId: 'shortcake',
                header: 'Торт',
                par: 'Обычный вкусный тортик, которого нет',
            }
        if (temp_loosed_money > 3000)
            outData = {
                imgId: 'headphone',
                header: 'Наушники',
                par: 'Сейчас можно было бы наслаждаться музыкой',
            }
        if (temp_loosed_money > 8000)
            outData = {
                imgId: 'mobile-phone',
                header: 'Смартфон',
                par: 'За эти деньги можно было купить себе смартфон',
            }
        if (temp_loosed_money > 10000)
            outData = {
                imgId: 'bicycle',
                header: 'Хороший велосипед',
                par: 'Сейчас бы катался и укреплял здоровье',
            }
        if (temp_loosed_money > 18000)
            outData = {
                imgId: 'mobile-phone',
                header: 'Хороший смартфон',
                par: 'За эти деньги можно было купить себе хороший смартфон',
            }
        if (temp_loosed_money > 60000)
            outData = {
                imgId: 'desert-island',
                header: 'Туризм',
                par: 'Можно было бы поехать отдохнуть в другую страну',
            }
        if (temp_loosed_money > 120000)
            outData = {
                imgId: 'sport-utility-vehicle',
                header: 'Машина',
                par: 'Вместо сигарет, можно было бы купить целую машину',
            }
        if (temp_loosed_money > 1600000)
            outData = {
                imgId: 'house',
                header: 'Квартира',
                par: 'Сейчас можно было бы сидеть в новой квартире',
            }

        looseThink(outData)
    } else {
        cigarsCheckout.innerText = 'Вы ничего не потеряли'
        outData = {
            imgId: 'money-with-wings',
            header: 'Деньги',
            par: 'То что вы смогли сохранить, не купив ни одной пачки сигарет',
        }
        looseThink(outData)
    }
}

setInterval(() => updateCheckout(), 2000)

const cigarsWhatYouLoose = document.getElementById('cigarsWhatYouLoose')
function startThinking() {
    cigarsWhatYouLoose.childNodes[1].src = './public/img/thinking-face.png'
    cigarsWhatYouLoose.childNodes[3].innerText = 'Думаем...'
    cigarsWhatYouLoose.childNodes[5].innerText =
        'Рассчитываем, исходя из ваших данных'
    cigarsCheckout.innerText = `Вы потеряли # рублей`
}

/**
 * Update the content of the cigarsWhatYouLoose DOM element with the provided data.
 *
 * @param {Object} data - The data to be used for updating the DOM.
 * @param {string} data.imgId - The ID of the image to be displayed.
 * @param {string} data.header - The header text to be displayed.
 * @param {string} data.par - The paragraph text to be displayed.
 */
function looseThink(data) {
    cigarsWhatYouLoose.childNodes[1].src = './public/img/' + data.imgId + '.png'
    cigarsWhatYouLoose.childNodes[3].innerText = data.header
    cigarsWhatYouLoose.childNodes[5].innerText = data.par
}
