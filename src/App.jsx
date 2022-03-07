import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import Weather from './components/weather/Weather';

function App() {
	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<main>
				<Weather />
			</main>
		</div>
	);
}

export default App;
