VERSION >= v"0.4.0-dev+652" && __precompile__(true)



module Networks
    using Mux

    export run_server, Networks

    function run_server()
      base_directory = dirname(dirname(@__FILE__))
      static_path = joinpath(base_directory, "static")
      index_path  = joinpath(base_directory, "index.html")

      @app networks = (
        Mux.defaults,
        route("/static", files(static_path), Mux.notfound()),
        route("/", req -> Mux.fileresponse(index_path)),
        Mux.notfound()
      )

      serve(networks)
    end
end
