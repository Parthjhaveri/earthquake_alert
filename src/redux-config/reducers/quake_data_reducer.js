
const quake_data_reducer = (state=[], action) => {
	
	switch(action.type) {
		case 'SHOW-DATE':
			return [...state, action.payload]

		default:
			return state
	}

}

export default quake_data_reducer;