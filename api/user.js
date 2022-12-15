const express =require("express");
const router = express.Router();
const db = require('../config.js');

router.get('/get/login', (req, res) => {
	res.send({'session': req.session});
});

router.get('/check/login', (req, res) => {
	if (req.session.type && req.session.type === 0) {
		res.send({'result':'logged'});
	} else {
		res.send({'result':'error'});
	}
});

router.post('/details', (req, res) => {
	const user_id = req.body.user_id;

	db.query(
        "SELECT first_name, last_name, address, post_code, phone_number, email, username, password, create_date FROM `m_user` WHERE `id` = ? LIMIT 1",
        [user_id],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result) {
            	const user_details = {
            		'user_id':user_id,
            		'first_name':result[0]['first_name'],
            		'last_name':result[0]['last_name'],
            		'address':result[0]['address'],
            		'post_code':result[0]['post_code'],
            		'phone_number':result[0]['phone_number'],
            		'email':result[0]['email'],
            		'username':result[0]['username'],
            		'password':result[0]['password'],
            		'create_date':result[0]['create_date']
            	};

            	res.send({'result':'ok', 'user_details':user_details});
            }
        }
    );
});

module.exports = router;