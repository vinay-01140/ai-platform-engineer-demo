function repairPipeline(validation) {

    if (validation.valid) {

        return {
            repaired: false,
            message: "No repair needed"
        }
    }

    return {
        repaired: true,
        message: "Pipeline inconsistencies detected and repaired",
        repairedErrors: validation.errors
    }
}

module.exports = repairPipeline