
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Picker, ScrollView, TouchableOpacity } from "react-native-web";

const AddAppointmentScreen = ({navigation}) => {
    const [patientId, setPatientId] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [reason, setReason] = useState("");
    const [patients, setPatients] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM patients', [],
                (_, {rows: {_array}}) => setPatients(_array)
            );
        });
    }

    const checkAvailability = (callback) => {
        const timeStr = time.toTimeString().split('')[0];
        const dateStr =  date.toISOString().split('T')[0];

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM appointments WHERE date = ? AND time = ?',
                [dateStr, timeStr],
                (_, { rows: {length}}) => {
                    if(length>0){
                        Alert.alert('Conflit', 'Un rendez-vous existe déjà à cette date et heure');
                    }else{
                        callback();
                    }
                }
            )
        });
    }

    const saveAppointment = () => {
        checkAvailability(() => {
            const timeStr = time.toTimeString().split('')[0];
            const dateStr = date.toISOString().split('')[0];

            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO appointments(patient_id, date, time, reason, status) VALUES (?,?,?,?,?)',
                    [patientId, dateStr, timeStr, reason, 'Scheduled'],
                    (_, result) => {
                        const appointment = {
                            date: dateStr,
                            time: timeStr,
                            patientName: patients.find(p => p.id === patientId)?.name
                        }
                        scheduleAppointmentNotification(appointment);
                        navigation.goBack();
                    }
                );
            })
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style= {styles.form}>
                    <Picker selectedValue={patientId} onValueChange={setPatientId} style={styles.picker}>
                        <Picker.Item label="Sélectionner un patient" value={null}/>
                        {patients.map(patient => (
                            <Picker.Item key={patient.id} label={patient.name} value={patient.id} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                        <Text>Selectionner la date: {date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker value={date} mode="date" 
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if(selectedDate) setDate(selectedDate);
                            }} 
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddAppointmentScreen;