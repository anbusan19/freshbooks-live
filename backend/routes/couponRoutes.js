const express = require('express');
const router = express.Router();
const {
    createCoupon,
    getAllCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon,
    useCoupon
} = require('../controllers/couponController');

// Admin routes
router.post('/', createCoupon);
router.get('/', getAllCoupons);
router.get('/:id', getCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

// Public routes
router.post('/validate', validateCoupon);
router.post('/use', useCoupon);

module.exports = router;