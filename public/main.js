document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task')
    const deleteAllButton = document.getElementById('delete-all')
    const uploadAllButton = document.getElementById('upload-all')
    const downloadAllButton = document.getElementById('download-all')
    const taskList = document.getElementById('task-list')

    // Cargar tareas existentes desde localStorage
    loadTasks();

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(newTaskInput.value)
            newTaskInput.value = ''
        }
    })

    deleteAllButton.addEventListener('click', () => {
        localStorage.clear()
        taskList.innerHTML = ''
    })

    uploadAllButton.addEventListener('click', uploadTasks)
    downloadAllButton.addEventListener('click', downloadTasks)

    function addTask(task) {
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || []
            tasks.push({id: task})
            localStorage.setItem('tasks', JSON.stringify(tasks))
            loadTasks()
        }
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        taskList.innerHTML = ''
        tasks.forEach(task => {
            const li = document.createElement('li')
            li.textContent = task.id
            taskList.appendChild(li)
        })
    }

    function uploadTasks() {     
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        fetch('http://127.0.0.1:3000/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks }),
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error('Error al subir tareas:', error)
        });
    }

    function downloadTasks() {
        fetch('http://127.0.0.1:3000/api/download')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('tasks', JSON.stringify(data))
                loadTasks()

            }).catch(error => {
                console.error('Error al descargar tareas:', error)
            })
    }   
})
