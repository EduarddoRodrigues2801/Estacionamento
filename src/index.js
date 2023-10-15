import express from 'express';
import { activityCheckin,  
         activityCheckout, 
         activityList, 
         activityRemove} from './controllers/activitiesControllers.js';
import { insertVehicles, 
         listVehicles,
         removeVehicle,     
         updateVehicles } from './controllers/vehiclesControllers.js';


const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");// dentro do '*' poderia ser qual site poderia fazer a requisiçao.
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    next();

})
app.use(express.json());

app.get('/api/ping', (request, response) => {
    response.send({
        message: 'pong'
    })
});

/* Endiponts Vehicles */
app.get('/api/vehicles', listVehicles);
app.post('/api/vehicles', insertVehicles);
app.put('/api/vehicles/:id', updateVehicles);
app.delete('/api/vehicles/:id', removeVehicle);

/* Endiponts Activities */
app.post('/api/activities/checkin', activityCheckin );
app.put('/api/activities/checkout', activityCheckout);
app.delete('/api/activities/:id', activityRemove);
app.get('/api/activities', activityList);




app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000..");
});
