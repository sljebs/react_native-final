import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/AuthContext';

const schema = yup.object({
  email: yup.string().email('არასწორი ელ-ფოსტის ფორმატი').required('ელ-ფოსტა სავალდებულოა'),
  password: yup.string().min(6, 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო').required('პაროლი სავალდებულოა'),
});

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    login(data, rememberMe);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ავტორიზაცია</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="ელ-ფოსტა"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor="#839187"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="პაროლი"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#839187"
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <View style={styles.row}>
        <Text style={styles.rowLabel}>დამიმახსოვრე</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: '#C8D2CA', true: '#78A486' }}
          thumbColor={rememberMe ? '#1D563B' : '#F3F6F1'}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>შესვლა</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>
          არ გაქვს ანგარიში? <Text style={styles.linkUnderline}>რეგისტრაცია</Text>
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  rowLabel: { color: '#34483A', fontFamily: 'Arial', fontSize: 15 },
  linkUnderline: { textDecorationLine: 'underline' },
  button: { backgroundColor: '#1D563B', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontFamily: 'Arial', fontWeight: '700', fontSize: 16 },
  linkText: { color: '#1D563B', fontFamily: 'Arial', fontWeight: '600', textAlign: 'center', marginTop: 18 },
});