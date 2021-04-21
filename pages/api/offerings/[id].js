import dbConnect from '../../../util/dbConnect';
import Offering from '../../../models/offering.model';
import Wishlist from '../../../models/wishlist.model';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      Offering.findById(req.query.id)
        .then((offering) => res.status(200).json(offering))
        .catch((error) =>
          res.status(400).json({ type: error.name, message: error.message })
        );

      break;
    case 'PUT':
      Offering.findById(req.query.id)
        .then((offering) => {
          ({
            playerName: offering.playerName,
            officialName: offering.officialName,
            title: offering.title,
            description: offering.description,
          } = req.body);

          /* #region Equivalent to above assignment  */
          // offering.playerName = req.body.playerName;
          // offering.officialName = req.body.officialName;
          // offering.title = req.body.title;
          // offering.description = req.body.description;
          /* #endregion */

          offering
            .save()
            .then((updatedOffering) =>
              res.json({ success: true, updatedOffering: updatedOffering })
            )
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
      break;
    case 'DELETE':
      Offering.findByIdAndDelete(req.query.id)
        .then((deletedOffering) =>
          res.json({ success: true, deletedOffering: deletedOffering })
        )
        .catch((error) =>
          res.status(400).json({ name: error.name, message: error.message })
        );
      break;

    case 'POST':
      const updatedWishlists = await Wishlist.find({
        'offerings.offeringId': ObjectId(req.query.id),
      }).then((wishlists) => {
        return wishlists.map(({ offerings, playerId }) => {
          const filteredWishlist = offerings
            .filter(({ offeringId }) => String(offeringId) !== req.query.id)
            .map((item) => ({
              isSteward: item['isSteward'],
              offeringId: item['offeringId'],
            }));

          return {
            playerId: playerId,
            offerings: filteredWishlist, // TODO: This is where the naming gets confusing between offerings and wishlist
          };
        });
      });

      res.status(200).json(updatedWishlists);

      // const query = Wishlist.find({ playerId: req.query.id });

      // query
      //   .updateOne(
      //     {},
      //     {
      //       $set: { offerings: updateWishlist },
      //     }
      //   )
      //   .then((info) => {
      //     if (info.nModified === 0) {
      //       res.status(404).json({
      //         message: 'No wishlist associated with that user found.',
      //         info: info,
      //       });
      //     } else {
      //       res.json({ message: 'Wishlist updated!', info: info });
      //     }
      //   })
      //   .catch((error) => {
      //     res.status(400).json({ type: error.name, message: error.message });
      //   });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}

// Debugging Code
// console.log(wishlist.offerings);

// let filtered = wishlist.offerings.filter(
//   (offering) => offering.offeringId != req.query.id
// );
// console.log('-----------');
// console.log(filtered);

// for (const i of wishlist.offerings) {
//   console.log(`Item: ${i.offeringId}, Type: ${typeof i}`);
//   console.log(`Qury: ${req.query.id}, Type: ${typeof req.query.id}`);
//   console.log('--');
// }
