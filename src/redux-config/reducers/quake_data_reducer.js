
const quake_data_reducer = (state=[], action) => {
	
	switch(action.type) {
		
		case 'SHOW-DATE':
			return [...state, action.payload]

		case 'FETCH-RESPONSE':
			return [action.payload]

		default:
			return state
	}

}

export default quake_data_reducer;