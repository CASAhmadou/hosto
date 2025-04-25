import SQLite from 'react-native-sqlite-storage';
import db from './db'; 

const db = SQLite.openDatabase(
    {name: 'medical.db', location: 'default'}, ()=> {},
    error => console.log('DB Error:', error)
);

const initDB = () => {
    db.transaction(tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS patients(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,
            phone TEXT,
            email TEXT,
            address TEXT
        )`);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS appointments(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER,
            date TEXT,
            time TEXT,
            reason TEXT,
            status TEXT,
            FOREIGN KEY (patient_id) REFERENCES patients (id)
        )`);
    });
}