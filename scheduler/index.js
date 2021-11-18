let headers = document.getElementsByClassName('header')
let topLeft = document.getElementById('topLeft')
let aDayHeaders = document.getElementsByClassName('aDay')

// topLeft.style.height = headers[1].clientHeight + aDayHeaders[0].clientHeight - 22 + "px"

let classDivs = document.getElementsByClassName('class');
// let avaliableClasses = document.getElementsByClassName('avaliableClass');

classDivs.forEach(element => {
    let span = document.createElement('span')
    span.innerHTML = "Empty"
    element.appendChild(span)
});

let classPicker = document.getElementsByClassName('classPicker')[0]

classPicker.addEventListener("mousedown", chooseClass, false);

let classes = {
    testClass: {
        avaliablePeriods: [0, 1, 2, 6, 7, 8]
    }
}

for (let i = 0; i < Object.keys(classes).length; i++) {
    const name = Object.keys(classes)[i];
    let div = document.createElement('div');
    div.classList.add('avaliableClass')
    div.id = name;
    let span = document.createElement('span')
    span.innerHTML = name

    div.appendChild(span)
    classPicker.appendChild(div)
}

function chooseClass(event) {
    if(event.target.id && classes[event.target.id]) {
        let classInfo = classes[event.target.id]
        let avaliablePeriods = classInfo.avaliablePeriods
        if(avaliablePeriods.includes(0)) {
            highLightClasses(0, 'both')
        }
        if(avaliablePeriods.includes(1)) {
            highLightClasses(1, 'both')
        }
        if(avaliablePeriods.includes(2)) {
            highLightClasses(0, 'aDay')
        }
        if(avaliablePeriods.includes(3)) {
            highLightClasses(0, 'aDay')
        }
        if(avaliablePeriods.includes(4)) {
            highLightClasses(0, 'aDay')
        }
        if(avaliablePeriods.includes(5)) {
            highLightClasses(0, 'bDay')
        }
        if(avaliablePeriods.includes(6)) {
            highLightClasses(0, 'bDay')            
        }
        if(avaliablePeriods.includes(7)) {
            highLightClasses(0, 'bDay')
        }
        if(avaliablePeriods.includes(8)) {
            highLightClasses(8, 'both')
        }
    }
}

function highLightClasses(period, whichDay) {
    for (let i = 0; i < 4; i++) {
        if(whichDay == 'both' || (whichDay == 'aDay' && i % 2 == 0) || (whichDay == 'bDay' && i % 2 == 1)) {
            const element = classDivs[period * 4 + i]
            element.classList.add('highlighted')
        }
    }
}