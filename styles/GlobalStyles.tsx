import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',   
  },
  bottomSection: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',      
    justifyContent: 'space-between',  
    paddingHorizontal: 20,  
    alignItems: 'center',
  },
  bottomLink: {
    position: 'absolute',
    bottom: 50, 
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,        
    borderRadius: 5,           
    alignItems: 'center',
    width: '48%',
    margin: 'auto'
  },
  buttonText: {
    color: 'white',            
    fontSize: 18,              
    fontWeight: 'bold',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 290,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
    backgroundColor: '#fff',
  },
  suggestionContainer: {
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
  linkText: {
    color: 'black',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
    width: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  formGroup: {
    position: 'relative' as const,
    width: '100%',
  },
  suggestionsContainer: {
    position: 'absolute' as const,
    top: 50,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 5,
    maxHeight: 200,
  },
  loading: {
    padding: 12,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000', 
    alignItems: 'center',
    marginTop: 10,
  },  
  logoutButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 2,
    elevation: 5,
    width: '80%',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GlobalStyles;
