const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/order.model");
const Book = require("../books/book.model");
const router = express.Router();

// Function to calculate admin stats
router.get("/", async (req, res) => {
  try {
    // 1. Total number of orders
    const totalOrders = await Order.countDocuments();

    // 2. Total sales (sum of all totalPrice from orders)
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // 4. Trending books statistics:
    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } }, // Match only trending books
      { $count: "trendingBooksCount" }, // Return the count of trending books
    ]);

    // If you want just the count as a number, you can extract it like this:
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    // 5. Total number of books
    const totalBooks = await Book.countDocuments();

    // 6. Weekly sales (group by week and sum total sales for each week)
    const weeklySales = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" }
          },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
          startDate: { $min: "$createdAt" }
        }
      },
      { $sort: { "startDate": -1 } },
      { $limit: 12 } // Last 12 weeks
    ]);

    // 7. Monthly sales (group by month and sum total sales for each month)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
          startDate: { $min: "$createdAt" }
        },
      },
      { $sort: { "_id": -1 } },
      { $limit: 12 } // Last 12 months
    ]);

    // Format weekly sales data with proper date formatting
    const formattedWeeklySales = weeklySales.map(week => {
      const startDate = new Date(week.startDate);
      const weekNumber = week._id.week;
      const year = week._id.year;
      return {
        _id: `Week ${weekNumber}, ${year}`,
        totalSales: week.totalSales || 0,
        totalOrders: week.totalOrders || 0,
        startDate: startDate
      };
    }).sort((a, b) => a.startDate - b.startDate);

    // Format monthly sales data
    const formattedMonthlySales = monthlySales.map(month => ({
      _id: month._id,
      totalSales: month.totalSales || 0,
      totalOrders: month.totalOrders || 0,
      startDate: month.startDate
    })).sort((a, b) => new Date(a._id) - new Date(b._id));

    // Result summary
    return res.status(200).json({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks,
      totalBooks,
      weeklySales: formattedWeeklySales,
      monthlySales: formattedMonthlySales,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
