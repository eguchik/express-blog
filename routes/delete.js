var express = require('express');
var router = express.Router();
// sqlite3モジュールのインポート
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');

router.post('/:id', (req, res, next) => {
    const id = req.params.id;
    db.run(
        'delete from post where id=?', id
    );
    // ホーム画面(index.ejs)にリダイレクト
    res.redirect('/');
})


module.exports = router;