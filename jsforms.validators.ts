const lengthValidator = (value: string, min: number = 0, max: number) => {
    if (value.length < min || value.length > max) {
        return `Must be between ${min} and ${max} characters`;
    }
    return null;
}

const requiredValidator = (value: string) => {
    if (value.length === 0) {
        return 'Required';
    }
    return null;
}

const emailValidator = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
        return 'Invalid email';
    }
    return null;
}

const passwordValidator = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(value)) {
        return 'Invalid password';
    }
    return null;
}