const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs');



//modoDb에 접속해서 데이터 넣기 // 
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


// 페이지 들어가게 하는법 //
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


// 폼에 적은 데이터를 서버에 넣은 방법 // 
app.post('/add', (req,res) => {
  res.send('전송완료')
  db.collection('post').insertOne({제목 : req.body.title, 날짜 : req.body.date},function() {
    console.log('저장완료')
  });
});



app.get('/list', function(req,res) {
// 디비에 저장된 post라는 collection만의 모든 데이터를 꺼내주세요
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    res.render('list.ejs', {posts : 결과});
  });
});