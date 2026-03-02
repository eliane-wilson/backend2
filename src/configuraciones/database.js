import { connect } from "mongoose";

export async function mongoConnect (){
    try{
    await connect ( 'mongodb://127.0.0.1:27017/entrega1');
} catch (error){ console.error( "Error conectando a MongoDB:", error.message) 

}};


