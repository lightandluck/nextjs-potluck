import dbConnect from '../../util/dbConnect'
import Player from '../../models/player.model'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const players = await Player.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: players })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const name = req.body.name;

        if (name) {
          const newPlayer = new Player({name});

          newPlayer.save()
            .then(() => res.status(201).json({ success: true, data: newPlayer }))
            .catch(error => res.status(400).json('Error: ' + error));
        } else {
          throw 'Request body did not contain name'
        }
        
        // TODO: Probably simpler way to do this. Change when able to test later.
        // const newPlayer = await Player.create(
        //   req.body
        // ) /* create a new model in the database */
        // res.status(201).json({ success: true, data: newPlayer })
      } catch (error) {
        res.status(400).json({ success: false, Error: error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ success: false, message: `Method ${method} Not Allowed`})
      break
  }
}
