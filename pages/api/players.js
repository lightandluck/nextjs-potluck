import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  const {
    body,
    method,
  } = req

  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      const players = await db
        .collection('players')
        .find({})
        .toArray();

      res.status(200).json(players)
      break;

    case 'POST':
      const response = await db.collection('players').insertOne(body);
      res.status(200).json(response);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}