const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Stars fetched'
    });
});

// Admin function
router.post('/', (req, res, next) => {
    const star = {
        starName: req.body.starName,
        starDistance: req.body.starDistance
    }
    res.status(201).json({
        message: 'Stars posted',
        createdStar: star
    });
});

router.get('/:starName', (req, res, next) => {
    res.status(200).json({
        message: 'Found star',
        starName: req.params.starName
    });
});

module.exports = router;