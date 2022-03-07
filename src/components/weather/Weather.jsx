import React from 'react';
import './weather.scss';
import { BsCloudSun } from 'react-icons/bs';

const Weather = (props) => {
	const [report, setReport] = React.useState({});
	const [coords, setCoords] = React.useState({});

	React.useEffect(() => {
		async function setData() {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const lat = Math.round(pos.coords.latitude);
					const lon = Math.round(pos.coords.longitude);
					setCoords({ lat, lon });
				},
				(err) => {
					console.log(err);
					setCoords({});
				}
			);
			const data = await props.fetchReport(coords.lat, coords.lon);
			setReport(data);
		}
		setData();
	}, [props, coords]);

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
