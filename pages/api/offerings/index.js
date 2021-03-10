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
      const { playerName, playerId, title, description } = req.body;
      const officialName = await generateOfficialName();

      const newOffering = new Offering({
        playerName,
        playerId,
        officialName,
        title,
        description,
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

// router.route('/').get((req, res) => {
//   Offering.find()
//     .then(offerings => res.json(offerings))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post(async (req, res) => {
//   const playerName = req.body.playerName;
//   const playerId = req.body.playerId;
//   const title = req.body.title;
//   const description = req.body.description;

//   let officialName = await generateOfficialName();

//   const newOffering = new Offering({
//     playerName,
//     playerId,
//     officialName,
//     title,
//     description
//   });

//   newOffering.save()
//     .then((offering) => {
//       res.json(offering);
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
//   Offering.findById(req.params.id)
//     .then(offering => res.json(offering))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

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

// router.route('/:id').delete((req, res) => {
//   Offering.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Offering deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Offering.findById(req.params.id)
//     .then(offering => {
//       // TODO: Confirm that `offering` passed as parameter to arrow function makes sense
//       //       and is updating the correct object
//       offering.playerName = req.body.playerName;
//       offering.officialName = req.body.officialName;
//       offering.title = req.body.title;
//       offering.description = req.body.description;

//       offering.save()
//         .then(() => res.json('Offering updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // TODO: Add some error handling for this
// function generateOfficialName() {
//   // TODO: Use $inc operator instead or https://kb.objectrocket.com/mongo-db/auto-increment-sequence-in-mongodb-1276
//   return Seed.findOne()
//     .then(seed => {
//       let name = "WAWG-" + seed.counter.toString();
//       seed.counter += 1;
//       return seed.save().then(() => name);
//     })
//  };

// module.exports = router;
