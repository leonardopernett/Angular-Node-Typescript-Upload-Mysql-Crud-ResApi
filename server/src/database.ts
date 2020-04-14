import mysql from 'promise-mysql';
import config from './key'


const pool = mysql.createConnection(config.database);

const getConnection = ()=>{
    return pool
}
    
export default {
    getConnection
}