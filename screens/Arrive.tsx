import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';

const ArriveScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [host, setHost] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHostSuggestions = async (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      const filteredUsers = data
        .filter((user: { name: string }) => user.name.toLowerCase().includes(text.toLowerCase()))
        .map((user: { name: string }) => user.name);

      setSuggestions(filteredUsers);
    } catch (error) {
      console.error('Error fetching host suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change in the host field
  const handleHostChange = (text: string) => {
    setHost(text);
    fetchHostSuggestions(text); // Fetch suggestions immediately on input change
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setHost(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const visitorData = {
      name,
      email,
      phone,
      host,
      company,
    };

    try {
      const response = await fetch('http://localhost:8080/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Visitor data saved successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setHost('');
        setCompany('');
        setSuggestions([]);
      } else {
        Alert.alert('Error', 'Failed to save visitor data.');
      }
    } catch (error) {
      console.error('Error saving visitor data:', error);
      Alert.alert('Error', 'An error occurred while saving the data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Email (optional)"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Host"
        value={host}
        onChangeText={handleHostChange}
        onSubmitEditing={() => {}} 
        returnKeyType="done" 
        blurOnSubmit={false} 
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      <Button title="Sign In" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
  dropdown: {
    position: 'absolute',
    bottom: 0, // Adjust based on your layout
    width: '100%',
    zIndex: 1, // Ensure it appears above other elements
  },
  suggestionContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  suggestionText: {
    padding: 10,
  },
  signUp: {
    fontSize: 25,
    paddingBottom: 20,
  },
});

export default ArriveScreen;


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

// const ArriveScreen: React.FC = () => {
//   const [name, setName] = useState('');
//   const [company, setCompany] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [host, setHost] = useState('');
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Function to fetch users based on input text
//   const fetchHostSuggestions = async (text: string) => {
//     if (text.length < 3) {
//       setSuggestions([]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users');
//       const data = await response.json();
//       const filteredUsers = data
//         .filter((user: { name: string }) => user.name.toLowerCase().includes(text.toLowerCase()))
//         .map((user: { name: string }) => user.name);

//       setSuggestions(filteredUsers);
//     } catch (error) {
//       console.error('Error fetching host suggestions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input change in the host field
//   const handleHostChange = (text: string) => {
//     setHost(text);
//     fetchHostSuggestions(text); // Fetch suggestions immediately on input change
//   };

//   // Handle suggestion selection
//   const handleSuggestionSelect = (suggestion: string) => {
//     setHost(suggestion);
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Please Sign Up</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Company"
//         value={company}
//         onChangeText={setCompany}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email (optional)"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Host"
//         value={host}
//         onChangeText={handleHostChange}
//         onSubmitEditing={() => {}} 
//         returnKeyType="done" 
//         blurOnSubmit={false} 
//       />

//       {/* Suggestions List */}
//       {suggestions.length > 0 && (
//         <FlatList
//           data={suggestions}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
//               <View style={styles.suggestionContainer}>
//                 <Text style={styles.suggestionText}>{item}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           style={styles.dropdown}
//         />
//       )}

//       <Button title="Sign In" onPress={() => {}} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 5,
//     width: '100%',
//     height: 40,
//   },
//   dropdown: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     zIndex: 1,
//   },
//   suggestionContainer: {
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     marginVertical: 0,
//   },
//   suggestionText: {
//     padding: 10,
//   },
//   signUp: {
//     fontSize: 25,
//     paddingBottom: 20,
//   },
// });

// export default ArriveScreen;
