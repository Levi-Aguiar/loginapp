import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Signup(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    function handleEntrar(){
        console.log(senha)
        if (senha !== confirmaSenha) {
        Alert.alert("Erro", "As senhas não conferem!");
    }   else {
        Alert.alert("Sucesso", "Logado com sucesso!");
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
                    <Input placeholder="Nome" 
                        onChangeText={setNome}
                    />
                    <Input placeholder="E-mail" 
                        keyboardType="email-address"
                        onChangeText={setEmail}

                    />
                    <Input placeholder="Senha" 
                        secureTextEntry
                        onChangeText={setSenha}
                    />
                    <Input placeholder="Confirmar Senha" 
                        secureTextEntry
                        onChangeText={setConfirmaSenha}
                    />

                    <Button label="Cadastrar" onPress={handleEntrar}/>
                    {/* <Button label="Entrar" style={{ backgroundColor: "green"}}/> */}
                </View>
                <Text style={styles.footerText}>Já possui cadastro?
                    <Link href="/" style={styles.footerLink}>
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