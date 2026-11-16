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
          <TextInput style={styles.input} placeholder="სახელი" onChangeText={onChange} value={value} />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="ელ-ფოსტა" onChangeText={onChange} value={value} autoCapitalize="none" />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="პაროლი" secureTextEntry onChangeText={onChange} value={value} />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>რეგისტრაცია</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>უკვე გაქვს ანგარიში? შესვლა</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 10 },
  error: { color: 'red', fontSize: 12, marginBottom: 10 },
  button: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#007AFF', textAlign: 'center', marginTop: 15 },
});