window.addEventListener("load", () => {
  let long;
  let lat;
  let timeZone = document.querySelector(".location-timezone");
  let tempDegree = document.querySelector(".temperature-degree");
  let weatherDesc = document.querySelector(".temperature-description");
  let icon = document.querySelector(".icon");
  let tempSection = document.querySelector(".degree-section");
  let tempSpan = document.querySelector(".temperature-span");

  const APIKey = "1d58942cc911ba63153c57fa6351f0a9";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${APIKey}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, weather } = data.current;
          const iconCode = weather[0].icon;
          console.log(temp);
          timeZone.textContent = data.timezone.replaceAll("_", "");
          tempDegree.textContent = Math.floor(temp);
          weatherDesc.textContent = weather[0].description;
          icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
          let celsius = (Math.floor(temp) - 32) * (5 / 9);
          //change from Farenheit to Celsius, does not yet actually change the temp value, just the symbol.
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              tempDegree.textContent = celsius;
            } else if (tempSpan.textContent === "C") {
              tempSpan.textContent = "F";
              tempDegree.textContent = Math.floor(temp);
            }
          });
        });
    });
  }
});
