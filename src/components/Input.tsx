import { StyleSheet, TextInput } from "react-native";

export function Input({ onChangeText, value, ...rest }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
    input:{
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 12,
    }
})