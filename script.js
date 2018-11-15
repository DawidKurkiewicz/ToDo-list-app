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
        this.container.innerHTML = ''
        const list = document.createElement('ul')

        this.elements()

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
            butt.addEventListener("click", () => {
                this.tasks.splice(i, 1);
                this.render();
            })
        })
        this.container.appendChild(list)
    }
    elements() {
        const input = document.createElement('input')
        document.body.appendChild(input)
        const addTaskButt = document.createElement('button')
        addTaskButt.innerText = 'add task'
        addTaskButt.addEventListener('click', () => this.addTask(input.value))
        document.body.appendChild(addTaskButt)
    }

}
class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false

    }
}
const ToDo1 = new ToDo()
