import {
  deleteSportById,
  getSports,
  insertSport,
  updateSportById,
} from '../../../util/database';

export default async function registerHandler(req, res) {
  // if (!req.body.name) {
  //   res.status(400).send({
  //     errors: [{ message: 'Please insert Name of the Sport' }],
  //   });
  //   return; // return right away
  // }

  try {
    if (req.method === 'GET') {
      const sports = await getSports();
      return res.status(200).json(sports);
    } else if (req.method === 'POST') {
      const body = req.body;

      // the code for the POST request
      const createdSport = await insertSport({
        name: body.name,
      });
      if (!createdSport) {
        res.status(500).send({ errors: [{ message: 'Sport not create' }] });
        return;
      }
      return res.status(200).json(createdSport);
    } else if (req.method === 'DELETE') {
      console.log('query', req.query);

      const deletedSport = await deleteSportById(Number(req.query.sportId));

      return res.status(200).json(deletedSport);
    } else if (req.method === 'PATCH') {
      const body = req.body;
      const query = req.query;

      const updatedSport = await updateSportById(Number(query.sportId), {
        name: body.name,
      });

      return res.status(200).json(updatedSport);
    }

    return res.status(405);
  } catch (err) {
    res.status(500).send({ errors: [{ message: err.message }] });
  }
}
