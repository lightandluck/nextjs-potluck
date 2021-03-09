export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db.collection('offerings').find({}).limit(20).toArray();

  res.json(movies);
};
