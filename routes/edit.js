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
        res.render('edit', {post: row});
    });
})

router.post('/:id', (req, res, next) => {
    // 投稿画面のフォームからタイトルと本文を取得
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const replacedContent = content.replace('watch?v', 'embed');
    const editedtime = new Date();
    db.run('update post set title=?, content=? where id=?',
    title, replacedContent, id,
    (err, row) => {
        console.log(row);
        console.log(err);
        res.redirect('/');
    });
})



module.exports = router;