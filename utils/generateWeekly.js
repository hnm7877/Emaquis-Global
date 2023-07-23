const moment = require('moment');
require('moment-weekday-calc');

function getDateByWeekendMonthYear(weekend, month, year) {
  const startDate = moment()
    .year(year)
    .month(month - 1)
    .startOf('month')
    .isoWeekday(1); // met le premier jour de la semaine au lundi

  // Calculez le nombre de semaines entre le premier et le dernier jour du mois
  const numWeeks = getWeeksInMonth(month, year);

  const weeks = [];
  let currentWeekStart = startDate.clone();

  for (let i = 0; i < numWeeks; i++) {
    const currentWeekEnd = currentWeekStart.clone().weekday(7); // Set to Sunday, the end of the week
    weeks.push({ start: currentWeekStart, end: currentWeekEnd });
    currentWeekStart = currentWeekEnd.clone().add(1, 'day');
  }

  // Obtenir la semaine spécifique
  const week = weeks[Number(weekend) - 1];
  // Obtenir le premier jour de la semaine
  const start = new Date(week.start.toDate().setHours(0, 0, 0, 0));

  // Obtenir le dernier jour de la semaine
  const end = new Date(week.end.toDate().setHours(23, 59, 59, 999));

  return { start, end };
}

function getWeeksInMonth(month, year) {
  const firstDayOfMonth = moment(`${year}-${month + 1}-01`, 'YYYY-MM-DD');

  // Obtenez le dernier jour du mois
  const lastDayOfMonth = moment(firstDayOfMonth).endOf('month');

  // Calculez le nombre de semaines entre le premier et le dernier jour du mois
  const weeksInMonth = lastDayOfMonth.week() - firstDayOfMonth.week() + 1;

  return weeksInMonth;
}

module.exports = { getDateByWeekendMonthYear, getWeeksInMonth };
