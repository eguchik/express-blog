var express = require('express');
var router = express.Router();
// sqlite3モジュールのインポート
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');
// /write にgetメソッドでリクエストすると、write.ejsをレンダリング
router.get('/', (req, res, next) => res.render('write'));

// /write にpostメソッドでリクエストした時の処理
router.post('/', (req, res, next) => {
    // 投稿画面のフォームからタイトルと本文を取得
    const title = req.body.title;
    const content = req.body.content;
    const youtubeUrl = req.body.youtube_url;
    const replacedYoutubeUrl = youtubeUrl.replace('watch?v=', 'embed/');
    const createdtime = new Date();

    db.run(
        'insert into post (title, content, youtube_url, createdtime) values (?, ?, ?, ?)',
        title,
        content,
        replacedYoutubeUrl,
        createdtime
    );
    res.redirect('/');
});

module.exports = router;