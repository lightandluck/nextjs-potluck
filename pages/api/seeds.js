import dbConnect from '../../util/dbConnect';
import Seed from '../../models/seed.model';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    // TODO:  Figure out logic of which seed we need to get,
    //        but right now just assuming there's only one in database
    case 'GET':
      Seed.findOne({ prefix: process.env.SEED_PREFIX })
        .then((seed) => res.status(200).json(seed))
        .catch((error) =>
          res.status(400).json({ name: error.name, message: error.message })
        );
      break;
    /* #region REFERENCE: This will get of `API resolved without response` warning, */
    //            but way too verbose.
    // TODO: Find better way of getting rid of those warnings
    // try {
    //   const seed = await Seed.findOne({
    //     prefix: process.env.SEED_PREFIX,
    //   });

    //   if (seed) {
    //     res.status(200).json(seed);
    //   } else {
    //     throw new Error(
    //       'Seed not found. Please check your .env.local config.'
    //     );
    //   }
    // } catch (error) {
    //   res.status(400).json({ name: error.name, message: error.message });
    // }
    /* #endregion */

    case 'POST':
      // TODO: Figure out how to restrict database to distinct seed prefixes
      try {
        const { prefix, counter = 0 } = req.body;

        if (prefix && counter) {
          const newSeed = new Seed({ prefix, counter });

          newSeed
            .save()
            .then(() =>
              res.json({
                message: `Seed: ${prefix} added. Counter starting at: ${counter.toString()}`,
              })
            )
            .catch((error) =>
              res.status(400).json({ name: error.name, message: error.message })
            );
        } else {
          throw new Error('Request body did not contain prefix field.');
        }
      } catch (error) {
        res.status(400).json({
          error: { name: error.name, message: error.message },
        });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
      break;
  }

  /* #region TODO: Figure out if we need this update path */
  // router.route('/update/:id').post((req, res) => {
  //   Seed.findById(req.params.id)
  //     .then((seed) => {
  //       seed.counter += 1;
  //       seed
  //         .save()
  //         .then((seed) =>
  //           res.json('Counter incremented to: ' + seed.counter.toString())
  //         )
  //         .catch((err) => res.status(400).json('Error: ' + err));
  //     })
  //     .catch((err) => res.status(400).json('Error: ' + err));
  // });
  /* #endregion */
}
