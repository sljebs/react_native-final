import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/AuthContext';

const schema = yup.object({
  name: yup.string().required('სახელი სავალდებულოა'),
  email: yup.string().email('არასწორი ელ-ფოსტა').required('ელ-ფოსტა სავალდებულოა'),
  password: yup.string().min(6, 'მინიმუმ 6 სიმბოლო').required('პაროლი სავალდებულოა'),
});

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    login(data, true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>რეგისტრაცია</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="სახელი" placeholderTextColor="#839187" onChangeText={onChange} value={value} />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="ელ-ფოსტა" placeholderTextColor="#839187" onChangeText={onChange} value={value} autoCapitalize="none" />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="პაროლი" placeholderTextColor="#839187" secureTextEntry onChangeText={onChange} value={value} />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>რეგისტრაცია</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          უკვე გაქვს ანგარიში? <Text style={styles.linkUnderline}>შესვლა</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F3F6F1' },
  title: { color: '#163D2D', fontFamily: 'Arial', fontSize: 28, fontWeight: '700', marginBottom: 28, textAlign: 'center' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D5E0D7', color: '#20352A', fontFamily: 'Arial', padding: 14, borderRadius: 12, marginBottom: 12 },
  error: { color: '#B42318', fontFamily: 'Arial', fontSize: 12, marginBottom: 10 },
  button: { backgroundColor: '#1D563B', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontFamily: 'Arial', fontWeight: '700', fontSize: 16 },
  linkText: { color: '#1D563B', fontFamily: 'Arial', fontWeight: '600', textAlign: 'center', marginTop: 18 },
  linkUnderline: { textDecorationLine: 'underline' },
});