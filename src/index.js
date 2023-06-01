const express = require('express');
const repertorioRoutes = require("./routes/repertorio.routes");


const app = express();
/*root endpoint*/
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
} );
/*middlewares*/
app.use(express.json()); 
app.use(repertorioRoutes);

app.listen(3000, () => console.log("Server corriendo en http://localhost:3000"));
