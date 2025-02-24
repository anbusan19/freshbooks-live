const express = require('express');
const router = express.Router();
const {
    createCoupon,
    getAllCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon
} = require('../controllers/couponController');

// Admin routes
router.post('/', createCoupon);
router.get('/', getAllCoupons);
router.get('/:id', getCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

// Public route for validating coupons
router.post('/validate', validateCoupon);

module.exports = router; 