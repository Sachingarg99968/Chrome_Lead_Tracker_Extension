// chrome://extensions/
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
// adding a double click btn 
const deletebtn = document.getElementById("delete-btn")
// adding a TAB button for saving link according to indexing of array
const tabBtn = document.getElementById("tab-btn")

// localStorage.clear()
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
console.log(leadsFromLocalStorage)


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    // Here - chrome is asking to tabs and query , That the URL is active , if true , will check the next condition, that yu r on a current window, then function will execute
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // console.log(tabs[0].url)
        myLeads.push(tabs[0].url)
        // Now we turn the array into a string
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        // Now we will render the items whatever will be on myLeads
        render(myLeads)
    })
    
})

// inside this localStorage , we are using the double click button!
deletebtn.addEventListener("dblclick", function(){
    // For Checking the botton.
    // console.log("Double Click")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        // another way of written with "Template String"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}










