export default async function handler(req, res){
	let payload = {
		status: 'success',
		air: [
			{
				type: 'on-way',
				boarding_time: '',
				airport: '',
				cost: ''
			},
			{
				type: 'round-trip',
				boarding_time: '',
				airport: '',
				cost: ''
			}
		]
	}

	res.status(200).json(payload)
}