import dbConnect from '../../../util/dbConnect';
import Player from '../../../models/player.model';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      Player.find()
        .then((players) => res.status(200).json(players))
        .catch((error) =>
          res.status(400).json({ type: error.name, message: error.message })
        );
      break;
    case 'POST':
      // TODO: Careful about non-unique names and what gets deleted
      try {
        const name = req.body.name;

        if (name) {
          const newPlayer = new Player({ name });

          newPlayer
            .save()
            .then(() => res.status(201).json(newPlayer))
            .catch((error) =>
              res.status(400).json({ name: error.name, message: error.message })
            );
        } else {
          throw new Error('Request body did not contain name field.');
        }
      } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
      }
      break;
    case 'DELETE':
      const { name } = req.body;
      Player.deleteOne({ name: name })
        .then((deleteResponse) => res.status(200).json(deleteResponse))
        .catch((error) =>
          res.status(400).json({ name: error.name, message: error.message })
        );
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
