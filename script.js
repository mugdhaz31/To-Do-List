
document.getElementById("plus").addEventListener("click", () => {

    if (document.getElementById("input").value == 0) {
        alert("Please enter a valid task")
    }
    else {
        let li = document.createElement("li")
        li.setAttribute("status", "pending")
        const currentDateTime = new Date().toLocaleString()
        li.innerHTML = `<div class="list">
                        <div class="check">
                        <p>${document.getElementById("input").value}</p>
                        <div id="time">(Added: ${currentDateTime})</div>
                        <button class="done" onclick = "completetask(this)" >Completed</button>
                        </div>
                         <img class="trash" src="images/delete.svg" alt="">
                        </div>`;
        document.getElementById("tasks").appendChild(li)
    }
    document.getElementById("input").value = ''
    localStorage.setItem("data", tasks.innerHTML);
})

document.getElementById("input").addEventListener("keyup", e => {
    if (e.key == "Enter") {
        if (document.getElementById("input").value == 0) {
            alert("Please enter a valid task")
        }
        else {
            let li = document.createElement("li")
            li.setAttribute("status", "pending")
            const currentDateTime = new Date().toLocaleString();
            li.innerHTML = `<div class="list">
                        <div class="check">
                        <p>${document.getElementById("input").value}</p>
                        <div id="time">(Added: ${currentDateTime})</div>
                        <button class="done" onclick = "completetask(this)">Completed</button>
                        </div>
                         <img class="trash" src="images/delete.svg" alt="">
                        </div>`;
            document.getElementById("tasks").appendChild(li)
        }
        document.getElementById("input").value = ''
        localStorage.setItem("data", tasks.innerHTML);
    }
})

document.getElementById("tasks").addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
        let li = document.createElement("li")
        li = e.target.parentElement.remove()
        localStorage.setItem("data", tasks.innerHTML);
    }
}, false)

document.getElementById("deleted").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        document.getElementById("tasks").innerHTML = ''
        localStorage.setItem("data", tasks.innerHTML);
    }
})

function completetask(btn) {
    const currentDateTime = new Date().toLocaleString()
    btn.parentElement.firstElementChild.classList.add("completed")
    btn.parentElement.firstElementChild.setAttribute('data-status', 'completed')
    btn.parentElement.firstElementChild.nextElementSibling.innerHTML += ` (Completed : ${currentDateTime})`
    btn.remove()
    localStorage.setItem("data", tasks.innerHTML);
}

function show(){
    tasks.innerHTML = localStorage.getItem("data");
}
show()