const express =require("express");
const router = express.Router();
const db = require('../config.js');
const bcrypt = require('bcrypt');

router.post('/login' ,function(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
        "SELECT id, password FROM `m_user` WHERE `username` = ? LIMIT 1",
        [username],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            
            if (result.length !== 0) {
            	const user_pass = result[0]['password'];
            	const user_id = result[0]['id'];

            	bcrypt.compare(password, user_pass, (err, same) => {
					if (same) {
						res.send({'result':'ok', 'user_id': user_id});
					} else {
						res.send({'result':'error'});
					}
			    });
            } else {
            	res.send({'result':'error'});
            }
        }
    );
});

router.post('/admin' ,function(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
        "SELECT id, password FROM `m_admin` WHERE `username` = ? LIMIT 1",
        [username],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            
            if (result.length !== 0) {
            	const user_pass = result[0]['password'];
            	const user_id = result[0]['id'];

            	bcrypt.compare(password, user_pass, (err, same) => {
					if (same) {
						res.send({'result':'ok', 'user_id': user_id});
					} else {
						res.send({'result':'error'});
					}
			    });
            } else {
            	res.send({'result':'error'});
            }
        }
    );
});

module.exports = router;