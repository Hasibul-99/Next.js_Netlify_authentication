exports.handler = async () => {
    console.log("function run");

    const data = {name: "hasibul", age: 28, job: "work"}

    return {
        code: 200,
        body: JSON.stringify(data)
    }
}