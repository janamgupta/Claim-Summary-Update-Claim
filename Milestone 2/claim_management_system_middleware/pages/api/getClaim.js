import Cors from 'cors';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database.js';

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

const handler = nextConnect();
handler.use(middleware);
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

handler.get(async (req, res) => {
  await runMiddleware(req, res, cors)
    let id = req.query.id; 
    let doc = await req.db.collection('claims').findOne({Emp_id : id});
    console.log(doc);
    res.json(doc);
});

export default handler;