const generateClearanceForMonth = () => {
  const monthInput = document.querySelector('[type="month"]');
  // @ts-ignore
  if (monthInput.value) {
    const href = `${window.location?.origin}/clearance.html`;
    let url = new URL(href);
    window.location.assign(href);
    // @ts-ignore
    url.searchParams.set('date', monthInput.value);
    console.log(url);
    window.location.replace(url);
  } else {
    alert('Month input can not be empty');
  }
};
