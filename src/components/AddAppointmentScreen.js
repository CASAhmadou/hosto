import { useState } from "react"

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
}