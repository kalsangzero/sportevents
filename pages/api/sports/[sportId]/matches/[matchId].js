import {
  deleteMatchById,
  getMatch,
  updateMatchById,
} from '../../../../../util/database';

export default async function registerHandler(req, res) {
  try {
    if (req.method === 'GET') {
      const match = await getMatch(Number(req.query.matchId));
      res.status(200).json(match);
    } else if (req.method === 'DELETE') {
      console.log('query', req.query);

      const deletedMatch = await deleteMatchById(Number(req.query.matchId));

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
