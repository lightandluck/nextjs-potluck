import dbConnect from '../../../util/dbConnect';
import Offering from '../../../models/offering.model';

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

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
