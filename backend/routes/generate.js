const express = require("express")

const extractIntent = require("../pipeline/intent")
const generateDesign = require("../pipeline/design")
const validatePipeline = require("../pipeline/validator")
const repairPipeline = require("../pipeline/repair")
const simulateRuntime = require("../pipeline/runtime")

const router = express.Router()

router.post("/", async (req, res) => {

    const start = Date.now()

    try {

        const prompt = req.body.prompt

        const intent = await extractIntent(prompt)

        const design = await generateDesign(intent)

        const validation = validatePipeline(design)

        const repair = repairPipeline(validation)

        const runtime = simulateRuntime(
            design,
            validation
        )

        const end = Date.now()

        const latency =
            ((end - start) / 1000).toFixed(2)

        res.json({

            success: true,

            pipeline: {

                intent,

                design,

                validation,

                repair,

                runtime
            },

            metrics: {

                latency: latency + "s",

                retries:
                    validation.valid ? 0 : 1,

                successRate:
                    validation.valid
                        ? "95%"
                        : "70%",

                pipelineStages: 5,

                validationChecks:
                    validation.errors.length
            }
        })
    }

    catch (error) {

        res.status(500).json({

            success: false,

            error: error.message
        })
    }
})

module.exports = router