import React, {Component} from 'react';

class App extends Component{

    
    state ={ 
        add: true,
        view: true,
        title: "",
        description: "",
        topics: [],
        topic: "",
        flag: false,
        agendas: [
            {
                title : "Angular",
                description : "Some description about the angular",
                topics : ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
            },{
                title : "Vue",
                description : "Some description about the vue",
                topics : ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
            }
        ]
    }

    changeForm(str) {
        if(str == "addAgenda"){
            this.setState({add : true})
            this.setState({view : false})
            this.setState({title : ""}) 
            this.setState({description : ""}) 
            this.setState({topic : ""})
            this.setState({topics : ""})            
        } else if(str == "viewAgenda"){
            this.setState({view : true})
            this.setState({add : false})
            
        }
    }

    submitAgenda(e){
        //this.setState({flag : true})

        if(!this.state.title == "" && !this.state.description == "" && !this.state.topics.length == 0 ){
            let agenda = {
                title : this.state.title,
                description : this.state.description,
                topics : this.state.topics
            }
            this.setState({ agendas : this.state.agendas.concat(agenda) })
        }

    }

    render(){
        return (
            <div>
                <h1 className="mx-5 mb-5">Agenda Manager</h1>
                {/* show/hide this following add agenda template */
                    this.state.add ? <div className="container" role="addAgenda">
                    <button className="btn btn-info" id="viewAgenda" onClick={() => this.changeForm("viewAgenda")} role="goToView">Click to View Agenda</button>
                    <form id="addForm" onSubmit={(e) => { e.preventDefault(); this.submitAgenda()}} >
                        <div className="my-3">
                            <label className="form-label">Title</label>
                            <input type="text" name="newTitle" placeholder="Enter the title" onChange={(e) => this.setState({title : e.target.value})} className="form-control" />
                            <small className="text-danger" data-testid="invalidTitle">
                                {
                                    /**
                                     * show empty string if title input is valid
                                     * else show 'Title is required'
                                     */
                                }{this.state.flag && !this.state.title ? "Title is required" : " " }
                            </small>
                        </div>

                        <div className="my-3">
                            <label className="form-label">Description</label>
                            <input type="text" name="newDescription" placeholder="Enter the description" onChange={(e) => this.setState({description : e.target.value})} className="form-control" />
                            <small className="text-danger" data-testid="invalidDescription">
                                {
                                    /**
                                     * show empty string if descrption input is valid
                                     * else show ' is required'
                                     */
                                }{this.state.flag && !this.state.description ? "Description is required" : ""}
                            </small>
                        </div>
                            
                        
                           <div className="my-3 w-50" >
                                <label className="form-label">Enter topic</label>
                                <input type="text" name="newTopic" id="topic" placeholder="Enter the topic" onChange={(e) => this.setState({topic : e.target.value})} className="form-control" />
                                <small className="text-danger" data-testid="invalidTopic">
                                    {
                                        /**
                                         * show empty string if topic input is valid
                                         * else show 'Topic is required'
                                         */
                                    }{this.state.flag && !this.state.topic ? "Topic is required" : " "}
                                </small>
                            </div>

                            {/* on click should add topics and disable the button if invalid topic */}
                            <button disabled={!this.state.topic} className="btn btn-success addAlign" role="addTopicBtn" type="button" onClick={(e)=>{ this.setState({topics: this.state.topics.concat(this.state.topic)}) }} >+ Add Topic</button>
                            
                            {/* on click should add agenda details and disable the button if invalid inputs */}
                            <button disabled={!this.state.title || !this.state.description} className=" btn btn-success submitAlign " type="submit" id="submitAgenda" role="submitAgendaBtn">Submit Agenda</button>
                     
                        
                    </form>
                    {this.state.topics.length == 0 ? /* show if no topics added yet */
                        <div className="text-danger ml-2 mt-5" data-testid="noTopicMsg">
                            No Topics Added
                        </div>
                    
                    : /* display list of topics */
                        <div className="card my-3">
                            <div className="card-header">Added Topics</div>
                            <div className="card-body">
                                <ul className="list-group"> {this.state.topics.map((e)=> 
                                    <li className="list-group-item" role="topicList">{e}</li> )}                           
                                </ul>
                            </div>
                            <div className="card-footer">Refer the topics you added</div>
                        </div>
                    }
                    

                    
                </div> 
                
                : 
                //{this.state1.map((agenda) => {<li className="list-group-item" role="topicList">{agenda.topics}</li>})}
                <div className="container" role="viewAgenda">
                    <button className="btn btn-info" id="addAgenda" onClick={() => this.changeForm("addAgenda")} role="goToAdd">Click to Add Agenda</button>
                    { /* iterate agenda details */ this.state.agendas.map((e) => 
                    <div className="card my-3" role="cards">
                        <div className="card-header">
                            {/* {title} */e.title}
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {/* oterate topics to display */ e.topics.map((a) => 
                                <li className="list-group-item">
                                    {/* {topic} */ a}
                                </li>
                            )}                                
                            </ul>
                        </div>
                        <div className="card-footer">
                            {/* description */ e.description }
                        </div>
                    </div>
                    ) }
                    
                </div>
                
                }
                
            </div>
        )
    }
    
}

export default App;







// import './App.css';
// import React, { useState } from 'react';
// import AddAgenda from './Components/AddAgenda';
// import ViewAgenda from './Components/ViewAgenda'

// export default function App() {
//     //let isAddAgenda = false
//     const [isAddAgenda, setisAddAgenda] = useState(true)

//     const changeForm = (change) => {
//         console.log("change status "+change)
//         if(change == "addAgenda"){
//             setisAddAgenda(true)
//         } else if(change == "viewAgenda"){
//             setisAddAgenda(false)
//         }
//     }

//     const addAgenda = (title, desc, topic) => {
//         console.log(title + " " + desc + " " + topic)

//         let newAgenda = {
//             title : title,
//             description : desc,
//             topic : topic
//         }

//         setAgenda([...agenda, newAgenda]);
//     }

//     const [agenda, setAgenda] = useState([
//         {
//             title : "React",
//             description : "Javascript Framework",
//             topic : "State hooks"
//         }, {
//             title : "Angular",
//             description : "Frontend Framework",
//             topic : "Another framework for web"
//         }, {
//             title : "Vue",
//             description : "Web Framework",
//             topic : "Vue topics"
//         }
//     ])

//     const onDelete =(agenda1) => {
//         setAgenda(agenda.filter((e) => {
//             return e!==agenda1
//         }))
//     }

//   return (
//     <div>
//         <h1>Agenda Manager</h1>
//         {/* <button className="btn btn-success">Click here to Add Agenda</button> */}
//         {/* <button className="btn btn-success">Click here to View Agenda</button> */}
//         {isAddAgenda ? <AddAgenda addAgenda={addAgenda} changeForm={changeForm} /> : <ViewAgenda agenda={agenda} onDelete={onDelete} changeForm={changeForm} />}
//     </div>
//   )
// }







// import './App.css';
// import React, { useState } from 'react';
// import AddAgenda from './Components/AddAgenda';
// import ViewAgenda from './Components/ViewAgenda'

// export default function App() {
//     //let isAddAgenda = false
//     const [isAddAgenda, setisAddAgenda] = useState(true)

//     const changeForm = (change) => {
//         console.log("change status "+change)
//         if(change == "addAgenda"){
//             setisAddAgenda(true)
//         } else if(change == "viewAgenda"){
//             setisAddAgenda(false)
//         }
//     }

//     const addAgenda = (title, desc, topic) => {
//         console.log(title + " " + desc + " " + topic)

//         let newAgenda = {
//             title : title,
//             description : desc,
//             topic : topic
//         }

//         setAgenda([...agenda, newAgenda]);
//     }

//     const [agenda, setAgenda] = useState([
//         {
//             title : "React",
//             description : "Javascript Framework",
//             topic : "State hooks"
//         }, {
//             title : "Angular",
//             description : "Frontend Framework",
//             topic : "Another framework for web"
//         }, {
//             title : "Vue",
//             description : "Web Framework",
//             topic : "Vue topics"
//         }
//     ])

//     const onDelete =(agenda1) => {
//         setAgenda(agenda.filter((e) => {
//             return e!==agenda1
//         }))
//     }

//   return (
//     <div>
//         <h1>Agenda Manager</h1>
//         {/* <button className="btn btn-success">Click here to Add Agenda</button> */}
//         {/* <button className="btn btn-success">Click here to View Agenda</button> */}
//         {isAddAgenda ? <AddAgenda addAgenda={addAgenda} changeForm={changeForm} /> : <ViewAgenda agenda={agenda} onDelete={onDelete} changeForm={changeForm} />}
//     </div>
//   )
// }
