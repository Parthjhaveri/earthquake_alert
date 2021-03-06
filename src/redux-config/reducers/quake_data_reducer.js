
const quake_data_reducer = (state=[], action) => {
	
	switch(action.type) {
		
		case 'SHOW-DATE':
			return [...state, action.payload]

		case 'FETCH-RESPONSE':
			return [action.payload]

		case 'PARSED-QUAKES':
			return [action.payload]

		case 'MAP-DATA':
			return [action.payload]

		case 'MAP-COORDS':
			return [action.payload]

		case 'GRAPH-POINTS':
			return [action.payload]

		case 'GET-DATASET':
			return [action.payload]

		case 'GET-MAG':
			return [action.payload]

		case 'STORE-QUAKES':
			let quake_arr = [];
			quake_arr.push(...state, action.payload);
			return quake_arr;

		default:
			return state
	}

}

export default quake_data_reducer;