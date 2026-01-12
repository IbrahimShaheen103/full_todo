import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 0.7, 1],
          sheetCornerRadius: 20,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
