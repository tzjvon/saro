export const visibleLoading = (state=false, action) => {
	switch (action.type) {
		case 'SPIN_VISIBLE':
			state = action.visible
			return state
		default:
			return state
	}
}
