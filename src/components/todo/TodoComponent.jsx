import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, getTodoApi, updateTodoApi } from "./api/ToDoApiService"
import { useEffect, useState } from "react";
import { useAuth } from "./security/AuthContext";
import { ErrorMessage, Field, Form, Formik } from "formik";


export default function TodoComponent() {
    const {id} = useParams();
    const authContext = useAuth();
    const nav = useNavigate();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => getTodoDetail(id),[id]);

    function getTodoDetail(iptTodoId) {
        if(id != -1) {
            getTodoApi(authContext.username,iptTodoId)
            .then((response) => { setDescription(response.data.description); setTargetDate(response.data.targetDate) })
            .catch((error) => console.log('ERROR!',error));
        }
    }

    function onSubmit(values) {
        const updatedTodo = {
            id: id, 
            username: authContext.username, 
            description: values.description, 
            targetDate: values.targetDate, 
            done: false
        };
        
        console.log('test update',updatedTodo);

        if(id == -1) {
            createTodoApi(authContext.username,updatedTodo)
            .then((response) => { nav('/todos') })
            .catch((error) => console.log('ERROR!',error));            
        }else{
            updateTodoApi(authContext.username,id,updatedTodo)
            .then((response) => { nav('/todos') })
            .catch((error) => console.log('ERROR!',error));
        }
    }

    function onValidate(values) {
        let errors = {};      
        if(values.description.length < 5) {
            errors.description = 'Enter at least 5 characters';
        }
        if(values.targetDate == null || values.targetDate == '') {
            errors.targetDate = 'Enter a target date';
        }
        return errors;
    }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={ { description, targetDate }} 
                    enableReinitialize={true}
                    onSubmit = {onSubmit}
                    validate={onValidate}
                    validateOnChange={false}
                    validateOnBlur={false}>

                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }

                </Formik>
            </div>
        </div>
    )
}


