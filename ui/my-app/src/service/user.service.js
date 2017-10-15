import axios from "axios";

export default {
    requestPost: function () {
        return axios.get(`http://localhost:8081/api/user`,{headers:{'Access-Control-Allow-Origin':'*'}})
            .then(response => {
                return response.data;
            })
    }
}
