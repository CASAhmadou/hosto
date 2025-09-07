import React, { useState, useEffect } from 'react';

const PatientDetailsScreen = ({ route }) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      loadPatientDetails();
      loadPatientAppointments();
    }, [patientId]);
  
    const loadPatientDetails = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM patients WHERE id = ?',
          [patientId],
          (_, { rows: { _array } }) => setPatient(_array[0])
        );
      });
    };
  
    const loadPatientAppointments = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM appointments WHERE patient_id = ? ORDER BY date DESC, time DESC',
          [patientId],
          (_, { rows: { _array } }) => setAppointments(_array)
        );
      });
    };
  
    if (!patient) return <Text>Chargement...</Text>;
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text>Age: {patient.age} ans</Text>
          <Text>Telephone: {patient.phone}</Text>
          <Text>Email: {patient.email}</Text>
          <Text>Adresse: {patient.address}</Text>
        </View>
  
        <Text style={styles.sectionTitle}>Historique des rendez-vous</Text>
        <FlatList
          data={appointments}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.appointmentCard}>
              <Text>Date: {item.date}</Text>
              <Text>Heure: {item.time}</Text>
              <Text>Motif: {item.reason}</Text>
              <Text>Statut: {item.status}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
};
 
export default PatientDetailsScreen; 