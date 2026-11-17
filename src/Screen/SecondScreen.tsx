import { Text, StyleSheet, View, Button, TextInput, FlatList } from "react-native";
import React, { useEffect,useState } from "react";
import UseUsers from "../composant/UseUsers";

export default function SecondScreen() {
  const { Users, Dates, clic, supprimer } = UseUsers();
  const [liste,setListe] = useState<{name:String;date:string}[]>([]);
  const [textentrer, setTextentrer] = useState<string>("");

  useEffect(() => {
    const nl = Array.isArray(Users)
      ? Users.map((user: string, index: number): { name: string; date: string } => ({
          name: user,
          date: Array.isArray(Dates) ? Dates[index] || "pas de date" : "pas de date"
        }))
      : [];

    setListe(nl);
  }, [Users, Dates]);

  return (
  <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>    
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <TextInput 
        placeholder="Pseudo" 
        value={textentrer} 
        onChangeText={(text: string) => setTextentrer(text)}
        style={{
          flex: 1,
          height: 45,
          borderWidth: 1,
          borderColor: '#ccc',
          paddingHorizontal: 10,
          marginRight: 10,
          backgroundColor: '#fff'
        }}
      />
      <View style={{ width: 100 }}>
        <Button title="AJOUTER" onPress={() => { clic(textentrer); setTextentrer(''); }} />
      </View>
    </View>

    <FlatList
      data={liste}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item,index }) => (
        <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ fontSize: 16 }}>{item.name} ({item.date}) <Button title="SUPPRIMER" onPress={() => supprimer(index)}></Button></Text> 
        </View>
      )}/>

    </View>
  );
}
