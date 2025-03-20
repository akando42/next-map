// const { schedule } = require('@netlify/functions')
// const http = require('http');
// const twilio = require("twilio");

// module.exports.handler = schedule('0 0 * * *', async (event) => {
// 	const accountSid = process.env.TWILIO_ACCOUNT_SID;
// 	const authToken = process.env.TWILIO_AUTH_TOKEN;
// 	const client = twilio(accountSid, authToken);

// 	let currentTime = new Date()

// 	async function sendMessage(ms_content) {
// 		const message = await client.messages.create({
// 	    	body: ms_content,
// 	    	from: "+16822351816",
// 	    	to: "+84989784621",
// 	 	});
// 			console.log(message.body);
// 	}
	
// 	const url = `http://api.weatherapi.com/v1/forecast.json?key=26bcc7dae3224523bde121531242908&q=Hanoi&days=2&aqi=no&alerts=no`;
// 	const request = http.request(url, (response) => {
// 		let data = '';
// 		response.on('data', (chunk) => {
// 		    data = data + chunk.toString();
// 		});

// 		response.on('end', async() => {
// 		    let weatherData = JSON.parse(data);
// 		    let tomorrow = weatherData.forecast.forecastday[1].hour
// 			let tomorrowRain = tomorrow.filter(forecast => forecast.chance_of_rain > 90)

// 			// let tomorrowRain = [
// 			//     {
// 			//         "time_epoch": 1736960400,
// 			//         "time": "2025-01-16 00:00",
// 			//         "temp_c": 16.5,
// 			//         "temp_f": 61.7,
// 			//         "is_day": 0,
// 			//         "condition": {
// 			//             "text": "Clear ",
// 			//             "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
// 			//             "code": 1000
// 			//         },
// 			//         "wind_mph": 1.3,
// 			//         "wind_kph": 2.2,
// 			//         "wind_degree": 171,
// 			//         "wind_dir": "S",
// 			//         "pressure_mb": 1025,
// 			//         "pressure_in": 30.28,
// 			//         "precip_mm": 1.2,
// 			//         "precip_in": 1.23,
// 			//         "snow_cm": 0,
// 			//         "humidity": 45,
// 			//         "cloud": 12,
// 			//         "feelslike_c": 16.5,
// 			//         "feelslike_f": 61.7,
// 			//         "windchill_c": 16.5,
// 			//         "windchill_f": 61.7,
// 			//         "heatindex_c": 16.5,
// 			//         "heatindex_f": 61.7,
// 			//         "dewpoint_c": 4.7,
// 			//         "dewpoint_f": 40.4,
// 			//         "will_it_rain": 0,
// 			//         "chance_of_rain": 0.92,
// 			//         "will_it_snow": 0,
// 			//         "chance_of_snow": 0,
// 			//         "vis_km": 10,
// 			//         "vis_miles": 6,
// 			//         "gust_mph": 2.6,
// 			//         "gust_kph": 4.1,
// 			//         "uv": 0
// 			//     },
// 			//     {
// 			//         "time_epoch": 1736964000,
// 			//         "time": "2025-01-16 01:00",
// 			//         "temp_c": 16.5,
// 			//         "temp_f": 61.7,
// 			//         "is_day": 0,
// 			//         "condition": {
// 			//             "text": "Clear ",
// 			//             "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
// 			//             "code": 1000
// 			//         },
// 			//         "wind_mph": 0.9,
// 			//         "wind_kph": 1.4,
// 			//         "wind_degree": 304,
// 			//         "wind_dir": "NW",
// 			//         "pressure_mb": 1025,
// 			//         "pressure_in": 30.26,
// 			//         "precip_mm": 0,
// 			//         "precip_in": 0,
// 			//         "snow_cm": 0,
// 			//         "humidity": 46,
// 			//         "cloud": 12,
// 			//         "feelslike_c": 16.5,
// 			//         "feelslike_f": 61.7,
// 			//         "windchill_c": 16.5,
// 			//         "windchill_f": 61.7,
// 			//         "heatindex_c": 16.5,
// 			//         "heatindex_f": 61.7,
// 			//         "dewpoint_c": 4.8,
// 			//         "dewpoint_f": 40.7,
// 			//         "will_it_rain": 0,
// 			//         "chance_of_rain": 0.92,
// 			//         "will_it_snow": 0,
// 			//         "chance_of_snow": 0,
// 			//         "vis_km": 10,
// 			//         "vis_miles": 6,
// 			//         "gust_mph": 1.7,
// 			//         "gust_kph": 2.7,
// 			//         "uv": 0
// 			//     },
// 			//     {
// 			//         "time_epoch": 1736967600,
// 			//         "time": "2025-01-16 02:00",
// 			//         "temp_c": 16.3,
// 			//         "temp_f": 61.4,
// 			//         "is_day": 0,
// 			//         "condition": {
// 			//             "text": "Clear ",
// 			//             "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
// 			//             "code": 1000
// 			//         },
// 			//         "wind_mph": 3.4,
// 			//         "wind_kph": 5.4,
// 			//         "wind_degree": 347,
// 			//         "wind_dir": "NNW",
// 			//         "pressure_mb": 1024,
// 			//         "pressure_in": 30.25,
// 			//         "precip_mm": 0,
// 			//         "precip_in": 0,
// 			//         "snow_cm": 0,
// 			//         "humidity": 46,
// 			//         "cloud": 13,
// 			//         "feelslike_c": 16.3,
// 			//         "feelslike_f": 61.4,
// 			//         "windchill_c": 16.3,
// 			//         "windchill_f": 61.4,
// 			//         "heatindex_c": 16.3,
// 			//         "heatindex_f": 61.4,
// 			//         "dewpoint_c": 4.7,
// 			//         "dewpoint_f": 40.5,
// 			//         "will_it_rain": 0,
// 			//         "chance_of_rain": 0.92,
// 			//         "will_it_snow": 0,
// 			//         "chance_of_snow": 0,
// 			//         "vis_km": 10,
// 			//         "vis_miles": 6,
// 			//         "gust_mph": 6.1,
// 			//         "gust_kph": 9.8,
// 			//         "uv": 0
// 			//     }
// 			// ]
// 			let sms_content = `${currentTime} Weather Alert! There will be rain tomorrow at ` 
// 			console.log(sms_content)

// 			if (tomorrowRain.length > 0){
// 				tomorrowRain.map(rainTime => {
// 					let rainHour = rainTime.time.split(" ")[1]
// 					sms_content = sms_content.concat(`${rainHour} `)

// 				})
// 				console.log("Sending SMS")
// 				console.log(sms_content)	
// 				await sendMessage(sms_content)
// 			} else {
// 				let no_rain = `${currentTime} Weather Alert! No rain tomorrow !!!`
// 				console.log("Sending SMS")
// 				console.log(sms_content)	
// 				await sendMessage(no_rain)
// 			}
// 		});
// 	})

// 	request.on('error', (error) => {
//     	console.log('An error', error);
// 	});

// 	request.end() 

// 	return {
// 		statusCode: 200,
// 	}
// })
