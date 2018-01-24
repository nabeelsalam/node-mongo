const DataService = require('./dataService');

const Routes = (app) => {

  app.get('/students', (req, res) => {
    DataService.getAllStudents()
      .then((students) => {
        res.status(200).json(students)
      })
      .catch(() => {
        res.status(500);
      })
  })

  app.post('/student', (req, res) => {
    DataService.insertStudent(req.body)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json(err);
      })
  })

  app.get('/students/:name', (req, res) => {
    DataService.findStudentsWhoseNamesHave(req.params.name)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json(err);
      })
  })
}

module.exports = Routes;