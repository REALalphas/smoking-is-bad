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
        ofsetedScrollY / ofsetedScrollHeight * cigarHeight
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
    footerImg.style.width = (window.innerWidth < 1200) ? `${window.innerWidth * 0.33}px` : ''
    
}

// positioning
document.addEventListener('scroll', () => processScrolling())
setInterval(() => processScrolling())

// animations
var oldScrollY = ofsetedScrollY
setInterval(() => {
    cigarPos = cigarPos+(34-cigarPos)*0.133
    ashPos = ashPos+(gilzHeight-gilzHeightSmoked-ashPos)*0.066
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
})
cigarsPricePerPackNum.addEventListener('change', (e) => {
    cigarsPricePerPack.value = e.target.value
    cigarsPricePerPackSpan.textContent = `Стоимость одной пачки (${e.target.value} руб)`
    c_PricePerPack = e.target.value
})

const cigarsInPackSpan = document.getElementById('cigarsInPackSpan')
const cigarsInPack = document.getElementById('cigarsInPack')

cigarsInPack.addEventListener('change', (e) => {
    cigarsInPackSpan.textContent = `Сигарет в пачке (${e.target.value} шт)`
    c_InPack = e.target.value
})

const cigarsPerDaySpan = document.getElementById('cigarsPerDaySpan')
const cigarsPerDay = document.getElementById('cigarsPerDay')

cigarsPerDay.addEventListener('change', (e) => {
    cigarsPerDaySpan.textContent = `Сколько выкуриваю в день (${e.target.value} шт)`
    c_PerDay = e.target.value
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
})
cigarsDateStartBack.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'inline-block'
    cigarsDateStartDiv.style.display = 'none'
})

pickCigarsPreDone.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'none'
    cigarsPreDoneDiv.style.display = 'inline-block'
})
cigarsPreDoneBack.addEventListener('click', (e) => {
    cigarsReplaceMe.style.display = 'inline-block'
    cigarsPreDoneDiv.style.display = 'none'
})

cigarsDateStart.addEventListener('change', (e) => {
    c_Time = Math.max( (Date.now() - e.target.valueAsNumber) / 1000 / 60 / 60 / 24, 0 )
})

var temp_c_time = 0
var temp_Hyrs = 0
var temp_yrs = 0
var temp_dys = 0
cigarsPreDone.addEventListener('change', (e) => {
    c_Time = e.target.value * 30.0824175824
    if (c_Time >= 182.5) {
        temp_c_time = Math.round(c_Time)
        temp_Hyrs = Math.round(temp_c_time/182.5)
        temp_yrs = Math.round(temp_c_time/365)
        if (Math.round(temp_Hyrs%2) == 1 && temp_yrs < 1)
        cigarsPreDoneSpan.textContent = `Сколько я курил (1/2 года)`
        else if (Math.round(temp_Hyrs%2) == 1)
        cigarsPreDoneSpan.textContent = `Сколько я курил (${temp_yrs}+1/2 лет)`
        else
        cigarsPreDoneSpan.textContent = `Сколько я курил (${temp_yrs} лет)`
    } else {
        cigarsPreDoneSpan.textContent = `Сколько я курил (${Math.round( c_Time )} дней)`
    }
})


const cigarsCheckout = document.getElementById('cigarsCheckout')
var packsPerDay = 0
var temp_days = 365
function updateCheckout() {
    packsPerDay = parseInt(c_PerDay)/parseInt(c_InPack)

    cigarsCheckout.innerText = `Ты потерял ${Math.round( c_Time*( packsPerDay * parseInt(c_PricePerPack) ) )} рублей`
}

setInterval(() => updateCheckout(), 1000)