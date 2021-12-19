import {
  deleteMatchById,
  deleteSportById,
  getMatches,
  getSport,
  insertMatch,
  updateMatchById,
  updateSportById,
} from '../../../../util/database';

export default async function registerHandler(req, res) {
  try {
    if (req.method === 'GET') {
      const sport = await getSport(Number(req.query.sportId));
      res.status(200).json(sport);
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

    if (req.method === 'GET') {
      const matches = await getMatches();
      return res.status(200).json(matches);
    } else if (req.method === 'POST') {
      const body = req.body;
      const createdMatch = await insertMatch({
        matchname: body.matchname,
        date: body.date,
        time: body.time,
        location: body.location,
        sportId: body.sportId,
      });
      if (!createdMatch) {
        res.status(500).send({ errors: [{ message: 'Add the Match first' }] });
        return;
      }
      return res.status(200).json(createdMatch);
    } else if (req.method === 'DELETE') {
      console.log('query', req.query);

      const deletedMatch = await deleteMatchById(Number(req.query.sportId));

      return res.status(200).json(deletedMatch);
    } else if (req.method === 'PATCH') {
      const body = req.body;
      const query = req.query;

      const updatedMatch = await updateMatchById(Number(query.matchId), {
        matchname: body.matchname,
        time: body.time,
      });

      return res.status(200).json(updatedMatch);
    }

    return res.status(405);
  } catch (err) {
    res.status(500).send({ errors: [{ message: err.message }] });
  }
}
