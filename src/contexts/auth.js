
import React, {createContext, useState, useEffect} from 'react'
import firebase from '../services/firebaseConnection'
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = createContext({})

function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setloadingAuth] = useState(false)

    //Trazendo as informações que estão salvas no AsyncStorage para não perder conexão ao dar Reload
    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }
        loadStorage()
    } ,[])

    //Logando o Usuário
    async function signIn(email, password){
        setloadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async value => {
            let uid = value.user.uid
            await firebase.database().ref('user').child(uid).once('value')
            .then(snapshot => {
                let data = {
                    uid,
                    nome: snapshot.val().nome,
                    email
                }
                setUser(data)
                storageUser(data)
                setloadingAuth(false)
            })
        })
        .catch(error => {
            alert('error: ' + error)
            setloadingAuth(false)
        })
    }

    //Desloga o Usuário 
    async function signOut(){
        await firebase.auth().signOut()
        await AsyncStorage.clear()
        .then(() => {
            setUser(null)
        })
    }

    //Cadastrando Usuário
    async function signUp(email, password, nome){
        setloadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid
            await firebase.database().ref('user').child(uid).set({
                nome,
                saldo:0
            })
            .then(() =>{
                let data = {
                    uid,
                    nome,
                    email
                }
                setloadingAuth(false)
                setUser(data)
                storageUser(data)
            })
        }).catch(error =>{
            alert('error: ' + error)
            setloadingAuth(false)
        })
    }

    //Salvar dados no AsyncStorage
    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, loadingAuth, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;