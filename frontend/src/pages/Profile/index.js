import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSigout() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />

                <Input name="name" placeholder="Nome completo" />
                <Input name="email" placeholder="Seu endereço de e-mail" />
                <hr />

                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha atual"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha atual"
                />

                <button type="submit">Atualizar perfil</button>
            </Form>
            <button type="button" onClick={handleSigout}>
                Sair do GoBarber
            </button>
        </Container>
    );
}
