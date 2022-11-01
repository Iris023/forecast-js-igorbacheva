const tl = gsap.timeline()

tl.to("input", {opacity:1, duration: 0.5})
tl.to("#header", {opacity:1, duration: 0.4})
tl.to("#city", {opacity:1, duration: 0.4})
tl.to("#date", {opacity:1, duration: 0.4})
tl.to("#temperature", {opacity:1, duration: 0.4})
tl.to("#feelsLike", {opacity:1, duration: 0.4})
tl.to("#conditions", {opacity:1, duration: 0.4})
tl.to("#variation", {opacity:1, duration: 0.4})

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "5bf4f7072cd564fe5eac13255cf03537"
}

const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

function enter(e){
    if (e.keyCode === 13) {
        getInfo(input.value);
        tl.from("input", {opacity:0, duration: 0.3})
        tl.from("#header", {opacity:0, duration: 0.3})
        tl.from("#city", {opacity:0, duration: 0.3})
        tl.from("#date", {opacity:0, duration: 0.3})
        tl.from("#temperature", {opacity:0, duration: 0.3})
        tl.from("#feelsLike", {opacity:0, duration: 0.3})
        tl.from("#conditions", {opacity:0, duration: 0.3})
        tl.from("#variation", {opacity:0, duration: 0.3})
    }
}

async function getInfo(city) {
    const res = await fetch(`${api.endpoint}weather?q=${city}&units=metric&appid=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    getDate();

    let temp = document.querySelector('#temperature');
    temp.innerHTML = `${Math.round(result.main.temp)}<span>º</span>`;

    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>º</span>`;

    let conditions = document.querySelector('#conditions');
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector('#variation');
    variation.innerHTML = `Max: ${Math.round(result.main.temp_max)}<span>º</span>, Min: ${Math.round(result.main.temp_min)}<span>º</span>`;
}

function getDate() {
    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const allTheMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = daysOfWeek[now.getDay()];
    let date = now.getDate();
    let month = allTheMonths[now.getMonth()];
    let year = now.getFullYear();

    let dispayDate = document.querySelector('#date');
    dispayDate.innerHTML = `${day} ${date} ${month} ${year}`
}


function alertVPN(){
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: `If you're located in Russian Federation use VPN connection to get correct weather forecast`,
        showConfirmButton: true,
    })
}

setTimeout(alertVPN, 1000)