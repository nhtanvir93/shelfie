import { Account, Avatars, Client } from "react-native-appwrite";

export const client = new Client()
        .setProject("69a40d1f00005fe80075")
        .setEndpoint("https://fra.cloud.appwrite.io/v1")

export const account = new Account(client)

export const avatars = new Avatars(client)