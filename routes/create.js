var express = require('express');
var router = express.Router();
// sqlite3モジュールのインポート
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');
// /write にgetメソッドでリクエストすると、write.ejsをレンダリング
router.get('/', (req, res, next) => res.render('create'));

// /write にpostメソッドでリクエストした時の処理
router.post('/', (req, res, next) => {
    // 投稿画面のフォームからタイトルと本文を取得
    const username = req.body.username;
    const password = req.body.password;
    db.run(
        'insert into account (username, password) values (?, ?)',
        username,
        password
    );
    res.redirect('/login');
});

module.exports = router;