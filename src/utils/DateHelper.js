export const getDayOfWeek = (timestamp) => {
    const daysOfWeek = ['Sunday        ', 'Monday   ', 'Tuesday  ', 'Wednesday', 'Thursday    ', 'Friday          ', 'Saturday     '];
    const date = new Date(timestamp * 1000);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };

  export const groupWeatherByDay = (weatherList) => {
    const groupedData = {};
    weatherList?.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
      if (!groupedData[date]) {
        groupedData[date] = item;
      }
    });
    return Object.values(groupedData);
  };

  export const convertUnixTimestampToTime = (unixTimestamp) =>{
    if (typeof unixTimestamp !== 'number' || isNaN(unixTimestamp)) {
      return 'Invalid timestamp';
    }
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert to 12-hour clock format
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }