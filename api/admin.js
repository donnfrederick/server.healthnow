const express =require("express");
const router = express.Router();
const db = require('../config.js');

router.get('/check/login', (req,res) => {
	if (req.session.type && req.session.type === 1) {
		res.send({'result':'logged'});
	} else {
		res.send({'result':'error'});
	}
});

router.post('/details', (req, res) => {
	const user_id = req.body.user_id;

	db.query(
        "SELECT name, username, password, create_date FROM `m_admin` WHERE `id` = ? LIMIT 1",
        [user_id],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result) {
            	const user_details = {
            		'user_id':user_id,
            		'name':result[0]['name'],
            		'username':result[0]['username'],
            		'password':result[0]['password'],
            		'create_date':result[0]['create_date'],
            	};

            	res.send({'result':'ok', 'user_details':user_details});
            }
        }
    );
});

module.exports = router;