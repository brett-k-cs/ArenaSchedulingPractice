let headers = document.getElementsByClassName('header')
let topLeft = document.getElementById('topLeft')
let aDayHeaders = document.getElementsByClassName('aDay')

// topLeft.style.height = headers[1].clientHeight + aDayHeaders[0].clientHeight - 22 + "px"

let classDivs = document.getElementsByClassName('class');
// let avaliableClasses = document.getElementsByClassName('avaliableClass');

for (let i = 0; i < classDivs.length; i++) {
    let span = document.createElement('span')
    span.innerHTML = "Empty"
    classDivs[i].appendChild(span)
}

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
        for (let l = 0; l < avaliablePeriods.length; l++) {
            highLightClasses(avaliablePeriods[l])
        }
    }
}

function highLightClasses(period) {
    console.log(classDivs.length)
    let day = period == 0 || period == 1 || period == 8 ? "both" : "aDay"
    if(day == "aDay" && (period == 5 || period == 6 || period == 7)) {
        day = "bDay"
        period -= 4
    }
    for (let i = 0; i < 4; i++) {
        if(day == 'both' || (whichDay == 'aDay' && i % 2 == 0) || (whichDay == 'bDay' && i % 2 == 1)) {
            const element = classDivs[(period * 4 + i)]
            console.log(period * 4 + i)
            console.log(element)
            element.classList.add('highlighted')
        }
    }
}