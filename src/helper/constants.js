export const Regex_Validator = {
    String: /^[a-zA-Z ]+$/,
    Email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PhoneNumber: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    Number: /^[0-9\b]+$/,
    NotNumber: /\D/,
    NotString: /[0-9~!@#$%^&*+(|?[)._}{'"[\]\\:;/><,-=`]/,
}

export const Auth_Phase_Redirection = {
    REGISTER: '/auth/charge-my-card',
    CHARGECARD: '/auth/charge-my-card',
    CONFIRMPAY: '/auth/timezone',
    TIMEZONE: '/auth/terms-of-use',
    TERM: '/auth/get-number',
    GETNUMBER: '/campaigns/create-campaign',
    COMPLETED: '/campaigns/create-campaign',
}