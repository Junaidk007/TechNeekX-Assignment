const Event = require('../model/Event');
const { runRecommendationLogic } = require('../service/runRecommendationLogic');

const getRecommendations = async (req, res) => {
  let events = await Event.find({});

  const calculations = runRecommendationLogic(events);

  // Prepare aggregations for React dashboard charts
  const categoryTotals = {};
  const monthStats = {};
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Seed empty month structures for sorting later
  monthNames.forEach((name, idx) => {
    monthStats[idx] = { month: name, totalRegistrations: 0, eventCount: 0, averageRegistrations: 0 };
  });

  events.forEach(e => {
    // Category total
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.registrations;
    
    // Monthly averages
    const date = new Date(e.date);
    const mIdx = date.getMonth();
    monthStats[mIdx].totalRegistrations += e.registrations;
    monthStats[mIdx].eventCount += 1;
  });

  const categoriesChartData = Object.keys(categoryTotals).map(cat => ({
    category: cat,
    registrations: categoryTotals[cat]
  }));

  const monthsChartData = Object.keys(monthStats).map(mIdx => {
    const stats = monthStats[mIdx];
    return {
      month: stats.month,
      averageRegistrations: stats.eventCount > 0 ? Math.round(stats.totalRegistrations / stats.eventCount) : 0,
      eventCount: stats.eventCount
    };
  });

  res.status(200).json({
    success: true,
    recommendations: {
      bestCategory: calculations.bestCategory,
      bestTime: calculations.bestTime,
      bestDay: calculations.bestDay,
      bestTimeOfDay: calculations.bestTimeOfDay,
      expectedRegistrations: calculations.expectedRegistrations
    },
    chartData: {
      categories: categoriesChartData,
      months: monthsChartData
    },
    events: events.map(e => ({
      id: e._id || Math.random().toString(36).substr(2, 9),
      eventName: e.eventName,
      category: e.category,
      date: e.date,
      time: e.time,
      registrations: e.registrations
    }))
  });
};



module.exports = getRecommendations;
