import fs from 'fs';

// TODO: This is obviously very dangerous reading and writing to server
// without much error handling. But is a quick hack to edit the wantlist
// to run TradeMax results.
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await fs.readFile(
          '/var/task/.next/server/public/scripts/wantlist.txt',
          (err, data) => {
            res.status(200).send(data);
          }
        );
      } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
      }
      break;
    case 'POST':
      try {
        const wantlist = req.body;
        res.send(__dirname);
        // if (wantlist && wantlist.length > 0) {
        //   fs.writeFile('./scripts/wantlist.txt', wantlist, 'utf8', (err) => {
        //     if (err) throw err;
        //     res.send('File saved!');
        //   });
        // } else {
        //   throw new Error('Request body did not contain data.');
        // }
      } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
