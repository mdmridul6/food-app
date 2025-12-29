import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  leftIcon,
  textStyle,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn("custom-btn", style)}>
      {isLoading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
