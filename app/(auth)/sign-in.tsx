import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onSubmit = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      return Alert.alert("Error", "Invalid email or password");
    }
    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Email"
        placeholder="Example : user@example.com"
        keyboardType="email-address"
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, email: text }))
        }
        value={formData.email}
      />
      <CustomInput
        label="Password"
        placeholder="Type your password"
        secureTextEntry={true}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, password: text }))
        }
        value={formData.password}
      />
      <CustomButton
        title="Sing In"
        isLoading={isSubmitting}
        onPress={onSubmit}
      />
      <View className="flex justify-center flex-row gap-2 mt-5">
        <Text className="base-regular text-gray-100">
          Don't have and account
        </Text>
        <Link href="/sign-up" className="text-primary base-bold">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
