import PushNotification from "react-native-push-notification"

const configureNotifications = () => {
    PushNotification.configure({
        onNotification: function(notification){
            console.log('NOTIFICATION:', notification);
        },
        popInitialNotification: true,
        requestPermissions: true
    });
}

const sheduleAppointmentNotification = (appointment) => {
    const date = new Date(`${appointment.date}T${appointment.time}`);
    date.setHours(date.getHours() - 1); //notification 1h avant

    PushNotification.localNotificationSchedule({
        channelId: 'appointments',
        title: 'Rappel de rendez-vous',
        message: `Rendez-vous avec ${appointment.patientName} à ${appointment.time}`,
        date: date
    });
}
