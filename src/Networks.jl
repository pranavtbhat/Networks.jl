VERSION >= v"0.4.0-dev+652" && __precompile__(true)

module Networks
    export server, Networks

    function server()
        base_directory = dirname(dirname(@__FILE__))
        server_directory = joinpath(base_directory,"deps/server")
        cd(server_directory)
        run(`node bin/server`)
    end
end
