import config from "../../config"

const getConsole = async () => {

    try {

        let Console = await fetch(`${config.apiPrefix}/console`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        return Console.json()

    } catch (error) {

        return {error}

    }
}

export default getConsole