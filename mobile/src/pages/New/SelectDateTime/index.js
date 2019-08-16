import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateInput from '~/components/DateInput';
import Background from '~/components/Background';
import { Container, HourList, Hour, Title } from './styles';
import api from '~/services/api';

export default function SelectDateTime({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);
    const provider = navigation.getParam('provider');

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(
                `providers/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime(),
                    },
                }
            );

            setHours(response.data);
        }

        loadAvailable();
    }, [date, provider.id]);

    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        });
    }

    return (
        <Container>
            <Background>
                <DateInput date={date} onChange={setDate} />
                <HourList
                    data={hours}
                    extraData={date}
                    keyExtractor={item => item.time}
                    renderItem={({ item }) => (
                        <Hour
                            onPress={() => handleSelectHour(item.value)}
                            enabled={item.available}
                        >
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Background>
        </Container>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horário',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});
