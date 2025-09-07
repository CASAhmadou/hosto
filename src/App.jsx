import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native';
import AddPatientScreen from './components/AddPatientScreen';
import AddAppointmentScreen from './components/AddAppointmentScreen';
import PatientDetailsScreen from './components/PatientDetailsScreen';


const Stack = createStackNavigator();

function dsdApp() {
    useEffect(() => {
      initDB();
      configureNotifications();
    }, []);
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil'}} />
          <Stack.Screen name="Patients" component={PatientsScreen} options={{ title: 'Liste des Patients'}} />
          <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{ title: 'Nouveau Patient'}} />
          <Stack.Screen name="PatientsDetails" component={PatientDetailsScreen} options={{ title: 'Details du Patient' }} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{title: 'Rendez-vous'}} />
          <Stack.Screen name="AddAppointments" component={AddAppointmentScreen} options={{title: 'Nouveau Rendez-vous'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

    // Écran d'accueil
    const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Cabinet Médical</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Patients')}
            >
            <Text style={styles.buttonText}>Gestion des Patients</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Appointments')}
            >
            <Text style={styles.buttonText}>Rendez-vous</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    };

    // Écran de gestion des patients
    const PatientsScreen = ({ navigation }) => {
    const [patients, setPatients] = useState([
        { id: '1', name: 'Jean Dupont', age: 45, phone: '0123456789' },
        { id: '2', name: 'Marie Martin', age: 32, phone: '0987654321' },
    ]);

    const renderPatient = ({ item }) => (
        <TouchableOpacity 
        style={styles.patientCard}
        onPress={() => navigation.navigate('PatientDetails', { patient: item })}
        >
        <Text style={styles.patientName}>{item.name}</Text>
        <Text>Age: {item.age} ans</Text>
        <Text>Tél: {item.phone}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddPatient')}
        >
            <Text style={styles.buttonText}>Ajouter un Patient</Text>
        </TouchableOpacity>
        <FlatList
            data={patients}
            renderItem={renderPatient}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
    );
    };

    // Écran des rendez-vous
    const AppointmentsScreen = () => {
    const [appointments, setAppointments] = useState([
        { 
        id: '1', 
        patientName: 'Jean Dupont',
        date: '2024-11-10',
        time: '09:00',
        reason: 'Consultation générale'
        }
    ]);

    const renderAppointment = ({ item }) => (
        <View style={styles.appointmentCard}>
        <Text style={styles.appointmentTitle}>{item.patientName}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Heure: {item.time}</Text>
        <Text>Motif: {item.reason}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {/* Navigation vers l'ajout de RDV */}}
        >
            <Text style={styles.buttonText}>Nouveau Rendez-vous</Text>
        </TouchableOpacity>
        <FlatList
            data={appointments}
            renderItem={renderAppointment}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
    );
    };



    // Styles mis à jour
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        },
        form: {
        gap: 15,
        },
        input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        },
        picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        },
        dateButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        },
        submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        },
        buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        },
        patientInfo: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        },
        patientName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        },
        sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        },
        appointmentCard: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        },
    });
  

export default App
