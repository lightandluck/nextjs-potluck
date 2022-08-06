import dbConnect from '../../../util/dbConnect';
import Player from '../../../models/player.model';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      Player.findById(req.query.id)
        .then((player) => res.status(200).json(player))
        .catch((error) =>
          res.status(400).json({ type: error.name, message: error.message })
        );
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
