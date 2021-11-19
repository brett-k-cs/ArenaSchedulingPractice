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
    },
    "Principles of Engineering": {
        avaliablePeriods: [2, 3, 5, 8]
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

let selectedClass = null;

function chooseClass(event) {
    if((event.target.nodeName == "SPAN" && event.target?.parentElement?.id && classes[event.target.parentElement.id]) || event.target.id && classes[event.target.id]) {
        let classInfo = classes[event.target.id] || classes[event.target.parentElement.id]        
        let avaliablePeriods = classInfo.avaliablePeriods
        var curSelectedClass = event.target.id || event.target.parentElement.id

        for (let i = 0; i < classDivs.length; i++) {
            if(classDivs[i].classList.contains('highlighted')) classDivs[i].classList.remove('highlighted')
        }

        if(selectedClass != curSelectedClass) {
            for (let l = 0; l < avaliablePeriods.length; l++) {
                highLightClasses(avaliablePeriods[l])
            }
            selectedClass = curSelectedClass;
        } else selectedClass = null

        let previousSelectedClass = document.getElementsByClassName('highlightedClass')[0]
        if(previousSelectedClass && previousSelectedClass.id != curSelectedClass) previousSelectedClass.classList.toggle('highlightedClass')

        if(event.target.nodeName == "DIV") event.target.classList.toggle('highlightedClass')
        else event.target.parentElement.classList.toggle('highlightedClass')
    }
}

function highLightClasses(period) {
    let day = period == 0 || period == 1 || period == 8 ? "both" : "aDay"
    if(day == "aDay" && (period == 5 || period == 6 || period == 7)) {
        day = "bDay"
        period -= 3
    } else if (period == 8) {
        period -= 3
    }
    for (let i = 0; i < 4; i++) {
        if(day == 'both' || (day == 'aDay' && i % 2 == 0) || (day == 'bDay' && i % 2 == 1)) {
            const element = classDivs[(period * 4 + i)]
            element.classList.add('highlighted')
        }
    }

}