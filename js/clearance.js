document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const createMonthCalendar = (year, month) => {
    const monthInsert = document.querySelector('.month-insert');
    // @ts-ignore
    monthInsert.textContent = months[month];
    const signingDiv = document.createElement('div');
    signingDiv.setAttribute('class', 'signingDiv');
    const signingTable = document.createElement('table');
    const firstDay = new Date(year, month).getDay();
    const daysInMonths = getDaysInMonth(year, month);
    //  console.log(daysInMonths, firstDay);
    // row Data
    const thData = [
      'Day',
      'Sign in time',
      'Signature',
      'Sign out time',
      'Signature',
      'Remark',
    ];
    // th
    const signingTableTd = document.createElement('tr');
    for (let idx = 0; idx < thData.length; idx++) {
      const signingTableTh = document.createElement('th');
      signingTableTh.textContent = `${thData[idx]}`;
      signingTableTd.appendChild(signingTableTh);
    }
    signingTable.appendChild(signingTableTd);
    // end of header
    // date rows
    for (let index = 1; index <= daysInMonths; index++) {
      const signingTableTdr = document.createElement('tr');
      signingTableTdr.setAttribute('class', 'border-bottom');
      const day = days[new Date(year, month, index).getDay()];
      for (let idx = 0; idx < thData.length; idx++) {
        if ([days[0], days[6]].includes(day)) {
          // remove saturday and sunday
          continue;
        } else {
          const signingTableTd = document.createElement('td');
          signingTableTd.textContent =
            idx === 0
              ? `${('0' + index).toString().slice(-2)} ${day.substring(0, 3)}`
              : idx === 5 && day === days[1]
              ? 'NYSC CDS Day'
              : '';

          signingTableTdr.appendChild(signingTableTd);
        }
      }
      signingTable.appendChild(signingTableTdr);
    }
    signingDiv.appendChild(signingTable);
    app?.appendChild(signingDiv);
  };

  // query params on route
  const params = new URLSearchParams(window.location.search);

  if (params.has('date')) {
    const paramsdate = params.get('date');
    // @ts-ignore
    let date = new Date(paramsdate);
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    createMonthCalendar(currentYear, currentMonth);
  } else {
    alert('looks like you route wrongly');
    window.location.replace('index.html');
  }
});
