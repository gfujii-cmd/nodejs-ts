import * as mysql from 'mysql';

export const pool = mysql.createPool({
    "user": "root",
    "password": "root",
    "database": "test",
    "host": "127.0.0.1",
    "port": 3306
,});