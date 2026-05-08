const model = require("../openai")

async function generateDesign(intentData) {

    try {

        const prompt = `
Generate MINIMAL software design.

Return ONLY valid JSON.

{
  "pages": [],
  "entities": [],
  "apiModules": [],
  "roles": [],
  "workflows": []
}

Intent:
${JSON.stringify(intentData)}
`

        const result =
            await model.generateContent(prompt)

        const response = await result.response

        let text = response.text()

        text = text.replace(/```json/g, "")
        text = text.replace(/```/g, "")

        return JSON.parse(text)
    }

    catch (error) {

        console.log("Design Error:", error)

        return {

            pages: ["LoginPage"],

            entities: ["User"],

            apiModules: ["AuthAPI"],

            roles: ["admin"],

            workflows: ["User Login"]
        }
    }
}

module.exports = generateDesign