/* Theme Colors
075e54
128c7e
25d366
dcf8c6
34b7f1
ece5dd

*/

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(37, 211, 102,0)',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(37, 211, 102,1)',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'rgba(37, 211, 102,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(37, 211, 102,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#000',
    margin: 10,
    fontSize: 10
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
    
  },MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  floatButton: {
    height: 50,
    width: 50,
    borderRadius:10,
    backgroundColor: 'red',
  }
});