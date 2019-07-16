import express from 'express';
import connection from './conf';

const router = express.Router();


router.get('/performance', (req, res) => {
  connection.query('SELECT id, city, date from performance', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des spectacles');
    } else {
      res.json(results);
    }
  });
});

router.get('/performance/:id(\\d+)', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM performance WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results[0]);
    }
  });
});

router.put('/performance/:id(\\d+)', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  connection.query('UPDATE performance SET ? WHERE id=?', [body, id], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/map', (req, res) => {
  connection.query('SELECT city, date from performance', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des spectacles');
    } else {
      res.json(results);
    }
  });
});

export default router;
