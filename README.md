# Running and Building a React Native App on an Android Tablet

Follow these steps to run and build your React Native app on an Android tablet.

## Step 1: Connect Your Tablet to Your Development Machine

- **Using USB**: Connect your Android tablet to your computer using a USB cable.
- **Enable USB Debugging**: Ensure that USB Debugging is enabled on your tablet.

You can verify your connection by running the following command:

```sh
adb devices
```

This should show your device as connected.

---

## Step 2: Run the React Native App on Your Android Tablet

You can now run your React Native app on your Android tablet.

### Start the React Native packager:
```sh
npx react-native start
```

### Run the app:
Open a new terminal window and run:
```sh
npx react-native run-android
```

This command will:
1. Build the app
2. Install it on your connected Android tablet
3. Launch the app on the tablet

