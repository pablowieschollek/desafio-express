const {Router} = require('express');
const fs = require('fs');
const { request } = require('http');

const router = Router() 
/*GET /canciones*/
router.get("/canciones", (req,res) => {
    const readjson = fs.readFileSync(__dirname + '/../database/repertorio.json', 'utf8')

    res.json(JSON.parse(readjson))
} );  

/*POST /canciones*/
router.post("/canciones", (req,res) => {
    const cancion = req.body
    const readjson = fs.readFileSync(__dirname + '/../database/repertorio.json', 'utf8')
    const canciones = JSON.parse(readjson)
    canciones.push(cancion)
    fs.writeFileSync(__dirname + '/../database/repertorio.json', JSON.stringify(canciones))

    console.log(cancion)
    res.json({message: "canción agregada correctamente"})
} ); 

/*PUT / editar canciones*/

router.put("/canciones/:id", (req,res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync(__dirname + '/../database/repertorio.json', 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    canciones [index] = cancion
    fs.writeFileSync(__dirname + '/../database/repertorio.json', JSON.stringify(canciones))
    res.send("Cancion modificada con éxito")
});

/*DELETE / eliminar canciones*/

router.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync(__dirname + '/../database/repertorio.json', 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync(__dirname +'/../database/repertorio.json', JSON.stringify(canciones))
    res.send("Producto eliminado con éxito")
    });



module.exports = router