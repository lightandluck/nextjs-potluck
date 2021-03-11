import mongoose from 'mongoose';
import dbConnect from '../../../util/dbConnect';
import Offering from '../../../models/offering.model';
import Wishlist from '../../../models/wishlist.model';

const ObjectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      Wishlist.findOne({ playerId: req.query.id })
        .populate('offerings.offeringId', '-updatedAt -createdAt -__v')
        .populate('playerId', 'name')
        .then((wishlist) => res.json(wishlist))
        .catch((err) =>
          res.status(400).json({ type: error.name, message: error.message })
        );
      break;
    case 'PUT':
      const query = Wishlist.find({ playerId: req.query.id });

      query
        .updateOne(
          {},
          {
            $set: { offerings: req.body },
          }
        )
        .then((info) => {
          if (info.nModified === 0) {
            res.status(404).json({
              message: 'No wishlist associated with that user found.',
              info: info,
            });
          } else {
            res.json({ message: 'Wishlist updated!', info: info });
          }
        })
        .catch((error) => {
          res.status(400).json({ type: error.name, message: error.message });
        });

      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}

// TODO: Do we need to delete whole wishlists? Probably not
// router.route('/:id').delete((req, res) => {
//   Wishlist.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Wishlist deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
