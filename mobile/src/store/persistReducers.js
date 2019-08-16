import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
    const persitedReducer = persistReducer(
        {
            key: 'gobarber',
            storage,
            whitelist: ['auth', 'user'],
        },
        reducers
    );

    return persitedReducer;
};
