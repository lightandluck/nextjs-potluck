import fs from 'fs';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await fs.readFile('./public/scripts/testwants.txt', (err, data) => {
          console.log(data);
          res.status(200).send(data);
        });
      } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
      }
      break;
    case 'POST':
      // writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
      try {
        const wantlist = req.body.wantlist;

        if (wantlist && wantlist.length > 0) {
          fs.writeFile('./public/scripts/test.txt', wantlist, 'utf8', (err) => {
            if (err) throw err;
            res.send('File saved!');
          });
        } else {
          throw new Error('Request body did not contain name field.');
        }
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
