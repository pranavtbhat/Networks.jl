using Networks
using Requests
using Base.Test
using HttpServer


import Requests: get, text, statuscode


#Basic test to see if the server is running
run_server()
req = Requests.get("http://0.0.0.0:8000")
@test statuscode(req) == 200
