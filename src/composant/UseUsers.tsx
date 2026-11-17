import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function UseUsers(){
    const [Users,setUsers] = useState<string[]>([]);
    const [Dates,setDates] = useState<string[]>([]);
    useEffect(() => {
    async function load() {
      const save = await AsyncStorage.getItem("users");
      if (save) {
        const data = JSON.parse(save);
        setUsers(data.Users);
        setDates(data.Dates);
    }
    }
    load();
    }, []);


    function clic(name : string){
        const ND = new Date().toLocaleDateString();
        setUsers([...Users , name]);
        setDates([...Dates, ND]);
        AsyncStorage.setItem(
            "users",
            JSON.stringify({ Users : [...Users, name] , Dates : [...Dates, ND]}),
        );
    }
    function supprimer(index : number){
        const Ndate = Dates.filter((_,num) => num !== index);
        const NUsers = Users.filter((_,num) => num !== index);
        setUsers(NUsers);
        setDates(Ndate);
        AsyncStorage.setItem(
            "users",
            JSON.stringify({ Users : NUsers , Dates :Ndate}),
        );

    }

    return { Users, Dates, clic, supprimer };
}