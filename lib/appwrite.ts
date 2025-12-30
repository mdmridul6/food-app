import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.mridul.food_ordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: "68921a21001b4293f9c6",
  userCollectionId: "68921a420012240f09cb",
};

export const clients = new Client();

clients
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const accounts = new Account(clients);
export const databases = new Databases(clients);
const avater = new Avatars(clients);

export const creatUser = async ({ email, password, name }: CreateUserPrams) => {
  try {
    const newAccount = await accounts.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!newAccount) throw new Error();

    await signIn({ email, password });

    const avaterUrl = avater.getInitialsURL(name);
    console.log(avaterUrl);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: name,
        avatar: avaterUrl,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  const session = await accounts.createEmailPasswordSession(email, password);
};
