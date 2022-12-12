export const VALIDATION_REQUIRE = "require"
export const VALIDATION_MIN_LENGTH = "minimum"
export const VALIDATION_MAX_LENGTH = "maximum"
export const VALIDATION_EMAIL = "email"


export const validation = (validators, value) => {
    let isValid
    validators.forEach((v) => {
        if(v === VALIDATION_REQUIRE){
            isValid = value.length > 0
        }
        if(v === VALIDATION_MIN_LENGTH){
            isValid = value.length > 5
        }
        if(v === VALIDATION_MAX_LENGTH){
            isValid = value.length < 10
        }
        if(v === VALIDATION_EMAIL){
            isValid = value.includes("@")
        }
    })  
    return isValid
}