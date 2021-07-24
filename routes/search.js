var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');


var db = new sqlite3.Database('mydb.sqlite3');

/* GET home page. */
router.post('/', (req, res, next) => {
    const search = req.body.search;
    db.serialize(() => {
      // DBから投稿されたブログをすべて取得
      db.all('select * from post where title=?',
      search,
       (err, rows) => {
        if (!err && rows) {
          // 改行コードを<br>に変換
          const newRows = rows.map(row => {
            if (row.content) {
              row.content = row.content.replace(/\r?\n/g, '<br>');
            }
            return row;
          });
          // postsパラメータを渡した状態で、index.ejsをレンダリング
          res.render('index', { posts: newRows, user: req.user});
          console.log(req.session);
          console.log(req.user);
          console.log(err);
          console.log(rows);
        }
      });
    });
  });

module.exports = router;