import { createSlice } from '@reduxjs/toolkit';
import config from '@/configuration';
import {
	fetchCurrentInfoAsync,
	fetchXDaiInfoAsync,
	fetchMainnetInfoAsync,
} from './subgraph.thunks';
import type { ISubgraphState } from './subgraph.types';

export const defaultSubgraphValues: ISubgraphState = {
	userNotStakedPositions: [],
	userStakedPositions: [],
	allPositions: [],
	networkNumber: config.MAINNET_NETWORK_NUMBER,
};

const initialState: {
	currentValues: ISubgraphState;
	mainnetValues: ISubgraphState;
	xDaiValues: ISubgraphState;
	isLoaded: boolean;
} = {
	currentValues: defaultSubgraphValues,
	mainnetValues: defaultSubgraphValues,
	xDaiValues: defaultSubgraphValues,
	isLoaded: false,
};

export const subgraphSlice = createSlice({
	name: 'subgraph',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCurrentInfoAsync.fulfilled, (state, action) => {
				state.isLoaded = true;
				state.currentValues = action.payload.response;
				if (action.payload.chainId === config.MAINNET_NETWORK_NUMBER) {
					state.mainnetValues = action.payload.response;
				}
				if (action.payload.chainId === config.XDAI_NETWORK_NUMBER) {
					state.xDaiValues = action.payload.response;
				}
			})
			.addCase(fetchXDaiInfoAsync.fulfilled, (state, action) => {
				state.xDaiValues = action.payload;
			})
			.addCase(fetchMainnetInfoAsync.fulfilled, (state, action) => {
				state.mainnetValues = action.payload;
			});
	},
});

// Action creators are generated for each case reducer function
// export const {} = subgraphSlice.actions;

export default subgraphSlice.reducer;
