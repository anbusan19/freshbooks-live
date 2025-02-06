const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const {
    getAllBanners,
    getAllBannersAdmin,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBannerStatus
} = require('./banner.controller');

// Public routes - no authentication needed
router.get('/active', getAllBanners);

// Admin routes - require authentication and admin role
router.get('/admin', isAuthenticated, isAdmin, getAllBannersAdmin);
router.post('/', isAuthenticated, isAdmin, createBanner);
router.put('/:id', isAuthenticated, isAdmin, updateBanner);
router.delete('/:id', isAuthenticated, isAdmin, deleteBanner);
router.patch('/:id/toggle', isAuthenticated, isAdmin, toggleBannerStatus);

module.exports = router; 