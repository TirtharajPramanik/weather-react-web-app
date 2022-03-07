import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import Weather from './components/weather/Weather';

const apiKey = '8c8b989f3dd26e538104b1f9ae47ca85';

const fetchReport = async (lat, lon) => {
	try {
		let vals;
		if (lat && lon) {
			vals = `lat=${lat}&lon=${lon}`;
		} else {
			vals = `q=kolkata`;
		}
		const res = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&${vals}`
		);
		const repo = await res.json();
		const info = {
			temp: repo.main.temp,
			wind_dir: repo.wind.deg,
			wind_speed: repo.wind.speed,
			humidity: repo.main.humidity,
			desc: repo.weather.description,
			icon: repo.weather.icon,
			local_time: repo.dt,
			timezone: repo.timezone,
			lat: repo.coord.lat,
			lon: repo.coord.lon,
			region: repo.name,
			country: repo.sys.country,
		};
		const date = new Date(info.local_time);
		let zero = '';
		if (toString(date.getMinutes()).length < 2) {
			zero = 0;
		} else {
			zero = '';
		}
		info.local_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
		info.local_time = `${date.getHours()}:${zero}${date.getMinutes()}`;
		info.local_day = `${getDay(date.getDay())}, `;
		info.is_day = `${info.icon}`.endsWith('d');
		info.utc_offset = date.getTimezoneOffset();
		return info;
	} catch (err) {
		console.log(err);
		return {};
	}
};

const getDay = (num) => {
	switch (num) {
		case 0:
			return 'Sun';
		case 1:
			return 'Mon';
		case 2:
			return 'Tue';
		case 3:
			return 'Wed';
		case 4:
			return 'Thirs';
		case 5:
			return 'Fri';
		case 6:
			return 'Sat';

		default:
			return 'Mon';
	}
};

function App() {
	return (
		<div className='App'>
			{}
			<header>
				<Header />
			</header>
			<main>
				<Weather fetchReport={fetchReport} />
			</main>
		</div>
	);
}

export default App;
