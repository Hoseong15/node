const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended: true})) 


const MongoClient = require('mongodb').MongoClient

var db;
MongoClient.connect('mongodb+srv://dlsghtjd3982:Km7pQeNERFjRVtKi@cluster0.zbkhb5d.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
  //연결되면 할일 
  if (에러) return console.log(에러)

  db = client.db('todoapp');
  db.collection('post').insertOne({이름 : 'John', _id : 100 , 나이 : 20}, function(에러,결과){
    console.log('저장완료')
  });

  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})


app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/write', function(req,res) {
  res.sendFile(__dirname + '/write.html')
});

app.get('/pet', function(req, res) {
  res.send('펫 용품 쇼핑할 수 있는 페이지')
});

app.get('/beauty', (req,res) => {
  res.send('뷰티용품 채널')
});

app.post('/add', (req,res) => {
  res.send('전송완료')
  db.collection('post').insertOne({제목 : req.body.title, 날짜 : req.body.date},function() {
    console.log('저장완료')
  });
});