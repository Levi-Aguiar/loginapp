import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    function handleSignIn(){
        console.log(email)
        Alert.alert("Entrar", "Preencha e-mail e senha para entrar!")
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
                <Text style={styles.title}>Entrar {email}</Text>
                <Text style={styles.subtitle}>Faça seu login</Text>
                <View style={styles.form}>
                    <Input placeholder="E-mail" 
                        keyboardType="email-address"
                        // onChangeText={(text) => console.log(text)}
                        onChangeText={setEmail}
                        />
                    <Input placeholder="Senha" 
                        secureTextEntry
                        onChangeText={setSenha}
                        />
                        
                    <Button label="Entrar" onPress={handleSignIn} />
                    {/* <Button label="Entrar" style={{ backgroundColor: "green"}}/> */}
                </View>
                <Text style={styles.footerText}>Não tem uma conta? 
                    <Link href="/signup" style={styles.footerLink}>
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