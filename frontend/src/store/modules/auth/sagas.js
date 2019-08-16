import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, '/sessions', {
            email,
            password,
        });

        const { user } = response.data;
        const { token } = user;

        if (!user.provider) {
            toast.error('Usuário não é prestador');

            return;
        }

        yield put(signInSuccess(token, user));

        history.push('/dashboard');
    } catch (error) {
        toast.error('Falha na autentiacação, verifique ses dados.');
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
            provider: true,
        });

        history.push('/');
    } catch (err) {
        toast.error('Falha no cadatro, verifique seus dados!');

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

export function signOut() {
    history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
