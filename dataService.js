const MongoClient = require('mongodb').MongoClient;

const DB_URL = 'mongodb://localhost:27017/school';

/**
 * Data Service class
 */
class DataService {

  constructor() {
    this.intializeDB();
  }

  /**
   * Initialize the Database
   */
  intializeDB() {
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) {
        console.error('Could not connect: ' + err)
      } else {
        console.log('Connected successfully')
      }
      this.DB = db;
      this.CStudents = db.collection('students');
    })
  }
  /**
   * Get all students
   */
  getAllStudents() {
    let prom = new Promise((resolve, reject) => {
      this.CStudents.find({}, {
        _id: 0
      }).toArray((err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    });
    return prom;
  }

  /**
   * Insert Student
   */
  insertStudent(student) {
    let prom = new Promise((resolve, reject) => {
      this.CStudents.insertOne(student, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    });
    return prom;
  }

  /**
   * Find Student whose name starts with
   */
  findStudentsWhoseNamesHave(name) {
    let prom = new Promise((resolve, reject) => {
      let reg = new RegExp(name, 'i');
      let query = {
        name: reg
      };
      this.CStudents.find(query, {
        _id: 0
      }).toArray((err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    });
    return prom;
  }
}
module.exports = new DataService();
