import Cors from 'cors';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database.js';

const cors = Cors({
  methods: ['GET','PUT','HEAD', 'POST'],
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

handler.put(async (req, res) => {
  await runMiddleware(req, res, cors)
    let id = req.query.id; 
    let data = req.body;
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080/")
    let doc = await req.db.collection('claims').updateOne({Emp_id : id}, {$set:data});
    console.log(doc);
    res.json(doc);
});

export default handler;