import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
// import history from '~/services/history';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });
        console.tron.log(response.data);

        const { user } = response.data;
        const { token } = user;

        if (user.provider) {
            Alert.alert(
                'Erro ao logar',
                'O usuário não pode ser prestador de serviços'
            );

            return;
        }

        yield put(signInSuccess(token, user));

        // history.push('/dashboard');
    } catch (error) {
        Alert.alert(
            'Falha na autentiacação',
            'Erro ao logar, verifique seus dados.'
        );
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
        });


    } catch (err) {
        Alert.alert('Falha no cadatro', 'verifique seus dados!');

        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
