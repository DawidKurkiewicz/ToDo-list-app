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
        this.container.appendChild(input)
        const addTaskButt = document.createElement('button')
        addTaskButt.innerText = 'add task'
        addTaskButt.addEventListener('click', () => this.addTask(input.value))
        this.container.appendChild(addTaskButt)
        const compButt = document.createElement('button')
        compButt.innerText = "done"
        compButt.addEventListener('click', () => this.tasksComp())
        this.container.appendChild(compButt)
        const unCompButt = document.createElement('button')
        unCompButt.innerText = "undone"
        unCompButt.addEventListener('click', () => this.tasksUnComp())
        this.container.appendChild(unCompButt)
        const allButt = document.createElement('button')
        allButt.innerText = "all"
        allButt.addEventListener('click', () => this.render())
        this.container.appendChild(allButt)
        const search = document.createElement('input')
        this.container.appendChild(search)
        const searchButt = document.createElement('button')
        searchButt.innerText = 'search'
        searchButt.addEventListener('click', () => this.findTask(search.value))
        this.container.appendChild(searchButt)
        const resetButt = document.createElement('button')
        resetButt.innerText = 'reset'
        resetButt.addEventListener('click', () => this.resetSearch())
        this.container.appendChild(resetButt)
    }
}
class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false

    }
}
const ToDo1 = new ToDo()