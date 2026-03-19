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
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../lib/firebase";

export default function cadastro() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Auth form
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("")

   useEffect( () =>{
    const unsub = onAuthStateChanged(auth, (u) => {
      setUserEmail(u?.email ?? null);
    });
    return unsub;
  },[])

  async function handleRegister(){
    try {
      console.log("Register -> ", email.trim());
      const create = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log("Register Ok uid: ", create.user.uid);
      Alert.alert("Conta criada com sucesso", create.user.email ?? "");
    } catch (error) {
      console.log("Register failed", error);      
    }
  }

    return(
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.select({ios:"padding", android:"height"})}
        >
        <ScrollView contentContainerStyle={{ flexGrow:1 }}>
            <View style={styles.container}>
                <Image 
                    source={require('@/assets/Cad.gif')}
                    style={styles.ilustration}
                />
                <Text style={styles.title}>Cadastrar</Text>
                <Text style={styles.subtitle}>Crie sua conta aqui</Text>
                <View style={styles.form}>
                    <Input 
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={email} // ✅ adiciona isso
                    onChangeText={setEmail}
                    />

                    <Input 
                    placeholder="Senha"
                    secureTextEntry
                    value={password} // ✅
                    onChangeText={setPassword}
                    />

                    <Input 
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    value={confirmaSenha} // ✅
                    onChangeText={setConfirmaSenha}
                    />
                    <Button label="Cadastrar" onPress={handleRegister}/>
                    {/* <Button label="Entrar" style={{ backgroundColor: "green"}}/> */}
                </View>
                <Text style={styles.footerText}>Já possui cadastro?
                    <Link href="/login" style={styles.footerLink}>
                        {" "}Voltar ao menu
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
        fontWeight:700
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