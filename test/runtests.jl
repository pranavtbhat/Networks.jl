base_directory = dirname(dirname(@__FILE__))
server_directory = joinpath(base_directory,"deps/server")

cd(server_directory)
run(`./node_modules/mocha/bin/mocha`)
