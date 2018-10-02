export const counter = (state=0, action) => {
	switch (action.type) {
		case 'INCREASE':
			return state + action.num
		default:
			return state
	}
}
