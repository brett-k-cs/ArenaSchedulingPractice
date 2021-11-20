let classDivs = document.getElementsByClassName('class');

for (let i = 0; i < classDivs.length; i++) {
    let span = document.createElement('span')
    span.innerHTML = "Empty"
    classDivs[i].appendChild(span)
}

let classPicker = document.getElementsByClassName('classPicker')[0]

classPicker.addEventListener("mousedown", chooseClass, false);

let classes = {
    testClass: {
        semesterLength: 2,
        avaliablePeriods: [0, 1, 2, 6, 7, 8]
    },
    "Principles of Engineering": {
        semesterLength: 1,
        avaliablePeriods: [2, 3, 5, 8]
    },
    "Engineering Design & Presentation 1": {
        semesterLength: 2,
        avaliablePeriods: [0, 1, 3, 5, 8]
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
let selectedClassInfo = null;

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
            selectedClassInfo = classInfo;
        } else {
            selectedClass = null
            selectedClassInfo = classInfo;
        }

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

let scheduleViewer = document.getElementById('scheduleViewer')

function highlightConnectedPeriods(event) {
    let target;
    if(event.target.nodeName == "SPAN") {
        target = event.target.parentElement;
    } else if(event.target.classList.contains('class')) {
        target = event.target
    }
    
    for (let i = 0; i < classDivs.length; i++) {
        if(classDivs[i].classList.contains('super_highlighted')) classDivs[i].classList.remove('super_highlighted')
    }

    if(!target) return

    if(target.classList.contains('highlighted')) {

        let ind = Array.from(classDivs).indexOf(target)
        
        if(selectedClassInfo.semesterLength == 1) {
            if(ind <= 7 || ind >= 20) {
                // Is on both a and b days
                if(ind % 4 == 0 || ind % 4 == 2) {
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind + 1].classList.add('super_highlighted')
                } else {
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind - 1].classList.add('super_highlighted')
                }
            } else {
                // Is only on a or b days
                classDivs[ind].classList.add('super_highlighted')
            }
        } else if(selectedClassInfo.semesterLength == 2) {
            if(ind <= 7 || ind >= 20) {
                // Is on both a and b days
                if(ind % 4 == 1) {
                    classDivs[ind - 1].classList.add('super_highlighted')
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind + 1].classList.add('super_highlighted')
                    classDivs[ind + 2].classList.add('super_highlighted')
                } else if(ind % 4 == 2) {
                    classDivs[ind - 1].classList.add('super_highlighted')
                    classDivs[ind - 2].classList.add('super_highlighted')
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind + 1].classList.add('super_highlighted')
                } else if(ind % 4 == 0) {
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind + 1].classList.add('super_highlighted')
                    classDivs[ind + 2].classList.add('super_highlighted')
                    classDivs[ind + 3].classList.add('super_highlighted')
                } else {
                    classDivs[ind - 3].classList.add('super_highlighted')
                    classDivs[ind - 2].classList.add('super_highlighted')
                    classDivs[ind - 1].classList.add('super_highlighted')
                    classDivs[ind].classList.add('super_highlighted')
                }
            } else {
                // Is only on a or b days
                if(ind % 4 <= 1) {
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind + 2].classList.add('super_highlighted')
                } else if(ind % 4 >= 2){
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind - 2].classList.add('super_highlighted')
                } else {
                    classDivs[ind].classList.add('super_highlighted')
                    classDivs[ind + 2].classList.add('super_highlighted')
                }
            }
        }
    }
}

function selectPeriod(event) {
    let target;
    if(event.target.nodeName == "SPAN") {
        target = event.target.parentElement;
    } else if(event.target.classList.contains('class')) {
        target = event.target
    }
    if(!target) return;
    if(target.classList.contains('highlighted')) {
        document.getElementsByClassName('highlightedClass')[0].classList.remove('highlightedClass')
        for (let i = 0; i < classDivs.length; i++) {
            if(classDivs[i].classList.contains('highlighted')) classDivs[i].classList.remove('highlighted')
            if(htmlDecode(classDivs[i].children[0].innerHTML) == selectedClass) classDivs[i].children[0].innerHTML = "Empty"
        }

        let ind = Array.from(classDivs).indexOf(target)
        if(selectedClassInfo.semesterLength == 1) {
            if(ind <= 7 || ind >= 20) {
                // Is on both a and b days
                if(ind % 4 == 0 || ind % 4 == 2) {
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                } else {
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind - 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                }
            } else {
                // Is only on a or b days
                classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
            }
        }else if(selectedClassInfo.semesterLength == 2) {
            if(ind <= 7 || ind >= 20) {
                // Is on both a and b days
                if(ind % 4 == 1) {
                    classDivs[ind - 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                } else if(ind % 4 == 2) {
                    classDivs[ind - 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind - 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                } else if(ind % 4 == 0) {
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 3].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                } else {
                    classDivs[ind - 3].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind - 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind - 1].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                }
            } else {
                // Is only on a or b days
                if(ind % 4 <= 1) {
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                } else if(ind % 4 >= 2){
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind - 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                } else {
                    classDivs[ind].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                    classDivs[ind + 2].children[0].innerHTML = "<strong>"+selectedClass+"</strong>"
                }
            }
        }

        selectedClass = null;
        selectedClassInfo = null;
        for (let i = 0; i < classDivs.length; i++) {
            if(classDivs[i].classList.contains('super_highlighted')) classDivs[i].classList.remove('super_highlighted')
        }
    }
}

scheduleViewer.addEventListener("mousedown", selectPeriod, false);
scheduleViewer.addEventListener("mouseover", highlightConnectedPeriods, false);

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

window.addEventListener("resize", resizeFunc);
window.addEventListener("load", resizeFunc);

function resizeFunc() {

    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    if(width <= 1200) {
        document.getElementById('main-text').innerHTML = "Choose your <span class=\"text-primary\">classes</span> below."

    } else {
        document.getElementById('main-text').innerHTML = "Choose your <span class=\"text-primary\">classes</span> to the right."

    }
}