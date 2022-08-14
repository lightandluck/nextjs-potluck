import dbConnect from '../../../util/dbConnect';
import Offering from '../../../models/offering.model';
import Seed from '../../../models/seed.model';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      Offering.find()
        .then((offerings) => res.status(200).json(offerings))
        .catch((error) =>
          res.status(400).json({ type: error.name, message: error.message })
        );
      break;
    case 'POST':
      const { playerName, playerId, title, description, imageURLs } = req.body;
      const officialName = await generateOfficialName();

      const newOffering = new Offering({
        playerName,
        playerId,
        officialName,
        title,
        description,
        imageURLs,
      });

      newOffering
        .save()
        .then((offering) => {
          res.status(201).json(offering);
        })
        .catch((error) =>
          res.status(400).json({ type: error.name, message: error.message })
        );
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}

function generateOfficialName() {
  // TODO: Use $inc operator instead or https://kb.objectrocket.com/mongo-db/auto-increment-sequence-in-mongodb-1276
  const prefix = process.env.SEED_PREFIX || '';
  return Seed.findOne({ prefix }).then((seed) => {
    let name = `${prefix}-${seed.counter.toString()}`;
    seed.counter += 1;

    // TODO: How to handle errors?
    return seed.save().then(() => name);
  });
}

/* #region   */
// UNUSED IT SEEMS - INVESTIGATE FURTHER IF NECESSARY
// router.route('/byPlayer/:name').get((req, res) => {
//   Offering.find({ "playerName": req.params.name })
//     .then(offering => res.json(offering))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/byPlayerId/:id').get((req, res) => {
//   Offering.find({ "playerId": req.params.id })
//     .then(offering => res.json(offering))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
/* #endregion */
