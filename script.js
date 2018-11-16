class ToDo {
    constructor(container) {
        this.tasks = []
        this.container = document.querySelector(container) || document.body
        this.render()
        this.init()
    }
    init() {
        this.render()
    }
    addTask(text) {
        this.tasks.push(new Task(text))
        this.render()

    }
    render() {
        this.renderElements()

    }

    renderElements() {
        this.container.innerHTML = ''
        this.elements()
        const list = document.createElement('ul')
        this.tasks.forEach((task, i) => {
            const listitem = document.createElement('li')
            listitem.innerText = task.text
            localStorage.setItem(i, task) //doesnt work well
            const butt = document.createElement('button')
            butt.innerText = 'remove'
            list.appendChild(listitem)
            list.appendChild(butt);
            listitem.addEventListener('click', function () { // text-decoration vanish when we remove other task or add new one 
                if (task.isCompleted === true) {
                    task.isCompleted = false
                    this.style.textDecoration = "none"
                } else {
                    task.isCompleted = true
                    this.style.textDecoration = "line-through"
                }
            })
            butt.addEventListener("click", () => {
                this.tasks.splice(i, 1);
                localStorage.removeItem(i) //doesnt work well
                this.render();
            })

        })
        this.container.appendChild(list)
    }
    taskComp (){

    }
    taskUnComp(){

    }
    findTask(){
        
    }


    elements() {
        const input = document.createElement('input')
        this.container.appendChild(input)
        const addTaskButt = document.createElement('button')
        addTaskButt.innerText = 'add task'
        addTaskButt.addEventListener('click', () => this.addTask(input.value))
        this.container.appendChild(addTaskButt)
        const compButt = document.createElement('button')
        compButt.innerText = "done"
        // compButt.addEventListener('click', () => this.tasksComp()) // need to write function 
        this.container.appendChild(compButt)
        const unCompButt = document.createElement('button')
        unCompButt.innerText = "undone"
        // unCompButt.addEventListener('click', () => this.tasksUnComp()) // need to write function 
        this.container.appendChild(unCompButt)
        const allButt = document.createElement('button')
        allButt.innerText = "all"
        allButt.addEventListener('click', () => this.render())
        this.container.appendChild(allButt)
        const search = document.createElement('input')
        this.container.appendChild(search)
        const searchButt = document.createElement('button')
        searchButt.innerText = 'search'
        // searchButt.addEventListener('click', () => this.findTask(search.value)) // need to write function 
        this.container.appendChild(searchButt)
    }
}
class Task {
    constructor(text) {
        this.text = text
    }
}
const ToDo1 = new ToDo()
