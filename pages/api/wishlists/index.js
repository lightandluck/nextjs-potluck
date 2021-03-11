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
      Wishlist.find()
        .then((wishlists) => res.status(200).json(wishlists))
        .catch((error) =>
          res.status(400).json({ type: error.name, message: error.message })
        );
      break;
    case 'POST':
      const { playerId } = req.body;

      const offeringInList = {
        offeringId: req.body.offeringId,
        isSteward: req.body.isSteward || false,
      };

      const query = Wishlist.find({ playerId: playerId });

      // filter out duplicate in wishlist array: https://stackoverflow.com/questions/33576223/using-mongoose-mongodb-addtoset-functionality-on-array-of-objects
      const filter = {
        'offerings.offeringId': { $ne: ObjectId(offeringInList.offeringId) },
      };

      // TODO: Use create and update explicity for these records.
      query
        .updateOne(
          filter,
          { $addToSet: { offerings: offeringInList } },
          {
            upsert: true,
          }
        )
        .then((addedItemInfo) => {
          let message = offeringInList.isSteward
            ? 'Stewarded item added to wishlist'
            : 'Item added to wishlist';

          res.json({
            message: message,
            addedItemInfo: addedItemInfo,
          });
        })
        .catch((error) => {
          //TODO: Finding the duplicate sends a Mongo error, find a better fix for this
          if (error.code === 11000) {
            res.json({ message: 'Duplicate not added!', error: error });
          } else {
            res.status(400).json({ type: error.name, message: error.message });
          }
        });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
