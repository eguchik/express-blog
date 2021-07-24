var express = require('express');
var router = express.Router();
// sqlite3モジュールのインポート
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    db.get('select * from post where id=?', id,
    (err, row) => {
        console.log(row);
        console.log(req.user);
        res.render('detail', {post: row, user: req.user});
    });
})

module.exports = router;