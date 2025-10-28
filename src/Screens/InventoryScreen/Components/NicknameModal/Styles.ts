import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    display: 'flex',
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 20,
  },
  input: {
    borderBottomWidth: 1,
    width: '50%',
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
  },
  submit: {
    backgroundColor: '#5ADD22'
  },
  error: {
    backgroundColor: '#DD2222'
  }, 
  title: {
    fontSize: 20
  }
})