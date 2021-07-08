import axios from "axios";

export const services = {
    URL: 'http://localhost:8000',
    getAllTodos: function(setDataInStateFunc) {
        axios.get(this.URL + '/todos')
            .then(res => {
                setDataInStateFunc(res.data)
            })
            .catch(err => {
                console.log('Error from getAllTodos' + err);
            })
    }
};