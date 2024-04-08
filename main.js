import './style.css'
import './utils/utils'

let todo = [];

const ui = {}

function app(){
    let main;
    
    main = mk('div', {id: 'app'}, [
        mk('div', {id: 'head'}, [
            mk('h1', null, ['Your Todos']),
            mk('button',  { id: 'create', onclick: add, tabindex: "0" }, [
                'Add Task',
                mk('span', {className: 'material-symbols-outlined'}, ['Add'])
            ])
        ]),
        (ui.body = mk('div', {id: 'body'}))
    ])

    function createTodo(item){
        let todos, todoItem, input, box, edit

        todos = (todoItem = mk('div', {className: 'todo-items'}, [
            (box = mk('input', {type: 'checkbox', onkeypress: enter, onchange: checkBox, tabindex: "0"})),
            (input = mk('input', {type: 'text', oninput: change, onblur: blur, onkeydown: keyDown})),
            mk('div', {className: 'actions'}, [
                (edit = mk('button', {className: 'material-symbols-outlined edit', onclick: editTodo, tabindex: "0"}, ['Edit'])),
                mk('button', {className: 'material-symbols-outlined remove', onclick: remove, tabindex: "0" }, ['Delete'])
            ])
        ]))

        box.checked = item.complete
        input.value = item.text
        input.setAttribute('disabled', '')

        return {todos, input, box}

        function change(){
            item.text = input.value

            save()
        }

        function blur(){
            if(!input.value){
                input.focus()
            }else{
                input.setAttribute('disabled', '')
            }
            
            
        }

        function keyDown(event){
            if(event.key == 'Enter'){
                input.blur()
            }
        }

        function checkBox(){
            //this event does not save when the page reloads
            item.complete = box.checked

            if(item.complete){
                todoItem.classList.toggle('complete');
                edit.disabled = true
            }else if(!item.complete){
                todoItem.classList.remove('complete');
                edit.disabled = false
            }
            
            save()
        }


        function enter(e){
            //makes the checkbox work with enter key 
            //instead of spacebar
            if (e.which === 13) {
                this.checked = !this.checked;
                checkBox()
            }

            save()
        }

        function remove(){
            todo = todo.filter(t => t.id != item.id)
            if(confirm('Do you want to remove this task')) todos.remove()

            save()
        }

        function editTodo(){
            input.removeAttribute('disabled')
            input.focus()
        }
    }

    function save() {
        localStorage.setItem('todoList', JSON.stringify(todo));
    }

    function load() {
        const savedTodo = localStorage.getItem('todoList');
        if (savedTodo) {
            todo = JSON.parse(savedTodo);
            todo.forEach(item => {
                const { todos } = createTodo(item);
                ui.body.prepend(todos);

                console.log(item.complete)

            });
        }

        
    }

    // Load data when the app starts
    load();


    function add(){
        let item = {
            text: '',
            id: new Date().getTime(),
            complete: false
        }

        todo.push(item)

        const {todos, input, box} = createTodo(item);

        ui.body.prepend(todos)
        input.removeAttribute('disabled')
        input.focus()

        save()
    }

    return main
}

document.body.prepend(app())



// function save(){
// //     const save = JSON.stringify(todo)
    // localStorage.setItem('myTodo', ui.body.innerHTML)

// //     localStorage.setItem('myTodo', save)
// }

// function load(){
//     const data = localStorage.getItem('myTodo')

//     if(data) todo = JSON.parse(data)
   
// }

// function render(){
// //     load()
//     ui.body.innerHTML = localStorage.getItem('myTodo')

// //     for(let i = 0; i < todo.length; i++){
// //         const item = todo[i]

// //         const {createTodo} = app()
// //         const {todos} = createTodo(item)

// //         ui.body.prepend(todos)
        
// //     }
// }

// render()

