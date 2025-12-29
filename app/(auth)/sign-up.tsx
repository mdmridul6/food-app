import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = async () => {
    if (!form.email || !form.email || form.password)
      Alert.alert("Error", "Invalid name,email or password");
    setIsSubmitting(true);

    try {
      Alert.alert("Success", "User sign up successfull");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-8 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Full Name"
        placeholder="Example : Jone Doye"
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        value={form.name}
      />
      <CustomInput
        label="Email"
        placeholder="Example : user@example.com"
        keyboardType="email-address"
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        value={form.email}
      />
      <CustomInput
        label="Password"
        placeholder="Type your password"
        secureTextEntry={true}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        value={form.password}
      />
      <CustomButton
        title="Sing up"
        isLoading={isSubmitting}
        onPress={onSubmit}
      />
      <View className="flex justify-center flex-row gap-2 mt-2 mb-3">
        <Text className="base-regular text-gray-100">
          Already have an account
        </Text>
        <Link href="/sign-in" className="text-primary base-bold">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
