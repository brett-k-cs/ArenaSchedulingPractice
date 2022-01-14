let classPicker = document.getElementsByClassName('classPicker')[0]
let popup = document.getElementById('popup')
let popupHeader = document.getElementById('popupHeader')
let popupDescription = document.getElementById('popupDescription')
let popupCloseBtn = document.getElementById('popupCloseBtn')

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

classPicker.addEventListener("mousedown", chooseClass, false);

popupCloseBtn.addEventListener("mousedown", close, false);

function close(event) {
    popup.classList.add("hidden")
}

function chooseClass(event) {
    if((event.target.nodeName == "SPAN" && event.target?.parentElement?.id && classes[event.target.parentElement.id]) || event.target.id && classes[event.target.id]) {
        popup.classList.remove('hidden')

        let classInfo = classes[event.target.id] || classes[event.target.parentElement.id]        
        let avaliablePeriods = classInfo.avaliablePeriods
        var curSelectedClass = event.target.id || event.target.parentElement.id

        popupHeader.children[0].innerHTML = curSelectedClass

        popupDescription.innerHTML = ""
        let desc = document.createElement('p')
        desc.innerHTML = classInfo.description || "No information is avaliable for this class."
        popupDescription.appendChild(desc)

        let periods = document.createElement('p')
        periods.classList.add("center")
        periods.innerHTML = "Periods: "+arrayToNiceString(classInfo.avaliablePeriods)
        popupDescription.appendChild(periods)


        let semesterLength = document.createElement('p')
        semesterLength.classList.add("center")
        semesterLength.innerHTML = "Semester Length: "+classInfo.semesterLength
        popupDescription.appendChild(semesterLength)

        let grades = document.createElement('p')
        grades.classList.add("center")
        grades.innerHTML = "Grades: "+classInfo.grades
        popupDescription.appendChild(grades)

    }
}

function arrayToNiceString(array) {
    if(array.length == 0) return null
    if(array.length == 1) return array[0]
    if(array.length == 2) return array[0] + " and " + array[1]
    str = ""
    for (let i = 0; i < array.length; i++) {
        if(i != 0)
            str += ","
        if(i + 1 == array.length) {
            str += " and"
        }
        str += " "+array[i]
    }
    return str;
}

window.addEventListener("resize", resizeFunc);
window.addEventListener("load", resizeFunc);

function resizeFunc() {

    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    if(width <= 1200) {
        document.getElementById('main-text').innerHTML = "Get info about <span class=\"text-primary\">classes</span> below."

    } else {
        document.getElementById('main-text').innerHTML = "Get info about <span class=\"text-primary\">classes</span> on the right."

    }
}