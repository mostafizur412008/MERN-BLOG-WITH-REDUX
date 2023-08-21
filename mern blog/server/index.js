const app =require('./app');
const config =require('./config/config');
PORT= config.app.port

app.listen(PORT, (req,res)=>{
console.log(`Server is running http://localhost:${PORT}`);
}
    
)

