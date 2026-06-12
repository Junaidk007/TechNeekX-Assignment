function runRecommendationLogic(events) {
  if (!events || events.length === 0) {
    return {
      bestCategory: "N/A",
      bestTime: "N/A",
      bestDay: "N/A",
      bestTimeOfDay: "N/A",
      expectedRegistrations: 0,
      totalEvents: 0
    };
  }

  // 1. Best Event Category: Tally up total registrations per category and find the highest
  const categoryTotals = {};
  events.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.registrations;
  });

  let bestCategory = '';
  let maxCategoryReg = -1;
  Object.keys(categoryTotals).forEach(cat => {
    if (categoryTotals[cat] > maxCategoryReg) {
      maxCategoryReg = categoryTotals[cat];
      bestCategory = cat;
    }
  });

  // 2. Best Time (Month): Extract month from date and find which month has the highest average attendance
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthStats = {}; // key: monthIndex (0-11) -> { sum: 0, count: 0 }
  
  events.forEach(e => {
    const date = new Date(e.date);
    const monthIndex = date.getMonth();
    if (!monthStats[monthIndex]) {
      monthStats[monthIndex] = { sum: 0, count: 0 };
    }
    monthStats[monthIndex].sum += e.registrations;
    monthStats[monthIndex].count += 1;
  });

  let bestMonthIndex = -1;
  let maxMonthAverage = -1;
  Object.keys(monthStats).forEach(mIdx => {
    const stats = monthStats[mIdx];
    const avg = stats.sum / stats.count;
    if (avg > maxMonthAverage) {
      maxMonthAverage = avg;
      bestMonthIndex = parseInt(mIdx);
    }
  });
  const bestTime = bestMonthIndex !== -1 ? monthNames[bestMonthIndex] : 'Unknown';

  // 3. Best Day of the Week: Extract day from date and find day with the highest average attendance
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  const dayStats = {}; // key: dayIndex (0-6) -> { sum: 0, count: 0 }
  
  events.forEach(e => {
    const date = new Date(e.date);
    const dayIndex = date.getDay();
    if (!dayStats[dayIndex]) {
      dayStats[dayIndex] = { sum: 0, count: 0 };
    }
    dayStats[dayIndex].sum += e.registrations;
    dayStats[dayIndex].count += 1;
  });

  let bestDayIndex = -1;
  let maxDayAverage = -1;
  Object.keys(dayStats).forEach(dIdx => {
    const stats = dayStats[dIdx];
    const avg = stats.sum / stats.count;
    if (avg > maxDayAverage) {
      maxDayAverage = avg;
      bestDayIndex = parseInt(dIdx);
    }
  });
  const bestDay = bestDayIndex !== -1 ? dayNames[bestDayIndex] : 'Unknown';

  // 4. Best Time of Day: Find time of day ('morning', 'afternoon', 'evening') with the highest average attendance
  const timeStats = {}; // key: string -> { sum: 0, count: 0 }
  
  events.forEach(e => {
    const timeVal = e.time || 'morning';
    if (!timeStats[timeVal]) {
      timeStats[timeVal] = { sum: 0, count: 0 };
    }
    timeStats[timeVal].sum += e.registrations;
    timeStats[timeVal].count += 1;
  });

  let bestTimeOfDay = 'Unknown';
  let maxTimeAverage = -1;
  Object.keys(timeStats).forEach(t => {
    const stats = timeStats[t];
    const avg = stats.sum / stats.count;
    if (avg > maxTimeAverage) {
      maxTimeAverage = avg;
      bestTimeOfDay = t;
    }
  });

  // 5. Expected Registrations: Filter for winning "Best Event Category", sort by highest registrations, grab top 3, and calculate average
  const categoryEvents = events.filter(e => e.category === bestCategory);
  categoryEvents.sort((a, b) => b.registrations - a.registrations);
  const top3 = categoryEvents.slice(0, 3);
  const top3Sum = top3.reduce((sum, e) => sum + e.registrations, 0);
  const expectedRegistrations = top3.length > 0 ? Math.round(top3Sum / top3.length) : 0;

  return {
    bestCategory,
    bestTime,
    bestDay,
    bestTimeOfDay,
    expectedRegistrations,
    totalEvents: events.length
  };
}


module.exports = { runRecommendationLogic };