export type USERSIGNUPTODBTYPE = {
    email: string,
    hashedPassword: string
    firstName: string
    lastName: string
}

export type RETURNTYPE_USERSIGNUPTODBTYPE = Promise<{
    userIdToString: string     
}>