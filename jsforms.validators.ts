const lengthValidator = (value: string, min: number = 0, max: number) => {
    if (value.length < min || value.length > max) {
        return `Must be between ${min} and ${max} characters`;
    }
    return null;
}

const maxLengthValidator = (max: number) => {
    return function(value: string) {
        if (value.length > max) {
            return `Must be less than ${max} characters`;
        }
        return null;
    }
}

const requiredValidator = (value: string) => {
    if (value.length === 0) {
        return 'Required';
    }
    return null;
}

const emailValidator = (value: string) => {
    const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
        return 'Invalid email';
    }
    return null;
}

const passwordValidator = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
        return 'Invalid password';
    }
    return null;
}

export {lengthValidator, maxLengthValidator, requiredValidator, emailValidator, passwordValidator};