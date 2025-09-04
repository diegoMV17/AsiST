"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import globalStyles from "../../styles/styles"
import { isValidDomainEmail, validateLogin } from "../../context/AuthContext"
import { registerUser } from "../../api/UserApi"

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [cedula, setCedula] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState<"conductor" | "pasajero" | "ambos" | "admin">("pasajero")
  const [error, setError] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

  const handleRegister = async () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !telefono.trim() ||
      !cedula.trim() ||
      !fechaNacimiento.trim() ||
      !ciudad.trim()
    ) {
      setError("Todos los campos son obligatorios")
      return
    }
    if (!isValidDomainEmail(email)) {
      setError("El correo electrónico debe ser de dominio @usantoto.edu.co o @ustatunjaedu.co")
      return
    }
    const passwordError = validateLogin(password)
    if (passwordError) {
      setError(passwordError)
      return
    }
    setError("")
    try {
      await registerUser(nombre, apellido, telefono, cedula, fechaNacimiento, ciudad, email, password, rol)
      Alert.alert("Registro válido", `Bienvenido/a, ${nombre}`)
      navigation.navigate("Login")
    } catch (err: any) {
      setError("Error al registrar usuario")
    }
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.formBox}>
        <Text style={globalStyles.title}>Registro</Text>
        {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          style={globalStyles.input}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Cédula"
          value={cedula}
          onChangeText={setCedula}
          style={globalStyles.input}
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        {Platform.OS === "web" ? (
          <input
            type="date"
            style={{ ...globalStyles.dateInput, color: fechaNacimiento ? "#000" : "#999" }}
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        ) : (
          <>
            <TouchableOpacity style={globalStyles.input} onPress={() => setShowDatePicker(true)}>
              <Text style={{ color: fechaNacimiento ? "#000" : "#999" }}>
                {fechaNacimiento || "Fecha de nacimiento (YYYY-MM-DD)"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowDatePicker(false)
                  if (selectedDate) {
                    setDate(selectedDate)
                    const formatted = selectedDate.toISOString().split("T")[0]
                    setFechaNacimiento(formatted)
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
        <TextInput
          placeholder="Ciudad"
          value={ciudad}
          onChangeText={setCiudad}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Correo institucional"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        {/* Selector de rol */}
        <View style={globalStyles.roleSelectorContainer}>
          <Text style={globalStyles.roleSelectorLabel}>Rol:</Text>
          <View style={globalStyles.roleSelectorRow}>
            {["conductor", "pasajero", "ambos"].map((r) => (
              <TouchableOpacity
                key={r}
                style={[globalStyles.roleSelectorButton, rol === r && globalStyles.roleSelectorButtonActive]}
                onPress={() => setRol(r as any)}
              >
                <Text style={[globalStyles.roleSelectorButtonText, rol === r && globalStyles.roleSelectorButtonTextActive]}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
          <Text style={globalStyles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={globalStyles.link}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
