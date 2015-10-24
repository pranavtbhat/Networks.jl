deps_directory = dirname(@__FILE__)
server_directory = joinpath(deps_directory,"server")

cd(server_directory)
println("In Directory $(pwd())")

println("Running command - npm install")
run(`npm install`)
println("Installing Grunt-cli")
run(`npm install -g grunt-cli`)
println("Building Project")
run(`grunt build`)
