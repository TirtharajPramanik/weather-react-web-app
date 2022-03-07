import React from 'react';
import './weather.scss';
import { BsCloudSun } from 'react-icons/bs';

const fetchReport = async () => {
	try {
		const res = await fetch(
			'http://api.openweathermap.org/data/2.5/weather?q=kolkata&units=metric&appid=8c8b989f3dd26e538104b1f9ae47ca85'
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

const Weather = () => {
	const [report, setReport] = React.useState({});

	React.useEffect(() => {
		async function setData() {
			const data = await fetchReport();
			console.log(data);
			setReport(data);
		}
		setData();
	}, []);

	return (
		<div className='container'>
			<div className='info'>
				<div className='square'>
					{report.icon && (
						<img src={report.icon} alt='weather' className='w-icon' />
					)}
					{report.icon != null || <BsCloudSun className='w-icon' />}
					<h2>{report.desc || 'Sunny'}</h2>
					<h1>{report.temp || '19'}&deg;C</h1>
				</div>
				<div className='rectangle'>
					<h3>
						Wind: {report.wind_speed || 0}m/s <sup>&rarr;</sup>
						{report.wind_dir || 'N'}&deg;
					</h3>
					<h3>Humidity: {report.humidity || 66}%</h3>
				</div>
			</div>
			<div className='local'>
				<div className='time-date'>
					<h1>{report.local_time || '3:30'}</h1>
					<h3>
						{report.local_day || 'Mon, '}
						{report.local_date || '12-6-2022'}
					</h3>
				</div>
				<div className='location'>
					<h4>{`${report.timezone}, UTC ${report.utc_offset}`}</h4>
					<h4>{`${report.region}, ${report.country}`}</h4>
				</div>
			</div>
		</div>
	);
};

export default Weather;
