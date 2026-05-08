const model = require("../openai")

async function extractIntent(userPrompt) {

    try {

        const prompt = `
Extract app intent.

Return ONLY valid JSON.

{
  "appType": "",
  "features": [],
  "roles": [],
  "businessGoals": []
}

User Prompt:
${userPrompt}
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

        console.log("Intent Error:", error)

        return {

            appType: "CRM",

            features: ["login"],

            roles: ["admin"],

            businessGoals: []
        }
    }
}

module.exports = extractIntent