
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const AddPatientScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState();

    const savePatient = () => {
        db.transaction(tx => {tx.executeSql(
            'INSERT INTO patients(name,age,phone,email,address) VALUES (?,?,?,?,?)',
            [name,parseInt(age),phone,email,address],
            (_, result) => {
                navigation.goBack();
            },
            error => console.log('Error saving patient:',error)
        );
    })
    }

    return(
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Nom complet" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <TextInput style={styles.input} placeholder="Adresse" value={address} onChangeText={setAddress} multiline />
                    <TouchableOpacity style={styles.submitButton} onPress={savePatient}>
                        <Text style={styles.buttonText}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddPatientScreen;