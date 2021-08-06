import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { NotFound } from "./Components/NotFound";
import {auth, db} from "./Config/Config";


export class App extends Component {

     state={
         currentUser: null,
         todos:[],
         editTodoValue: null
     }

     componentDidMount(){
         //avoir l'utilisateur courant
         auth.onAuthStateChanged(user=>{
             if (user){
                db.collection('users').doc(user.uid).get().then(snapshot=>{
                    this.setState({
                        currentUser:snapshot.data().Name
                    })
                })
             }
             else {
                 console.log('\n' +
                     'l\'utilisateur n\'est pas connecté pour récupérer les tâches')
             }
         })
         // avoir la liste de todos des user connecter
         auth.onAuthStateChanged(user=>{
             if (user){
                 const todoList = this.state.todos;
                 db.collection('todo' + user.uid).onSnapshot(snapshot => {
                     let changes = snapshot.docChanges();
                     changes.forEach(change=>{
                         if(change.type==='added'){
                            todoList.push({
                                id: change.doc.id,
                                Todo: change.doc.data().Todo
                            })
                         }
                         if (change.type==='removed'){
                             //console.log(change.type);
                             for(var i = 0; i<todoList.length; i++){
                                 if (todoList[i].id === change.doc.id){
                                     todoList.splice(i,1);
                                 }
                             }
                         }
                         this.setState({
                             todos: todoList
                         })
                     })
                 })

             }
             else {
                 console.log('lutilisateur nest pas connecter');
             }
         })

     }

     deleteTodo=(id)=>{
         //console.log(id);
         auth.onAuthStateChanged(user=>{
             if (user){
                db.collection('todo' + user.uid).doc(id).delete();
             }
             else {
                 console.log('lutilisateur nest pas connecter pour supprimer une tache');
             }
         })
     }
    editModal=(obj)=>{
         this.setState({
             editTodoValue: obj
         })
    }

    updateTodoHandler=(editTodo, id)=>{
        //console.log(editTodo, id);
        const todoList = this.state.todos;
        for(var i = 0; i<todoList.length; i++){
            if(todoList[i].id===id){
                todoList.splice(i,1,{id,Todo: editTodo});
            }
            this.setState({
                todos: todoList
            })
        }
    }

    render() {
         //console.log(this.state.todo);
       return (
       <Router>
         <Switch>
           <Route exact path='/' component={()=><Home
                currentUser={this.state.currentUser}
                todos={this.state.todos}
                deleteTodo={this.deleteTodo}
                editTodoValue={this.state.editTodoValue}
                editModal={this.editModal}
                updateTodoHandler={this.updateTodoHandler}
           />}/>
           <Route path="/Signup" component={Signup}/>
           <Route path="/Login" component={Login}/>
           <Route component={NotFound}/>
         </Switch>
       </Router>
     )
   }
 }

export default App;
