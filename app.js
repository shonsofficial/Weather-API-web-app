let valueSearch = document.getElementById('valueSearch'); // Identifying elements that need to be manipulated in html and call them back thru JS
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description'); // We can call html elements using class
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');

// Event handling step
form.addEventListener('submit' ,(event) => {
    event.preventDefault(); // Tested with --> alert(`Hello`);
    if (valueSearch.value != ''){ // To check if user has entered the required data
        searchWeather(); // calling api function
    }
});

let id = '68d3824f12ab03f90cfc7d897c631f95'; // app id value to use the api // 9505fd1df737e20152fbd78cdb289b6a
let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid="+id; // 
const searchWeather = () => {
    fetch(url + '+&q=' + valueSearch.value).then(responsive => responsive.json()).then(data => {console.log(data);
        if (data.cod == 200) {
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = "https://flagsapi.com/"+data.sys.country+"/shiny/32.png";

            temperature.querySelector('img').src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@4x.png";
            temperature.querySelector('figcaption span').innerText = data.main.temp;
            description.innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;

        } else {
            main.classList.add('error'); // adding an error class to main to create an error effect // subsequent imports no longer work because the error class has been assigned to the main before & it only runs once
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000); // this is because if the next search encounters an error, it will proceed to add a new error class and the animation will play again
        }
        valueSearch.value = '';
    })
    // Qn: (The processing) What will the website screen display when the user has accessed it without searching for anything(Default fisrt page)?
    // Ans: Option one is Display a blank screen that only displays the form for users to search
};

// Option 2
const initApp = () => {
    valueSearch.value = 'India'; // You can put the place where you live as default, the user will see this forecast first
    searchWeather();
}
initApp();


// error code 400 means that it cannot look up the results because we haven't sent the data the user just entered to the api.
// Once we send the data the user entered, we will recieve alot of information related to the weather at the location we just searched, we now have to put this data on the website
// Http code is 200 if the website found the place data we just searched else it cannot be found









