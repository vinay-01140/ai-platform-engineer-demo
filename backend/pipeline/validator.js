function validatePipeline(design) {

    let errors = []

    if (!design.pages || design.pages.length === 0) {
        errors.push("Pages missing")
    }

    if (!design.entities || design.entities.length === 0) {
        errors.push("Entities missing")
    }

    if (!design.apiModules || design.apiModules.length === 0) {
        errors.push("API modules missing")
    }

    if (!design.roles || design.roles.length === 0) {
        errors.push("Roles missing")
    }

    return {
        valid: errors.length === 0,
        errors: errors
    }
}

module.exports = validatePipeline