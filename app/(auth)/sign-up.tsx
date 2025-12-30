import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { creatUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    const { email, password, name } = formData;

    if (!name || !email || !password) {
      return Alert.alert("Error", "Invalid name,email or password");
    }
    setIsSubmitting(true);

    try {
      await creatUser({ email, password, name });
      router.replace("/");
    } catch (error: any) {
      return Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-8 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Full Name"
        placeholder="Example : Jone Doye"
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, name: text }))
        }
        value={formData.name}
      />
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
