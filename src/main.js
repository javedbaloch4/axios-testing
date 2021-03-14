// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
    axios('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(res => showOutput(res))
        .catch(error => console.log(error))
}

// POST REQUEST
function postTodo() {
   axios.post('https://jsonplaceholder.typicode.com/todos', {
       data: {
           title: 'Some title of data',
           complete: false
       }
   })
   .then(res => showOutput(res))
   .catch(err => console.log(err))
}

// PUT / PATCH REQUEST
function updateTodo() {
    axios.put('https://jsonplaceholder.typicode.com/todos/1', {
        data: {
            title: 'Updated todo',
            completed: true,
            id: 1 
        }
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// DELETE REQUESTS
function deleteTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// Simultenious Request
function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    };

    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'Some title of data',
        complete: false
    }, config)

    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat( data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };

    axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
    axios('https://jsonplaceholder.typicode.com/tods?_limit=')
    .then(res => showOutput(res))
    .catch(err => {
        if ( err.response ) {
            // Server responded wth a status other than range 200
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        }

        if ( err.response.status === 404 ) {
            // Or load React, Vue Component
            console.log('Error: Page not found')
        } else if ( err.request ) {
            // Request was made but no response
            console.log(err.request )
        } else {
            console.log(err.message);
        }
    })
}

// CANCEL TOKEN
function cancelToken() {
    const source = axios.CancelToken.source();
    
    axios('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if ( axios.isCancel (thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });

    if (true) {
        source.cancel('Request Canceled!');
    }
    
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
    config => {
        console.log(
            `${ config.method.toUpperCase() } request sent to ${config.url} at ${new Date().getTime() }` 
        );

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// AXIOS INSTANCE
const axiosInstance = axios.create({
    // Other Custom Settings
    baseURL: 'https://jsonplaceholder.typicode.com',  
});

axiosInstance.get('/comments').then(res => showOutput(res));


// SHOW OUTPUT IN BROWSWER
function showOutput(res) {
    document.getElementById("res").innerHTML = `
        <div class="card card-body mb-4">
            <h5>Status: ${ res.status }</h5>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                Headers
            </div>
            <div class="card-body">
                <pre> ${ JSON.stringify(res.headers, null, 2)}  </pre>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                Data
            </div>
            <div class="card-body">
                <pre> ${ JSON.stringify(res.data, null, 2) }  </pre>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                Config
            </div>
            <div class="card-body">
                <pre> ${ JSON.stringify(res.config, null, 2) }  </pre>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                Request
            </div>
            <div class="card-body">
                <pre> ${ JSON.stringify(res.request.responseURL, null, 2) }  </pre>
            </div>
         </div>

    `
}

// EVEN LISTNERS
document.getElementById("get").addEventListener('click', getTodos);
document.getElementById("post").addEventListener('click', postTodo);
document.getElementById("update").addEventListener('click', updateTodo);
document.getElementById("delete").addEventListener('click', deleteTodo);
document.getElementById("sim").addEventListener('click', getData);
document.getElementById("headers").addEventListener('click', customHeaders);
document.getElementById("transform").addEventListener('click', transformResponse);
document.getElementById("errors").addEventListener('click', errorHandling);
document.getElementById("cancel").addEventListener('click', cancelToken);


