var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static/images"));
app.use(express.static(__dirname + "/static/style"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: "Hey, this is a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000}
}));

// ----- Routes & Locations Below -------
app.get('/', function(request, response){
    response.render('index');
});

app.post('/result', function(request, response){
    context = {
        name : request.body.name,
        language : request.body.language,
        location : request.body.location,
        comment : request.body.comment,
    }
    response.render('show', context);
});

app.get('/show', function(request, response){
    response.render('show');
})

app.get('/back', function(request, response){
    request.session.destroy();
    response.redirect('/');
})


// ------Port Listener -----------
app.listen(8000, function(req, res){
    console.log("Now serving on localhost:8000");
});
