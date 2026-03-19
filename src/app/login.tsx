import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { Link } from "expo-router";

import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "firebase/auth";
import { auth } from "../lib/firebase";

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Auth form
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");

  useEffect( () =>{
    const unsub = onAuthStateChanged(auth, (u) => {
      setUserEmail(u?.email ?? null);
    });
    return unsub;
  },[])

  async function handleLogin() {
    try {
      console.log("Login --> ", email.trim());
      const logged = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("LOGIN OK uid: ", logged.user.email);
      Alert.alert("Login Ok ", logged.user.email ?? "")
    } catch (error) {
      console.log("Login failed ", error);
    }
  }

  async function handleLogout(){
    try {
      console.log("LOGOUT !!!");
      await signOut(auth);
      console.log("LOGOUT OK");
      Alert.alert("Logout Ok!");
    } catch (error) {
      console.log("Login failed ", error);
    }
  }
 
    return(
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.select({ios:"padding", android:"height"})}
        >
        <ScrollView 
            contentContainerStyle={{ flexGrow:1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
            <View style={styles.container}>
                <Image 
                    source={require('@/assets/image1.gif')}
                    style={styles.ilustration} 
                />
                <Text style={styles.title}>Entrar</Text>
                <Text style={styles.subtitle}>Faça seu login</Text>
                <View style={styles.form}>
                    <Input placeholder="E-mail" 
                        keyboardType="email-address"
                        // onChangeText={(text) => console.log(text)}
                        onChangeText={setEmail}
                        />
                    <Input placeholder="Senha" 
                        secureTextEntry
                        onChangeText={setPassword}
                        />
                        
                    <Button label="Entrar" onPress={handleLogin} />
                    {/* <Button label="Entrar" style={{ backgroundColor: "green"}}/> */}
                    <Button label="Sair" onPress={handleLogout} />
                </View>
                <Text style={styles.footerText}>Não tem uma conta? 
                    <Link href="/cadastro" style={styles.footerLink}>
                        {" "}Cadastre-se aqui
                    </Link>
                </Text>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FDFDFD",
        padding:32
    },
    ilustration:{
        width: "100%",
        height: 330,
        resizeMode:"contain",
        marginTop:62
    }, 
    footerText:{
        textAlign:"center",
        marginTop:24,
        color:"#585860",
    },
    footerLink:{
        color:"#0929b8",
        fontWeight:"700"
    },
    form: {
        marginTop:24,
        gap:12
    },
    title:{
        fontSize:32,
        fontWeight: 900,
        color:"#505050ff"
    },
    subtitle:{
        fontSize:16,
    }
})