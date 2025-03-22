data "external_schema" "sequelize" {
    program = [
        "npx",
        "@ariga/ts-atlas-provider-sequelize",
        "load",
        "--path", "./src/models", // Adjust this to the directory containing your models
        "--dialect", "postgres",
    ]
}

env "sequelize" {
    src = data.external_schema.sequelize.url
    dev = "postgres://sashalarson:password@localhost:5432/sequelize_db_dev?sslmode=disable"
    url = "postgres://sashalarson:password@localhost:5432/sequelize_db?sslmode=disable"
    // Add migration directory configuration
    migration {
        dir = "file://migrations"
    }
    format {
        migrate {
            diff = "{{ sql . \"  \" }}"
        }
    }
}