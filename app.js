const express = require('express')
const fs = require('fs').promises
const app = express()
const PORT = 3000
const cors =require('cors')
let texto=[]

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/api/upload', (req, res) => {
    
    texto = req.body.tasks
    console.log(texto)
    console.log(texto.length)

    fs.writeFile("tasks.json", JSON.stringify(texto), (err) => { 
        if (err) 
          console.log(err)
        else { 
          console.log("guay") 
        } 
      })

    res.status(200).send({respuesta:"raton"})
  })

app.get('/api/download', async (req, res) => {
    try {
        const data = await fs.readFile('tasks.json', 'utf8')
        res.send(data)
    } catch (error) {
        res.status(500).send('Error al leer las tareas: ' + error.message)
    }
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
