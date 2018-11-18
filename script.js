class ToDo {
    constructor(container) {
        this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || []
        
        this.container = document.querySelector(container) || document.body
        this.init()

    }
    init() {
        this.render()
        
        
    }

    loadTasks() {
        return JSON.parse(window.localStorage.getItem('tasks'))


    }

    saveTasks() {
        window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    addTask(text) {
        const task = new Task(text)
        this.tasks.push(task)
        this.saveTasks()
        this.render()

    }
    render(array) {
        this.renderElements(array)
        
    }

    renderElements(array) {
        this.container.innerHTML = ''
        array = array || this.tasks
        this.elements()
        const list = document.createElement('ul')
        array.forEach((task, i) => {
            const listitem = document.createElement('li')
            listitem.innerText = task.text
            const butt = document.createElement('button')
            butt.innerText = 'remove'
            list.appendChild(listitem)
            list.appendChild(butt);
            listitem.addEventListener('click', function () {
                if (task.isCompleted === true) {
                    task.isCompleted = false
                    this.style.textDecoration = "none"


                } else {
                    task.isCompleted = true
                    this.style.textDecoration = "line-through"
                }
            })

            if (task.isCompleted === true) {
                listitem.style.textDecoration = "line-through"

            } else {
                listitem.style.textDecoration = "none"

            }

            butt.addEventListener("click", () => {
                this.tasks.splice(i, 1)
                this.saveTasks()
                this.render()
            })

        })
        this.container.appendChild(list)
    }
    tasksUnComp() { //doesnt work 
        const unCompTasks = this.tasks.filter((task) => task.isCompleted === false)
        this.render(unCompTasks)
    }
    tasksComp() { //doesnt work 
        const compTasks = this.tasks.filter((task) => task.isCompleted === true)
        this.render(compTasks)
    }
    findTask(value) {
        const tasks = this.loadTasks()
        this.tasks = tasks.filter(task => task.text.replace(/\s/g, '').toLowerCase().includes(value.replace(/\s/g, '').toLowerCase()))
        this.render()
    }
    resetSearch() {
        const tasks = this.loadTasks()
        this.tasks = tasks;
        this.render();
    }
    elements() {
        const input = document.createElement('input')
        const compButt = document.createElement('button')
        const addTaskButt = document.createElement('button')
        const unCompButt = document.createElement('button')
        const allButt = document.createElement('button')
        const search = document.createElement('input')
        const searchButt = document.createElement('button')
        const resetButt = document.createElement('button')

        addTaskButt.innerText = 'add task'
        compButt.innerText = "done"
        unCompButt.innerText = "undone"
        allButt.innerText = "all"
        searchButt.innerText = 'search'
        resetButt.innerText = 'reset'

        addTaskButt.addEventListener('click', () => this.addTask(input.value))
        compButt.addEventListener('click', () => this.tasksComp())
        unCompButt.addEventListener('click', () => this.tasksUnComp())
        allButt.addEventListener('click', () => this.render())
        searchButt.addEventListener('click', () => this.findTask(search.value))
        resetButt.addEventListener('click', () => this.resetSearch())

        this.container.appendChild(input)
        this.container.appendChild(addTaskButt)
        this.container.appendChild(compButt)
        this.container.appendChild(unCompButt)
        this.container.appendChild(allButt)
        this.container.appendChild(search)
        this.container.appendChild(searchButt)
        this.container.appendChild(resetButt)
    }
}
class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false

    }
}
const toDo1 = new ToDo()